const express = require("express");
const app = express();

let books = [
  {
    id: "b1",
    title: "Book One",
    description: "Description of book one",
    authorId: "a1",
  },
  {
    id: "b2",
    title: "Book Two",
    description: "Description of book two",
    authorId: "a2",
  },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

// Your routing and controller code goes here
//home
app.get("/", (req, res) => {
  res.send("Hello Main Page Here");
});

//books
app.get("/books", (req, res) => {
  res.json(books);
});
app.get("/books/:id", (req, res) => {
  const book_id = books.find((b) => b.id === req.params.id);
  console.log(book_id);
  const author = authors.find((a) => a.id === book_id.authorId);
  const book = { ...book_id, name: author.name, bio: author.bio };
  res.json(book);
});

//reviews
app.get("/reviews", (req, res) => {
  res.json(reviews);
});
app.get("/reviews/:id", (req, res) => {
  const review_id = reviews.find((r) => r.id === req.params.id);
  const book_id = books.find((b) => b.id === review_id.bookId);
  const review = {
    ...review_id,
    book_id: book_id.id,
    book_title: book_id.title,
  };
  res.json(review);
});

//authors
app.get("/authors", (req, res) => {
  res.json(authors);
});

app.get("/authors/:id", (req, res) => {
  const author = authors.find((a) => a.id === req.params.id);
  res.json(author);
});

app.listen(5000, () => {
  console.log("Bookstore app is running on port 5000");
});
