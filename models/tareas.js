const Tarea = require("./tarea");
const colors = require("colors");

class Tareas {
  _listado = {};

  get ListadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  //Metodo para borrar tareas
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareas(tarea = []) {
    tarea.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });

    console.log(tarea);
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this.ListadoArray.forEach(({ desc, completadoEn }, i) => {
      console.log(
        `${colors.green(i)}. ${desc} ::  ${
          completadoEn != null
            ? colors.green("Completado")
            : colors.red("Pendiente")
        }`
      );
    });
  }

  listadoPendienteCompletado(completado = true) {
    this.ListadoArray.forEach(({ desc, completadoEn }, i) => {
      if (completado) {
        if (completadoEn) {
          console.log(
            `${colors.green(i)}. ${desc} ::  ${
              completado ? colors.green("Completado") : colors.red("Pendiente")
            }`
          );
        }
      } else {
        if (!completadoEn) {
          console.log(
            `${colors.green(i)}. ${desc} ::  ${
              completado ? colors.green("Completado") : colors.red("Pendiente")
            }`
          );
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.ListadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
