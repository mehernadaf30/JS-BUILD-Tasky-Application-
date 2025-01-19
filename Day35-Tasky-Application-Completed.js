// var state = {
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ],
// };

///backup storage
const state = {
    taskList: [],
  };
  
  ///DOM Operations
  const taskModal = document.querySelector(".task__modal__body");
  const taskContents = document.querySelector(".task__contents");
  
  // console.log(taskContents);
  // console.log(taskModal);
  
  ///Template for the card on screen
  // elem identifier key=${id} is been misssing on line 50th
  const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
      <div class='card shadow-sm task__card'>
      
        <div class='card-header d-flex justify-content-end task__card__header'>
             <button type='button' class='btn btn-outline-primary mr-2' name=${id} onclick="editTask.apply(this, arguments)">
                <i class='fas fa-pencil-alt name=${id}'></i>
            </button>
             <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick="deleteTask.apply(this, arguments)">
                <i class='fas fa-trash-alt name=${id}'></i>
            </button>
        </div>
        <div class='card-body'>
            ${
              // url &&
              // `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
              url
                ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
                : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            }
            <h4 class='card-title task__card__title'>${title}</h4>
            <p class='description trim-3-lines text-muted'>${description}</p>
            <div class='tags text-white d-flex flex-wrap'>
              <span class='badge bg-primary m-1'>${type}</span>
            </div>
        </div>
        <div class='card-footer'>
           <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask()' id=${id}>Open Task</button>
        </div>
      </div>
    </div>
  `;
  
  ///Modal Body on >> Clk of Open Task
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
       ${
         //  url &&
         //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
         url
           ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
           : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
       }
       <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
       <h2 class='my-3'>${title}</h2>
       <p class='text-muted'>${description}</p>
    </div>
    `;
  };
  
  // where we convert json > str (i.e., for local storage)
  const updateLocalStorage = () => {
    localStorage.setItem(
      "task",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  // where we convert str > json (i.e., for rendering the cards on the screen)
  // const loadInitialData = () => {
  //   const localStorageCopy = JSON.parse(localStorage.task);
  
  //   if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
  //   state.taskList.map((cardDate) => {
 
  //     taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  //   });
  // };
  
  const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
  };
  
  /// Spread Operator
  /**
   const obj = {
      name: "rohan",
      age: 2
  }
  
  
  console.log(obj);
   {name: 'rohan', age: 2}
  
  console.log({obj});
   {obj: {…}}obj: {name: 'rohan', age: 2}[[Prototype]]: Object
  
  console.log({...obj});
   {name: 'rohan', age: 2}
  
  //  appending or adding a new key into obj:
  console.log({...obj, designation: "mentor"});
  {name: 'rohan', age: 2, designation: 'mentor'}
   */
  
  /**
   * 
  //  updating key value using spread operator
  const obj={
      name: "rohan"
  }
  
  console.log(obj)
   {name: 'rohan'}
  
  
  console.log({...obj, age : 2});
   {name: 'rohan', age: 2}
  
  console.log({...obj, age :4});
  {name: 'rohan', age: 4}
   */
  
  /* 
  var date = new Date();
  console.log(Date.now());
  
  1677511569666
  */
  
  // when we update or when we edit ..we need to save
  const handleSubmit = (event) => {
    // console.log("event triggerd");
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("taskTitle").value,
      type: document.getElementById("tags").value,
      description: document.getElementById("taskDescription").value,
    };
    if (input.title === "" || input.type === "" || input.description === "") {
      return alert("Please fill all the necessary fiels :-)");
    }
  
    // taskContents.innerAdjacentHTML(
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({ ...input, id })
    );
    state.taskList.push({ ...input, id });
  
    updateLocalStorage();
  };
  

  //Day33 code from here
  //open task
  /*find --- array method
  We wanna create a method again and function name is something called openTask and it is event and within this event i want a particular
  functio to be triggered
  [const openTask = (e) => ]
  So let say we have certain conditions
  By default we want something called event not present even if it not present 
  if (!e) e = window.event:-if we dont get any event we have some dummy value.
  const getTask = state.taskList.find(({ id }) => id === e.target.id):This line is used in order to check which card is clicked or opened
  as you can see in console that every card has differenet id that why i wrote id on opentask function upside in button section of Open Task 
  as a new attribute.
  Now i have to search which id so in order to find which id seclected we use this line
  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  where is your task present it is presnt [state.taskList array]
  and find operation and find with your id in order to find something we need id that why in function i have id.
  when i open task this info is already present in array tthen i am saying that the id from tasklist is same as the one with respect 
  to this event.event means open task button if id is matched then i say all the information with respect to the card  is available in
  const getTask
   -->taskModal is for getting things on our body
   -->getTask has all the informtaion if crads
  */
  const openTask = (e) => {
  //you can aviod this line but u have to add some things in button of open task lets see
  if (!e) e = window.event;
  
  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};
  
// if you wanna comment this line if (!e) e=(e)=>
/*Then write this below line instead of that button line
<button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this, arguments)' id=${id}>Open Task</button>*/


///delete task

const deleteTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  //We just got the targetId here thats nothing but id attribute of the particular attribute
  /*In output it is showing  null value this is happening because we are applying function 
  onclick delete task was only applied on button not on icon*/
  //console.log(targetId);
  const type=e.target.tagName;
  //console.log(type);
  //We will get the tag name in console with this
  const removeTask = state.taskList.filter(({ id }) => id !== targetId);
  console.log(removeTask);
  updateLocalStorage();

  /*we need to delete in ui also na that's why we are writing this code
  we got to know if it is button or icon with the help type see above
  I am saying once i click button u need to to this below code from if to return*/
  if (type === "BUTTON") 
    {
     //console.log(e.target.parentNode.parentNode.parentNode.parentNode);
     /*[ e.target.parentNode.parentNode.parentNode.parentNode.removeChild]-->we writing this beacsue we know that the icon is 
      present in htmlTaskContent the template part and you can see after button of trash icon we have 3 div and const method 
      and all this are correlated like button has parent div and this div has again a upper parent and in this way we came outside of card and once 
      i come across all div i will call removeChild method after this it will delete the entire card*/
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  } 
  /*what if type is icon copy the if return same but rather then writing parentNode 4 time write 5 time why 
  5 because your icon is present within button
  */
    else if (type === "I") 
    {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};
/*One thing u can see that after this above code of if and else if we will be able to dlete the card from ui but the
problem is that once we refresh all cards will avail again means deleteTask is not properly done*/


///edit task
const editTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  // taskTitle = parentNode.childNodes[3].childNodes[7].childNodes;
  // console.log(taskTitle);

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];

  // console.log(taskTitle, taskDescription, taskType, submitButton);

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

/// save edit
const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode.childNodes)

  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentNode.childNodes[5].childNodes[1];

  //update things in localstorage and array
  const updateData = {
    //innerHTML means we will content which are present in html
    //taskTitle taken from upside constTitle and so on....
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  //i need to edit my taskList[array] thats why this line
  let stateCopy = state.taskList;

  //map 
  //updated map should be present in statecopy
  stateCopy = stateCopy.map((task) =>
    task.id === targetId
      //if user dont want to assign this thing then this one :task 
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
          //we can't url because we have image not image url in card
        }
      
      : task
  );
  //calling state.taskList and we have latest data in statecopy so assign it in state.taskList
  state.taskList = stateCopy;
  updateLocalStorage();
  //now we will disable the edit pencil icon in order to disable all features of savechanges
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  /*this below all code is done in order to display open task button as our save changes work completed
  // and u can see in output that we i clcik on edit and do some changes ans save it will section to open Task to its */
  //directly calling modal open task modal 
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  //rather than remove i will take setAttribute 
  submitButton.setAttribute("data-bs-toggle", "modal");
  //model name #showTask
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};


//search
//This is event
// search
const searchTask = (e) => {
    if (!e) e = window.event;
    /*it means when i search a particular thing i want that on screen 
  for eg:if i search rose then that should appear */
    while (taskContents.firstChild) {
      taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({ title }) =>
      title.toLowerCase().includes(e.target.value.toLowerCase())
    );
  
    // console.log(resultData);
    //each and every card data 
    resultData.map(
      (cardData) =>
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
      // taskContents.insertAdjacentHTML("beforeend", htmlModalContent(cardData))
    );
  };
  

   




























