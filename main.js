var saveBtn = document.querySelector('.top__btn--save');
var titleInput = document.querySelector('.top__input--title');
var bodyInput = document.querySelector('.top__textarea--body');
var display = document.querySelector('.card__section--bottom');
var titleCard = document.querySelector('.card__h2--title');
var bodyCard = document.querySelector('.card__p--body');
var ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
// var qualityCounter = 0;

saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);
saveBtn.addEventListener('click', handleSaveBtn);
display.addEventListener('click', deleteCard);

reloadCards();

function enableBtn(event) {
  if (this.value !== '') {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
}

function handleSaveBtn(e) {
  e.preventDefault();
  instantiateIdea();
  clearInputs();
  console.log(localStorage);
  console.log(ideaList);
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function instantiateIdea() {
  var ideaTitle = titleInput.value;
  var ideaBody = bodyInput.value;
  var ideaId = Date.now();
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false, quality: 0});
  console.log(localStorage)
  ideaList.push(idea);
  idea.saveToStorage();
  console.log(ideaList)
  appendCard(idea);
}

function appendCard(object) {
  ideaCard = `
  <article class="card" data-id="${object.id}">
        <header>
          <img src="images/star.svg" height="20px" width="20px"> 
          <img src="images/delete.svg" height="20px" width="20px" class="delete">
        </header>
        <div>
          <h2 class="card__h2--title card__text">${object.title}</h2>
          <p class="card__p--body card__text">${object.body}</p>
        </div>
        <footer>
          <img src="images/upvote.svg" height="20px" width="20px">
          <p>Quality: <span>Swill</span></p>
          <img src="images/downvote.svg" height="20px" width="20px">
        </footer>
      </article>`
      ;  
  display.insertAdjacentHTML('afterbegin', ideaCard);
}

function reloadCards() {
  ideaList.map(function(object) {
    appendCard(object);
  });
}

function deleteCard(e) {
  if (e.target.className === "delete") {
    e.target.closest('.card').remove();
    var ideaTitle = titleInput.value;
    var ideaBody = bodyInput.value;
    var ideaId = Date.now();
    idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false, quality: 0});
    idea.deleteFromStorage();
    // dltFromStorage();
  } 
}

function dltFromStorage() {
  console.log(localStorage)
  var parseList = JSON.parse(localStorage.getItem('ideas'));
  console.log(parseList);
  parseList.find(function(object){
    console.log(object.id);
    if (object.id){

    }
  });
  localStorage.getItem()
}



//pull down array from local
//use find method to find object with id
//pull shorter array back into local 


//


//indexof 
