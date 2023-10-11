import sequelize from "../Config/sequelize.config.js"
import Order from "../Models/order.model.js"
import { Sequelize } from "sequelize"

/**
 * Controller foc City Actions
 */
class OrderController {
  /**
   * Method List
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  list = async (req, res) => {
    // Destructure Assignment - optional list management
    let { sortkey, sortdir, limit, attributes } = req.query
    // Sætter array til sort og retning
    const order = [sortkey ? sortkey : "id"]
    order.push(sortdir || "ASC")
    // Sætter limit antal
    limit = parseInt(limit) || 1000
    // Sætter attributter (table felter)
    const attr = attributes
      ? attributes.split(",")
      : new Array("id", "fullname", "email")

    // Eksekverer sequelize metode med management values
    const result = await Order.findAll({
      attributes: attr,
      order: [order],
      limit: limit
    })
    // Udskriver resultat i json format
    res.json(result)
  }

  /**
   * Method Details
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  details = async (req, res) => {
    // Destructure assignment af id.
    const { id } = req.params || 0
    // Eksekverer sequelize metode med attributter og where clause
    const result = await Order.findOne({
      where: { id: id }
    })
    // Udskriver resultat i json format
    res.json(result)
  }

	/**
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
  create = async (req, res) => {
		const { fullname, address, zipcode, city, email, phone } = req.body

		if(fullname && address && zipcode && city && email) {
			try {
				const model = await Order.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(418).send({
					message: `Could not create record: ${error}`
				})									
			}
		} else {
			res.status(403).send({
				message: `Wrong parameter values`
			})					
		}
	}  
}

export default OrderController
