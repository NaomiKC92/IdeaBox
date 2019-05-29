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
    this.saveToStorage();
  }

  updateIdea(title, body, star) {
      this.title = title;
      this.body = body;
      this.star = star;
      this.saveToStorage(ideaList);
  }

  updateQuality(quality) {
    this.quality = quality;
    this.saveToStorage();
  }
}


function searchThru(e) {
  var searchInput = e.target.value.toLowerCase();
  var results = ideaList.filter(function(idea){
    return idea.title.toLowerCase().includes(searchInput) || idea.body.toLowerCase().includes(searchInput);  
  });
  document.querySelector(".card").innerHTML = '';
  results.map(function(idea){
    appendCard(idea)
  });
};

// function filterSearchTerms (e) {
//     var searchText = e.target.value.toLowerCase();
//     var results = storageArray.filter(function(idea){
//         return idea.title.toLowerCase().includes(searchText) || idea.body.toLowerCase().includes(searchText);
//     })
//     document.querySelector(".card-field").innerHTML = '';
//     results.forEach(function(idea){
//       createCard(idea);
//     })
// };


//rename findindex function to findIdeaIndex