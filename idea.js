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
    localStorage.setItem(this.id, stringObj);
    console.log(localStorage);
  }

  deleteFromStorage() {

  }

  updateIdea(param, maybe2) {

  }

  updateQuality() {

  }
}


