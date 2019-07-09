const router = require("express").Router();
const db = require("../models");
const productImages = require("./apiProductImages");

//create new record for market
router.post("/api/market/", (req, res) => {
    db.Market.create(req.body).then((market) => {
        res.json({ succes: true, market });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

//create new record for farmer
router.post("/api/farmer", (req, res) => {
    db.Farmer.create(req.body).then((farmer) => {
        res.json({ succes: true, farmer });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

router.post("/api/product", (req, res) => {
    productImages.savePicture(req.body.file).then(response => {
        db.Product.create(
            {
                name: req.body.name,
                price: req.body.price,
                price_per: req.body.price_per,
                picture_name: response.fileName,
                picture_url: response.url,
                farmerId: req.body.farmerId
            }
        ).then((product) => {
            res.json({ succes: true, product });
        }).catch(err => {
            res.json({ succes: false, error: err });
        });
    });
});

router.post("/api/shopper", (req, res) => {
    db.Shopper.create(req.body).then(shopper => {
        res.json({ succes: true, shopper });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

router.post("/api/customer", (req, res) => {
    db.Customer.create(req.body).then(customer => {
        res.json({ succes: true, customer });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

router.post("/api/payment_method", (req, res) => {
    db.PaymentMethod.create(req.body).then(paymentMethod => {
        res.json({ succes: true, paymentMethod });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

router.post("/api/order", (req, res) => {
    db.Order.create(req.body).then(order => {
        res.json({ succes: true, order });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});

router.post("/api/order_detail", (req, res) => {
    db.Order.create(
        req.body
    ).then(order => {
        res.json({ succes: true, order });
    }).catch(err => {
        res.json({ succes: false, error: err });
    });
});


module.exports = router;