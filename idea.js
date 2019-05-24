class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = false;
    this.quality = 0;

  }

  saveToStorage() {    
    console.log('this is your idea list', ideaList)                    
    localStorage.setItem('ideas', JSON.stringify(ideaList));

  }

  deleteFromStorage() {
    console.log('maybe')
  }

  updateIdea(param, maybe2) {

  }

  updateQuality() {

  }
}
