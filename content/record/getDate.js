const startDateContainer = document.querySelector(".js-startDate"),
    startDateTitle = startDateContainer.querySelector("h2");

function getDate() { //년과 월에 따라 마지막 일 구하기 
    var Year = document.getElementById('select_year').value;
    var Month = document.getElementById('select_month').value;
    var day = new Date(new Date(Year, Month, 1) - 86400000).getDate();
    var dayindex_len = document.getElementById('select_day').length;
    if (day > dayindex_len) {
        for (var i = (dayindex_len + 1); i <= day; i++) {
            document.getElementById('select_day').options[i - 1] = new Option(i, i);
        }
    }
    else if (day < dayindex_len) {
        for (var i = dayindex_len; i >= day; i--) {
            document.getElementById('select_day').options[i] = null;
        }
    }

    var Date = document.getElementById('select_day').value;
    var startDate = Year + '-' + Month + '-' + Date;

    document.getElementById("startDate").innerHTML = startDate;
    $('#startDate').text(startDate);

}

function init() {
    getDate();
}

init();