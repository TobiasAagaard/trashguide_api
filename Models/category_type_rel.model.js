import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Category from './category.model.js'
import Type from './type.model.js'

class CategoryTypeRel extends Model{}

CategoryTypeRel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Category,
			key: 'id'
		}
	},
	type_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Type,
			key: 'id'
		}
	},
	is_allowed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
			defaultValue: false
	},
	is_home: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	is_station: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	sequelize,
	modelName: 'category_type_rel',
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

export default CategoryTypeRel