// Router.js
import { endpoint } from "./server"; // Si lo necesitas en algún método

class Router {
  constructor(defaultCategory = "Home") {
    // Funciones utilitarias definidas como métodos internos
    this.util = {
      toLower: (str) => {
        if (typeof str === "string") {
          return str.toLowerCase().replace(/\s/g, "");
        }
        return null;
      },
      toCategory: (str) => {
        if (typeof str === "string") {
          const fix = this.util.toLower(str);
          return `/c/${fix}`;
        }
        return null;
      },
    };

    // Establecemos la ubicación inicial usando la función toCategory con la categoría por defecto.
    this.location = {
      pathname: this.util.toCategory(defaultCategory),
    };

    this.match = {
      params: {},
    };

    this.history = {
      push: (path) => {
        // Simula la navegación actualizando la ubicación.
        console.log("Navegando a:", path);
        this.location.pathname = path;
      },
    };
  }

  // Método para navegar a una nueva ruta.
  navigate(path) {
    this.history.push(path);
  }

  // Método para actualizar la ruta de la categoría usando toCategory.
  updateCategory(category) {
    const newPath = this.util.toCategory(category);
    this.location.pathname = newPath;
    return newPath;
  }

  // Devuelve el objeto con todas las propiedades y funciones integradas.
  getRouter() {
    return {
      util: this.util,
      location: this.location,
      navigate: this.navigate.bind(this),
      match: this.match,
      history: this.history,
      updateCategory: this.updateCategory.bind(this),
    };
  }
}

// Creamos una instancia y exportamos el objeto resultante.
const routerInstance = new Router();
export default routerInstance.getRouter();
