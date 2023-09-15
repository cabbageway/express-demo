const express = require("express");
//const app = express(); // Aufruf der Function express geht hier nicht 
//Funktioniert hier nicht 
// Es wird ein Routerobject benötigt.
const router = express.Router(); // wir bekommen mit der Methode Router
//ein Routerobject und nennen es statt app nun Router
//mit F2 alle app umbenennen.
//Das Router Objekt wird dann ganz unten aus dem Modul exportiert.

const courses = [{ id: 1, name: "latin" },
    { id: 2, name: "german" },
    { id: 3, name: "math" }
];

router.get("/api/courses/", (req, res) => {
    // Array of three numbers
    res.send(courses);
})

// route mit einem id 
router.get("/api/courses/:id", (req, res) => {
    // Array of three numbers
    console.log("Hallo");
    console.log(req.params.id);
    res.send(req.params.id);
})

//all posts für ein Jahr und Monat
router.get("/api/courses/api/:month/:year", (req, res) => {
    console.log(req.params.year + " " + req.params.month);
    res.send(req.params);
})

//query Sting parameter mit ?
router.get("/api/courses/posts/:month", (req, res) => {
    console.log(req.query);
    res.send(req.query);
})

// Get Request single Course vom Array courses Array von objects

router.get("/singleCourse/:id", (req, res) => {
    const nr = req.params.id;
    console.log(nr);
    if (nr > -1 && nr < 3)
        res.send("gewählter Kurs: " + courses[nr].name);
    else res.send("falsche Auswahl");
})

router.get("/singleCourseFind/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course was not found");
    else res.send(course);
})

// post Endpoint
router.post("/api/courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name // parsing des body wird erst durch app.use(express.json()) enabled
    };
    courses.push(course);
    res.send(course); // geht im body zurück damit der Client
    // es eventuell nützen kann 

})

// post Endpoint
router.post("/api/coursesValidation", (req, res) => {

    if ((!req.body.name) || req.body.name.length < 3) {
        res.status(400).send("Name required or min 3 character");
        return; // damit er den Rest der Funktion nicht mehr durchmacht.
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name // parsing des body wird erst durch app.use(express.json()) enabled
    };
    courses.push(course);
    res.send(course); // geht im body zurück damit der Client
    // es eventuell nützen kann 

})

// put Endpoint
router.put("/api/courses/:id", (req, res) => {
    // Look up the courses
    // if not existing 404
    /*   const course = courses.find((c) => {
          // console.log(c.id === parseInt(req.params.id));
          c.id === parseInt(req.params.id);

      }); */
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //console.log(course);
    if (!course) {
        res.status(404).send("Kurs nicht enthalten");
        return;
    }

    // Validate body content
    // if invalid return 400 Bad Request
    else if ((!req.body.name) || req.body.name.length < 3) {
        res.status(400).send("Name required or min 3 character");
        return; // damit er den Rest der Funktion nicht mehr durchmacht.
    }

    // Update Course
    // Return the updated course
    else {
        console.log("bin da");
        console.log(parseInt(req.params.id));
        console.log(courses[1].name);
        courses[parseInt(req.params.id) - 1].name = req.body.name;
        res.send(courses[parseInt(req.params.id) - 1]);

    }
})


// Delete Endpoint
router.delete("/api/courses/:id", (req, res) => {
    // Look up course
    // 404 Error
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send("Kurs nicht enthalten");
    // return; //cleaner und code Block


    // Delete
    const index = courses.indexOf(course); // holt sich den Index im Array
    courses.splice(index, 1);
    res.send(course);
})


module.exports = router;