var saveBtn = document.querySelector('.save-btn');
var titleInput = document.querySelector('#section__form--title');
var bodyInput = document.querySelector('#section__form--body');
var display = document.querySelector('.section__display--bottom');
var titleCard = document.querySelector('.title__card--text');
var bodyCard = document.querySelector('.body__card--text');
var ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
var qualityCounter = 0;


saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);
saveBtn.addEventListener('click', handleSaveBtn);

reloadCards();

function enableBtn(event) {
  if (event !== "") {
    saveBtn.disabled = false;
  }
}

function handleSaveBtn(e) {
  e.preventDefault();
  instantiateIdea();
  appendCard(titleInput.value, bodyInput.value);
  console.log(localStorage);
  console.log(ideaList);
}

function instantiateIdea(){
  var ideaTitle = titleInput.value;
  var ideaBody = bodyInput.value;
  var ideaId = Date.now();
  var idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: false, quality: 0});
  ideaList.push(idea);
  idea.saveToStorage();
}

function appendCard(title, body) {
  var ideaCard = `
  <article class="card">
        <header>
          <img src="images/star.svg" height="20px" width="20px"> 
          <img src="images/delete.svg" height="20px" width="20px">
        </header>
        <div>
          <h2 class="title__card--text card-text">${title}</h2>
          <p class="body__card--text card-text">${body}</p>
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
  ideaList.map(function(idea, body) {
    // titleCard.innerText = idea.title
    console.log(idea.title); 
    appendCard(idea.title, idea.body);
  });
}
