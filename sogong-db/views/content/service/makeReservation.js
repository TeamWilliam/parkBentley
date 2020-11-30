function Check(form){
  //'확인' 버튼을 클릭했을 때 실행되는 메서드
  var cnt=0;
  var msg = "";
  if (form.cb0.checked){
    msg += form.cb0.value + "\n";
    cnt +=1;
  }if (form.cb1.checked){
    msg += form.cb1.value + "\n";
    cnt +=1;
  }if (form.cb2.checked){
    msg += form.cb2.value + "\n";
    cnt +=1;
  }if (form.cb3.checked){
    msg += form.cb3.value + "\n";
    cnt +=1;
  }if (form.cb4.checked){
    msg += form.cb4.value + "\n";
    cnt +=1;
  }if (form.cb5.checked){
    msg += form.cb5.value + "\n";
    cnt +=1;
  }if (form.cb6.checked){
    msg += form.cb6.value + "\n";
    cnt +=1;
  }if (form.cb7.checked){
    msg += form.cb7.value + "\n";
    cnt +=1;
  }if (form.cb8.checked){
    msg += form.cb8.value + "\n";
    cnt +=1;
  }if (form.cb9.checked){
    msg += form.cb9.value + "\n";
    cnt +=1;
  }if (form.cb10.checked){
    msg += form.cb10.value + "\n";
    cnt +=1;
  }if (form.cb11.checked){
    msg += form.cb11.value + "\n";
    cnt +=1;
  }if (form.cb12.checked){
    msg += form.cb12.value + "\n";
    cnt +=1;
  }if (form.cb13.checked){
    msg += form.cb13.value + "\n";
    cnt +=1;
  }if (form.cb14.checked){
    msg += form.cb14.value + "\n";
    cnt +=1;
  }if (form.cb15.checked){
    msg += form.cb15.value + "\n";
    cnt +=1;
  }if (form.cb16.checked){
    msg += form.cb16.value + "\n";
    cnt +=1;
  }if (form.cb17.checked){
    msg += form.cb17.value + "\n";
    cnt +=1;
  }if (form.cb18.checked){
    msg += form.cb18.value + "\n";
    cnt +=1;
  }if (form.cb19.checked){
    msg += form.cb19.value + "\n";
    cnt +=1;
  }if (form.cb20.checked){
    msg += form.cb20.value + "\n";
    cnt +=1;
  }if (form.cb21.checked){
    msg += form.cb21.value + "\n";
    cnt +=1;
  }if (form.cb22.checked){
    msg += form.cb22.value + "\n";
    cnt +=1;
  }if (form.cb23.checked){
    msg += form.cb23.value + "\n";
    cnt +=1;
  }
  
  //나중에 바꾸기
  alert(msg+','+cnt);
}


// function Check(form){
//   //'확인' 버튼을 클릭했을 때 실행되는 메서드
//   var msg = "";
//   if (form.cb1.checked)
//       msg += form.cb1.value + "\n";
//   if (form.cb2.checked)
//       msg += form.cb2.value + "\n";
//   if (form.cb3.checked)
//       msg += form.cb3.value + "\n";
//   alert(msg);
// }
// var div2 = document.getElementsByClassName("div2");

// function handleClick(event) {
//   event.target.classList.add("clicked");
// }

// function init() {
//   for (var i = 0; i < div2.length; i++) {
//       div2[i].addEventListener("click", handleClick);
//   }
// }

// init();