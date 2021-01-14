//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

// // http://api.weatherstack.com/current?access_key=584b9ca5a567ec2ea4a8b6c78ab2ec74&query=Toronto




const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=584b9ca5a567ec2ea4a8b6c78ab2ec74&query=' + encodeURIComponent(address) + '&units=m'
    const url = 'http://api.weatherstack.com/current?access_key=584b9ca5a567ec2ea4a8b6c78ab2ec74&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Error connecting to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current.weather_descriptions.humidity)
            callback(undefined, {
                locationName: body.location.name,
                locationRegion: body.location.region, 
                locationCountry: body.location.country,
                locationLat: body.location.lat, 
                locationLon: body.location.lon, 
                currentTemp: body.current.temperature, 
                currentFeelsLike: body.current.feelslike, 
                currentDescription: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast
