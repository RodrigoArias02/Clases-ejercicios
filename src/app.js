const express = require("express");
const fs=require('fs')
const ProductManager=require("../modulos")
const ruta = "./archivos/productManager.json";

let productManager = new ProductManager(ruta);

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido</h1>");
});

// Ruta final de respuesta al cliente
app.get("/products", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let resultado = productManager.getProduct();

  // Resto de tu lógica aquí, por ejemplo, aplicar límites si es necesario
  if (req.query.limit) {
    resultado = resultado.slice(0, req.query.limit);
  }else{
    resultado = productManager.getProduct();
  }

  // Envía la respuesta como JSON

  res.status(200).json(resultado)
});



// Ruta final de respuesta al cliente
app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid; // Obtén el id del producto de req.params
  res.setHeader('Content-Type', 'application/json');
  let resultado;

  // Filtra el resultado por productId si es necesario
  if (productId !== "") {
    console.log(productId);
    resultado = await productManager.getProductById(parseInt(productId));
  }

  // Envía la respuesta como JSON
  res.send(resultado);
});


app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto:", PORT);
});
