const express = require('express')
const app = express()
const path = require('path')
const usermodel = require('./models/user')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render("index")
  })

  app.get('/read',  async function (req, res) {
    let user = await usermodel.find();
    res.render("read", {user})
    })

  app.post('/create', async function (req, res) {
      let {name ,email, img } =req.body;

     let createduser = await usermodel.create({
        name,
        email,
        img
      })

      res.redirect(`/read`)
    })


    app.get('/edit/:id',  async function (req, res) {
      let user = await usermodel.findOne();
      res.render("edit", {user})
      })

      app.post('/update/:id', async function (req, res) {
        let {name ,email, img } =req.body;

        let user = await usermodel.findOneAndUpdate({_id: req.params.id}, {name ,email, img}, {new: true} )
  
        res.redirect(`/read`)
      })

    app.get('/delete/:id', async (req, res) => {
      const user = await usermodel.findOneAndDelete({ _id: req.params.id});
      res.redirect("/read");
      })


app.listen(3000)




