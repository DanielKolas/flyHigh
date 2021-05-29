function getWeatherSummary(checkDays, tempArrivalPlace) {
    let place = tempArrivalPlace;
    let dateDays = checkDays;
    let longlat;
    switch (place) {
        case "JFK-sky":
            longlat = "lat=40.712754&lon=-74.005959" 
            break;
        case "SFO-sky":
            longlat = "lat=37.774956&lon=-122.419433"
            break;
        case "LIS-sky":
            longlat = "lat=38.722257&lon=-9.139339"
            break;
        case "BCN-sky":
            longlat = "lat=41.390205&lon=2.154007"
            break;
        case "CUN-sky":
            longlat = "lat=45.421507&lon=-75.697175"
            break;
    }
    const apiKey = "a7261407218993942343a95a51f76482#";
    const url = "https://api.openweathermap.org/data/2.5/onecall?"+longlat+"&exclude={part}&units=metric&appid="+apiKey;
    fetch(url)
        .then((resp) => resp.json())
        .then(response => {
            document.getElementById("summaryTemperatureMin").innerHTML=response.daily[dateDays].temp.min;
            document.getElementById("summaryTemperatureMax").innerHTML=response.daily[dateDays].temp.max;
            document.getElementById("summaryPressure").innerHTML=response.daily[dateDays].pressure;
            document.getElementById("summaryDescription").innerHTML=response.daily[dateDays].weather[0].description;
        })
};

module.exports = {
    getWeatherSummary
}