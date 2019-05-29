class Idea {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star || false;
    this.quality = obj.quality;
  }

  saveToStorage(globalArray) {
    localStorage.setItem('ideas', JSON.stringify(globalArray));
  }

  deleteFromStorage(cardId) {
    var newIdeaList = ideaList.filter(function(item) {
      return item.id !== parseInt(cardId);
    });
    ideaList = newIdeaList;
    this.saveToStorage(ideaList);
  }

  updateIdea(title, body, star) {
      this.title = title;
      this.body = body;
      this.star = star;
      this.saveToStorage(ideaList);
  }

  updateQuality(quality) {
    this.quality = quality;
    this.saveToStorage(ideaList);
  }
}


//rename findindex function to findIdeaIndex
//change id of up/downvote to class
//change class of delete
//consistency with e and event 
//is cardqualitydisplay doing anything?

//triggerstar updateIdea to see if we can get this.quality=quality