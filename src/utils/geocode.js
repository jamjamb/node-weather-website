const request = require('request')

// const mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Toronto.json?access_token=pk.eyJ1IjoiamltamJydWNlIiwiYSI6ImNraXFiMXdsNTFyeTEzNXBkMW1jZXY2N3QifQ.hlY57J0fxcI9qGrmBq4J9A&limit=1'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamltamJydWNlIiwiYSI6ImNraXFiMXdsNTFyeTEzNXBkMW1jZXY2N3QifQ.hlY57J0fxcI9qGrmBq4J9A&limit=1'

    request({ url, json: true}, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                place_name: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })

}

module.exports = geocode
