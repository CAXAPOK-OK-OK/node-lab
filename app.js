const http = require("http");
const url = require("url");
const { parse } = require("querystring");
const express = require("express");

const host = "127.0.0.1";
const port = 3000;
const users = [
  { userId: 1, id: 1, name: "Margo" },
  { userId: 1, id: 2, name: "Margosha" },
];
const us = { user_agent: 0 };

var server = http.createServer(function (request, response) {
  console.log("URL: " + request.url);
  if (request.method == "GET") {
    //let urlReques = url.parse(request.url, true);
    if (request.url === "/") {
      response.end("Hello word");
    } else if (request.url == "/stats") {
      response.statusCode = 200;
      us.user_agent++;
      response.setHeader("Content-Type", "text/html");
      response.end(`<table>
      <tr><th>User-agent:</th><th>Request:</th></tr>
      <tr><td>${request.headers["user-agent"]}</td><td>${us.user_agent}</td></tr>
      </table>`);
    }
  } else if (request.method == "POST") {
    if (request.url == "/comments") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(users));
    }
  }
});

server.listen(port, host);
console.log(`Сервер начал прослушивание запросов по адресу ${host}:${port}`);
