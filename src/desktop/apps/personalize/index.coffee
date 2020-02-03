#
# Personalize page
#

express = require 'express'
{ ensureLoggedInUser, index } = require './routes.ts'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/personalize', (_, res) -> res.redirect('/personalize/interests')
app.get '/personalize/:slug', ensureLoggedInUser, index
