const chargeContainer = document.querySelector(".js-chargePlus"),
    chargeTitle = chargeContainer.querySelector("h2");


function showFindId() {
    var userName = document.getElementById('userName').value
    var userCarNum = document.getElementById('userCarNum').value

    alert(userName + '님의 아이디는' + '입니다.');
    window.location.href = "login.html";
}

function showFindPassword() {
    var userId = document.getElementById('userId').value
    var userCarNum = document.getElementById('userCarNum').value

    alert(userId + '님의 비밀번호는' + '입니다.');
    window.location.href = "login.html";
  }