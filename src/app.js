const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log( path.join(__dirname, '../public') )

// paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
app.use( express.static( publicPath ) )

// handlebars templates
app.set('view engine', 'hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// renders index.hbs handlebars template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jim Bruce'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jim Bruce'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jim Bruce',
        message: 'Refer to online help documentation'
    })
})



// app.get('/help', (req, res) => {
//     // res.send({
//     //     name: 'Jim',
//     //     age: 'old'
//     // })
//     res.sendFile(publicPath + '/help.html')
// })

// app.get('/about', (req, res) => {
//     // let htdoc = '<h1>About Weather</h1>'
//     // htdoc += '<p>Interesting content about the weather here</p>'
    
//     // res.send(htdoc)
//     res.sendFile(publicPath + '/about.html')
// })

app.get('/weathertest', (req, res) => {
    res.send({
        location: {
            city: 'Toronto',
            country: 'CA'
        },
        forecast: {
            high: 6,
            low: -2
        }
    })    
})

app.get('/weather', (req, res) => {
    // console.log(req.query)

    if ( !req.query.address ) {
        return res.send({
            error: 'Address is required'
        })
    } 
    
    geocode(req.query.address, (error, { latitude, longitude, place_name } = {} ) => {
        if (error) {
            return res.send({ error }) 
        }

        // console.log(place_name)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) 
            }
            // console.log(forecastData)

            res.send({
                address: req.query.address,
                location: place_name,
                forecast: forecastData
            })      
        })
    })

})

// app.com
// app.com/help
// app.com/about


app.get('/help/*', (req, res) => {
    res.render('404handler', {
        errorMessage: 'Help content not found'
    })
})

// handle 404
app.get('*', (req, res) => {
    res.render('404handler', {
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('server listening on port 3000')
})
