import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Orgs from '../../Models/System/org.model.js';
import Groups from '../../Models/System/group.model.js';
import Users from '../../Models/System/user.model.js';
import UserGroupRel from '../../Models/System/user-group-rel.model.js';

import Categories from '../../Models/category.model.js';
import Types from '../../Models/type.model.js';
import Sections from '../../Models/section.model.js';
import CategoryTypeRel from '../../Models/category_type_rel.model.js';
import Reviews from '../../Models/review.model.js';
import Orders from '../../Models/order.model.js';
import Containers from '../../Models/container.model.js';

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('TrashGuide Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
	
		try {

			// Orgs
			const orgData = await this.get_csv_data('org.csv')
			const insertedOrgs = await Orgs.bulkCreate(orgData, { transaction });

			// Groups
			const groupData = await this.get_csv_data('group.csv')
			const insertedGroups = await Groups.bulkCreate(groupData, { transaction });

			// User
			const userData = await this.get_csv_data('user.csv')
			const insertedUser = await Users.bulkCreate(userData, { transaction });

			// User Groups Relations
			const userGroupsData = await this.get_csv_data('user-group-rel.csv')
			const insertedUserGroups = await UserGroupRel.bulkCreate(userGroupsData, { transaction });

			//////////////////// 

			// Sections
			const sectionData = await this.get_csv_data('section.csv')
			const insertedSection = await Sections.bulkCreate(sectionData, { transaction });

			// Categories
			const categoryData = await this.get_csv_data('category.csv')
			const insertedCategory = await Categories.bulkCreate(categoryData, { transaction });

			// Types
			const typeData = await this.get_csv_data('type.csv')
			const insertedType = await Types.bulkCreate(typeData, { transaction });

			// Category Type Relation
			const categoryTypeData = await this.get_csv_data('category_type_rel.csv')
			const insertedCategoryType = await CategoryTypeRel.bulkCreate(categoryTypeData, { transaction });

			// Containers
			const containerData = await this.get_csv_data('container.csv')
			const insertedContainer = await Containers.bulkCreate(containerData, { transaction });

			// Reviews
			const reviewData = await this.get_csv_data('review.csv')
			const insertedReviews = await Reviews.bulkCreate(reviewData, { transaction });

			// Bestillinger
			const orderData = await this.get_csv_data('order.csv')
			const insertedOrder = await Orders.bulkCreate(orderData, { transaction });


			// Confirm transaction
			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController