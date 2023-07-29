const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Register users
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4));

  //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
  let myPromise = new Promise((resolve,reject) => {
    resolve(JSON.stringify(books))
  })

  //Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
    return res.status(300).json(successMessage);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //const isbn = req.params.isbn;
  //const book = Object.values(books).find((book) => book.isbn === isbn);
  //if (book) {
  //  res.status(200).json(book);
  //} else {
  //  res.status(404).json({ message: 'No book found for the provided ISBN.' });
  //}

  let myPromise = new Promise((resolve,reject) => {
    resolve(books[req.params.isbn])
  })

  //Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
    return res.status(300).json(successMessage);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //const author = req.params.author;
  const auther_books = [];
  // Obtain all the keys for the 'books' object
  //const book_keys = Object.keys(books);
  // Iterate through the 'books' array & check the author matches the one provided in the request parameters
  //for (const key of book_keys) {
  //  const book = books[key];
  //  if (book.author === author) {
  //    auther_books.push(book);
  //  }
  //}
  // Check if any books were found for the provided author
  //if (auther_books.length > 0) {
  //  res.status(200).json(auther_books);
  //} else {
  //  res.status(404).json({ message: 'No books found for the provided author.' });
  //}
  
  let myPromise = new Promise((resolve,reject) => {
    for (const id in books) {
    if (books.hasOwnProperty(id) && books[id].author === req.params.author) {
      auther_books.push(books[id]);
    }
  }
    resolve(auther_books)
  })

  //Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
    return res.status(300).json(successMessage);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //const title = req.params.title;
  const title_books = [];

  // Obtain all the keys for the 'books' object
  //const book_keys = Object.keys(books);

  // Iterate through the 'books' array & check if the title matches the one provided in the request parameters
  //for (const key of book_keys) {
  //  const book = books[key];
  //  if (book.title.toLowerCase().includes(title.toLowerCase())) {
  //    title_books.push(book);
  //  }
  //}
  // Check if any books were found for the provided title
  //if (title_books.length > 0) {
  //  res.status(200).json(title_books);
  //} else {
  //  res.status(404).json({ message: 'No books found for the provided title.' });
  //}
  
  let myPromise = new Promise((resolve,reject) => {
    for (const id in books) {
    if (books.hasOwnProperty(id) && books[id].title === req.params.title) {
      title_books.push(books[id]);
    }
    }
    resolve(title_books)
  })

  //Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
    return res.status(300).json(successMessage);
  })
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = Object.values(books).find((book) => book.isbn === isbn);

  if (book) {
    const reviews = book.reviews;
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ message: 'No reviews found for the provided ISBN.' });
  }
});

module.exports.general = public_users;
