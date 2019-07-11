const sellers = {
  farmer_1: {
    id: 1,
    name: "Juan",
    bussines_name: "La Granje",
    products: {
      product_1: {
        name: "potatoes",
        price: "$0.30",
        price_per: "c/u"
      },
      product_2: {
        name: "tomatoes",
        price: "$0.25",
        price_per: "c/u"
      },
      product_3: {
        name: "grapes",
        price: "$2.00",
        price_per: "lb"
      }
    }
  },
  farmer_2: {
    id: 2,
    name: "Pablo",
    bussines_name: "The Butcher",
    products: {
      product_1: {
        name: "beef meat",
        price: "$3.00",
        price_per: "lb"
      },
      product_2: {
        name: "pork",
        price: "$2.50",
        price_per: "lb"
      },
      product_3: {
        name: "Chicken breast",
        price: "$1.50",
        price_per: "lb"
      }
    }
  }
};

window.onload = function() {
  Object.keys(sellers).forEach(function(e) {
    const farmer = sellers[e];
    const id = $("<th>").text(farmer.id);
    const name = $("<td>").text(farmer.name);
    const bussines = $("<td>").text(farmer.bussines_name);
    const search = $(
      "<td><a id ='" +
        farmer.id +
        "' class='search' href=''><i class='fas fa-search'></i></a></td>"
    );
    const tr = $("<tr>").append(id, name, bussines, search);
    $("#sellers-info").append(tr);
  });
};

$("#sellers-info").on("click", ".search", function(event) {
  event.preventDefault();
  $("#products-area").html("");

  const searchId = this.id;

  Object.keys(sellers).forEach(function(e) {
    const farmer = sellers[e];

    if (farmer.id == searchId) {
      const products = farmer.products;

      Object.keys(products).forEach(function(e) {
        console.log(products[e]);

        const productName = $("<p>" + products[e].name + "</p>");
        const productPrice = $("<p>" + products[e].price + "</p>");
        const productUnity = $("<p>" + products[e].price_per + "</p>");
        const addBtn = $(
          "<button id='add-car'><i class='fas fa-shopping-cart'></i></button>"
        );
        const card = $("<div class='card'>");
        card.append(productName, productPrice, productUnity, addBtn);
        $("#products-area").append(card);
      });
    }
  });
});
