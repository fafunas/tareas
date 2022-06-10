const inquirer = require("inquirer");
require("colors");

const question = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tarea`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  // console.clear();
  console.log("=====================".bgGreen);
  console.log("Seleccione una Opcion".bgGreen);
  console.log("=====================\n".bgGreen);

  const { opcion } = await inquirer.prompt(question);
  return opcion;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `\nPresione ${"enter".green} para continuar`,
    },
  ];
  await inquirer.prompt(question);
};

const readInput = async (message) => {
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

  //destructuramos la desc
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listDeletedTask = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id


};

const showCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completeIn) ? true : false //checked only the completed task
    };
  });
  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids


};

const confirmation = async (message)=>{
  const question=[{
    type: 'confirm',
    name:'ok',
    message
  }];
  const { ok } = await inquirer.prompt(question);
  return ok;

}



module.exports = { inquirerMenu, pause, readInput, listDeletedTask, confirmation,showCheckList };
