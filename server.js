const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin:9462453593@cluster0.c3ewld7.mongodb.net/eightyrasta")

//create a data schema 
const detailsSchema = {
    name: String,
    phone: String
}
const details = mongoose.model("details",detailsSchema);

const orderSchema = new mongoose.Schema({
    cartContent: String
});

const Order = mongoose.model("Order", orderSchema);


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.get("/customer-login.html", function(req, res) {
  res.sendFile(__dirname + "/customer-login.html");
})

app.get("/admin-access.html", function(req, res) {
    res.sendFile(__dirname + "/admin-access.html");
  })

app.get("/menu.html", function(req, res) {
    res.sendFile(__dirname + "/menu.html");
  })  

app.get("/thanks.html", function(req, res) {
    res.sendFile(__dirname + "/thanks.html");
  })  

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

/*app.get("/index.ejs", function(req, res) {
    res.sendFile(__dirname + "/index.ejs");
  })*/ 

app.get("/style1.css", function (req, res) {
    res.sendFile(__dirname + "/style1.css");
});

app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/style.css");
});

app.get("/style2.css", function (req, res) {
    res.sendFile(__dirname + "/style2.css");
});

app.get("/style3.css", function (req, res) {
    res.sendFile(__dirname + "/style3.css");
});

app.get("/style4.css", function (req, res) {
    res.sendFile(__dirname + "/style4.css");
});

app.get("/script.js", function (req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.get("/logo.png", function (req, res) {
    res.sendFile(__dirname + "/logo.png");
});

app.get("/restaurant-bg.jpeg", function (req, res) {
    res.sendFile(__dirname + "/restaurant-bg.jpeg");
});

app.get("/salad.jpeg", function (req, res) {
    res.sendFile(__dirname + "/salad.jpeg");
});

app.get("/vegan.jpeg", function (req, res) {
    res.sendFile(__dirname + "/vegan.jpeg");
});

app.get("/seafood.jpeg", function (req, res) {
    res.sendFile(__dirname + "/seafood.jpeg");
});


app.get("/background.jpeg", function (req, res) {
    res.sendFile(__dirname + "/background.jpeg");
});

app.get("/chef.jpeg", function (req, res) {
    res.sendFile(__dirname + "/chef.jpeg");
});

app.get("/food1.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food1.jpeg");
});

app.get("/food2.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food2.jpeg");
});

app.get("/food3.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food3.jpeg");
});
app.get("/food4.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food4.jpeg");
});

app.get("/food5.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food5.jpeg");
});

app.get("/food6.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food6.jpeg");
});
app.get("/food7.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food7.jpeg");
});

app.get("/food8.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food8.jpeg");
});

app.get("/food9.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food9.jpeg");
});
app.get("/food10.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food10.jpeg");
});

app.get("/food11.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food11.jpeg");
});

app.get("/food12.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food12.jpeg");
});
app.get("/food13.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food13.jpeg");
});

app.get("/food14.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food14.jpeg");
});

app.get("/food15.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food15.jpeg");
});

app.get("/food16.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food16.jpeg");
});
app.get("/food17.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food17.jpeg");
});

app.get("/food18.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food18.jpeg");
});

app.get("/food19.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food19.jpeg");
});

app.get("/food20.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food20.jpeg");
});

app.get("/food21.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food21.jpeg");
});

app.get("/food22.jpeg", function (req, res) {
    res.sendFile(__dirname + "/food22.jpeg");
});

app.post("/customer-login.html",function(req, res){
    let newdetails = new details({
        name: req.body.name,
        phone:req.body.phone
    })
    newdetails.save();
    res.redirect('/menu.html');
   
})


/*app.post("/place-order", function (req, res) {
    const cartData = req.body;
    const cartContentString = JSON.stringify(cartData); // Convert cart data to a string
    const newOrder = new Order({ cartContent: cartContentString }); // Save the cart content string
    newOrder.save()
        .then(() => {
            res.status(200).send("Order placed successfully");
        })
        .catch(err => {
            console.error("Error saving order:", err);
            res.status(500).send("Failed to save order");
        });
});*/

/*app.post("/place-order", function(req, res) {
    const cartContent = req.body;
    const newOrder = new Order({ cartContent });
    newOrder.save()
        .then(() => {
            res.status(200).send("Order placed successfully");
        })
        .catch(err => {
            console.error("Error saving order:", err);
            res.status(500).send("Failed to save order");
        });
});*/

app.post("/place-order", function(req, res) {
    const cartContent = req.body;
    const newOrder = new Order({ cartContent });
    newOrder.save()
        .then(savedOrder => {
            // Send the saved order ID back to the client
            res.status(200).json({ orderId: savedOrder._id });
        })
        .catch(err => {
            console.error("Error saving order:", err);
            res.status(500).send("Failed to save order");
        });
});

app.get("/index.ejs", async (req, res) => {
    try {
        const orders = await Order.find({});
        res.render('index', {
            orderList: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.listen(3000, function() {
    console.log("server is running");
})
