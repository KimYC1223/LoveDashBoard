# LoveDashBoard
카카오API 기반 커플 Status dash-board

## Database 세팅

다음과 같이 설정

``` sql
create database love_dash_board;
use love_dash_board;

CREATE TABLE users (
  id_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id CHAR(50),
  pw TEXT,
  name CHAR(20),
  gender CHAR(20),
  birth DATE,
  creation_date DATE,
  email CHAR(255),
  auth_num INT,
  is_auth BOOLEAN NOT NULL,
  couple_num INT,
  title INT
);

CREATE TABLE coupon (
  coupon_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  couple_num INT,
  name CHAR(50),
  reason TEXT,
  creation_date DATE,
  author_id INT,
  author_name CHAR(20),
  taker_id INT,
  taker_name CHAR(20),
  icon INT,
  picture TEXT
);

CREATE TABLE wish (
  wish_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  couple_num INT,
  name CHAR(50),
  creation_date DATE,
  is_issuance_immediately BOOLEAN NOT NULL,
  cost TEXT,
  reason TEXT,
  wish_state INT,
  is_dead_line BOOLEAN NOT NULL,
  deadline DATE,
  author_id INT,
  author_name CHAR(20),
  taker_id INT,
  taker_name CHAR(20),
  icon INT,
  picture TEXT
);

CREATE TABLE title_base (
  title_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT
);

CREATE TABLE title (
  title_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner INT,
  creation_date DATE
);

CREATE TABLE achievement_base (
  achievement_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  content TEXT,
  trigger_text TEXT,
  title_num INT
);

CREATE TABLE achievement (
  achievement_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner INT,
  creation_date DATE
);
```