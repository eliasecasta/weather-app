import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import moment from 'moment'

async function getCity() {
    const cityInput = $(".city-name")
    const cityName = cityInput.val()
    cityInput.val('')
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=934ea5f8bc3f198fabf59b607a2fcc71`

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(API, requestOptions)
    const city = await response.json()

    console.log(city)
    
    displayDetails(city)
}

function displayDetails(city) {
    const cityName = $(".content-city-name")
    const cityTemperature = $(".content-city-temperature")
    const cityTime = $(".content-city-time")
    
    const dt = city.dt
    const cityTimezone = city.timezone

    const currentTime = moment.unix(dt).utc().add(cityTimezone, 's')
    const currentTimeReadable = currentTime.format('LTS')

    cityName.empty()
    cityTemperature.empty()
    cityTime.empty()


    cityName.append(city.name)
    cityTemperature.append(city.main.temp)
    cityTime.append(currentTimeReadable)
    console.log(currentTimeReadable)

}

function dayOrNight(unixTime) {
    const day = city.sys.sunrise
    const night = city.sys.sunset

    if (condition) {
        
    } else {
        
    }
}

window.getCity = getCity
