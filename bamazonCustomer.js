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
    userShop();
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

    var table = new Table({
        head: ["Product ID","Product Name"," Department ID","Price","Stock Quantity"],
        colAligns: [6,12,12,6,6],
        style:{
        head: ["aqua"],
        compact: true
        }
    });
    for(var i = 0; i < res.length; i++){
        table.push([res[i].product_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
    }
    console.log(table.toString());
    console.log("");
});
};

var userShop = function(){
    inquirer
    .prompt({
        type:"input",
        name:"productsToPurchase",
        message:"Please enter the Product Id you would like to purchase."
    }).then(function(ans){
        var select = ans.productsToPurchase;
        connection.query("SELECT * FROM products WHERE product_id=?", select, function(err,res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That product does not exist. Please enter a Product Id from the list above.");
            
            userShop();
        }else{
            inquirer
            .prompt({
                type: "input",
                name: "quantitiesToPurchase",
                message: "How many items would you like to purchase?"
            }).then(function(ans2){
                var quantity = ans2.quantitiesToPurchase;
                if(quantity > res[0].stock_quantity){
                    console.log("We're sorry, we only have " + res[0].stock_quantity + " items of the product chosen left");
                    userShop();
                }else {
                    console.log("")
                    console.log(res[0].product_name + " purchased");
                    console.log(quantity + " quantity at $" + res[0].price);
                    console.log("");

                    var newQuantity = res[0].stock_quantity - quantity;
                    connnection.query("UPDATE products SET stock_quantity = " + newQuantity + "   WHERE product_id = " + res[0].product_id), 
                    function(err){
                        if(err) throw err;
                        console.log("");
                        console.log("Your order is being processed");
                        console.log("Thank you for shopping!");
                        console.log("");
                        connection.end();
                    }
                };
            });
         };
        });
    });
};

