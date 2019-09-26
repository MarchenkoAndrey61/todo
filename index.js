document.addEventListener('DOMContentLoaded', function(DOMContentLoaded){

    let inputTask = document.getElementById('new-task');
    let unfinishedTasks = document.getElementById('unfinished-tasks');
    let finishedTasks = document.getElementById('finished-tasks');
    let finishedTasksArr = [];
    let unfinishedTasksArr = [];

    function createNewElement(task, finished) {
        let listItem = document.createElement('li');
        let checkbox = document.createElement('button');

        if(finished){
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
        }else {
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
        }

        let label = document.createElement('label');
        label.innerText = task;
        let input = document.createElement('input');
        input.type = "text";
        input.value = task;
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
        load();
       
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
      
    //ввод через клавиатуру
    inputTask.addEventListener('keypress', function(e){
        if (e.keyCode === 13) {
            let listItem = createNewElement(inputTask.value, false);
            unfinishedTasks.appendChild(listItem);
            bindTaskEvents(listItem, finishTask)
            inputTask.value = "";

            save();
        }
    });

    //удаление таска
    function deleteTask() {
        let listItem = this.parentNode;
        let ul = listItem.parentNode;
        ul.removeChild(listItem);
        save();
    }

    //редактирование тасков
    function editTask(liItem, cancleText, saveText) {
        saveText.onclick = function (event) {
          event.srcElement.previousSibling.previousSibling.innerText = event.srcElement.previousSibling.value;
          liItem.classList.toggle('editMode');
          save();
        };

        cancleText.onclick = function() {
          liItem.classList.toggle('editMode');
        };

        liItem.addEventListener('dblclick', function (e) {
            liItem.classList.toggle('editMode');     
        });
    }

    //активация чекбокcа
    function finishTask() {
        let listItem = this.parentNode;
        let checkbox = listItem.querySelector('button.checkbox');
        
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
        finishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, unfinishTask);
        
        save();
    }

    //активация чекбокcа
    function unfinishTask() {
        let listItem = this.parentNode;
        let checkbox = listItem.querySelector('button.checkbox');
        
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask)
        
        save();
    }
    //проверка нажатия
    function bindTaskEvents(listItem, checkboxEvent) {
        let checkbox = listItem.querySelector('button.checkbox');
        let deleteButton = listItem.querySelector('button.delete');

        checkbox.onclick = checkboxEvent;
        deleteButton.onclick = deleteTask;
    }

    //сохранение данных
    function save() {
      unfinishedTasksArr.length = 0;
      finishedTasksArr.length = 0;

      for (let i = 0; i < unfinishedTasks.children.length; i++) {
          unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
      }

      for (let i = 0; i < finishedTasks.children.length; i++) {
          finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
      }

      localStorage.removeItem('todo');
      localStorage.setItem('todo', JSON.stringify({
          unfinishedTasks: unfinishedTasksArr,
          finishedTasks: finishedTasksArr
      }));

      progresbarOne();
      progresbarTwo();
   
    }
    // загрузка данных
    function load(){

        const data = JSON.parse(localStorage.getItem('todo'));
      
        if (data != null) {
            data.unfinishedTasks.forEach(task => {
                let listItem = createNewElement(task, false);
                unfinishedTasks.appendChild(listItem);
                bindTaskEvents(listItem, finishTask);
            })
            unfinishedTasksArr.push(...data.unfinishedTasks);

            data.finishedTasks.forEach(task => {
                let listItem = createNewElement(task, true);
                finishedTasks.appendChild(listItem);
                bindTaskEvents(listItem, unfinishTask);
              
            })

            finishedTasksArr.push(...data.finishedTasks);
        }

        progresbarOne();
        progresbarTwo();
    }

    load();
  
});



