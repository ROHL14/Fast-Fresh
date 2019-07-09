module.exports = function (sequelize, DataTypes) {
    const PaymentMethod = sequelize.define("PaymentMethod", {
        name_on_card: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5],
                is: /(^\d{5}$)|(^\d{5}-\d{4}$)/
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        credit_card: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isCreditCard: true }
        },
        expiration_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: { isDate: true }
        },
        scv: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\d{3}$/
            }
        },
        primary_pay: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: 0
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 0
        }
    });

    PaymentMethod.associate = function (models) {
        PaymentMethod.belongsTo(models.Customer, {
            allowNull: false
        });
    }
    return PaymentMethod;
}