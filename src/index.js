// IMPORTING MAIN
import {
    getCurrentTimeDate,
    todayDate
} from "./getTimeDate";
import {
    getCurrentWeather
} from "./getWeatherHome";
import {
    getWeatherSummary
} from "./getWeatherSummary"
import {
    getFlights
} from "./getFlights"

let users = require("./users.json");
import style from "./assets/scss/main.scss";

// IMPORTING ASSETS 
import Icon1 from "./assets/img/plane1.png";

// LOADING BASIC FUNCTION 
getCurrentTimeDate()
getCurrentWeather();

// ASSIGNING VARIABLES FROM HTML
let currentDate = document.getElementById("currentDate");
let currentTime = document.getElementById("currentTime");
let buttonSignIn = document.getElementById("buttonSignIn");
let buttonSignUp = document.getElementById("buttonSignUp");
let buttonLogOut = document.getElementById("buttonLogOut");
let loginPopup = document.getElementById("loginPopup");
let registerPopup = document.getElementById("registerPopup");
let iconCloseRegister = document.getElementById("iconCloseRegister");
let iconCloseLogin = document.getElementById("iconCloseLogin");
let aboutPlaneIcon = document.getElementById("aboutPlaneIcon");
let iconLogin = document.getElementById("iconLogin");
let containerLogin = document.getElementById("containerLogin");
let welcomeText = document.getElementById("welcomeText");
let home = document.getElementById("home");
let logo = document.getElementById("logo");
let bookingFinished = false;
let hero1 = document.getElementById("hero1");
let hero2 = document.getElementById("hero2");
let hero3 = document.getElementById("hero3");
let smallPlane = document.getElementById("smallPlane");
let middlePlane = document.getElementById("middlePlane");
let bigPlane = document.getElementById("bigPlane");

// RESETING FORMS
home.addEventListener("click", () => {
    resetWebsiteData();
});

logo.addEventListener("click", () => {
    resetWebsiteData();
});

function resetWebsiteData() {
    hero1.classList.remove("invisible");
    hero2.classList.add("invisible");
    hero3.classList.add("invisible");
    errorForm1.innerHTML = "";
    bookingFinished = false;
    form1.reset();
    form2.reset();
    form3.reset();
    deleteSelectedSeats();
    makePlaneScheduleInvisible()
    form2Button.classList.remove("invisible");
    seatLogin.classList.add("invisible");
    seatRegister.classList.add("invisible");
    errorSeats.innerHTML = "";
    errorLogin.innerHTML = "";
    errorRegister.innerHTML = "";
    smallLuggage.checked == false;
    bigLuggage.checked == false;


}

// FORM 1
let form1 = document.getElementById("form1");
let errorForm1 = document.getElementById("errorForm1");
let form1DeparturePlace, form1ArrivalPlace, form1DepartureDate, form1ArrivalDate, form1Number, form1Class;
let tempDeparturePlace, tempArrivalPlace, tempLuggage, tempClass, tempSeats;
let dateYYYYMMDD, checkDays;

let form2 = document.getElementById("form2");
let form2Button = document.getElementById("form2_button");
let form3 = document.getElementById("form3");

form1.addEventListener("submit", (e) => {
    e.preventDefault();
    let form1Good = true;
    form1DeparturePlace = form1.form1DeparturePlace.value;
    form1ArrivalPlace = form1.form1ArrivalPlace.value;
    form1DepartureDate = form1.form1DepartureDate.value;
    form1ArrivalDate = form1.form1ArrivalDate.value;
    form1Number = form1.form1Number.value;
    form1Class = form1.form1Class.value;
    dateYYYYMMDD = todayDate();
    if (form1Number > 0 && form1Number < 11) {} else {
        form1Good = false;
        errorForm1.innerHTML = "Incorrect number of passengers, allowed values from 1 to 10";
    };
    if (form1DepartureDate <= form1ArrivalDate) {} else {
        form1Good = false;
        errorForm1.innerHTML = "Arrival date must be after departure date";
    };
    if (form1ArrivalPlace == form1DeparturePlace) {
        form1Good = false;
        errorForm1.innerHTML = "The departure and arrival place must be different";
    } else {};
    if (form1DepartureDate >= dateYYYYMMDD) {} else {
        form1Good = false;
        errorForm1.innerHTML = "The flight cannot be in the past";
    }
    if (form1Good === true) {
        errorForm1.innerHTML = "";
        let date1 = Date.now();
        let dateDepNewFormat = form1DepartureDate.substring(0, 4) + "," + form1DepartureDate.substring(5, 7) + "," + form1DepartureDate.substring(8, 10);
        let date2 = new Date(dateDepNewFormat).getTime()
        checkDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
        hero2.classList.remove("invisible");
        form1.reset();
        tempClass = form1Class;
        tempSeats = form1Number;
        tempDeparturePlace = form1DeparturePlace;
        tempArrivalPlace = form1ArrivalPlace;
        getFlights(form1DepartureDate, form1DeparturePlace, form1ArrivalPlace, tempSeats);
        deleteSelectedSeats();
        hero2.scrollIntoView();
        makePlaneScheduleInvisible();
    } else {};
})

// FORM 2 AND BOOKING
form2.addEventListener("submit", (e) => {
    e.preventDefault();
    let countSeat = (document.querySelectorAll(".seat__selected").length);
    if (countSeat > form1Number) {
        errorSeats.innerHTML = (`To many seats selected, you have to unmark ${(countSeat-form1Number)} places`);
    } else if (countSeat < form1Number) {
        errorSeats.innerHTML = (`Please select all your seats, ${form1Number-countSeat} more to go`);
    } else if (loggedIn === false) {
        bookingFinished = true;
        errorSeats.innerHTML = "You must be logged in to finilize a booking";
        form2Button.classList.add("invisible");
        seatLogin.classList.remove("invisible");
        seatRegister.classList.remove("invisible");
        seatLogin.addEventListener("click", () => {
            loginPopup.classList.remove("invisible");
            loginPopup.scrollIntoView();
        });
        seatRegister.addEventListener("click", () => {
            registerPopup.classList.remove("invisible");
            registerPopup.scrollIntoView();
        });
    } else {
        bookingFinished = true;
        generateSummary();
        hero2.classList.add("invisible");
        hero3.classList.remove("invisible");
        hero3.scrollIntoView();
    }
})


// CHANGING CURRENCY 
function changeCurrency() {
    let finalPriceEUR = document.getElementById("finalPriceEUR").innerHTML;
    let finalPrice = document.getElementById("finalPrice");
    let buttonCurrency = document.getElementById("buttonCurrency");
    finalPrice.innerHTML = finalPriceEUR;
    let summaryCurrency = document.getElementById("summaryCurrency");

    buttonCurrency.addEventListener("click", getCurrency);

    function getCurrency(e) {
        e.preventDefault();
        let currencyUnit = form3.summaryCurrency.value;
        let priceConverter;
        let newPrice;
        let url = "http://data.fixer.io/api/latest?access_key=693bf03212e045e0f02903f9d93cd99c&symbols=" + currencyUnit + "&format=1";
        fetch(url)
            .then((dataApi) => dataApi.json()) //transforms data into json
            .then(function (data) {
                switch (currencyUnit) {
                    case "PLN":
                        url = "http://data.fixer.io/api/latest?access_key=693bf03212e045e0f02903f9d93cd99c&symbols=PLN&format=1";
                        priceConverter = data.rates.PLN;
                        break;
                    case "USD":
                        url = "http://data.fixer.io/api/latest?access_key=693bf03212e045e0f02903f9d93cd99c&symbols=USD&format=1";
                        priceConverter = data.rates.USD;
                        break;
                    case "NOK":
                        url = "http://data.fixer.io/api/latest?access_key=693bf03212e045e0f02903f9d93cd99c&symbols=NOK&format=1";
                        priceConverter = data.rates.NOK;
                        break;
                    case "EUR":
                        priceConverter = 1;
                        break;
                }
                newPrice = (priceConverter * finalPriceEUR).toFixed(2);
                finalPrice.innerHTML = newPrice;
            });
    };
}

// POP UP LOGIN and REGISTER
let loggedIn = false;
let formLogin = document.getElementById("formLogin");
let formRegister = document.getElementById("formRegister");
let showPassword = document.getElementById("showPassword");
let loginEmail, loginPassword;
let registerName, registerSurname, registerPassword, registerPassword2, registerEmail;
let checkBoxRegister = document.getElementById("checkboxRegister");
let errorLogin = document.getElementById("errorLogin");
let errorRegister = document.getElementById("errorRegister");
let loginPasswordType = document.getElementById("loginPassword");
let tempUserName, tempUserSurname, tempUserEmail;
showPassword.addEventListener("click", () => {
    loginPasswordType.type = "text";
    setTimeout(function () {
        loginPasswordType.type = "password"
    }, 5000);
});
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    loginEmail = formLogin.loginEmail.value;
    loginPassword = formLogin.loginPassword.value;
    for (const user of users) {
        if (loginEmail.toLowerCase() === user.email.toLowerCase()) {
            if (loginPassword === user.password) {
                iconLogin.classList.add("loggedIn");
                tempUserName = user.name.charAt(0).toUpperCase() + user.name.slice(1);
                tempUserSurname = user.surname.charAt(0).toUpperCase() + user.surname.slice(1);
                tempUserEmail = user.email.toLowerCase();
                welcomeText.innerHTML = "Hi " + tempUserName + ", book a ticket now! ";
                buttonLogOut.classList.remove("invisible");
                loginPopup.classList.add("invisible");
                loggedIn = true;
                buttonSignIn.classList.add("invisible");
                formLogin.reset();
                errorLogin.innerHTML = "";
                if (bookingFinished === true) {
                    hero3.classList.remove("invisible");
                    hero2.classList.add("invisible");
                    generateSummary()
                    hero3.scrollIntoView();
                }
                break;
            } else {
                errorLogin.innerHTML = "Password incorrect";
                break;
            }
        } else {
            errorLogin.innerHTML = "That user is not registered";
        };
    }
});

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    registerName = formRegister.registerName.value;
    registerSurname = formRegister.registerSurname.value;
    registerEmail = formRegister.registerEmail.value;
    registerPassword = formRegister.registerPassword.value;
    registerPassword2 = formRegister.registerPassword2.value;

    if (registerPassword === registerPassword2) {
        if (checkBoxRegister.checked) {
            let usersLenth = users.length;
            users[usersLenth] = {
                name: registerName,
                surname: registerSurname,
                email: registerEmail,
                password: registerPassword
            }
            console.log("New user added");
            registerPopup.classList.add("invisible");
            formRegister.reset();
            errorRegister.innerHTML = "";
        }
    } else {
        errorRegister.innerHTML = "Passwords do not match";
    }
});

iconLogin.addEventListener("click", function () {
    containerLogin.classList.toggle("showLogin");
})

buttonSignIn.addEventListener("click", function () {
    loginPopup.classList.toggle("invisible");
    containerLogin.classList.remove("showLogin");
});

buttonSignUp.addEventListener("click", function () {
    registerPopup.classList.toggle("invisible");
    containerLogin.classList.remove("showLogin");
});

iconCloseLogin.addEventListener("click", function () {
    loginPopup.classList.add("invisible");
    formLogin.reset();
});

iconCloseRegister.addEventListener("click", function () {
    registerPopup.classList.add("invisible");
    formRegister.reset();
});

buttonLogOut.addEventListener("click", () => {
    buttonSignIn.classList.remove("invisible");
    buttonLogOut.classList.add("invisible");
    iconLogin.classList.remove("loggedIn");
    welcomeText.innerHTML = "Buy your flight right now!";
    loggedIn = false;
});

// ADDING ICONS IMAGES
let myIcon = new Image();
myIcon.src = Icon1;
aboutPlaneIcon.appendChild(myIcon);

// OPEN FAQ 
let faqContainers = document.getElementsByClassName("faq");
let faqs = document.getElementsByClassName("openFAQ");
let counter = 0;
for (let faqItem of faqContainers) {
    let tempFAQ = faqs[counter];
    faqItem.addEventListener("click", function () {
        tempFAQ.classList.toggle("showFAQ");
    })
    counter++;
};

// CHANGE MODE COLOR
document.getElementById("switchColorMode").addEventListener('click', () => {
    document.body.classList.toggle('changeColorMode');
});

// SEATS BOOKING 
let errorSeats = document.getElementById("errorSeats");
let seats = document.querySelectorAll(".seat");
let seatsNumber = seats.length;
let randSeatsTaken = [];
let seatLogin = document.getElementById("seatLogin");
let seatRegister = document.getElementById("seatRegister");
for (let i = 0; i <= (seatsNumber * 0.2); i++) {
    const randSeat = Math.floor(Math.random() * (seatsNumber - 1)) + 1;
    randSeatsTaken.push(randSeat);
};

seats.forEach((seat, index, array) => {
    if (randSeatsTaken.includes(index)) {
        seat.classList.add("seat__taken");
    }
    if (!seat.classList.contains("seat__taken")) {
        seat.addEventListener("click", () => {
            seat.classList.toggle("seat__selected");
        })
    }
});

// ADDITONAL CLEARS 
function deleteSelectedSeats() {
    let selectedSeats = document.querySelectorAll(".seat__selected");
    selectedSeats.forEach((seat) => {
        seat.classList.remove("seat__selected");
    })
};

function makePlaneScheduleInvisible() {
    if (!smallPlane.classList.contains("invisible")) {
        smallPlane.classList.add("invisible");
    }
    if (!middlePlane.classList.contains("invisible")) {
        middlePlane.classList.add("invisible");
    }
    if (!bigPlane.classList.contains("invisible")) {
        bigPlane.classList.add("invisible");
    }
}

// LUGGAGE
let smallLuggage = document.getElementById("smallLuggage");
let bigLuggage = document.getElementById("bigLuggage");

function checkLuggage() {
    if (smallLuggage.checked == true && bigLuggage.checked == true) {
        tempLuggage = smallLuggage.value + " and " + bigLuggage.value
    } else {
        smallLuggage.checked == true ? tempLuggage = smallLuggage.value : tempLuggage = "";
        bigLuggage.checked == true ? tempLuggage = bigLuggage.value : tempLuggage = "No extra luggage";
    }
}

// SUMMARY 
function generateSummary() {
    checkLuggage()
    changeCurrency();
    document.getElementById("summaryName").innerHTML = tempUserName;
    document.getElementById("summarySurname").innerHTML = tempUserSurname;
    document.getElementById("summaryEmail").innerHTML = tempUserEmail;
    document.getElementById("summaryDate").innerHTML = form1DepartureDate;
    document.getElementById("summaryDeparture").innerHTML = tempDeparturePlace;
    document.getElementById("summaryArrival").innerHTML = tempArrivalPlace;
    document.getElementById("summarySeats").innerHTML = tempSeats;
    document.getElementById("summaryLuggage").innerHTML = tempLuggage;
    document.getElementById("summaryClass").innerHTML = tempClass;

    if (checkDays < 0) {
        checkDays = 0;
        getWeatherSummary(checkDays, tempArrivalPlace);
        document.getElementById("summaryWeather").classList.remove("invisible");
    } else if (checkDays < 7) {
        getWeatherSummary(checkDays, tempArrivalPlace);
        document.getElementById("summaryWeather").classList.remove("invisible");
    }
}

// QUERIES VERSION 
let navMenuMobile = document.getElementsByClassName("navigation__menu")[0];

document.getElementById("openMobileMenu").addEventListener("click", () => {
    document.getElementsByClassName("navigation__menu")[0].classList.toggle("invisibleMobile");
});
document.getElementById("closeMobileMenu").addEventListener("click", () => {
    document.getElementsByClassName("navigation__menu")[0].classList.add("invisibleMobile");
});

let closeMenu = document.querySelectorAll(".closeMenuMobile");
closeMenu.forEach((element) => {
    element.addEventListener("click", () => {
        navMenuMobile.classList.add("invisibleMobile");
    })
});

document.getElementById("logoNameMobile").addEventListener("click", () => {
    resetWebsiteData();
})