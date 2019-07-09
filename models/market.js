module.exports = function (sequelize, DataTypes) {
    const Market = sequelize.define("Market", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoincrement: false
        },
        products: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Market.associate = function (models) {
        Market.hasMany(models.Farmer, {
            onDelete: "cascade"
        })
    }

    Market.associate = function (models) {
        Market.hasMany(models.Order, {
            onDelete: "cascade"
        })
    }

    return Market;
}