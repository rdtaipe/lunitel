import { google } from "googleapis";
import lodash from "lodash";

// Configura la autenticación
const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json", // archivo de credenciales
  scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
});

const sheetsAPI = google.sheets({ version: "v4", auth });

/**
 * Clase que simula un "documento" en Google Sheets y expone métodos CRUD.
 */
export class SheetDB {
  constructor(spreadsheetId, sheetName, schemaDefinition) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
    this.schemaDefinition = schemaDefinition; // Ejemplo: { name: String, age: Number }
  }

  /**
   * Inicializa la hoja: la crea si no existe y agrega los encabezados.
   */
  async initialize() {
    try {
      // Verificar si la hoja ya existe
      const spreadsheet = await sheetsAPI.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
        fields: "sheets.properties.title",
      });


      const sheetExists = spreadsheet.data.sheets.some(
        (sheet) => sheet.properties.title === this.sheetName
      );

      if (!sheetExists) {
        // Crear la hoja
        await sheetsAPI.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: this.sheetName,
                  },
                },
              },
            ],
          },
        });

        // Agregar encabezados (primera fila)
        await sheetsAPI.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.sheetName}!A1`,
          valueInputOption: "RAW",
          resource: {
            values: [Object.keys(this.schemaDefinition)],
          },
        });
      }
    } catch (error) {
      console.error("Error al inicializar la hoja:", error);
      throw error;
    }
  }

  /**
   * Obtiene todas las filas de la hoja (asumiendo que la primera fila son los encabezados)
   * @returns {Promise<Array<Object>>} - Un array de objetos donde cada objeto representa una fila.
   */
  async getAllRows() {
    const response = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: this.sheetName,
    });
    // console.log(response.data);

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const headers = rows[0];
    const dataRows = rows.slice(1);

    return dataRows.map((row) =>
      Object.fromEntries(
        headers.map((header, i) => {
          let value = row[i] || null;

          // Si el valor es string y tiene comas sin espacios, convertir en array
          if (typeof value === "string" && value.includes(",") && !value.includes(", ")) {
            value = value.split(",");
          }

          return [header, value];
        })
      )
    );
  }


  /**
   * Busca documentos que coincidan con la consulta
   * @param {String} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<Array<Object>>} - Un array de objetos que coinciden con la consulta.
   */

  async find(query = {}) {



    try {
      const headerRange = `${this.sheetName}!1:1`;
      const dataRange = `${this.sheetName}!A2:Z`; // Desde la fila 2 en adelante

      // 📌 1. Obtener encabezados y datos en una sola solicitud (paralelo)
      const [headerResponse, dataResponse] = await Promise.all([
        sheetsAPI.spreadsheets.values.get({ spreadsheetId: this.spreadsheetId, range: headerRange }),
        sheetsAPI.spreadsheets.values.get({ spreadsheetId: this.spreadsheetId, range: dataRange })
      ]);

      const headers = headerResponse.data.values?.[0] || [];
      const allRows = dataResponse.data.values || [];


      // 📌 2. Convertir filas a objetos asegurando la alineación con los encabezados
      const jsonData = allRows.map(row => lodash.zipObject(headers, row));

      // 📌 3. Filtrar los datos
      const filteredResults = lodash.filter(jsonData, query);

      // 📌 4. Extraer categorías únicas
      const categoriesAndSubcategories = lodash.uniqWith(
        filteredResults.map(data => ({ category: data[query] })),
        
      );

      return categoriesAndSubcategories;
    } catch (error) {
      console.error("Error al buscar datos en Google Sheets:", error);
      return [];
    }
  }




  /**
   * Encuentra un solo documento que coincida con la consulta
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<Object|null>} - El primer objeto que coincide con la consulta o null si no se encuentra.
   */
  async findOne(query = {}) {
    const results = await this.find(query);
    return results.length ? results[0] : null;
  }

  /**
   * Crea un nuevo "documento" (fila) en la hoja
   * @param {Object} newData - Objeto con los datos a insertar.
   * @returns {Promise<Object>} - El objeto insertado.
   */
  async create(newData) {
    // Asegurarse de que la hoja esté inicializada
    await this.initialize();

    const headers = Object.keys(this.schemaDefinition);
    const rowValues = headers.map((field) => {
      const value = newData[field];
      // Si es un array, lo convertimos a string separado por comas
      return Array.isArray(value) ? value.join(",") : value || "";
    });

    try {
      await sheetsAPI.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A1`,
        valueInputOption: "RAW",
        resource: { values: [rowValues] },
      });
      return newData;
    } catch (error) {
      console.error("Error al crear el documento:", error);
      throw error;
    }
  }

  /**
   * Actualiza documentos que coincidan con la consulta
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @param {Object} updateData - Objeto con los campos y valores a actualizar.
   * @returns {Promise<number>} - El número de documentos actualizados.
   */
  async update(query, updateData) {
    const rows = await this.getAllRows();
    const headers = Object.keys(this.schemaDefinition);
    let updatedCount = 0;

    const newRows = rows.map((row) => {
      if (Object.keys(query).every((key) => row[key] == query[key])) {
        updatedCount++;
        return { ...row, ...updateData };
      }
      return row;
    });

    const allValues = [headers, ...newRows.map((row) => headers.map((h) => row[h] || ""))];
    await sheetsAPI.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A1`,
      valueInputOption: "RAW",
      resource: { values: allValues },
    });
    return updatedCount;
  }

  /**
   * Elimina documentos que coincidan con la consulta
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<number>} - El número de documentos eliminados.
   */
  async delete(query) {
    const rows = await this.getAllRows();
    const headers = Object.keys(this.schemaDefinition);
    const filtered = rows.filter(
      (row) => !Object.keys(query).every((key) => row[key] == query[key])
    );
    const deletedCount = rows.length - filtered.length;
    const allValues = [headers, ...filtered.map((row) => headers.map((h) => row[h] || ""))];
    await sheetsAPI.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A1`,
      valueInputOption: "RAW",
      resource: { values: allValues },
    });
    return deletedCount;
  }
}

/**
 * Clase Schema para definir la estructura de los "documentos".
 */
export class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}


export class Model {
  /**
   * Constructor de la clase Model.
   * @param {string} spreadsheetId - ID de la hoja de cálculo.
   * @param {string} sheetName - Nombre de la hoja.
   * @param {Schema} schema - Esquema de la hoja.
   */
  constructor(spreadsheetId, sheetName, schema) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
    this.schema = schema;
    this.db = new SheetDB(spreadsheetId, sheetName, schema.definition);
  }

  /**
   * Inicializa la hoja: la crea si no existe y agrega los encabezados.
   */
  async initialize() {
    await this.db.initialize();
  }

  /**
   * Crea un nuevo documento (fila) en la hoja.
   * @param {Object} data - Datos a insertar.
   * @returns {Promise<Object>} - El objeto insertado.
   */
  async create(data) {
    return this.db.create(data);
  }

  /**
   * Obtiene todas las filas de la hoja.
   * @returns {Promise<Array<Object>>} - Un array de objetos donde cada objeto representa una fila.
   */
  async getAllRows() {
    return this.db.getAllRows();
  }

  /**
   * Busca documentos que coincidan con la consulta.
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<Array<Object>>} - Un array de objetos que coinciden con la consulta.
   */
  async find(query = {}) {
    return this.db.find(query);
  }

  /**
   * Encuentra un solo documento que coincida con la consulta.
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<Object|null>} - El primer objeto que coincide con la consulta o null si no se encuentra.
   */
  async findOne(query = {}) {
    return this.db.findOne(query);
  }

  /**
   * Actualiza documentos que coincidan con la consulta.
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @param {Object} updateData - Objeto con los campos y valores a actualizar.
   * @returns {Promise<number>} - El número de documentos actualizados.
   */
  async update(query, updateData) {
    return this.db.update(query, updateData);
  }

  /**
   * Elimina documentos que coincidan con la consulta.
   * @param {Object} query - Objeto con los campos y valores a buscar.
   * @returns {Promise<number>} - El número de documentos eliminados.
   */
  async delete(query) {
    return this.db.delete(query);
  }
}