var saveBtn = document.querySelector('.top__btn--save');
var titleInput = document.querySelector('.top__input--title');
var bodyInput = document.querySelector('.top__textarea--body');
var display = document.querySelector('.card__section--bottom');
var titleCard = document.querySelector('.card__h2--title');
var bodyCard = document.querySelector('.card__p--body');
var noIdea = document.querySelector('.card__div--statement');
var ideaList = [];
var qualityList = ["Swill", "Plausible", "Genius"];
var searchBar = document.querySelector('#search-input');
var allCards = document.querySelectorAll('.card');
var menuBtn = document.querySelector('.nav__img--hamburger');
var menuX = document.querySelector('.nav__img--close');

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);
saveBtn.addEventListener('click', handleSaveBtn);
// display.addEventListener('click', deleteCard);
display.addEventListener('click', listenForClick);
display.addEventListener('focusout', updateContent);
searchBar.addEventListener('keyup', searchThru);
display.addEventListener('keydown', enterContent);
display.addEventListener('click', triggerStar);
menuBtn.addEventListener('click', displayNavMenu);
menuX.addEventListener('click', displayNavMenu)

saveBtn.disabled = true;

window.onload = function() {
  reloadCards();
}

function displayNavMenu(e) {
  var mobileNav = document.querySelector('.nav__form--mobile');
  if (e.target === menuBtn) {
    menuBtn.classList.add('hidden');
    menuX.classList.remove('hidden');
    mobileNav.classList.remove('hidden');
  }
  if (e.target === menuX) {
    menuX.classList.add('hidden');
    menuBtn.classList.remove('hidden');
    mobileNav.classList.add('hidden');
  }

}

function listenForClick(e) {
  if (e.target.id === "card__img--upvote" || "card__img--downvote") {
    upvote(e) 
  }  
  if (e.target.className === "delete") {
    deleteCard(e)
  }
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
  var ideaQuality = obj.quality;
  //could be obj below
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: ideaStar, quality: ideaQuality});
  ideaList.push(idea);
  idea.saveToStorage(ideaList);
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
          <img src="images/upvote.svg" class="card__img--card" id="card__img--upvote">
          <p class="card__footer--quality">Quality: <span class="card__span--quality">${qualityList[object.quality]}</span></p>
          <img src="images/downvote.svg" class="card__img--card" id="card__img--downvote">
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
  if (e.target.className === 'delete') {
    var card = e.target.closest('.card');
    var cardId = e.target.closest('.card').getAttribute('data-id');
    card.remove();
    idea.deleteFromStorage(cardId);
  } 
  hideIdeaCue();
}

function upvote(e) {
   var cardToUpdate = e.target.closest('.card');
   var cardDataAttr = parseInt(cardToUpdate.dataset.id);
   var ideaListIndex = findIndex(cardDataAttr);
   var cardQuality = ideaList[ideaListIndex].quality;
  if (e.target.id === 'card__img--upvote') {
   cardQuality = Math.min(cardQuality + 1, qualityList.length - 1)
  } else if (e.target.id === "card__img--downvote") {
   cardQuality = Math.max(cardQuality - 1, 0)
  }
   ideaList[ideaListIndex].updateQuality(cardQuality);
   updateQualityDisplay(cardToUpdate, cardQuality);
}

 // function downvote() {
 //   var cardToUpdate = e.target.closest('.card');
 //   var cardDataAttr = parseInt(cardToUpdate.dataset.id);
 //   var ideaListIndex = findIndex(cardDataAttr);
 //   var cardQuality = ideaList[ideaListIndex].quality;
 //   ideaList[ideaListIndex].updateQuality(cardQuality);
 //   updateQualityDisplay(cardToUpdate, cardQuality);
 // }
// }

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

// function searchThru() {
//   var searchInput = searchBar.value;
//   var searchList = ideaList;
// }

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
    }
  }

function searchThru(e) {
  var searchInput = e.target.value.toLowerCase();
  var results = ideaList.filter(function(idea){
    return idea.title.toLowerCase().includes(searchInput) || idea.body.toLowerCase().includes(searchInput);  
  });
  console.log(results)
  display.innerHTML = '';
  results.map(function(idea){
    appendCard(idea)
  });
}


