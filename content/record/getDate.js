
    function getDate() { //년과 월에 따라 마지막 일 구하기 
        var year = document.getElementById('select_year');
        var month = document.getElementById('select_month');
        var date = document.getElementById('select_day');

        var yearLast = document.getElementById('select_lastyear');
        var monthLast = document.getElementById('select_lastmonth');
        var dateLast = document.getElementById('select_lastday');
        
        var yearSelected = year.options[year.selectedIndex].text;
        var monthSelected = month.options[month.selectedIndex].text;
        var dateSelected = date.options[date.selectedIndex].text;

        var yearLastSelected = yearLast.options[yearLast.selectedIndex].text;
        var monthLastSelected = monthLast.options[monthLast.selectedIndex].text;
        var dateLastSelected = dateLast.options[dateLast.selectedIndex].text;


        var termDate = yearSelected + '년 ' + monthSelected + '월 ' + dateSelected +'일 부터 ' + yearLastSelected + '년 ' + monthLastSelected + '월 ' + dateLastSelected + '일 까지의 사용 기록 내역을 조회합니다.';
        document.getElementById("termDate").innerHTML = termDate;
    }
