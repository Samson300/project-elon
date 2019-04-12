create table users (
    id serial primary key, 
    first_name varchar(100), 
    last_name varchar(100),
    account_name varchar(20),
    email varchar(50),
    password varchar(500)
);

create table space (
    id serial primary key,
    name varchar(100),
    space_location varchar (100)
);



create table facts (
	id serial primary key,
	saying varchar(500)
    
);

create table comments (
    id serial primary key,
    content varchar(500), 
    user_id integer references users(id),
    fact_id integer references facts(id)
);

