var searchNews = (function() {
  // Cache the DOM
  var submitBtn        = document.querySelector('.search-bar__submit-btn');
  var inputForm        = document.querySelector('.search-bar__input-form');
  var categorySelected = document.querySelector('.search-bar__select');
  var newsList         = document.querySelector('.result-cards__wrapper');
  // Hosted JSON URL
  var URL = 'https://gist.githubusercontent.com/Errec/ed44de4fdac5916cb45c2ca89f5524af/raw/519a4a3ca8213da9047312a3842a8e23640d6955/news.json';
  // Add the event listeners
  submitBtn.addEventListener('click', function (e) {
    return _newSearch(e, inputForm.value, categorySelected.value);
  });

  function _newSearch(event, term, category) {
    event.preventDefault();
    if(term) { // if the input search term is not a blank one
      newsArr = []; // reset previous search cache
      _removeAllCards(); // clear the card list to render a new one
      requestData(URL, "GET").then(function(data) {
        return _renderNewsData(data, term, category);
      }, errorHandler);
    }
  }

  function _removeAllCards() {
      while (newsList.hasChildNodes()) {
      newsList.removeChild(newsList.lastChild);
    }
  }

  function _renderNewsData(data, term, category) {
    _storeResults(data, term);
    // _renderCategorySelector();
    // _renderResultsCount();
    // _renderResultsCards();
  }

  // This function will check for NULL values on both descricao and titulo values to avoid match(regex) error
  function _storeResults(data, term) {
    var regex = new RegExp(term, 'gi');
    data.forEach(function(news) {
      if(!news.titulo) {
        if(news.descricao && news.descricao.match(regex)) {
          newsArr.push(news);
        }
      } else if(!news.descricao) {
        if(news.titulo && news.titulo.match(regex)) {
          newsArr.push(news);
        }
      } else if(news.titulo.match(regex) || news.descricao.match(regex)) {
        newsArr.push(news);
      }
    });
  }
})();
