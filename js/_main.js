// Cache the DOM
var resultCards          = document.querySelector('.result-cards__wrapper');
var categorySelected     = document.querySelector('.search-bar__select');
var orderSelected        = document.querySelector('.order-by__select');

var newsArr = []; // Global arr variable to hold the json data cache

function requestData(url, methodType){
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
         if(xhr.status === 200){
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          resolve(respJson);
         } else{
            reject(xhr.status);
            console.log("xhr failed");
           }
      } else{
         console.log("xhr processing going on");
         }
    };
  });
  return promise;
}

function errorHandler(statusCode){
  alert("Falha no servidor: status " + statusCode +  "\nTente novamente mais tarde.");
}

function renderResultsCards(category, order, resultCards) {
  var resultsToShow = [];
  var cardsHTML = '';

  if (category === 'Todas') {
    resultsToShow = newsArr;
  } else {
      resultsToShow = newsArr.filter(function(article) {
        return article.categoria === category;
      });
  }

  if (resultsToShow.length > 0) {
    resultsToShow.forEach(function(article) {
      order === 'old' ?
        cardsHTML = _getCard(article.imagem, article.titulo, article.descricao, article.hora, article.data) + cardsHTML :
        cardsHTML += _getCard(article.imagem, article.titulo, article.descricao, article.hora, article.data);
    });
    resultCards.innerHTML = cardsHTML;
  }

  function _getCard(imgURL, titleText, lideText, hour, day) {
    imgURL = imgURL || '';
    titleText = titleText || '';
    lideText = lideText || '';
    hour = hour || '';
    hour = hour || '';

    var noPictureClass = '';
    imgURL === '' ? noPictureClass = 'no-picture' : '';

    return '<div class="result-cards__card ' + noPictureClass + '"><div class="result-cards__thumbnail-wrapper"><img class="result-cards__thumbnail" src="' + imgURL +'"></div><div class="result-cards__text-wrapper"><h2 class="result-cards__title">'+ titleText + '</h2><p class="result-cards__lide">'+ lideText + '</p><p class="result-cards__publish-time">'+ (hour + ' - ' + day) + '</p></div></div>';
  }
}
