import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser"; 

let students = [
  {
    firstName: "Jan",
    lastName: "Kowalski",
  },
  {
    firstName: "Anna",
    lastName: "Nowak",
  },
];

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();


app.locals.pretty = app.get("env") === "development"; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

// Ustaw ścieżkę do folderu ze szablonami
const templatesPath = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(templatesPath, "templates"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); // Dodalem body parser pomiedzy, via stackoverflow.
app.use(express.static("static"));

/* ******** */
/* "Routes" */
/* ******** */

app.get("/", (request, response) => {
  response.render("index", { students: students }); // Render the 'index' view
});

app.get("/submit", (request, response) => {
  response.render("submit", { name: request.query.name });
});

app.post("/", (request, response) => {
  response.render("submit", { name: request.body.name });
});

/* ************************************************ */

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
