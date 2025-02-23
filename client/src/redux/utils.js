import { forEach, isArray, isObject } from "lodash";
export function findAll (data, searchKey){
    let result = [];
  
    const search = (obj, path = "") => {
      if (isArray(obj) || isObject(obj)) {
        forEach(obj, (value, key) => {
          const newPath = isArray(obj) ? `${path}[${key}]` : `${path}.${key}`.replace(/^\./, "");
          if (key === searchKey) result.push({ path: newPath, value });
          search(value, newPath);
        });
      }
    };
  
    search(data);
    return result.length ? result : null;
  }; 

  export function findOne (data, searchKey){
    let result = null;
  
    const search = (obj, path = "") => {
      if (isArray(obj) || isObject(obj)) {
        forEach(obj, (value, key) => {
          const newPath = isArray(obj) ? `${path}[${key}]` : `${path}.${key}`.replace(/^\./, "");
          if (key === searchKey) result = { path: newPath, value };
          search(value, newPath);
        });
      }
    };
  
    search(data)
    if (result) return result.value;
    return null;
  };