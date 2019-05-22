class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = false;
    this.quality = ['Swill', 'Plausible', 'Genius'];

  }

  saveToStorage() {
    var stringObj = JSON.stringify(this);
    console.log(stringObj);


  // localStorage.setItem('id', ideaId);
  // localStorage.setItem('title', ideaTitle);
  // localStorage.setItem('body', ideaBody);

  }

  deleteFromStorage() {

  }

  updateIdea(param, maybe2) {

  }

  updateQuality() {

  }
}


