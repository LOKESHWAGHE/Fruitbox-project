CREATE DATABASE FRUITBOX;
USE FRUITBOX;

CREATE TABLE Vendors (
    vendorID VARCHAR(50) PRIMARY KEY,
    vendorName VARCHAR(100) NOT NULL,
    vendorPhoneNumber VARCHAR(15),
    vendorAddress VARCHAR(255),
    vendorPassword VARCHAR(12),
    vendorEmail VARCHAR(30)
);

CREATE TABLE user (
    userID VARCHAR(10),
    userName VARCHAR(30), 
    userEmail VARCHAR(30), 
    userPassword  VARCHAR(20),
    userPhoneNumber VARCHAR(10),
    userAddress VARCHAR(255),
    PRIMARY KEY (userID)
);

CREATE TABLE Orders (
    orderID VARCHAR(50) PRIMARY KEY,
    userID VARCHAR(50),
    vendorID VARCHAR(50),
    OrderDate DATE NOT NULL,
    DeliveryDate DATE,
    Status  VARCHAR(50),
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE
);

CREATE TABLE payment (
    userID VARCHAR(50),
    paymentID VARCHAR(10), 
    orderID VARCHAR(50), 
    paymentDate DATE,
    amount FLOAT, 
    paymentMode VARCHAR(15) CHECK (paymentMode IN ('Cash on Delivery', 'UPI', 'Debit Card')),
    PRIMARY KEY (paymentID),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
        ON DELETE CASCADE
);

CREATE TABLE product (
    productID VARCHAR(50),
    vendorID VARCHAR(50),
    vendorName VARCHAR(10),
    productName VARCHAR(30),
    price FLOAT,
    quantity INT,
    PRIMARY KEY (productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE
);

CREATE TABLE Subscription (
    subs_ID INT PRIMARY KEY AUTO_INCREMENT, -- Add AUTO_INCREMENT here
    subs_Type VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    userID VARCHAR(10),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE
);
CREATE TABLE Subscription_Products (
    subs_product_id INT PRIMARY KEY AUTO_INCREMENT,
    subs_ID INT, -- Foreign key from Subscription table
    productID VARCHAR(50), -- Foreign key from product table
    quantity INT NOT NULL,
    FOREIGN KEY (subs_ID) REFERENCES Subscription(subs_ID)
        ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES product(productID)
        ON DELETE CASCADE
);





CREATE TABLE Cart (
    cartID VARCHAR(100) PRIMARY KEY,
    userID VARCHAR(10),
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE
);

CREATE TABLE SearchProduct (
    vendorID VARCHAR(50),
    productID VARCHAR(50),
    PRIMARY KEY (vendorID, productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES product(productID)
        ON DELETE CASCADE
);

select * from user;
select * from product;
select * from Cart;
select * from Vendors;
DROP DATABASE FRUITBOX;




















