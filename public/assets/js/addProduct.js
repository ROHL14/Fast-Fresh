let cameraView, cameraOutput, cameraSensor;
let constraints;

constraints = { video: { facingMode: "user" }, audio: false };
/*{audio: true, video: { facingMode: { exact: "environment" } } }*/
/*{ video: { deviceId: myPreferredCameraDeviceId } }*/

cameraView = document.getElementById("camera--view");
cameraOutput = document.getElementById("camera--output");
cameraSensor = document.getElementById("camera--sensor");

window.addEventListener("load", cameraStart, false);

function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function(error) {
      console.error("Oops. Something is broken.", error);
    });
}

$("#camera--trigger").on("click", function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraSensor.style.display = "block";
  cameraView.style.display = "none";
});

$("#modal-btn").on("click", function() {
  cameraSensor.style.display = "none";
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }
});

$("#save-btn").on("click", function() {
  var img = document.createElement("img");
  img.src = cameraSensor.toDataURL("image/webp");
  img.classList.add("taken");
  if (cameraSensor.style.display === "block") {
    cameraSensor.style.display = "none";
  }
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }

  const newProduct = {
    name: $("#product-name").val(),
    price: $("#price").val(),
    price_per: $("#price-unity").val(),
    picture_url: img.src
  };

  const productValid = productsValidate(newProduct);
  if (productValid) {
    const productName = $("<p>" + newProduct.name + "</p>");
    const productPrice = $("<p>" + newProduct.price + "</p>");
    const productUnity = $("<p>" + newProduct.price_per + "</p>");
    const card = $("<div class='card'>");
    card.append(img, productName, productPrice, productUnity);
    $("#product-area").append(card);
  }
});

function validation(data) {}

/*function convertCanvasToImage(canvas) { 	var image = new Image(); 	image.src = canvas.toDataURL("image/png"); 	return image; }*/

$("#edit-info").on("click", function(event) {
  event.preventDefault();
  $(
    "#name, #password, #phone-number, #address, #zip-code, #city, #state, #account-number, #password-repeat"
  ).removeClass("remove-edit");
});

const farmer = {
  name: "Farmer 1",
  email: "farmer@gmail.com",
  password: "password",
  address: "a usa place",
  city: "San Diego",
  zip: "10803",
  state: "California",
  telephone: "1082448888",
  account_number: "111111111111"
};

window.onload = function() {
  $("#name").val(farmer.name);
  $("#email").val(farmer.email);
  $("#password").val(farmer.password);
  $("#address").val(farmer.address);
  $("#city").val(farmer.city);
  $("#zip-code").val(farmer.zip);
  $("#state").val(farmer.state);
  $("#phone-number").val(farmer.telephone);
  $("#account-number").val(farmer.account_number);
};

$("#save").on("click", function(event) {
  event.preventDefault();

  farmer.name = $("#name").val();
  farmer.email = $("#email").val();
  farmer.password = $("#password").val();
  farmer.address = $("#address").val();
  farmer.city = $("#city").val();
  farmer.zip = $("#zip-code").val();
  farmer.state = $("#state").val();
  farmer.telephone = $("#phone-number").val();
  farmer.account_number = $("#account-number").val();
  const dataValid = validate(farmer);
  if (dataValid) {
    $(
      "#name, #password, #phone-number, #address, #zip-code, #city, #state, #account-number, #password-repeat"
    ).addClass("remove-edit");
  }

  /*if (dataValid) {
    $.put("api/farmer", farmer, function(farmerData) {});
  }*/
});

function validate(data) {
  let valid = true;
  if (data.name == "") {
    valid = errorModal("Please enter the name");
    $("#name").focus();
    return valid;
  }
  if (data.password == "") {
    valid = errorModal("Please enter your password");
    $("#password").focus();
    return valid;
  } else if (data.password != $("#password-repeat").val()) {
    valid = errorModal("Please make your password match");
    $("#password-repeat").focus();
    return valid;
  }
  if (data.address == "") {
    valid = errorModal("Please enter the address");
    $("#address").focus();
    return valid;
  }
  if (data.city == "") {
    valid = errorModal("Please enter the city");
    $("#city").focus();
    return valid;
  }
  if (data.state == "") {
    valid = errorModal("Please enter the state");
    $("#state").focus();
    return valid;
  }
  const regeZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const rege = regeZip.test(data.zip);

  if (!rege) {
    valid = errorModal("Please enter a valid Zip Code");
    $("#zip").focus();
    return valid;
  }

  return valid;
}

function productsValidate(data) {
  let valid = true;
  if (data.name == "") {
    valid = errorModal("Please enter the name of the product");
    $("#name").focus();
    return valid;
  }
  if (data.price == "") {
    valid = errorModal("Please enter the price of the product");
    $("#price").focus();
    return valid;
  }

  return valid;
}

function errorModal(message) {
  $("#modal-error").text(message);
  $("#Modal-validation").modal("toggle");
  return false;
}
