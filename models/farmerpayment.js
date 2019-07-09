module.exports = function (sequelize, DataTypes) {
    const FarmerPayment = sequelize.define("FarmerPayment", {
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

    FarmerPayment.associate = function (models) {
        FarmerPayment.belongsTo(models.Farmer, {
            foreignKey: { allowNull: false }
        });
    }
    return FarmerPayment;
}