import Category from '../Models/category.model.js'
import Type from '../Models/type.model.js';
import CategoryTypeRel from '../Models/category_type_rel.model.js';
import { QueryParamsHandle } from '../Middleware/helpers.js';
import { Sequelize } from 'sequelize';

class CategoryController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const qp = QueryParamsHandle(req, '')
		const { incl_types } = req.query

		const arrIncludes = []

		if(incl_types) {
			// Definerer relation mellem by og hotel - one to many
			Type.belongsToMany(Category, { through: CategoryTypeRel });
			Category.belongsToMany(Type, { through: CategoryTypeRel });

			arrIncludes.push({
				model: Type,
				attributes: ['id','title'],
				through: {
					attributes: ['is_allowed', 'is_station', 'is_home'],
					as: 'rules'
				}
			})			
		}		

		try {
			// Kalder SQ model
			const result = await Category.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: [
					'id',
					'title',
					'image_filename',
					[Sequelize.fn(	
						'CONCAT', 
						'http://localhost:3000/Assets/Images/Guide/Categories/', 
						Sequelize.col('image_filename')
					), 'image_filepath'],
					'icon_filename',
					[Sequelize.fn(	
						'CONCAT', 
						'http://localhost:3000/Assets/Images/Guide/Icons/', 
						Sequelize.col('icon_filename')
					), 'icon_filepath']					
				],
				include: arrIncludes
			})
			// Parser resultat som json
			res.json(result)
		} catch(err) {
			res.status(418).send({
				message: `Unable to list records: ${err}`
			})
		}
	}

	/**
	 * GET Metode henter record ud fra id
	 * @param {object} req 
	 * @param {object} res 
	 * @return {object} Returnerer JSON object med detaljer
	 */
	details = async (req, res) => {
		const { id } = req.params

		if(id) {
			// Sætter resultat efter sq metode
			try {
				// Definerer types relationer 
				Type.belongsToMany(Category, { through: CategoryTypeRel });
				Category.belongsToMany(Type, { through: CategoryTypeRel });

				// Deklarerer array med category table joins
				const arrCatIncludes = []

				// Deklarerer array med types table joins
				arrCatIncludes.push({
					model: Type,
					attributes: ['id','title'],
					through: {
						attributes: ['is_allowed', 'is_station', 'is_home'],
						as: 'rules'
					}
				})

				console.log(arrCatIncludes);

				const result = await Category.findOne({
					attributes: [
						'id', 
						'title',
						'image_filename',
						[Sequelize.fn(	
							'CONCAT', 
							'http://localhost:3000/Assets/Images/Guide/Categories/', 
							Sequelize.col('image_filename')
						), 'image_filepath'],
						'icon_filename',
						[Sequelize.fn(	
							'CONCAT', 
							'http://localhost:3000/Assets/Images/Guide/Icons/', 
							Sequelize.col('icon_filename')
						), 'icon_filepath'],
						'created_at',
						'updated_at'
					],
					include: arrCatIncludes,
					// Where clause
					where: { id: req.params.id}
				});
				// Parser resultat som json
				res.json(result)
					
			} catch (error) {
				res.status(403).send({
					message: `Something went wrong: ${error}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}
}

export default CategoryController