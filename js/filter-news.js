var filterByOrder = (function() {
  orderSelected.addEventListener('change', _changeOrder);
  function _changeOrder() {
    if (newsArr.length > 0) {
      renderResultsCards(categorySelected.value, orderSelected.value, resultCards);
    }
  }
})();

var filterByCategory = (function() {
  categorySelected.addEventListener('change', _changeCategory);
  function _changeCategory() {
    if (newsArr.length > 0) {
      renderResultsCards(categorySelected.value, orderSelected.value, resultCards);
    }
  }
})();
