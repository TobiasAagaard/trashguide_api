import { Sequelize } from 'sequelize'
import Types from '../Models/type.model.js'
import { QueryParamsHandle } from '../../Middleware/helpers.js';
import Categories from '../Models/category.model.js';
import CategoryTypeRel from '../Models/category_type_rel.model.js';

// Many to many relation
Types.belongsToMany(Categories, { through: CategoryTypeRel });
Categories.belongsToMany(Types, { through: CategoryTypeRel });
class TypesController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const qp = QueryParamsHandle(req, 'id, title')
		const { category_id } = req.params

		try {
			// Kalder SQ model
			const result = await Types.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: qp.attributes,
				include: {
					model: Categories,
					attributes: [],
					where: { id: category_id }
				}
			})
			// Parser resultat som json
			res.json({
				category_id: category_id, 
				types: result
			})
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
				const result = await Types.findOne({
					attributes: [
						'id', 'title', 'description'
					],
					include: [{
						model: Image,
						attributes: ['id', 'title','filename']
					}],
					// Where clause
					where: { id: req.params.id}
				});
				// Parser resultat som json
				res.json(result)
					
			} catch (error) {
				res.status(403).send({
					message: `Something went wrong: ${err}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


	/**
	 * Create Metode - opretter nyt event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const { title, description, image_id, category_id } = req.body

		if(title && description && image_id && category_id) {
			try {
				const model = await Types.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not create record: ${err}`
				})									
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Update Metode - opdaterer event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	 update = async (req, res) => {
		const { id } = req.params
		const { title, description, image_id, category_id } = req.body

		if(id && title && description && image_id && category_id) {
			try {
				const model = await Types.update(req.body, {
					where: { id: id }
				})
				return res.json({
					message: `Record updated`
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not update record: ${err}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Metode - sletter bruger ud fra id i url parameter
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	remove = async (req, res) => {
		const { id } = req.params.id

		if(id) {
			try {
				await Types.destroy({ 
					where: { id: id }
				})
				res.sendStatus(200)
			}
			catch(err) {
				res.status(418).send({
					message: `Could not delete record: ${err}`
				})
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	
}

export default TypesController