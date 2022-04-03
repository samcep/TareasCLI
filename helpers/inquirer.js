const inquirer = require("inquirer");
//Preguntas del meno
const quentionMenu = {};
const question = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer? ",
    choices: [
      {
        value: "1",
        name: "1. Crear tareas",
      },
      {
        value: "2",
        name: "2. Listar tareas ",
      },
      {
        value: "3",
        name: "3. Listar tareas completadas",
      },
      {
        value: "4",
        name: "4. Listar tareas pendientes ",
      },
      {
        value: "5",
        name: "5. Completar tareas ",
      },
      {
        value: "6",
        name: "6. Borrar tareas ",
      },
      {
        value: "0",
        name: "0. Salir ",
      },
    ],
  },
];
const inquiereMenu = async () => {
  console.clear();
  console.log("========================================".green);
  console.log("Seleccione una opción ".green);
  console.log("========================================".green);

  const { opt } = await inquirer.prompt(question);

  return opt;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listadoBorrarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;

    return {
      value: tarea.id,
      name: `${idx}  ${tarea.desc} `,
    };
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const listadoCompletarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;

    return {
      value: tarea.id,
      name: `${idx}  ${tarea.desc} `,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(preguntas);

  return ids;
};

const confirmarTarea = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};
module.exports = {
  inquiereMenu,
  leerInput,
  listadoBorrarTareas,
  confirmarTarea,
  listadoCompletarTareas,
};
