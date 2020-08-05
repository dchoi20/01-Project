let $dateSelected = $("#dateSelected");
let $dateBtn = $("#dateBtn");

$dateBtn.on("click", function () {
  let selectedDate = $dateSelected.val();
  console.log(selectedDate);
});

function renderStockPage(stockSelected) {
  window.location.href = `./stock.html?stock=${stockSelected}`;
}
