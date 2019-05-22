class Idea {
  constructor (id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.star = false;
    this.quality = ['Swill', 'Plausible', 'Genius'];
  }

  saveToStorage() {



  localStorage.setItem('id', ideaId);
  localStorage.setItem('title', ideaTitle);
  localStorage.setItem('body', ideaBody);

  }

  deleteFromStorage() {

  }

  updateIdea(param, maybe2) {

  }

  updateQuality() {

  }
}


