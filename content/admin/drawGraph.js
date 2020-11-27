function draw()
{
 var xytitle = new Array('일자별 유저상세 통계', "수치");
 // x축, y축 이름


 var vg = new chartGallery(30, 9);
 // 막대그래프 넓이, 높이 크기


 vg.addData(val);
 // 막대그래프 data

// 2개 이상 추가시   vg.addData(val2);
 
 vg.makeCanvas("#FFFFFF");
 vg.makeChartTitle("Character Statistic", "#C1DBEC", "black");

//막대 그래프 제목
 vg.make2DCoordinates("NONE", xytitle, "RIGHT_TOP");
 
 vg.make2DScale("1", 5);

// (막대그래프 갯수,  y축 값 표시 갯수)
 vg.makeBar(true);

// 막대그래프 x축 바 표시 이름
 
 var ss = vg.display();

 //gArea.innerHTML = '<xml id="test">' + ss + '</xml>';
 //alert(gArea.innerHTML);
 gArea.innerHTML = ss;
}