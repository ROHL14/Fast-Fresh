module.exports = function (sequelize, DataTypes) {
    const ShopperPayment = sequelize.define("ShopperPayment", {
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: new Date(),
            validate: { isDate: true }
        },
        total_amount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            validate: { isDecimal: true }
        }
    });

    ShopperPayment.associate = function (models) {
        ShopperPayment.belongsTo(models.Shopper, {
            foreignKey: { allowNull: false }
        });
    }
    return ShopperPayment;
}