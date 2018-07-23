import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { enableProdMode } from '@angular/core'

import * as express from 'express'
import { join } from 'path'

// Faster server renders w/ Prod Mode (dev mode never needed)
enableProdMode()

const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/contacts-manager').then(
	() => {console.log('Database is connected')},
	err => {console.log('Can not connect to te database' + err)}
)

// Express Server
const app = express()

const PORT = process.env.PORT || 4000
const DIST_FOLDER = join(process.cwd(), 'dist')

app.use(bodyParser.json())

// *NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main')

// Express Engine
import { ngExpressEngine} from '@nguniversal/express-engine'
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'
import { Observable } from 'rxjs'

app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}))

app.set('view engine', 'html')
app.set('views', join(DIST_FOLDER, 'browser'))

const Schema = mongoose.Schema

let ContactModel = new Schema({
	fName: { type: String },
	lName: { type: String },
	email: { type: String },
	phone: { type: String },
	status: { type: String }
})

let Contact = mongoose.model('Contact', ContactModel)

/*app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported')
})*/

app.route('/api/contacts').get((req, res) => {
	Contact.find(function(err, contacts) {
		if (err) {
			console.log(err)
		} else {
			let finalContacts = []
			for(const contact of contacts) {
				let newContact = {
					id: contact._id,
					fName: contact.fName,
					lName: contact.lName,
					email: contact.email,
					phone: contact.phone,
					status: contact.status
				}
				finalContacts.push(newContact)
			}
			res.json(finalContacts)
		}
	})
})

app.route('/api/contacts/:id').get((req, res) => {
  Contact.findById(req.params['id'], (err, contact) => {
  	if (!contact) {
  		return new Error('Could not load Document')
  	} else {
  		let newContact = {
				id: contact._id,
				fName: contact.fName,
				lName: contact.lName,
				email: contact.email,
				phone: contact.phone,
				status: contact.status
			}
  		res.json(newContact)
  	}
  })
})

app.route('/api/contacts').post((req, res) => {
	let contact = new Contact(req.body)
	contact.save().then(data => {
		let newContact = {
					id: data._id,
					fName: contact.fName,
					lName: contact.lName,
					email: contact.email,
					phone: contact.phone,
					status: contact.status
				}
		res.status(201).send(req.body)
	})
	.catch(err => {
		res.status(400).send("unable to save to database")
	})
})

app.route('/api/contacts/:id').put((req, res) => {
	Contact.findById(req.params['id'], (err, contact) => {
		if (!contact) {
			return new Error('Could not find contact')
		} else {
			contact.fName = req.body.fName
			contact.lName = req.body.lName
			contact.email = req.body.email
			contact.phone = req.body.phone
			contact.status = req.body.status

			contact.save().then(data => {
				res.json(contact)
			}).catch(err => {
				res.status(400).send('Unable to update the database')
			})
		}
	})
})

app.route('/api/contacts/:id').delete((req, res) => {
	Contact.findByIdAndRemove({_id: req.params['id']}, (err, contact) => {
		if (err) res.json(err)
		else res.json(req.body)
	})
})

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')))

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req })
})

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`)
})