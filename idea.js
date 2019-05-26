class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = false;
    this.quality = 0;

  }

  saveToStorage() {
    localStorage.setItem('ideas', JSON.stringify(ideaList));

  }

  deleteFromStorage(cardId) {
    var newIdeaList = ideaList.filter(function(item) {
      return item.id !== parseInt(cardId);
    });
    ideaList = newIdeaList;
    this.saveToStorage();
  }

  updateIdea(title, body) {
      this.title = title;
      this.body = body;
      this.saveToStorage();
  }

  updateQuality() {

  }
}
