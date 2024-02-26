import express from 'express'
const MainRouter = express.Router()
import SectionController from '../Controllers/section.controller.js'
import { Authorize } from '../Middleware/auth.js'
import CategoryController from '../Controllers/category.controller.js'
import TypeController from '../Controllers/type.controller.js'
import ReviewsController from '../Controllers/review.controller.js'
import OrderController from '../Controllers/order.controller.js'
import ContainerController from '../Controllers/container.controller.js'
import SearchController from '../Controllers/search.controller.js'

// Section Routes
const sectioncontrol = new SectionController
MainRouter.get('/section', (req, res) => { sectioncontrol.list(req, res) })
MainRouter.get('/section/:id([0-9]*)', (req, res) => { sectioncontrol.details(req, res) })
MainRouter.post('/section', (req, res) => { sectioncontrol.create(req, res) })
MainRouter.put('/section/:id([0-9]*)', (req, res) => { sectioncontrol.update(req, res) })
MainRouter.delete('/section/:id([0-9]*)', (req, res) => { sectioncontrol.remove(req, res) })

// Category Routes
const catcontrol = new CategoryController
MainRouter.get('/categories/:section_id([0-9]*)', (req, res) => { catcontrol.list(req, res) })
MainRouter.get('/category/details/:id([0-9]*)', (req, res) => { catcontrol.details(req, res) })
MainRouter.post('/categories', (req, res) => { catcontrol.create(req, res) })
MainRouter.put('/categories/:id([0-9]*)', (req, res) => { catcontrol.update(req, res) })
MainRouter.delete('/categories/:id([0-9]*)', (req, res) => { catcontrol.remove(req, res) })

// Type Routes
const typecontrol = new TypeController
MainRouter.get('/types/:category_id([0-9]*)', (req, res) => { typecontrol.list(req, res) })
MainRouter.get('/category/:id([0-9]*)', (req, res) => { catcontrol.details(req, res) })
MainRouter.post('/categories', (req, res) => { catcontrol.create(req, res) })
MainRouter.put('/categories/:id([0-9]*)', (req, res) => { catcontrol.update(req, res) })
MainRouter.delete('/categories/:id([0-9]*)', (req, res) => { catcontrol.remove(req, res) })

// Search Route
const searchcontrol = new SearchController
MainRouter.get('/search/:keyword', (req, res) => { searchcontrol.search(req, res) })

// Review Routes
const reviewcontrol = new ReviewsController
MainRouter.get('/reviews', (req, res) => { reviewcontrol.list(req, res) })
MainRouter.get('/reviews/:org_id([0-9]*)', (req, res) => { reviewcontrol.list_by_org(req, res) })
MainRouter.get('/reviews/details/:id([0-9]*)', (req, res) => { reviewcontrol.details(req, res) })
MainRouter.post('/reviews', Authorize, (req, res) => { reviewcontrol.create(req, res) })
MainRouter.put('/reviews', Authorize, (req, res) => { reviewcontrol.update(req, res) })
MainRouter.delete('/reviews/:id([0-9]*)', Authorize, (req, res) => { reviewcontrol.remove(req, res) })

// Order Routes
const ordercontrol = new OrderController
MainRouter.get('/orders', (req, res) => { ordercontrol.list(req, res) })
MainRouter.get('/orders/:id([0-9]*)', (req, res) => { ordercontrol.details(req, res) })
MainRouter.post('/orders', (req, res) => { ordercontrol.create(req, res) })

// Container Routes
const containercontrol = new ContainerController
MainRouter.get('/containers', (req, res) => { containercontrol.list(req, res) })
MainRouter.get('/containers/:id([0-9]*)', (req, res) => { containercontrol.details(req, res) })


export default MainRouter