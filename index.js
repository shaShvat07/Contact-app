const express = require("express");
const path = require("path");
const port = 8000;
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const Contact = require("./models/contacts");
const { count } = require("console");
const app = express();

//SETTING UP THE ENGINE
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));

//MIDDLEWARE
app.use(express.urlencoded());
app.use(express.static("assets"));

//Middleware1
// app.use(function(req,res,next){
//     console.log("Middleware 1 called.");
//     next();
// })

//Middleware2
// app.use(function(req, res ,next){
//     console.log("Middleware 2 called");
//     next();
// })
var contactList = [
  {
    name: "Rahul Lahoti",
    phone: "9123121292",
    phoneid: "123"
  },
  {
    name: "Rahul Ranjan",
    phone: "9212321312",
    phoneid: "124"
  },
  {
    name: "Shashvat Patel",
    phone: "9213123122",
    phoneid: "125"
  },
];

app.get("/", async (req, res) => {
  const contacts = await Contact.find({});

  return res.render("home", {
    title: "My Contacts List",
    contacts_list: contacts,
    contactArr: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs",
  });
});

app.post("/create-contacts", async (req, res) => {
  // return res.redirect('/meow');
  // contactList.push(req.body);
  await Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  });
  return res.redirect("back");
});

app.get("/delete-contacts", async (req, res) => {
  //get the id from the url
  try {
    let phoneidf = req.query.phoneid;
    let contactIndex = contactList.findIndex((kuchbhi) => kuchbhi.phoneid == phoneidf);
    if (contactIndex != -1) {
      contactList.splice(contactIndex, 1);
    }

    let id = req.query.id;

    //find  the contact in the database and delete
    await Contact.findByIdAndDelete(id);

    return res.redirect("back");
  } catch (error) {
    console.log("Error in deleting contact", error);
    return;
  }
});
app.listen(port, function (err) {
  if (err) {
    console.log("Oops Error detected", err);
  }

  console.log("Yup my server is running on ", port);
});
