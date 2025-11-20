var fromCurrency = document.getElementById("fromcurrency");
var toCurrency = document.getElementById("tocurrency");
var amountInput = document.getElementById("Amount");
var convertedInput = document.getElementById("Converted");

function convertCurrency() {
  var amount = parseFloat(amountInput.value);
  var from = fromCurrency.value;
  var to = toCurrency.value;

  if (!amount || from === to) {
    convertedInput.value = amount || "";
    return;
  }

  var url = `https://v6.exchangerate-api.com/v6/98d9abf200c1990fd5ca9286/latest/${from}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        var rate = data.conversion_rates[to];
        var convertedAmount = amount * rate;
        convertedInput.value = convertedAmount.toFixed(2);
      } else {
        convertedInput.value = "API error!";
      }
    })
    .catch(error => {
      console.log("Fetch error:", error);
      convertedInput.value = "Error!";
    });
}

amountInput.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);
