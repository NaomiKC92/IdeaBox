var saveBtn = document.querySelector('.top__btn--save');
var titleInput = document.querySelector('.top__input--title');
var bodyInput = document.querySelector('.top__textarea--body');
var display = document.querySelector('.card__section--bottom');
var titleCard = document.querySelector('.card__h2--title');
var bodyCard = document.querySelector('.card__p--body');
var noIdea = document.querySelector('.card__div--statement');
// var upvote = document.querySelector('.')
var ideaList = [];
// var qualityCounter = 0;
var qualityList = ["Swill", "Plausible", "Genius"]

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);
saveBtn.addEventListener('click', handleSaveBtn);
display.addEventListener('click', deleteCard);
display.addEventListener('click', upvote);
display.addEventListener('focusout', updateContent);
// display.addEventListener('click', updateStar);

saveBtn.disabled = true;

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
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function instantiateIdea(obj) {
  var ideaTitle = obj.title;
  var ideaBody = obj.body; 
  var ideaId = obj.id;
  var ideaQuality = obj.quality;
  var ideaStar = obj.star;
  //could be obj below
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: ideaStar, quality: ideaQuality});
  ideaList.push(idea);
  idea.saveToStorage();
  appendCard(idea);
}

function appendCard(object) {
  ideaCard = `
  <article class="card" data-id="${object.id}">
        <header>
          <img src="images/star.svg" class="card__img--card" id="card__img--star"> 
          <img src="images/delete.svg" class="delete">
        </header>
        <div class="card__main--card">
          <h2 class="card__h2--title card__text" contenteditable>${object.title}</h2>
          <p class="card__p--body card__text" contenteditable>${object.body}</p>
        </div>
        <footer>
          <img src="images/upvote.svg" class="card__img--card" id="card__img--upvote">
          <p class="card__footer--quality">Quality: <span class="card__span--quality">${qualityList[object.quality]}</span></p>
          <img src="images/downvote.svg" class="card__img--card">
        </footer>
      </article>`
      ;  
  display.insertAdjacentHTML('afterbegin', ideaCard);
  hideIdeaCue();
}

function reloadCards() {
  var newWorkingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  newWorkingIdeas.map(function(object) {
    instantiateIdea(object);
  });
  hideIdeaCue();
}

function deleteCard(e) {
  if (e.target.className === "delete") {
    var card = e.target.closest('.card');
    var cardId = e.target.closest('.card').getAttribute('data-id');
    card.remove();
    idea.deleteFromStorage(cardId);
  } 
  hideIdeaCue();
}

function updateContent(e) {
  var cardToUpdate = e.target.closest('.card');
  var cardDataAttr = parseInt(cardToUpdate.dataset.id);
  var updatedTitle = document.querySelector(`.card[data-id="${cardDataAttr}"] .card__h2--title`).innerText;
  var updatedBody = document.querySelector(`.card[data-id="${cardDataAttr}"] .card__p--body`).innerText; 
  var index = findIndex(cardDataAttr);
  ideaList[index].updateIdea(updatedTitle, updatedBody);
}

//when the user clicks 
//jump up one in the array of qualities
//perhaps via a quality counter
//new quality to appear that is affiliated with the same quality index
//i want it reflected in localStorage


function upvote(e) {
  if (e.target.id === "card__img--upvote") {
    var cardToUpdate = e.target.closest('.card');
    var cardDataAttr = parseInt(cardToUpdate.dataset.id);
    var ideaListIndex = findIndex(cardDataAttr);
    var cardQuality = ideaList[ideaListIndex].quality;
    // var qualityIndex = findQualityIndex(cardQuality);
    cardQuality++;
    ideaList[ideaListIndex].updateQuality(cardQuality);
    updateQualityDisplay(cardToUpdate, cardQuality);
  }
}

// function updateStar(e) {
//   var cardToUpdate = e.target.closest('.card');
//   var cardDataAttr = parseInt(cardToUpdate.dataset.id);
//   var star = document.querySelector(`.card[data-id="${cardDataAttr}"] .card__img--card`).src;
//   if (star.indexOf('star.svg') != -1) {
//     document.getElementById('card__img--star').src = 'images/star-active.svg';
//   } else {
//     document.getElementById('card__img--star').src  = 'images/star.svg';
//   }
//   console.log(star.src);
//   // starre.classList.add('.goldStar')
//   var index = findIndex(cardDataAttr);
//   ideaList[index].updateStar(star);
// }

function findIndex(card) {
  var cardId = card;
  return ideaList.findIndex(function(item){
    return item.id === cardId;
  })
}


function updateQualityDisplay(card, quality) {
  card.querySelector('.card__span--quality').innerHTML = qualityList[quality];
 }

function hideIdeaCue() {
  if (ideaList.length > 0) {
    noIdea.classList.add("hidden");
  }

  if (ideaList < 1) {
    noIdea.classList.remove("hidden")
  }
}

// function showIdeaCue() {
//   noIdea.classList.remove("hidden");
// }
