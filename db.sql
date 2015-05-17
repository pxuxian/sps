drop database if exists sps;
create database sps;
use sps;

drop table if exists t_role;
create table t_role (
	id int(11) primary key auto_increment,
	name varchar(50) not null
);
insert into t_role values (1, "普通用户");
insert into t_role values (100, "系统管理员");

drop table if exists t_user;
create table t_user (
	id int(11) primary key auto_increment,
	role_id int(11) not null,
	username varchar(50) UNIQUE not null,
	password varchar(50) not null,
	status int(11) not null
);

drop table if exists t_product_category;
create table t_product_category (
	id int(11) primary key auto_increment,
	name varchar(50) not null
);
insert into t_product_category values (null, '水果');

drop table if exists t_product;
create table t_product (
	id int(11) primary key auto_increment,
	category_id int(11) not null,
	code varchar(30),
	section_id int(11),
	name varchar(50) not null,
	descrip varchar(100),
	place varchar(50),
	spec varchar(100),
	price double(10,2),
	logo text,
	detail text,
	status int(11) not null
);
--alter table t_product add spec varchar(100) after place;


drop table if exists t_order;
create table t_order (
	id int(11) primary key auto_increment,
	number varchar(50) not null,
	create_time datetime not null,
	receiver varchar(20) not null,
	address varchar(100) not null,
	mobile varchar(20),
	telphone varchar(20),
	amount double(10,2) not null,
	postage double(10,2) not null,
	discount double(10,2) not null,
	total double(10,2) not null,
	status int(11),
	user_id int(11) not null
);

drop table if exists t_order_product;
create table t_order_product (
	id int(11) primary key auto_increment,
	order_id int(11) not null, 
	product_id int(11) not null,
	price double(10,2) not null,
	count int(11) not null
);

drop table if exists t_comment;
create table t_comment (
	id int(11) primary key auto_increment,
	user_id int(11), 
	product_id int(11) not null,
	create_time datetime not null,
	content varchar(200) not null,
	star_level int(11) not null default 5,
	status int(11) not null default 0
);
insert into t_comment values(null, 1, 1, now(), '便宜又好吃，赞！！！', 5, 0);
