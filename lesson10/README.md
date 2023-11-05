# Lesson 10

## How to proxy API request to your legacy endpints with serverless

## What is a Proxy API?
AN API proxy is a software element that connects to back-end services, then creates a more modern and useful API to connect to the front end.

![API Proxy](https://members.osiolabs.com/sites/default/files/tutorials/images/diagram-api-proxy.png)

Imagine you have a modern web application that needs to get information from a legacy backend that communicates in XML. Instead of making your web application talk directly to that legacy backend using XML, you can create an API proxy which the web application communicates with in JSON format. The API proxy will then translate the request from the web application into the XML format that the legacy backend is expecting, and translate the response from the backend into the JSON format the web app is expecting.

An API proxy is an interface that sits between your frontend and the actual backend services. Using an API proxy decouples the frontend from implementation details of the backend, and allows you to create a custom interface that the frontend will interact with instead of the backend itself. Some reasons to use an API proxy include the ability to perform data transformations, hide complex calls to multiple services, and cache large or slow results.