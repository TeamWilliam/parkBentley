const dateContainer = document.querySelector(".js-date"),
    dateTitle = clockContainer.querySelector("h1");

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Jan is 0
    var yyyy = today.getFullYear();
    var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
    var today = new Date().getDay();
    var todayLabel = week[today];

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + ' ' + mm + ' ' + dd + ' ' + todayLabel;
    //alert(today);
    document.getElementById("date").innerHTML = today;
    $('#date').text(today);
}
function init() {
    getDate();
    setInterval(getTime, 1000);
}

init();