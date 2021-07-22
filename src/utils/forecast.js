const request = require('request')

const weatherstack_key = 'd4cf75e395e324597899e0d4ecc248b6'
const weather_home = 'http://api.weatherstack.com/current'

const forecast = (latitude, longitude, callback) => {
    const url = weather_home + '?access_key=' + weatherstack_key + '&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather API', undefined)
        } else if (body.error) {
            console.log(body)
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                summary: body.current.weather_descriptions[0].split(", ")[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = forecast