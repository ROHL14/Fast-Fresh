module.exports = function (sequelize, DataTypes) {
    const OrderDetail = sequelize.define("OrderDetail", {
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tax: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        fee: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        product_packt: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: 0
        },
        farmer_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    });

    OrderDetail.associate = function (models) {
        OrderDetail.belongsTo(models.Order, {
            foreignKey: {
                allowNull: false
            }
        });

        OrderDetail.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
    }



    return OrderDetail;
}