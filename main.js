var saveBtn = document.querySelector('.top__btn--save');
var titleInput = document.querySelector('.top__input--title');
var bodyInput = document.querySelector('.top__textarea--body');
var display = document.querySelector('.card__section--bottom');
var titleCard = document.querySelector('.card__h2--title');
var bodyCard = document.querySelector('.card__p--body');
var ideaList = [];
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
  instantiateIdea({id: Date.now(), title: titleInput.value, body: bodyInput.value, star: false, quality: 0});
  clearInputs();
  console.log(localStorage);
  console.log(ideaList);
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function instantiateIdea(obj) {
  var ideaTitle = obj.title;
  var ideaBody = obj.body; 
  var ideaId = obj.id;
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false, quality: 0});
  ideaList.push(idea);
  idea.saveToStorage();
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
  var newWorkingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  newWorkingIdeas.map(function(object) {
    instantiateIdea(object);
  });
}

function deleteCard(e) {
  if (e.target.className === "delete") {
    var card = e.target.closest('.card');
    var cardId = e.target.closest('.card').getAttribute('data-id');
    card.remove();
    idea.deleteFromStorage(cardId);
  } 
}


//pull down array from local
//use find method to find object with id
//pull shorter array back into local 


//


//indexof 
