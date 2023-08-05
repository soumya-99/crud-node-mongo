const express = require("express")
const mongoose = require("mongoose")
const app = express()

// routes
app.get("/", (req, res) => {
	res.send("Hello World")
})

app.get("/blog", (req, res) => {
	res.send("Hello My Blogs!! Testingggg")
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
