var saveBtn = document.querySelector('.save-btn');
var titleInput = document.querySelector('#section__form--title');
var bodyInput = document.querySelector('#section__form--body');
var ideaList = [];

var idea = new Idea()

saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);

saveBtn.addEventListener('click', doSomething);


function doSomething(e){
  event.preventDefault();
  var ideaTitle = JSON.stringify(titleInput.value);
  var ideaBody = JSON.stringify(bodyInput.value);
  var ideaId = Date.now();
  var idea = new Idea(ideaId, ideaTitle, ideaBody)
  console.log(idea)
  // localStorage.setItem('id', ideaId);
  // localStorage.setItem('title', ideaTitle);
  // localStorage.setItem('body', ideaBody);

  console.log(localStorage)
}

function enableBtn(event) {
  if (event !== "") {
    saveBtn.disabled = false;
  }
}

