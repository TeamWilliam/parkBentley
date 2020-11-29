
### npm에 mysql, ejs 확장자 설치
```
npm install mysql
npm install ejs --save
```

### mysql에 사용할 DB와 TABLE 생성
```
CREATE DATABASE my_db;

(create_db_table.txt 참고)
```

### npm 실행 
```
(npm start) or (node app.js) 
```
### DB TABLE
![db_table](https://user-images.githubusercontent.com/55631147/100452848-49537f00-30fd-11eb-9a83-d3fbe50038b4.PNG)

### DB 데이터 삽입 필요
INSERT INTO parkbentley.user (ID, PW, Name, Money, Email, CarType, CarNum) VALUES('admin', '1','','0','','','1');

INSERT INTO parkbentley.user (ID, PW, Name, Money, Email, CarType, CarNum) VALUES('root', '1','','0','','','1');
