const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/playground')
    // Async Befehl Returned ein Promise
    // Debug Modul
    .then(() => console.log("connected to MongoDB..."))
    .catch(err => console.log("not conected to Mongo", err));

// connection nicht notwendig

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
});

const Customer = mongoose.model("Customer", customerSchema);

//create Object

const customer = new Customer({
    isGold: true,
    name: "Firma Trummer",
    phone: "+4365011223344"
})

async function createCustumer() {
    const result = await customer.save() // async
    console.log(result);

}
createCustumer();

// Route holen des Customer


// wird jetzt eine async Funktion weil ja die DB im Spiel ist

router.get("/", async(req, res) => {
    const foundCustomer = await Customer.find();
    console.log(foundCustomer);
    res.send(foundCustomer);
})

module.exports = router;