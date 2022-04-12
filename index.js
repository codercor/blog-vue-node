const express = require('express');
const app = express();
app.use(require("cors")());
app.use(express.json()); //isteklerin body'sinde yolladığımız json veriyi parse etmek (yani yazidan objecte çevirme) için

//public folder
app.use('/public',express.static('public'));

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3000;

//routers
// const blogRouter = require('./routers/blog.router');
// const authRouter = require('./routers/auth.router');
const {authRouter,blogRouter,panelRouter} = require("./routers")

app.use('/blog', blogRouter);
app.use('/auth',authRouter);
app.use('/panel',panelRouter);


app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
})