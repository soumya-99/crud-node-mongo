const express = require("express")
const mongoose = require("mongoose")

const Product = require("./models/productModel")

const app = express()

// JSON Middleware
app.use(express.json())

// routes
app.get("/", (req, res) => {
	res.send("Hello World")
})

app.post("/product", async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
})

mongoose
	.connect(
		"mongodb+srv://admin:pass@soumyaapi.c1g2djr.mongodb.net/Node-API?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Connected to database")
		app.listen(3000, () => {
			console.log("Server is running on port 3000")
		})
	})
	.catch((err) => {
		console.log(err)
	})
