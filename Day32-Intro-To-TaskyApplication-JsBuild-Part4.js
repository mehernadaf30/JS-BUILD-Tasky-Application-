/*This is just example of how card will stored
here one thing need to be added that is id which i will add dynamically see below in code
// var state = {                                                                             this is object state
//   taskList: [                                                                             this is array so array within object
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

// backup storage
//state is object and taskList is array
const state = {
  taskList: [],
};

// DOM Operations
/*you know that we have two blank fields in body where we want to work with js 
this are the one*/
/* from js we will be adding html code and thos ething we will be adding in UI*/
const taskModal = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// console.log(taskContents);
// console.log(taskModal);

// Template for the card on screen
// element identifier key=${id} is been misssing on line 50th
/*htmlTaskContent is a function where we are adding input fields like id,title,desc,type,url
  htmlTaskcontent is a template for card that we see after adding details in +Add New Item button
  In order to not write multiple time we write one time only and we will make use of this template for n number of times
  After const htmlTaskContent the code is for that card which we saw on screen like delete button,edit button,image,title,type open task button and we get this contain on screen after filling that +Add New Item button form
  within card we header,body and footer.
  In header two buttons edit and delete button
  In body we have url as we know url is not mandatory one its optional one so we are just checking the condition if url really exists
  u can store the  url line thing from code if does not exists then just ignore it. 
  Apart from that we have title,type,description this means that we are calling elments within this element[h4]-i want title 
  same goes to [p] within this i want desc and how we got this title this is already present/passed as parameter in [htmlTaskContent].
  And how to access this particular parmater since it is js functionality and we are wroking with html you need to write dollar symbol
  followed by curly braces and you need to write the parameter inside curly braces 
  like this ${id},${title},${description,${type},4{url} etc.
  After all this from const htmlTaskContent to <div class='card-footer'> we got the dynamic template.
  In footer we have open task button where we need to create one more method that whenever i click on open task button 
  i want my next modal to triggered wheer i want all my details that has big image that one.
*/ 
const htmlTaskContent = ({ id, title, description, type, url }) => `
<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
    
      <div class='card-header d-flex justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-primary mr-1.5' name=${id}>
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
           <button type='button' class='btn btn-outline-danger mr-1.5' name=${id}>
              <i class='fas fa-trash-alt name=${id}'></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            /*url &&
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`*/

            url
            //if image is present then this below will execute 
            ? `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
            //if image is absent then this below will execute where i have taken default image
            : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='img-fluid place__holder__image mb-3' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
      </div>
    </div>
  </div>
`;

// Modal Body on >> Clk of Open Task
/*this method[htmlModalContent] is mainly build for the thing which u wanna see on this particular click when i click on something called 
open task i want something in this particulare body information means that another modal where image is in large screen.
so what exactly do i want thats nothing but this functionality const date = new Date(parseInt(id)); This one thats date nothing
But id we are assigning date as id  [<div id=${id}>]
and we have other functionality like image where we also want Created on as as new field
We want title and description as paramters thats it.
*/
const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
      /*url &&
      `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`*/
      url
      //if image is present then this below will execute 
      ? `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
      //if image is absent then this below will execute where i have taken default image
      : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='img-fluid place__holder__image mb-3' />`
    }
     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='text-muted'>${description}</p>
  </div>
  `;
};

// where we convert json > str (i.e., for local storage)
/* once we are  done with above now its time for localstorage:
Why exactly we need localStorage  u guys already know that the things which are available in this cards thats nothing but on UI 
i want a copy this same in mystorage
Be very partical whenever i say localstorage it can just be in your string dataype as value not anything but the datatype with this card is 
in json format so its your responsibilties to convert this value u know 
there is a method called setItem[localstorage.setItem] with help of this thing you can add some certains items to your localstorage and the key which i want is the "task"
and i ma saying  that the data is in JSON format i want it to convert back to stringify [JSON.stringify]
and where exctly the data will be present it will be present in your task list[tasks:state.taskList]
In short updatinng your local storage
*/
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

/* What exacyly it is meant by loadInitialData
so whenever i open my card ok lets say if i just go and even on reload my application we get some particular card there even my local storage is not refrec=sh its because of this below method
we doing here exactly reverse why revrese in order to see things on card it should be in JSON format not in a string format so we are converting back from string to JSON
const localStorageCopy = JSON.parse(localStorage.task);
And again we are jsut checking whenever we reload if u guys dont have anything
then there is no point in showing anything lets say if i deleted this particular items even tho on deleting the localstoage u can see they have the contents
on thescreen.
Observe properly guys  i deleted my local storage from console here u can;t see any key and value but still
on UI u are able to see paricula cards and go and reload it wwill vanished why because  in local storage we dont have anything hwo is this thing possible because of this condition
if (localStorageCopy) state.taskList = localStorageCopy.tasks;
if localStorgecopy is blank it should do nothing
if it is not blank then it should assign the things which are presnt in this particular string [loaclStorageCopy.tasks] back to  this particular 
[if (localStorageCopy) state.taskList] so those card are visible on screen 
how exactly we are mapping with this [ state.taskList.map((cardDate) => {
  taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));]
with the help of this particular map we are mapping for each and  every element prest on your localstorage on the sreen
--->localStorage is storage of broswer not your pc
WE ARE ACTUALALY CALLING THIS loadInitialData in body <body onload="loadInitialData()">

*/
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

// Spread Operator
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
/*[const handleSubmit = (event) => {]:
This thing should be called when you guys go and check we have handlesubmit in html 
it means that whenever i click on save changes i want a modal to be triggred and code for this modal is in [htmlTaskcontent] 
where we have the card template.
If you just wanna click this function save change i want the same function to be called that nothing but [htmlTaskContent]
for the same we have one function thats nothing but [handleSubmit] where we have an event on submit
which i want to be called here date is nothing but our unique id [const id = `${Date.now()}`;].
[const input] we are collecting some objects here where we have our url,type,title,desc.
After this we are saying insertAdjacentHTML()-Why we are using insertAdjacentHTML:In order to get cards side by side and position is 
beforeend.
[htmlTaskContent({ ...input, id })]this function is of card template and i am calling it here and i am passing input followed by id
i need to be update id because even on edit the id should change and we should have the uppdated id and once thing is build up 
its been populate with update date on UI and i want this similar to be stored in backup so this is my backup 
[state.taskList.push({ ...input, id });] 
and similarly i just want my data to be updated/stored on localStorge
[updateLocalStorage();]
*/
const handleSubmit = (event) => {
  // console.log("event triggerd");
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  //this condition means that it will not take empty or blank field it is required
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

