const order = {
  product_1: {
    name: "Potatoes",
    price: "0.30",
    price_per: "c/u"
  },
  product_2: {
    name: "Potatoes",
    price: "0.30",
    price_per: "c/u"
  },
  product_3: {
    name: "Tomatoes",
    price: "0.25",
    price_per: "c/u"
  },
  product_4: {
    name: "Grapes",
    price: "2.00",
    price_per: "lb"
  },
  product_5: {
    name: "Beef meat",
    price: "3.00",
    price_per: "lb"
  },
  product_6: {
    name: "Pork",
    price: "2.50",
    price_per: "lb"
  },
  product_7: {
    name: "Chicken breast",
    price: "1.50",
    price_per: "lb"
  }
};

window.onload = function() {
  let total = 0;
  Object.keys(order).forEach(function(e) {
    const row = $("<div class='row product'>").append(
      `<div class="col-6"><h5 class="card-text">${
        order[e].name
      }</h5></div><div class="col-6"><h5 class="card-text">$${
        order[e].price
      }</h5></div>`
    );

    total = total + parseFloat(order[e].price);

    $("#product-section").append(row);
  });
  let taxes = total * 0.0625;
  let backFee = total * 0.03;
  total = total + taxes + backFee;
  $("#taxes").append(`<h4 class="card-text">$${taxes.toFixed(2)}</h4>`);
  $("#back-fee").append(`<h4 class="card-text">$${backFee.toFixed(2)}</h4>`);
  $("#total-price").append(`<h3 class="card-text">$${total.toFixed(2)}</h3>`);
};
