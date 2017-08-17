var searchNews = (function() {
  // Cache the DOM
  var submitBtn            = document.querySelector('.search-bar__submit-btn');
  var inputForm            = document.querySelector('.search-bar__input-form');
  var categoryOptionNews   = document.querySelector('.search-bar__option-news');
  var categoryOptionPhotos = document.querySelector('.search-bar__option-photos');
  var newsList             = document.querySelector('.result-cards__wrapper');
  var resultText           = document.querySelector('.results-count__text');
  // Hosted JSON URL
  var URL = 'https://gist.githubusercontent.com/Errec/ed44de4fdac5916cb45c2ca89f5524af/raw/519a4a3ca8213da9047312a3842a8e23640d6955/news.json';
  // Add the event listeners
  submitBtn.addEventListener('click', function(e) {
    return _newSearch(e, inputForm.value, categorySelected.value, orderSelected.value);
  });

  function _newSearch(event, term, category, order) {
    event.preventDefault();
    if(term) { // if the input search term is not a blank one
      newsArr = []; // reset previous search cache
      _removeAllCards(); // clear the card list to render a new one
      requestData(URL, "GET").then(function(data) {
        return _renderNewsData(data, term, category, order);
      }, errorHandler);
    }
  }

  function _removeAllCards() {
      while (newsList.hasChildNodes()) {
      newsList.removeChild(newsList.lastChild);
    }
  }

  function _renderNewsData(data, term, category, order) {
    _storeResults(data, term);
    _renderCategorySelector();
    _renderResultsCount(term);
    renderResultsCards(category, order, resultCards);
  }

  // This function will check for NULL values on both descricao and titulo values to avoid match(regex) error
  function _storeResults(data, term) {
    var regex = new RegExp(term, 'gi');
    data.forEach(function(article) {
      if(!article.titulo) {
        if(article.descricao && article.descricao.match(regex)) {
          newsArr.push(article);
        }
      } else if(!article.descricao) {
        if(article.titulo && article.titulo.match(regex)) {
          newsArr.push(article);
        }
      } else if(article.titulo.match(regex) || article.descricao.match(regex)) {
        newsArr.push(article);
      }
    });
  }

  function _renderCategorySelector() {
    var newsCount = 0, phothosCount = 0;
    newsArr.forEach(function(article) {
      article.categoria === 'Notícia' ?  newsCount++ : phothosCount++;
    });
    categoryOptionNews.textContent = 'Notícias(' + newsCount + ')';
    categoryOptionPhotos.textContent = 'Fotos(' + phothosCount + ')';
  }

  function _renderResultsCount(term) {
    resultsCount = newsArr.length;
    if(resultsCount === 1) {
      resultText.textContent = '1 resultado para ' + '"' + term + '"';
    } else if(resultsCount > 1) {
      resultText.textContent = resultsCount + ' resultados para ' + '"' + term + '"';
    } else{
      resultText.textContent = 'Nenhum resultado para ' + '"' + term + '"';
    }
  }
})();
