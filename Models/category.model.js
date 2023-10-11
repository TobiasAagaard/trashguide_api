import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Section from './section.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Category extends Model {}

// Initialiserer model
Category.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	section_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Section,
			key: 'id'
		}
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	},
	icon_filename: {
		type: DataTypes.STRING,
		allowNull: true
	},
	image_filename: {
		type: DataTypes.STRING,
		allowNull: true
	}	
}, {
	sequelize, // Sequelize objekt
	modelName: 'category', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Category