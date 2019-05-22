var saveBtn = document.querySelector('.save-btn');
var titleInput = document.querySelector('#section__form--title');
var bodyInput = document.querySelector('#section__form--body');
var ideaList = [];
var qualityCounter = 0;


saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);

saveBtn.addEventListener('click', doSomething);


function doSomething(e){
  event.preventDefault();
  var ideaTitle = titleInput.value;
  var ideaBody = bodyInput.value;
  var ideaId = Date.now();
  var idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false});
  ideaList.push(idea);
  idea.saveToStorage();
 
}

function enableBtn(event) {
  if (event !== "") {
    saveBtn.disabled = false;
  }
}

