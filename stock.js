// API KEY
// AIOFXIT69F29K1ID

function stockSearch() {
  let stockName = $("#stockInput").val();

  let queryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    stockName +
    "&apikey=AIOFXIT69F29K1ID";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(`<p>${response["Meta Data"]["2. Symbol"]}</p>`).appendTo("#stockInfo");
  });
}

$("#stockInputBtn").on("click", function () {
  event.preventDefault();
  stockSearch();
});

//--------- TODAYS DATE --------------------
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
console.log(mm);
let todayDate = yyyy + "-" + "0" + mm + "-" + "0" + dd;
console.log(todayDate);
// ---------------------------------------------------------

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=AIOFXIT69F29K1ID

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=AIOFXIT69F29K1ID

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=AIOFXIT69F29K1ID

function searchSymbol() {
  let searchSymbol = $("#stockInput").val();

  let queryURL =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
    searchSymbol +
    "&apikey=AIOFXIT69F29K1ID";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.bestMatches.length);
  });
}

$("#stockInputBtn").on("click", function () {
  event.preventDefault();
  searchSymbol();
});
