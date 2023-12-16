import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname !== "/favicon.ico") {
    console.log(url);
  }

  if (url.pathname === "/" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Guest Book</title>
        </head>
        <body>
          <main>
            <h1>Księga gości</h1>
              <ul>
                ${getGuestBookEntries()
                  .map((entry) => {
                    // Dzielimy linię na tablicę słów
                    const words = entry.split(" ");

                    // Przypisujemy pierwsze dwa słowa do zmiennej name
                    const name = words.slice(0, 2).join(" ");

                    // Przypisujemy resztę słów jako wiadomość
                    const message = words.slice(2).join(" ");

                    return `
                      <h2>${name}</h2>
                      <p>${message}</p>
                    `;
                  })
                  .join("")}
                </ul>
            <form method="GET" action="/submit" style="width: 90%;">
                <h2>Nowy wpis:</h2>
                <label for="name">Twoje Imię i Nazwisko</label>
                <br>
                <input name="name" required style="width: 100%; height: 30px; margin-top: 10px; margin-bottom: 20px;">
                <br>
                <label for="message">Treść wpisu</label>
                <br>
                <textarea name="message" required style="width: 100%;height: 50px; margin-top: 10px; margin-bottom: 20px;"></textarea>
                <br>
                <input type="submit" value="Dodaj wpis">
            </form>
          </main>
        </body>
      </html>
    `);
    response.end();
  } else if (url.pathname === "/submit" && request.method === "GET") {
    const name = url.searchParams.get("name");
    const message = url.searchParams.get("message");

    if (name && message) {
      const entry = `${name} ${message}`;
      addGuestBookEntry(entry);

      // Respond with the submitted entry added to the existing page
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Guest Book</title>
          </head>
          <body>
            <main>
              <h1>Księga gości</h1>
                <ul>
                  ${getGuestBookEntries()
                    .map((entry) => {
                      // Dzielimy linię na tablicę słów
                      const words = entry.split(" ");

                      // Przypisujemy pierwsze dwa słowa do zmiennej name
                      const name = words.slice(0, 2).join(" ");

                      // Przypisujemy resztę słów jako wiadomość
                      const message = words.slice(2).join(" ");

                      return `
                        <h2>${name}</h2>
                        <p>${message}</p>
                      `;
                    })
                    .join("")}
                  </ul>
              <form method="GET" action="/submit" style="width: 90%;">
                  <h2>Nowy wpis:</h2>
                  <label for="name">Twoje Imię i Nazwisko</label>
                  <br>
                  <input name="name" required style="width: 100%; height: 30px; margin-top: 10px; margin-bottom: 20px;">
                  <br>
                  <label for="message">Treść wpisu</label>
                  <br>
                  <textarea name="message" required style="width: 100%;height: 50px; margin-top: 10px; margin-bottom: 20px;"></textarea>
                  <br>
                  <input type="submit" value="Dodaj wpis">
              </form>
            </main>
          </body>
        </html>
      `);
      response.end();
    } else {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.write("Error 400: Bad Request");
      response.end();
    }
  } else {
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

function getGuestBookEntries() {
  try {
    const data = fs.readFileSync("guestbook.txt", "utf8");
    return data.split("\n").filter((entry) => entry.trim() !== "");
  } catch (err) {
    console.error("Error reading guest book file:", err.message);
    return [];
  }
}

function addGuestBookEntry(entry) {
  try {
    fs.appendFileSync("guestbook.txt", entry + "\n", "utf8");
  } catch (err) {
    console.error("Error writing to guest book file:", err.message);
  }
}

const server = http.createServer(requestListener);
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
