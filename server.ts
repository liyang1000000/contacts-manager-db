import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { enableProdMode } from '@angular/core'

import * as express from 'express'
import { join } from 'path'

// Faster server renders w/ Prod Mode (dev mode never needed)
enableProdMode()

// Express Server
const app = express()

const PORT = process.env.PORT || 4000
const DIST_FOLDER = join(process.cwd(), 'dist')
const fs = require('fs')

let rawdata = fs.readFileSync('./src/data.json')
let contacts = JSON.parse(rawdata)

const bodyParser = require('body-parser')
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

/*app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported')
})*/

app.route('/api/contacts').get((req, res) => {
	res.send(contacts)
})

app.route('/api/contacts/:id').get((req, res) => {
	const requestedContactId  = req.params['id']
  res.send(contacts.find((item)=>{ return item.id === requestedContactId}))
})

app.route('/api/contacts').post((req, res) => {
	contacts.push(req.body)
	fs.writeFileSync('./src/data.json', JSON.stringify(contacts, null, 2))
	res.status(201).send(req.body)
})

app.route('/api/contacts/:id').put((req, res) => {
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].id === req.params['id']) {
			contacts[i] = req.body
			break
		}
	}
	fs.writeFileSync('./src/data.json', JSON.stringify(contacts, null, 2))
	res.status(200).send(req.body)
})

app.route('/api/contacts/:id').delete((req, res) => {
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].id === req.params['id']) {
			contacts.splice(i, 1)
			break
		}
	}
	fs.writeFileSync('./src/data.json', JSON.stringify(contacts, null, 2))
	res.send(req.body)
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