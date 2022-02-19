import express from 'express';

const app = express();

app.get("/", (req, res) => {
    var resultString = "Query Parameters: ";
    for (var query in req.query) {
        const value = req.query[query];
        if (value) {
            resultString += "\n" + query + " = " + value;
        }
    }
    res.setHeader("content-type", "text/plain");
    res.send(resultString);
});

app.listen(3000, () => {
    console.log("Application started on port 3000!");
});