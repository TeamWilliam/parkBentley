const chargeContainer = document.querySelector(".js-chargePlus"),
    chargeTitle = chargeContainer.querySelector("h2");

function radio_chk(event) {
    //라디오 버튼 Name 가져오기
    var radio_btn = document.selectMoney.chk_info;
    var charge = 0; //여기 기존의 값 넣으면 됨!
    var chargePlus = '충전 후 잔액은 ' + event.target.value + '원 입니다.';

    document.getElementById("moneyPlus").innerHTML = chargePlus;
    $('#moneyPlus').text(chargePlus);
}

function init() {
    radio_chk();
}

init();