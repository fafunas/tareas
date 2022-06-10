require("colors");
const { red } = require("colors");
//const {showMenu, pause} =require('./helper/message');
const { inquirerMenu, pause, readInput, listDeletedTask, confirmation, showCheckList } = require("./helper/inquierer");
const { saveInfo, readInfo } = require("./helper/save");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const readdb = readInfo();

  if(readdb){
      tasks.taskFromArray(readdb);
  }

  do {
      //This function print the menu and return the option
    opt = await inquirerMenu();
   // console.log({ opt });



    switch (opt) {
      case "1":
        const desc = await readInput("Descripcion:");
        tasks.addTask(desc);
        break;
      case "2":
        tasks.list()
        break;
        case "3":
        tasks.listCompleted(true);
        break;
        case "4":
        tasks.listCompleted(false);
        break;
        case "5":
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
        case "6":
        const id= await listDeletedTask(tasks.listArr);
        const ok = await confirmation('¿Desea borrar esta tarea?');
        if(ok){
            tasks.deleteTask(id);
            console.log("Tarea Borrada");
        }
      //  console.log({id})
        break;
    }

    saveInfo(tasks.listArr);


    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
