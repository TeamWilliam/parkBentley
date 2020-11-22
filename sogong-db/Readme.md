
### npm에 mysql, ejs 확장자 설치
```
npm install mysql
npm install ejs --save
```

### mysql에 사용할 DB와 TABLE 생성
```
CREATE DATABASE my_db;

CREATE TABLE BOARD(
    ID VARCHAR(50),
    TITLE VARCHAR(200),
    CONTENT VARCHAR(1000),
    WDATE DATE
);
```

### npm 실행 
```
(npm start) or (node app.js) 
```
### DB TABLE
![db_table](https://user-images.githubusercontent.com/55631147/99897645-81faef00-2cde-11eb-9272-76da7bf1138b.PNG)
