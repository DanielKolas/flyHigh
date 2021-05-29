
function todayDate(){
    today = new Date();
    let todayDay =today.getDate();
    let todayMonth =today.getMonth();
    let todayYear =today.getFullYear();
    let tempDate;
    tempDate = todayYear+"-"+("0"+(todayMonth+1)).slice(-2)+"-"+todayDay;
    return tempDate;
};

function getCurrentTimeDate(){
    setInterval(function(){
        today = new Date();
        let todayDay =today.getDate();
        let todayMonth =today.getMonth();
        let todayYear =today.getFullYear();
        currentDate.innerHTML=todayDay+"/"+(todayMonth+1)+"/"+todayYear;
        let todayHour = today.getHours();
        todayHour = ("0"+todayHour).slice(-2);
        let todayMinutes = today.getMinutes();
        todayMinutes = ("0"+todayMinutes).slice(-2);
        let todaySeconds = today.getSeconds();
        todaySeconds = ("0"+todaySeconds).slice(-2);
        currentTime.innerHTML=todayHour+":"+todayMinutes+":"+todaySeconds;
    }, 1000);
}

module.exports = {
 getCurrentTimeDate, todayDate
    }