const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();


require('../server/routes/auth.routes')(app);
require('../server/routes/user.routes')(app);

const db=require("./models");

const Role=db.role;

db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync db');
  inital();
})

function inital()
{

    
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"moderator"
    });

    Role.create({
        id:3,
        name:"admin"
    })
}

var corsOptions={
    origin:"http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get("/",(req,res)=>{
    res.json({
        message:"welcome to my application"
    });
});


const port=process.env.PORT||8080;

app.listen(port,()=>{
    console.log(`server is ruuning on port ${port}`);
})