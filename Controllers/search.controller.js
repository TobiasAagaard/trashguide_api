import { QueryParamsHandle } from "../Middleware/helpers.js"
import Section from "../Models/section.model.js"
import Category from "../Models/category.model.js"
import Type from "../Models/type.model.js"
import CategoryTypeRel from "../Models/category_type_rel.model.js"
import { Sequelize } from "sequelize"

// Kalder sq Operator til search clause
const Op = Sequelize.Op

// Definerer category relationer
Section.hasMany(Category)
Category.belongsTo(Section)

// Definerer types relationer
Type.belongsToMany(Category, { through: CategoryTypeRel })
Category.belongsToMany(Type, { through: CategoryTypeRel })

class SearchController {
  /**
   * List Metode - henter alle records
   * @param {object} req
   * @param {object} res
   * @return {array} Returnerer JSON array
   */
  search = async (req, res) => {
    // Sortering & constaints
    const qp = QueryParamsHandle(req, "id")

    const { keyword } = req.params

    if (keyword) {
      const arrResults = []

      try {
        const arrSections = await Section.findAll({
          attributes: [
			"id", 
			"title",
			[Sequelize.literal("'section'"), 'type']
		  ],
          // where clause
          where: {
            [Op.or]: [
              // Søg på titel
              {
                title: {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
          },
        })

		arrResults.push(...arrSections)

        const arrCategories = await Category.findAll({
			attributes: [
				"id", 
				"title",
				[Sequelize.literal("'category'"), 'type']
			  ],
				// where clause
			where: {
			  [Op.or]: [
				// Søg på titel
				{
				  title: {
					[Op.like]: `%${keyword}%`,
				  },
				},
			  ],
			},
		  })

		  arrResults.push(...arrCategories)
  
		  const arrTypes = await Type.findAll({
			attributes: [
				"id", 
				"title",
				[Sequelize.literal("'type'"), 'type']
			],
			// where clause
			where: {
			  [Op.or]: [
				// Søg på titel
				{
				  title: {
					[Op.like]: `%${keyword}%`,
				  },
				},
			  ],
			},
		  })

		arrResults.push(...arrTypes)

		const searchResult = {
			keyword: keyword,
			num_result: arrResults.length,
			data: arrResults
		}
		
        res.json(searchResult)
      } catch (err) {
        res.status(403).send({
          message: `Something went wrong: ${err}`,
        })
      }
    } else {
      res.status(403).send({
        message: "Wrong parameter values",
      })
    }
  }
}

export default SearchController
