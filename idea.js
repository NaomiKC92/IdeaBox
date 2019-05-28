class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star || false;
    this.quality = 0;

  }

  saveToStorage(globalArray) {
    localStorage.setItem('ideas', JSON.stringify(globalArray));
  }

  deleteFromStorage(cardId) {
    var newIdeaList = ideaList.filter(function(item) {
      return item.id !== parseInt(cardId);
    });
    ideaList = newIdeaList;
    this.saveToStorage();
  }

  updateIdea(title, body, star) {
      this.title = title;
      this.body = body;
      this.star = star;
      this.saveToStorage(ideaList);
  }

  updateQuality() {

  }
}
