var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "bamazon",
    port: 3306
});

connection.connect(function(err){
    if(err) throw err;
    display();
});

var display = function(){
    connection.query("SELECT * from products", function(err,res){
        if(err) throw err;
        console.log("----------------------");
        console.log("WELCOME | TO | BAMAZON");
        console.log("----------------------");
        console.log("");
        console.log("Find your products below");
        console.log("");

        console.table(res)

        userShop(res)

});
};

var userShop = function(res){
    inquirer
    .prompt([
        {
            type:"input",
            name:"productsToPurchase",
            message:"Please enter the Product Id you would like to purchase."
        },
        {
            type: "input",
            name: "quantitiesToPurchase",
            message: "How many items would you like to purchase?"
        }
    ]
    ).then(function(ans){
        var select = ans.productsToPurchase;
        var quantity = ans.quantitiesToPurchase;

        console.log('select', select);
        console.log('quantity', quantity);

        var productQuantityDB;
        var productPrice;


        for(var i = 0; i < res.length; i++){
            // console.log(res[i]);
            if(select == res[i].product_id){
                productQuantityDB = res[i].stock_quantity
                productPrice = res[i].price
            }
        }

        console.log(productPrice, productQuantityDB);

        connection.query("SELECT * FROM products WHERE product_id=?", select, function(err,res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That product does not exist. Please enter a Product Id from the list above.");
        } else {
            console.log("")
            console.log(res[0].product_name + " purchased");
            console.log(quantity + " quantity at $" + res[0].price);
            console.log("");
        }})

            var newQuantity = res[0].stock_quantity - quantity;

            connnection.query("UPDATE products SET stock_quantity = " + newQuantity + "WHERE product_id = " + res[0].product_id,
            
            function(err,res){
                if(err) throw err;
                console.log("");
                console.log("Your order is being processed. Thank you for shopping!");
                console.log("");
                connection.end();
            })
        })};
    

