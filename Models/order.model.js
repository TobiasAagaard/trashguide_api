import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Container from './container.model.js'

class Order extends Model{}

Order.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	container_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Container,
			key: 'id'
		}
	},
	fullname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false
	},
	zipcode: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'order',
	underscored: true,
})

export default Order