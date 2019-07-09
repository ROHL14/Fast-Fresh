const uuidv4 = require('uuid/v4');

const AWS = require('aws-sdk');

const BUCKET_NAME = "fnf2020"
const BUCKET_BASE_URL = `https://fnf2020.s3.us-east-2.amazonaws.com/${BUCKET_NAME}`;

// AWS S3
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-east-2'
});


function createProduct(newProduct) {

  const pictureName = uuidv4() + '-product';

  S3.putObject({
    Bucket: '${BUCKET_NAME}',
    Key: pictureName,
    Body: newProduct,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
    ContentDisposition: 'inline',
    ACL: 'public-read'
  }, (err, data) => {
    if (err) return reject(err);
    console.log(data);
    const productData = { pictureName, url: `${BUCKET_BASE_URL}/${pictureName}` }
    return (productData);
  });
}

function deleteProduct(oldProduct) {
  S3.deleteObject({
    Bucket: '${BUCKET_NAME}',
    Key: oldProduct
  }, err => {
    if (err) return reject(err);
  });
}

module.exports = createProduct;
module.exports = deleteProduct;
