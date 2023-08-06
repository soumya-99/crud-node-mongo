const express = require("express")
const mongoose = require("mongoose")

const Product = require("./models/productModel")

const app = express()

// JSON Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for key-value pairs check // not working

// routes
app.get("/", (req, res) => {
	res.send("Hello World")
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/products", async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
})

app.put("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: `Product not found with ID ${id}` })
        }
        const updated = await Product.findById(id)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: `Product not found with ID ${id}` })
        }
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
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
