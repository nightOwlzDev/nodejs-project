const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Productmodule = require("./module/productmodule");
const Ordermodule = require("./module/ordermodule");
const Usermodule = require("./module/usermodule");


const app = express()
let cors = require('cors');

let productmodule = new Productmodule();
let ordermodule = new Ordermodule();
let usermodule = new Usermodule()

const port = process.env.PORT || 9000;

app.use(cors({ origin:'http://localhost:3000'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/luvreadproject", { useNewUrlParser: true })

// ดึงข้อมูล products ทั้งหมด
app.get("/products", productmodule.getProduct);

// ดึงข้อมูล products ตาม id
app.get("/product/:id", productmodule.getProductByid);

// อัพเดทข้อมูล products ตาม id
app.put("/product/:id", productmodule.updateProduct);

// ลบข้อมูล products ที่ต้องการ
app.delete("/products/:id", productmodule.delProduct);

// เพิ่มข้อมูล products 
app.post("/products", productmodule.addProduct);

// ดึงข้อมูล orders ทั้งหมด
app.get("/orders", ordermodule.getOrder);

// เพิ่มข้อมูล orders 
app.post("/orders", ordermodule.addOrder);

// ลบข้อมูล orders ที่ต้องการ
app.delete("/orders/:id", ordermodule.delOrder);

// เพิ่ม user
app.post("/users" , usermodule.addUser);


app.listen(port, () => {
  console.log("Application is running on port 9000");
});