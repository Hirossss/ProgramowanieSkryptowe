// src/server_script2.js

import http from "node:http";
import fs from "node:fs";
import { URL } from "node:url";

const wpisyPath = "wpisy.txt";

function publikuj_wpis(name, message) {
  const entry = `${name}: ${message}\n`;

  try {
    fs.appendFileSync(wpisyPath, entry, "utf-8");
    console.log("Wpis został opublikowany.");
  } catch (error) {
    console.error("Błąd podczas dodawania wpisu do księgi gości:", error);
  }
}

function wyswietlWpisy(response) {
  try {
    const wpisy = fs.readFileSync(wpisyPath, "utf-8");
    response.write(`
      <div>
        <h2>Guestbook Entries</h2>
        <pre>${wpisy}</pre>
      </div>
    `);
  } catch (error) {
    console.error("Błąd podczas odczytu pliku z wpisami:", error);
  }
}

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Guestbook</title>
        </head>
        <body>
          <main>
            <h1>Guestbook</h1>
            <form method="POST" action="/submit">
              <label for="name">Name:</label>
              <input name="name" required>
              <br>
              <label for="message">Message:</label>
              <textarea name="message" required></textarea>
              <br>
              <input type="submit" value="Submit">
              <input type="reset">
            </form>
          </main>
    `);

    // Wyświetl wpisy po formularzu
    wyswietlWpisy(response);

    response.write(`
        </body>
      </html>
    `);
    response.end();
  } else if (url.pathname === "/submit" && request.method === "POST") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      const formData = new URLSearchParams(body);
      const name = formData.get("name");
      const message = formData.get("message");

      if (name && message) {
        publikuj_wpis(name, message);
        response.writeHead(302, { Location: "/" });
      } else {
        response.writeHead(400, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.write("Bad Request: Name and message are required.");
      }

      response.end();
    });
  } else {
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

const server = http.createServer(requestListener);
const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('To stop the server, press "CTRL + C"');
});
