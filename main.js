var saveBtn = document.querySelector('.top__btn--save');
var titleInput = document.querySelector('.top__input--title');
var bodyInput = document.querySelector('.top__textarea--body');
var display = document.querySelector('.card__section--bottom');
var titleCard = document.querySelector('.card__h2--title');
var bodyCard = document.querySelector('.card__p--body');
var ideaList = [];

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);
saveBtn.addEventListener('click', handleSaveBtn);
display.addEventListener('click', deleteCard);
display.addEventListener('focusout', updateContent);
display.addEventListener('keydown', enterContent);
display.addEventListener('click', triggerStar);


saveBtn.disabled = true;
window.onload = function() {
  reloadCards();
}

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
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function instantiateIdea(obj) {
  var ideaTitle = obj.title;
  var ideaBody = obj.body; 
  var ideaId = obj.id;
  var ideaStar = obj.star
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: ideaStar, quality: 0});
  ideaList.push(idea);
  appendCard(idea);
}

function appendCard(object) {
  var starState = object.star ? 'star-active.svg' : 'star.svg';
  var ideaCard = `
  <article class="card" data-id="${object.id}">
        <header>
          <img src="images/${starState}" class="card__img--card card__img--star" id="card__img--star"> 
          <img src="images/delete.svg" class="delete">
        </header>
        <div class="card__main--card">
          <h2 class="card__h2--title card__text" contenteditable>${object.title}</h2>
          <p class="card__p--body card__text" contenteditable>${object.body}</p>
        </div>
        <footer>
          <img src="images/upvote.svg" class="card__img--card">
          <p class="card__footer--quality">Quality: <span class="card__span--quality">Swill</span></p>
          <img src="images/downvote.svg" class="card__img--card">
        </footer>
      </article>`
      ;  
  display.insertAdjacentHTML('afterbegin', ideaCard);
}

function reloadCards() {
  var newWorkingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  console.log(newWorkingIdeas)
  ideasList = newWorkingIdeas.map(function(object) {
    return instantiateIdea(object);
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

function enterContent(e) {
  if (e.keyCode === 13) {
    updateContent(e);
  }
}

function updateContent(e) {
  var cardToUpdate = e.target.closest('.card');
  var cardDataAttr = parseInt(cardToUpdate.dataset.id);
  var titleOutput = document.querySelector(`.card[data-id="${cardDataAttr}"] .card__h2--title`);
  var bodyOutput = document.querySelector(`.card[data-id="${cardDataAttr}"] .card__p--body`);
  var updatedTitle = titleOutput.innerText;
  var updatedBody = bodyOutput.innerText; 
  var blurredTitle = titleOutput.blur();
  var blurredBody = bodyOutput.blur();
  var index = findIndex(cardDataAttr);
  ideaList[index].updateIdea(updatedTitle, updatedBody, ideaList[index].star);
}

function findIndex(card) {
  var cardId = card;
  return ideaList.findIndex(function(item){
    return item.id === cardId;
  })
}

function findKey(e) {
  var cardId = e.target.closest('.card').getAttribute('data-id');
  return ideaList.findIndex(function(item) {
    return item.id === parseInt(cardId);
  });
}

function updateStar(e, id) {
  var starToUpdate = e.target;
  var activeStar = 'images/star-active.svg';
  var inactiveStar = 'images/star.svg';
  if (ideaList[id].star === true) {
    starToUpdate.src = activeStar;
  } else {
    starToUpdate.src = inactiveStar;
  }
}

function triggerStar(e) {
    if (e.target.id === 'card__img--star') {
      var index = findKey(e);
      ideaList[index].star = !ideaList[index].star;
      ideaList[index].updateIdea(ideaList[index].title, ideaList[index].body, ideaList[index].star);
      updateStar(e, index);
      console.log(ideaList)
    }
  }

