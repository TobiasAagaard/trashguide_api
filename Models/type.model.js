import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Type extends Model{}

Type.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},		
	title: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'type',
	underscored: true,
})

export default Type