const request = require('request')

const mapbox_token = 'pk.eyJ1IjoiZm9vZGllYnl0ZSIsImEiOiJja3I1ZjQyMW8wM2k2MnhscGdlZTczeWNjIn0.FWDjvggvRtJCqjSbOTjNig'
const mapbox_home = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (location_string, callback) => {
    const url = mapbox_home + encodeURIComponent(location_string) + '.json?access_token=' + mapbox_token + '&limit=1'
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocode API', undefined)
        } else if (body.features.length === 0) {
            callback('Search query didn\'t generate valid response', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode