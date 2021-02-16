import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import moment from 'moment'

const dayGIF = 'https://mondrian.mashable.com/wp-content%252Fuploads%252F2013%252F04%252Fpalm-trees.gif%252Ffull-fit-in__1200x2000.gif?signature=u6Pkj2nxfqX8m9jTaqwq1Xl6iqM=&source=http%3A%2F%2Fmashable.com'
const nightGIF = 'https://i.gifer.com/VTNI.gif'

async function getCity() {
    const cityInput = $(".city-name")
    const cityName = cityInput.val()
    cityInput.val('')

    let celOrFahrNode = document.querySelector(".cel-or-fahr")
    let celOrFahr = celOrFahrNode.textContent
    let API = ""

    if (celOrFahr === 'celsius') {
        API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=934ea5f8bc3f198fabf59b607a2fcc71`

    } else {
        API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=934ea5f8bc3f198fabf59b607a2fcc71`

    }

    const response = await fetch(API)
    const city = await response.json()


    return city
}

function displayDetails(city) {
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
            currentTemp = (currentTemp * (9 / 5)) + 32
            currentTemp = parseFloat(currentTemp).toFixed(1)
            currentTemp = Math.round(currentTemp)
            currentTempNode.textContent = currentTemp
            celOrFahrNode.textContent = 'fahrenheit'

            cityTemperatureType.empty()
            cityTemperatureType.text("F")

        } else {

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
    const dayNight = await dayOrNight(city, unixTime)

    if (dayNight === "night") {
        $(".main-title").css("color", "white")
        $(".row h1").css("color", "white")
        $(".bg").css("background-image", `url(${nightGIF})`);

    } else {
        $(".main-title").css("color", "white")
        $(".row h1").css("color", "black")

        $(".bg").css("background-image", `url(${dayGIF})`);


    }
    $(".switch.ios").css('display', 'block')
}

$("#query-city").submit(function (e) {
    e.preventDefault()
    initApp()
})

window.initApp = initApp
