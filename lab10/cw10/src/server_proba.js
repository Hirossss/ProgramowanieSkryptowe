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
            <h1>Guest Book</h1>
            <form method="GET" action="/submit">
              <label for="name">Name:</label>
              <input name="name" required>
              <br>
              <label for="message">Message:</label>
              <textarea name="message" required></textarea>
              <br>
              <input type="submit">
              <input type="reset">
            </form>
            <h2>Previous Entries</h2>
              <ul>
                ${getGuestBookEntries()
                  .map(
                    (entry) => `
                    
                    <strong>${entry.split(" ")[0]}</strong>
                    <p>${entry.slice(entry.indexOf(" ") + 1)}</p>
                    
                    `
                  )
                  .join("")}
                </ul>
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
              <h1>Guest Book</h1>
              <form method="GET" action="/submit">
                <label for="name">Name:</label>
                <input name="name" required>
                <br>
                <label for="message">Message:</label>
                <textarea name="message" required></textarea>
                <br>
                <input type="submit">
                <input type="reset">
              </form>
              <h2>Previous Entries</h2>
                <ul>
                ${getGuestBookEntries()
                    .map(
                    (entry) => `
                    
                    <strong>${entry.split(" ")[0]}</strong>
                    <p>${entry.slice(entry.indexOf(" ") + 1)}</p>
                    
                    `
                    )
                    .join("")}
                </ul>
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
