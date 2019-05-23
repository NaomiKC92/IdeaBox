var saveBtn = document.querySelector('.save-btn');
var titleInput = document.querySelector('#section__form--title');
var bodyInput = document.querySelector('#section__form--body');
var display = document.querySelector('.section__display--bottom');
var ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
var qualityCounter = 0;


saveBtn.disabled = true;

titleInput.addEventListener ('keyup', enableBtn);
bodyInput.addEventListener ('keyup', enableBtn);

saveBtn.addEventListener('click', handleSaveBtn);

function enableBtn(event) {
  if (event !== "") {
    saveBtn.disabled = false;
  }
}

function handleSaveBtn(e) {
  e.preventDefault();
  instantiateIdea();
  appendCard();
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

function appendCard() {
  var ideaCard = `
  <article class="card">
        <header>
          <img src="images/star.svg" height="20px" width="20px"> 
          <img src="images/delete.svg" height="20px" width="20px">
        </header>
        <div>
          <h2 class="card-text">Idea Title</h2>
          <p class="card-text">Idea body. Your brilliant ideas go here!</p>
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
