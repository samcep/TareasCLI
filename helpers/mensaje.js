const colors = require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("========================================".green);
    console.log("Seleccione una opción ".green);
    console.log("========================================".green);

    console.log(`${"1.".green} Crear tareas`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tareas`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".red + " Salir".red} `);

    //Parte para leer desde la linea de comandos
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione un accion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

//Metodo para continuar con la aplicación
const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPrecione ${"ENTER".green} para continuar`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
