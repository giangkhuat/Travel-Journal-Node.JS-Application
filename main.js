var express = require("express")
var app = express()
var bodyParser = require("body-parser");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/cat_app");
// adding a cat to a database
var catSchema = new mongoose.Schema({
	name: String,
	age: Number, 
	temperatement: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
  name: "George",
	age: 11, 
	temperament: "Grouchy"
});

george.save(function(err, cat) {
	if (err) {
    console.log ("something is wrong")
	} else {
	console.log("Just saved a cat");
	console.log(cat);
}
});


/*
mongoose.connect('mongodb+srv://giangkhuat:giangkhuat@cluster0-9njdn.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
	    useCreateInedx: true
	 }).then(()=> {
	console.log("Database is connected");
}).catch(err => {
	console.log("Unexpected error", err.message);
});

*/


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var camps = [
		{name : "Rock Creeck", image :  "https://www.tva.gov/file_source/TVA/Site%20Content/Environment/Managing%20the%20River/river-management-hero-_B7J7622-Edit-Edit.jpg"},
		{name: "river", image : "https://www.governmenteuropa.eu/wp-content/uploads/2019/07/river.jpg"},
	{name: "Shiny RIver", image : "https://www.worldatlas.com/r/w728-h425-c728x425/upload/35/9a/4a/shutterstock-575340148.jpg"
	},
	{
	  name: "Pretty River", image: "https://www.worldatlas.com/r/w728-h425-c728x425/upload/a7/b8/01/shutterstock-564527287.jpg"
	},
	{
		name: "shiny sunet", image: "https://i.pinimg.com/originals/fe/f2/53/fef25354aabc7ae00df8a15a40000bf6.jpg"
	},
	{ 
	  name: "sunset", image: "https://media.istockphoto.com/photos/sunrise-in-summer-in-a-dramatic-sky-with-pretty-clouds-picture-id1085773044?k=6&m=1085773044&s=170667a&w=0&h=FoiWJvQo3edmn8mZSiTnGuNqhCPj3zA7kUkmU0FaKiE=" 
	}
	];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	
	res.render("campgrounds", {campgrounds:camps})
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCamp = {name: name, image: image};
	camps.push(newCamp);
	res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});


app.listen(3000, function () {
	console.log("The YelpCamp server has started");
});