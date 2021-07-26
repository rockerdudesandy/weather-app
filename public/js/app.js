const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#error')
const msg2 = document.querySelector('#valid')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    msg1.textContent = "loading results..."
    msg2.textContent = ""
    
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = 'Weather is ' + data.forecast.summary + '. The temperature is ' + data.forecast.temperature + 
                ' degree C, feels like ' + data.forecast.feels_like + ' degree C.\nThe Humidity is ' + data.forecast.humidity + '%.'
            }
        })
    })
})
