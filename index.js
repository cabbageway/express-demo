const courses = require("./routes/courses.js");
const kunden = require("./routes/kunden.js");
//const customers = require("./routes/customers.js");
const express = require("express"); // returns a function
const app = express(); // Aufruf der Function und wir 
app.use(express.json()); // adding a piece of middleware
// using the middleware mit app.use

// routes für /api/courses importieren
//Parameter: für die Routen api/courses nutze das importierte Routerobjekt
app.use("/", courses);
app.use("/api/kunden", kunden);

//app.use("/api/customers", customers);


// bekommen ein Objekt dass wir app nennen
// dieses hat viele Methodeen (get, , post, put ...)

// Mehtoden haben Parameter 
// die Route (Path oder Url) und dann eine Callbackfunction was getan wird
// wenn die Route aufgerufen wird.
// Die Callback Funktion hat zwei Argumente Objekt req und res mit einer Menge von 
// Methoden 
// Callbackfunktion heisst auch Routehandler



app.get('/', (req, res) => {
    res.send("hello");
});

app.get("/help", (req, res) => {
    res.send("aus Hilfe");
})


// PORT kann aus dem aktuellen Processobjekt gelesen werden
// oder auf 3000 wenn nicht gesetzt.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));