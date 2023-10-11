import express from 'express'
import sequelize from '../Config/sequelize.config.js'

// Core Models
import UserModel from '../Models/System/user.model.js'
import GroupModel from '../Models/System/group.model.js'
import OrgModel from '../Models/System/org.model.js'

// App Models
import Sections from '../Models/section.model.js'
import Categories from '../Models/category.model.js'
import Types from '../Models/type.model.js'
import Reviews from '../Models/review.model.js'
import Orders from '../Models/order.model.js'
import Containers from '../Models/container.model.js'

import SeedController from '../Controllers/Seed/seed.controller.js'

const InstallRouter = express.Router()

InstallRouter.get('/install', async (req, res) => {
	const seeder = new SeedController() 
	try {
		await sequelize.sync({ force: true })
		await seeder.seed_from_csv()
		res.sendStatus(200)
	}
	catch(err) {
		res.send(err)
	}
})

export default InstallRouter