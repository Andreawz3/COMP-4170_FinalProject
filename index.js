const express = require('express');
import pg from "pg";
const path = require('path');

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "",
  password: "",
  posrt: 5432,
});
db.connect();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');;
app.use(express.static("public"));


app.get('/', async(req, res) => {
  try{
    const result = await db.query("SELECT * FROM items");
    const items = result.rows;
    res.render('index', {
      title: "My Site",
      items
  })
  } catch(err){
    console.log(err);
  }
});

app.post("/add", async(req, res) => {
  const item = {
    name: req.body.title,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  };
  try{
    await db.query("INSERT INTO items (name, email, phoneNumber VALUES($1, $2, $3)", [name, email, phoneNumber]);
    res.redirect("/");
  } catch (err){
    console.log(err);
  }
});

app.patch("/edit/:id", async(req,res)=> {
  const id = req.params;
  if(req.body.title) title = req.body.title;
  if(req.body.email) email = req.body.email;
  if(req.body.phoneNumber) phoneNumber = req.body.phoneNumber;

  try{
    await db.query("UPDATE items SET name = $1, email = $2, phoneNumber = $3, WHERE id = $4", [name, email, phoneNumber]);
    res.redirect("/");
  } catch (err){
    console.log(err);
  }
});


app.delete("/delete:/id", async(req, res)=> {
  const id = req.params;
  try{
    await db.query("DELETE FROM items WHERE id = $1" ,[id]);
    req.redirect("/");
  } catch (err){
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})