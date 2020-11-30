const chargeContainer = document.querySelector(".js-chargePlus"),
    chargeTitle = chargeContainer.querySelector("h2");

function findId(event) {
    //라디오 버튼 Name 가져오기
    var radio_btn = document.selectMoney.chk_info;
    var id = 0; //여기 기존의 값 넣으면 됨!
    var chargePlus = '님의 아이디는' + event.target.value + '입니다.';

    document.getElementById("moneyPlus").innerHTML = chargePlus;
    $('#moneyPlus').text(chargePlus);
}

function init() {
    findId();
}

init();