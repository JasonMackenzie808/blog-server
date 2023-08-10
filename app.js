const express = require("express");
const app = express();
const routesController = require("./controllers/routes");

let PORT = 4000;

app.use(express.json());
// ! This (express.json()) will allow us to send a payload or request object to our server and our routes will be able to parse it.

app.use(express.static(`${__dirname}/public`));
 
// Let app.js file know about the endpoint we would like create and use the controller file we created.

app.use("/routes", routesController)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });