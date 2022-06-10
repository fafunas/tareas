require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=====================".bgGreen);
    console.log("Seleccione una Opcion".bgGreen);
    console.log("=====================\n".bgGreen);

    console.log(`${"1.".green} Crear Tarea`);
    console.log(`${"2.".green} Listar Tareas`);
    console.log(`${"3.".green} Listar Tareas Completadas`);
    console.log(`${"4.".green} Listar Tareas Pendientes`);
    console.log(`${"5.".green} Completar Tareas`);
    console.log(`${"6.".green} Borrar Tarea`);
    console.log(`${"0.".green} Salir \n`);

    //Create interface to read
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (opt) => {
      resolve(opt)
      readline.close();
    });
  });
};


const pause = () =>{
    return new Promise (resolve=>{
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
          });
      
          readline.question(`\nPresione ENTER para continuar\n`, (opt) => {
            resolve(opt)
            readline.close();
          });
    });
}

module.exports = {
  showMenu,
  pause
};
