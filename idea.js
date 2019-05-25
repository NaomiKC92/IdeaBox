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

  deleteFromStorage(cardId) {
    console.log(ideaList)
    var newIdeaList = ideaList.filter(function(item) {
      return item.id !== parseInt(cardId);
    });
    
    ideaList = newIdeaList;
    this.saveToStorage();
  }

  updateIdea(param, maybe2) {

  }

  updateQuality() {

  }
}
