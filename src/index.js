import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

async function getCity() {
    const cityName = $(".city-name").val()
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=934ea5f8bc3f198fabf59b607a2fcc71`
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(API, requestOptions)
    const finalResponse = await response.json()

    console.log(API, response, finalResponse)
    

    // $(".content-city-name").val(finalResponse)
}

window.getCity = getCity
