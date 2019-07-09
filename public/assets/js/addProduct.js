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
    name: $("#name").val(),
    price: $("#price").val(),
    price_per: $("#price-unity").val(),
    picture_url: img.src
  };

  console.log(newProduct);
  const productName = $("<p>" + newProduct.name + "</p>");
  const productPrice = $("<p>" + newProduct.price + "</p>");
  const productUnity = $("<p>" + newProduct.price_per + "</p>");
  const card = $("<div class='card'>");

  card.append(img, productName, productPrice, productUnity);
  console.log(card);

  $(".products-list").append(card);
});

function validation(data) {}

/*function convertCanvasToImage(canvas) { 	var image = new Image(); 	image.src = canvas.toDataURL("image/png"); 	return image; }*/
