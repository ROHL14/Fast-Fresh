$("#search-market").on("click", function(event) {
  event.preventDefault();
  const zipMarket = $("#zip-market").val();
  getResults(zipMarket);
});
function getResults(zip) {
  // or
  // function getResults(lat, lng) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    // submit a get request to the restful service zipSearch or locSearch.
    url:
      "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" +
      zip,
    // or
    // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
    dataType: "jsonp"
  }).then(function(searchResults) {
    searchResults.results.forEach(element => {
      getDetails(element.id);
    });
    $("#Modal").modal("toggle");
  });
}

function getDetails(id) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    // submit a get request to the restful service mktDetail.
    url:
      "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" +
      id,
    dataType: "jsonp"
  }).then(function(detailresults) {
    const selectMarket = $("#market-table");
    selectMarket.append(`<tr class="market-row" id="${id}-row">
        <td id="${id}-address">${detailresults.marketdetails.Address}</td>
        <td id="${id}-schedule">${detailresults.marketdetails.Schedule}</td>
        <td id="${id}-products">${detailresults.marketdetails.Products}</td>
        <td><button class= "btn btn-link save-market" type="submit" id="${id}">Add to Favorite</button></td>
      </tr>`);
  });
}
$("#market-table").on("click", ".save-market", function(event) {
  event.preventDefault();
  const id = $(this).attr("id");
  const address = $(`#${id}-address`).text();
  const schedule = $(`#${id}-schedule`).text();
  const products = $(`#${id}-products`).text();

  const data = { id, products, address, schedule };

  $.post("/api/market", data, function(results) {
    if (results.success) {
      $("#market-list").append(
        `<a href="/customer-product/${results.id}" class="dropdown-item>${
          results.address
        }, ${results.schedule}, ${results.products}</a>`
      );
      //$(`#${results.id}-row`).remove();
      $(this).hide();
      window.location.href = "/";
    } else {
      console.log(results.error);
    }
  });
});
