function getCurrentWeather(date, arrivalPlace) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const apiKey = "a7261407218993942343a95a51f76482#";
            const unit = "metric";
            const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + apiKey;
            fetch(url)
                .then((resp) => resp.json())
                .then(response => {
                    document.getElementById("weatherDegrees").innerHTML = response.main.temp;
                    document.getElementById("weatherState").innerHTML = response.weather[0].description;
                })
        });
    } else {
        console.log("Geolocation is not supported");
    }
}

module.exports = {
    getCurrentWeather
}