// NODE MODULES
const path = require('path')

// DEPENDENCIES
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

// ROUTES
const mvcRoute = require(path.resolve(__dirname, 'src/routes/mvc.routes'))

// DATABASE CONNECTION
const conn = require(path.resolve(__dirname, 'src/config/mongodb.config'))

const app = express()
dotenv.config({
    path: '.env'
})

conn.connection()

app.use(morgan('Date: :date[web]; HTTP :http-version :method :url; Status: :status; :res[content-length] :res[content-type]=:response-time ms'))

app.use('/img', express.static(path.resolve(__dirname, 'public/img')))
app.use('/js', express.static(path.resolve(__dirname, 'public/js')))

app.set("view engine", "ejs")
app.set('views', path.resolve(__dirname, 'public/views'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// ROUTES INITIALIZATION
// MVC
app.use('/inventory', mvcRoute)

app.listen(process.env.PORT, () => {
    console.log(`${process.env.HOST}:${process.env.PORT}/inventory`)
})