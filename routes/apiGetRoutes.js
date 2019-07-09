// Pull in required dependencies
const router = require("express").Router();
const db = require("../models");

//query just markets, for drop down
router.get("/api/markets", async (req, res) => {
    const markets = await db.Market.findAll({});
    res.json(markets);
});

//query Farmers and Products filtering by market
router.get("/api/farmer/:marketId", async (req, res) => {
    const FarmerProducts = await db.findAll({ where: [{ MarkerId: req.params.MarketId }, { open_close: true }] }, { include: [db.Product] },
        { order: ['category', 'DESC'] });
    res.json(FarmerProducts);
});

router.get("api/customer/:id", async (req, res) => {
    const customer = await db.Customer.findOne({ where: [{ id: req.params.id }] }, { include: [db.PaymentMethod] });
    res.json(customer);
});

//orders to be prepare by shopper, or are ready to be picked up, or they have been picked up
router.get("/api/orders/:marketId/:status/:date", async (req, res) => {
    const orders = await db.Order.findAll({ where: [{ marketId: req.params.marketId }, { status: req.params.status }] }, { include: [db.Order_Detail, db.Customer] });
    res.json(orders);
});


router.get("api/category", async (req, res) => {
    const category = await db.customer.findAll({});
    res.json(category);
});


module.exports = router;
