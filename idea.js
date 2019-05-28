class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body
    this.star = obj.star;
    this.quality = obj.quality;

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

  updateIdea(title, body, star) {
    console.log('killer')
      this.title = title;
      this.body = body;
      this.star = star;
      this.saveToStorage();
  }

  // updateStar(star) {
  //   this.star = !this.star;
  //   this.saveToStorage();
  // }

  updateQuality(quality) {
    this.quality = quality;
    this.saveToStorage();
  }
}


//rename findindex function to findIdeaIndex