var filterByOrder = (function() {
  orderSelected.addEventListener('change', _changeOrder);
  function _changeOrder() {
    if (newsArr.length > 1) {
      renderResultsCards(categorySelected.value, orderSelected.value, resultCards);
    }
  }
})();

var filterByCategory = (function() {
  categorySelected.addEventListener('change', _changeCategory);
  function _changeCategory() {
    if (newsArr.length > 0) {
      console.log('ggg')
      renderResultsCards(categorySelected.value, orderSelected.value, resultCards);
    }
  }
})();
