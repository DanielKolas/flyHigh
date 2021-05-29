function getFlights(departureDateInput, departurePlaceInput, arrivalPlaceInput, tempSeats) {

    let departureDate = departureDateInput;
    let departurePlace = departurePlaceInput;
    let arrivalPlace = arrivalPlaceInput;
    let tempSeatsFlight= tempSeats;

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/EUR/en-US/${departurePlace}/${arrivalPlace}/${departureDateInput}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e9638017dcmsh1fa0336cf4010a3p1aef69jsn9204f1d16835",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        })
        .then((resp) => resp.json())
        .then(response => {
            let minPrice;
            minPrice = response.Quotes[0].MinPrice;
            document.getElementById("finalPriceEUR").innerHTML=(minPrice*tempSeatsFlight);
            if (arrivalPlace === "JFK-sky" || arrivalPlace === "SFO-sky") {
                smallPlane.classList.remove("invisible");
            } else if (arrivalPlace === "CUN-sky") {
                middlePlane.classList.remove("invisible");
            } else {
                bigPlane.classList.remove("invisible"); 
            }
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = {
    getFlights
}