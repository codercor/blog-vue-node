const express = require('express');
const app = express();

app.use(express.json()); //isteklerin body'sinde yolladığımız json veriyi parse etmek (yani yazidan objecte çevirme) için

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3000;

//routers
const blogRouter = require('./routers/blog.router');
const authRouter = require('./routers/auth.router');

app.use('/blog', blogRouter);
app.use('/auth',authRouter);


app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
})