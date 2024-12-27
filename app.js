// external modules
const express = require("express");
const app = express();

app.use(express.urlencoded()); // middleware to parse the form data

app.use((req, res, next) => {
  console.log("first middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("second middleware", req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log("third  middleware", req.url, req.method);
  res.send(`<h1> feel free to contact us</h1>
    <a href="/contact-us">Contact Us</a>`);

  // next();
});

app.get("/contact-us", (req, res, next) => {
  console.log("contact us middleware", req.url, req.method);
  res.send(`
        <form action="/contact-us" method="POST">
            <input type="text" name="name" placeholder="Enter your Name">
            <input type="email" name="email" placeholder="Enter your Email">
            <input type="submit" value="submit">
            </form>
        `);
});
app.post("/contact-us", (req, res, next) => {
  console.log("response submitted middleware", req.url, req.method, req.body);
  let name = req.body.name;
  let email = req.body.email;
  res.send("<h1>your response is submitted</h1>" + name + "" + email);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
