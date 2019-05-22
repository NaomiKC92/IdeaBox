var saveBtn = document.querySelector('.save-btn');
var titleInput = document.querySelector('#section__form--title');
var bodyInput = document.querySelector('#section__form--body');
var ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
var qualityCounter = 0;


saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);

saveBtn.addEventListener('click', instantiateIdea);

function enableBtn(event) {
  if (event !== "") {
    saveBtn.disabled = false;
  }
}

function instantiateIdea(e){
  e.preventDefault();
  var ideaTitle = titleInput.value;
  var ideaBody = bodyInput.value;
  var ideaId = Date.now();
  var idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false, quality: 0});
  ideaList.push(idea);
  idea.saveToStorage();
 
}
