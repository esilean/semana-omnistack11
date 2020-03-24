const { Model, DataTypes } = require('sequelize');

class Ongs extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            city: DataTypes.STRING,
            uf: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Incidents, { foreignKey: 'ongId', as: 'incidents' })
    }
}

module.exports = Ongs
