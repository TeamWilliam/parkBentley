// ================================
// START YOUR APP HERE
// ================================
const init = {
    monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    today: new Date(),//오늘날짜
    monForChange: new Date().getMonth(),
    activeDate: new Date(),
    //어떤 달의 첫번째 날
    getFirstDay: (yy, mm) => new Date(yy, mm, 1),
    //어떤 달의 마지막 날
    //mm = new Date().getMonth() : 해당 월 -1
    getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
    //다음 버튼 누르면 다음 달로
    nextMonth: function () {
      let d = new Date(); //오늘 날짜 받아옴
      d.setDate(1); //날짜를 1일로 셋팅
      d.setMonth(++this.monForChange);//다음 달로 바꿔줌
      this.activeDate = d;
      return d;
    },
    //이전 버튼 누르면 전 달로 
    prevMonth: function () {
      let d = new Date();//오늘 날짜
      d.setDate(1);//1일로 셋팅
      d.setMonth(--this.monForChange);
      this.activeDate = d;
      return d;
    },
    //일의 자리이면 앞에 0붙여줌 - 어디서 실행되는지..?
    addZero: (num) => (num < 10) ? '0' + num : num,

    activeDTag: null,

    //
    getIndex: function (node) {
      let index = 0;
      while (node = node.previousElementSibling) {
        index++;
      }
      return index;
    }
  };
  
  const $calBody = document.querySelector('.cal-body');
  const $btnNext = document.querySelector('.btn-cal.next');
  const $btnPrev = document.querySelector('.btn-cal.prev');
  
  /**
   * @param {number} date
   * @param {number} dayIn
  */
  function loadDate (date, dayIn) {
    document.querySelector('.cal-date').textContent = date;
    document.querySelector('.cal-day').textContent = init.dayList[dayIn];
  }
  
  /**
   * @param {date} fullDate
   */
  //날짜 출력
  function loadYYMM (fullDate) {
    let yy = fullDate.getFullYear();//년도 가져오기
    let mm = fullDate.getMonth();//월 가져오기
    let firstDay = init.getFirstDay(yy, mm);//첫날 가져오기
    let lastDay = init.getLastDay(yy, mm);//마지막 날 가져오기
    let markToday;  // 오늘 날짜 할당
    //오늘 날짜 표시
    if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
      markToday = init.today.getDate();
    }
    //달 출력
    document.querySelector('.cal-month').textContent = init.monList[mm];
    //년도 출력
    document.querySelector('.cal-year').textContent = yy;
  
    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
      trtd += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && !startCount && j === firstDay.getDay()) {
          startCount = 1;
        }
        if (!startCount) {
          trtd += '<td>'
        } else {
          let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
          trtd += '<td class="day';
          trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"';
          trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
        }
        trtd += (startCount) ? ++countDay : '';
        if (countDay === lastDay.getDate()) { 
          startCount = 0; 
        }
        trtd += '</td>';
      }
      trtd += '</tr>';
    }
    $calBody.innerHTML = trtd;
  }

//   todoList
  
  /**
   * @param {string} val
   */
//   function createNewList (val) {
//     let id = new Date().getTime() + '';
//     let yy = init.activeDate.getFullYear();
//     let mm = init.activeDate.getMonth() + 1;
//     let dd = init.activeDate.getDate();
//     const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);
  
//     let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);
  
//     let eventData = {};
//     eventData['date'] = date;
//     eventData['memo'] = val;
//     eventData['complete'] = false;
//     eventData['id'] = id;
//     init.event.push(eventData);
//     $todoList.appendChild(createLi(id, val, date));
//   }
  //날짜 출력
  loadYYMM(init.today);
  //오늘 날짜 회색박스
  loadDate(init.today.getDate(), init.today.getDay());
  //>버튼 누르면 다음달 출력
  $btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
  //<버튼 누르면 이전달 출력
  $btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));
  //
  $calBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('day')) {
      if (init.activeDTag) {
        init.activeDTag.classList.remove('day-active');
      }
      let day = Number(e.target.textContent);
      loadDate(day, e.target.cellIndex);
      e.target.classList.add('day-active');
      init.activeDTag = e.target;
      init.activeDate.setDate(day);
      reloadTodo();
    }
  });