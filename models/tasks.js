require("colors");

const { Task } = require("./task");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];

    //return Array and fill list[]
    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id){
      if(this._list[id]){
          delete this._list[id]
      }
  }

  taskFromArray(tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task;
    });
  }

  addTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  list(){
    this.listArr.forEach((task,id)=>{
        const idx= `${id+1}`.green;
        const  {desc,completeIn} = task;
        const status = (completeIn) ? 'Completeada'.green : 'Pendiente'.red

        console.log(`${idx} ${desc} :: ${status}`)
    });
  }

  toggleCompleted(ids=[]){
      ids.forEach(id=>{
          const tarea = this._list[id]
          if(!tarea.completeIn){
            tarea.completeIn = new Date().toISOString()
          }
      });

      this.listArr.forEach(tarea=>{
          if(!ids.includes(tarea.id)){
               this._list[tarea.id].completeIn=null
          }
      })
  }


  //function for list the completed or incomplete task
  listCompleted(completed= true){
    let i = 0;

    this.listArr.forEach(task=>{
        const {desc, completeIn} = task; //destruc tareas
        const status = (completeIn) ? 'Completada'.green : 'Pendiente'.red;

        if (completed){
            if (completeIn){
                i += 1;
                console.log(`${(i+'.').green} ${desc} :: ${completeIn}`);
            }
        } else{
            if(!completeIn){
                i+= 1;
                console.log(`${(i+'.').green} ${desc} :: ${status}`);
            }
        }

    })
  };


}

module.exports = Tasks;
