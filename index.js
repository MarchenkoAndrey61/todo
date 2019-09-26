document.addEventListener('DOMContentLoaded', function(DOMContentLoaded){

    let inputTask = document.getElementById('new-task');
    let unfinishedTasks = document.getElementById('unfinished-tasks');
    let finishedTasks = document.getElementById('finished-tasks');
    const todoStorageArray = [];

    unfinishedTasks.addEventListener('click', (e)=> {
      e.stopPropagation();
      e.preventDefault();
      console.log(e.path)
      if (e.path[2].id) {
        if (e.path[1].classList.contains('delete')) {
          let listItem = this.parentNode;
          let ul = listItem.parentNode;  
          ul.removeChild(listItem);
          saveToLocalStorage();
        } else {
          e.path[0].innerText = 'check_box';

          const todoModel = todoStorageArray.find(todo => todo.id === e.path[2].id)
          todoModel.status = true;
  
          
          finishedTasks.appendChild(e.path[2]);
          saveToLocalStorage();
        }
      }
     
    });

    finishedTasks.addEventListener('click', (e)=> {
      e.stopPropagation();
      e.preventDefault();

      if (e.path[2].id) {
         if (e.path[1].classList.contains('delete')) {
        let listItem = this.parentNode;
        let ul = listItem.parentNode;  
        ul.removeChild(listItem);
        saveToLocalStorage();
      } else {
        e.path[0].innerText = 'check_box_outline_blank';
        unfinishedTasks.appendChild(e.path[2]);

        const todoModel = todoStorageArray.find(todo => todo.id === e.path[2].id)
        todoModel.status = false;
        saveToLocalStorage();
      }
        
      
      }
    });

    // создание новых тасков
    function createNewElement(todoInstance) {
      let listItem = document.createElement('li');
      listItem.id = todoInstance.id;

      let checkbox = document.createElement('button');

      if(todoInstance.status){
          checkbox.className = "material-icons checkbox";
          checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
      }else {
          checkbox.className = "material-icons checkbox";
          checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
      }

      let label = document.createElement('label');
      label.innerText = todoInstance.task;
      let input = document.createElement('input');
      input.type = "text";
      input.value = todoInstance.task;
      let saveText = document.createElement('input');
      saveText.type = "submit";
      saveText.value = "save";
      let cancleText = document.createElement('input');
      cancleText.type = "submit";
      cancleText.value = "cancel";  
      
      let deleteButton = document.createElement('button');
      deleteButton.className = "material-icons delete";
      deleteButton.innerHTML = "<i class='material-icons'>✖</i>";

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(input);
      listItem.appendChild(saveText);
      listItem.appendChild(cancleText);
      listItem.appendChild(deleteButton);
      editTask(listItem, cancleText, saveText);
      return listItem;     
    }
    //верхний прогрессбар
    function progresbarOne() {
        let sumOfLengthes = unfinishedTasksArr.length + finishedTasksArr.length;// common count arrays
        let maxWidthFinished = (finishedTasksArr.length * 100) / sumOfLengthes; 
        let maxWidthUnfinished = (unfinishedTasksArr.length * 100) / sumOfLengthes;
        let sumOfMaxWidth = maxWidthFinished + maxWidthUnfinished ;//100%
      
        console.log('finishedTasksArr.length', finishedTasksArr.length);
        console.log('sumOfMaxWidth', sumOfMaxWidth);
        console.log('sumOfLengthes',sumOfLengthes);
        console.log('maxWidthFinished', maxWidthFinished);
        console.log('maxWidthUnfinished', maxWidthUnfinished);

        let elem = document.getElementById('green');
        let width = finishedTasksArr.length ; // элементы в списке дел
        let styleMaxWidth = document.getElementById('progres-green');
        width = Math.ceil(width);

        let id = setInterval(frame, 16);

            function frame(){
                if (width >= sumOfMaxWidth) {
                    clearInterval (id);
                    elem.style.width = maxWidthFinished + '%'; 
              
                } else {
                  clearInterval (id);
                  elem.style.width = maxWidthFinished + '%';
                    
                }
          
            }
    }
    //нижний прогрессбар
    function progresbarTwo() {
          let sumOfLengthes = unfinishedTasksArr.length + finishedTasksArr.length;// common count arrays
          let maxWidthFinished = (finishedTasksArr.length * 100) / sumOfLengthes; 
          let maxWidthUnfinished = (unfinishedTasksArr.length * 100) / sumOfLengthes;
          let sumOfMaxWidth = maxWidthFinished + maxWidthUnfinished ;//100%
      
          console.log('sumOfMaxWidth', sumOfMaxWidth);
          console.log('sumOfLengthes',sumOfLengthes);
          console.log('maxWidthFinished', maxWidthFinished);
          console.log('maxWidthUnfinished', maxWidthUnfinished);
      
          let elem = document.getElementById('blue');
          let width = finishedTasksArr.length ; // элементы в списке дел
          let styleMaxWidth = document.getElementById('progres-blue');
          width = Math.ceil(width);
          
          let id = setInterval(frame, 16);
     
              function frame(){
                  if (width >= sumOfMaxWidth) {
                      clearInterval (id);
                      elem.style.width = maxWidthFinished + '%';
                
                  } else {
                    clearInterval (id);
                      elem.style.width = maxWidthFinished + '%';
                  }
              }
    }
      
    function TodoListObj(text) {
      this.task = text;
      this.status = false;
      this.id = Math.random().toString(16).substr(2, 9);
    }

    //ввод через клавиатуру
    inputTask.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
          let todoInstance = new TodoListObj(inputTask.value);
          let listItem = createNewElement(todoInstance);

          todoStorageArray.push(todoInstance);
          unfinishedTasks.appendChild(listItem);

          inputTask.value = "";

          saveToLocalStorage();
         
        }
    });

    // //удаление таска
    // function deleteTask() {
    //     let listItem = this.parentNode;
    //     let ul = listItem.parentNode;
    //     ul.removeChild(listItem);
    //     saveToLocalStorage();
    // }

    function saveToLocalStorage() {
      localStorage.setItem('todoStorage', JSON.stringify(todoStorageArray));
    }

    //редактирование тасков
    function editTask(liItem, cancleText, saveText) {
        saveText.onclick = function (event) {
          event.srcElement.previousSibling.previousSibling.innerText = event.srcElement.previousSibling.value;
          liItem.classList.toggle('editMode');
          saveToLocalStorage();
        };

        cancleText.onclick = function() {
          liItem.classList.toggle('editMode');
        };

        liItem.addEventListener('dblclick', function (e) {
            liItem.classList.toggle('editMode');     
        });
    }

    
    
    // загрузка данных
    function load() {
      const data = JSON.parse(localStorage.getItem('todoStorage'));
  
      if (data != null) {
          data.forEach(task => {
            let listItem = createNewElement(task);
            if (task.status) {
              finishedTasks.appendChild(listItem); 
            } else {
              unfinishedTasks.appendChild(listItem);              
            }
          });
  
          todoStorageArray.push(...data);
      }

      progresbarOne();
      progresbarTwo();
    }

    load();
});



