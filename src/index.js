import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import moment from 'moment'

async function getCity() {
    const cityInput = $(".city-name")
    const cityName = cityInput.val()
    cityInput.val('')

    let celOrFahrNode = document.querySelector(".cel-or-fahr")
    let celOrFahr = celOrFahrNode.textContent
    console.log(celOrFahr)
    let API = ""

    if (celOrFahr === 'celsius') {
        API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=934ea5f8bc3f198fabf59b607a2fcc71`

    } else {
        API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=934ea5f8bc3f198fabf59b607a2fcc71`

    }

    const response = await fetch(API)
    const city = await response.json()

    console.log(city)

    return city
}

function displayDetails(city) {
    console.log(city)
    const cityName = $(".content-city-name")
    const cityTemperature = $(".content-city-temperature")
    const cityTime = $(".content-city-time")
    const celOrFahr = $(".cel-or-fahr").text()
    const cityTemperatureType = $(".content-city-temperature-type")


    const dt = city.dt
    const cityTimezone = city.timezone

    const currentTime = moment.unix(dt).utc().add(cityTimezone, 's')
    const currentTimeReadable = currentTime.format('LTS')

    cityName.empty()
    cityTemperature.empty()
    cityTime.empty()
    cityTemperatureType.empty()


    cityName.append(city.name, ", ", city.sys.country)
    cityTemperature.append(Math.round(city.main.temp))

    if (celOrFahr === "celsius") {
        cityTemperatureType.append("C")
    } else {
        cityTemperatureType.append("F")

    }


    cityTime.append(currentTimeReadable)
    console.log(currentTime)

    return currentTime._i
}

function dayOrNight(city, unixTime) {
    const day = city.sys.sunrise
    const night = city.sys.sunset
    unixTime = unixTime.toString().slice(0, -3)
    unixTime = parseInt(unixTime)

    if (unixTime >= day && unixTime < night) {
        return 'day'
    } else {
        return 'night'
    }
}

$(function () {
    $('#chkSwitch').change(function () {
        let currentTempNode = document.querySelector(".content-city-temperature")
        let currentTemp = currentTempNode.textContent
        let celOrFahrNode = document.querySelector(".cel-or-fahr")
        let celOrFahr = celOrFahrNode.textContent
        const cityTemperatureType = $(".content-city-temperature-type")

        if ($(this).prop('checked') === true) {
            console.log('celsius to fahrenheit', currentTemp)
            currentTemp = (currentTemp * (9 / 5)) + 32
            currentTemp = parseFloat(currentTemp).toFixed(1)
            currentTemp = Math.round(currentTemp)
            currentTempNode.textContent = currentTemp
            celOrFahrNode.textContent = 'fahrenheit'

            cityTemperatureType.empty()
            cityTemperatureType.text("F")

        } else {
            console.log('fahrenheit to celsius', currentTemp)

            currentTemp = (currentTemp - 32) * (5 / 9)
            currentTemp = parseFloat(currentTemp).toFixed(1)
            currentTemp = Math.round(currentTemp)
            currentTempNode.textContent = currentTemp
            celOrFahrNode.textContent = 'celsius'

            cityTemperatureType.empty()
            cityTemperatureType.text("C")


        }
    })
})

async function initApp() {
    let city = await getCity()
    let unixTime = await displayDetails(city)
    await dayOrNight(city, unixTime)
    $(".switch.ios").css('display', 'block')
}

$("#query-city").submit(function (e) {
    e.preventDefault()
    initApp()
})

window.initApp = initApp
