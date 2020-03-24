const { Model, DataTypes } = require('sequelize');

class Incidents extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            value: DataTypes.DOUBLE,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Ongs, { foreignKey: 'ongId', as: 'ong' })
    }
}

module.exports = Incidents