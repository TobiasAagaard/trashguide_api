import express from 'express'
const SystemRouter = express.Router()
import UserController from '../Controllers/System/user.controller.js'
import GroupController from '../Controllers/System/group.controller.js'
import OrgController from '../Controllers/System/org.controller.js';
import { Authenticate, Authorize } from "../Middleware/auth.js"

// User Routes
const user_ctrl = new UserController;
SystemRouter.get('/users', (req, res) => { user_ctrl.list(req, res) })
SystemRouter.get('/users/:id([0-9]*)', (req, res) => { user_ctrl.details(req, res) })
SystemRouter.post('/users', (req, res) => { user_ctrl.create(req, res) })
SystemRouter.put('/users/:id([0-9]*)', (req, res) => { user_ctrl.update(req, res) })
SystemRouter.patch('/users', (req, res) => { user_ctrl.update_value(req, res) })
SystemRouter.delete('/users/:id([0-9]*)', (req, res) => { user_ctrl.remove(req, res) })

// Group Routes
const group_ctrl = new GroupController;
SystemRouter.get('/groups', (req, res) => { group_ctrl.list(req, res) })
SystemRouter.get('/groups/:id([0-9]*)', (req, res) => { group_ctrl.details(req, res) })
SystemRouter.post('/groups', (req, res) => { group_ctrl.create(req, res) })
SystemRouter.put('/groups/:id([0-9]*)', (req, res) => { group_ctrl.update(req, res) })
SystemRouter.delete('/groups', (req, res) => { group_ctrl.remove(req, res) })

// Organisation Routes
const org_ctrl = new OrgController
SystemRouter.get('/orgs', (req, res) => { org_ctrl.list(req, res) })
SystemRouter.get('/orgs/:id([0-9]*)', (req, res) => { org_ctrl.details(req, res) })
SystemRouter.post('/orgs', (req, res) => { org_ctrl.create(req, res) })
SystemRouter.put('/orgs/:id([0-9]*)', (req, res) => { org_ctrl.update(req, res) })
SystemRouter.delete('/orgs/:id([0-9]*)', (req, res) => { org_ctrl.remove(req, res) })

// Authorization Routes
SystemRouter.post('/login', (req, res) => { Authenticate(req, res) })
SystemRouter.get('/authorize', Authorize, (req, res, next) => { res.send('Du er logget ind') })

export default SystemRouter