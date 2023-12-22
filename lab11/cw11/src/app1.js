import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser"; // Import body-parser

const app = express();

/* ************************************************ */
/* Determining the contents of the middleware stack *
/* ************************************************ */

app.use(morgan("dev")); // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
app.use(bodyParser.urlencoded({ extended: true })); // Dodalem body parser pomiedzy, via stackoverflow.

/* ******** */
/* "Routes" */
/* ******** */

/* ---------------- */
/* Route "GET('/')" */
/* ---------------- */
app.get("/", (request, response) => {
  // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>First Express application</title>
       </head>
       <body>
          <main>
             <h1>First Express application</h1>
             <form method="GET" action="/submit">
                <label for="name">Give your name</label>
                <input name="name">
                <br>
                <input type="submit">
                <input type="reset">
             </form>
          </main>
       </body>
    </html>    
           `); // Send the response to the browser
});

/* ---------------------- */
/* Route "GET('/submit')" */
/* ---------------------- */
app.get("/submit", (request, response) => {
  // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
  /* ************************************************** */
  // Setting an answer header — we inform the browser that the returned data is plain text
  response.set("Content-Type", "text/plain");
  /* ************************************************** */
  // Place given data (here: 'Hello <name>') in the body of the answer
  response.send(`Hello ${request.query.name}`); // Send a response to the browser
});

app.post("/",(request, response) => {
  // Processing the form content for POST requests
  response.set("Content-Type", "text/plain");
  response.send(`Hello ${request.body.name}`);
});    

/* ************************************************ */
// The application is to listen on port number 8000
app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
