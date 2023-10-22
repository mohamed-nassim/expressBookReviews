const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username= req.body.username;
  let password= req.body.password;

  if(username && password){
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
    doesexist = userswithsamename.length > 0;
      if(!doesexist){
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
  }else{
    return res.status(404).json({message: "please enter username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  res.send(books[req.params.isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    for (let step = 0; step < 9; step++) {
        if(books[step+1].author === req.params.author){
            res.send(books[step+1])
        }
      }
  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    for (let step = 0; step < 9; step++) {
        if(books[step+1].title === req.params.title){
            res.send(books[step+1])
        }
      }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    res.send(books[req.params.isbn].reviews)
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
