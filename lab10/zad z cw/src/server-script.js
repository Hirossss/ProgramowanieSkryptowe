// const http = require('node:http');
// const { URL } = require('node:url');

import http from "node:http";
import { URL } from "node:url";

/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

function serveStaticFile(response, filePath, contentType) {
  const fileStream = fs.createReadStream(filePath);

  // Set the appropriate content type in the response header
  response.writeHead(200, { "Content-Type": contentType });

  // Pipe the file stream to the response object
  fileStream.pipe(response);
}

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);
  /* ************************************************** */
  // if (!request.headers['user-agent'])
  if (url.pathname !== "/favicon.ico")
    // View detailed URL information
    console.log(url);

  /* ******** */
  /* "Routes" */
  /* ******** */

  /* ---------------- */
  /* Route "GET('/')" */
  /* ---------------- */
  if (url.pathname === "/" && request.method === "GET") {
    // Serve the main HTML file
    const filePath = path.join(__dirname, "path/to/your/main.html");
    serveStaticFile(response, filePath, "text/html; charset=utf-8");
    /* ************************************************** */
  } else if (url.pathname === "/" && request.method === "POST") {
    // Handling POST requests to "/"
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      // Assuming the body contains form-encoded data, parse it
      const formData = new URLSearchParams(body);
      const name = formData.get("name");

      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.write(`Hello ${name}`);
      response.end();
    });
  } else if (url.pathname === "/submit" && request.method === "GET") {
    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
    /* ************************************************** */
    // Creating an answer header — we inform the browser that the returned data is plain text
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    /* ************************************************** */
    // Place given data (here: 'Hello <name>') in the body of the answer
    response.write(`Hello ${url.searchParams.get("name")}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
    /* ************************************************** */
    response.end(); // The end of the response — send it to the browser
  } else {
    /* ---------------------- */
    /* If no route is matched */
    /* ---------------------- */
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
