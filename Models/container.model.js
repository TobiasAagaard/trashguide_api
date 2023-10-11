import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Container extends Model{}

Container.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	icon_filename: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'container',
	underscored: true
})

export default Container