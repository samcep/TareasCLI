require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquiereMenu,
  leerInput,
  listadoBorrarTareas,
  confirmarTarea,
  listadoCompletarTareas,
} = require("./helpers/inquirer");
const { pausa } = require("./helpers/mensaje");
const Tareas = require("./models/tareas");

console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquiereMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descriptoi : ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listadoPendienteCompletado(true);
        break;
      case "4":
        tareas.listadoPendienteCompletado(false);
        break;
      case "5":
        const ids = await listadoCompletarTareas(tareas.ListadoArray);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoBorrarTareas(tareas.ListadoArray);
        const ok = await confirmarTarea("¿Está seguro?");
        if (ok) {
          tareas.borrarTarea(id);
          console.log("Tarea borrada");
        }
        break;
    }

    guardarDB(tareas.ListadoArray);
    //console.log({opt})

    await pausa();
  } while (opt !== "0");
};
main();
