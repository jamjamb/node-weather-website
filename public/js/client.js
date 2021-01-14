console.log('client side javascript loaded')

// const url = 'http://puzzle.mead.io/puzzle'
// const url = 'http://localhost:3000/weather?address=Ajax,ON'

// fetch(url).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#message-location')
const messageCurrently = document.querySelector('#message-currently')
const messageError = document.querySelector('#message-error')

messageLocation.textContent = ''
messageCurrently.textContent = ''
messageError.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageLocation.textContent = 'Searching ...'
    messageCurrently.textContent = ''
    messageError.textContent = ''

    const url = '/weather?address=' + encodeURIComponent(location)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLocation.textContent = ''
                messageCurrently.textContent = ''
                messageError.textContent = data.error                
            } else {
                messageLocation.textContent = data.location
                messageCurrently.textContent = data.forecast.currentDescription
                + ', current temperature is ' + data.forecast.currentTemp
                + ', humidity is ' + data.forecast.humidity
                messageError.textContent = ''
                console.log(data)
            }
        })
    })
    

    // console.log(location)
})

