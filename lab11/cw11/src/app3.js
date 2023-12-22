import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser"; 
import { MongoClient } from "mongodb"; 

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

app.get("/", async function (request, response) {
  try {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();

    const db = client.db("AGH");
    const collection = db.collection("students");

    const students = await collection.find({}).toArray();

    console.log(students)
    response.render("index", { students: students });
    client.close()
  } catch (error) {
    console.error("Błąd podczas pobierania danych z bazy:", error);
    response.status(500).send("Błąd serwera");
  }
});

app.get("/WI", async function (request, response) {
  try {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();

    const db = client.db("AGH");
    const collection = db.collection("students");

    const students = await collection.find({}).toArray();

    const hasFacultyFlag = true;

    console.log(students);
    response.render("index", { students: students, hasFacultyFlag });
    client.close();
  } catch (error) {
    console.error("Błąd podczas pobierania danych z bazy:", error);
    response.status(500).send("Błąd serwera");
  }
});

app.get("/submit", (request, response) => {
  response.render("submit", { name: "request" });
});

app.post("/", (request, response) => {
  response.render("submit", { name: request.body.name });
});

/* ************************************************ */

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
