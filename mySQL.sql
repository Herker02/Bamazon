DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
product_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(product_id)
 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jumprope","excercise", 9.99 ,100),
("cellphone case","electronics", 5.50,200),
("drone","electronics", 149.99 ,20),
("curtains","home decor", 12.00 ,50),
("vase","home decor", 8.99 ,100),
("black pants","clothing", 20.00 ,200),
("sweater","clothing", 35.99 ,100),
("pre-workout","excercise", 25.50 ,75),
("earrings","jewelry", 14.99 ,50),
("necklace","jewelry", 50.00 ,100),
("vest","clothing", 9.99 ,150);
