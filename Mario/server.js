const express =require('express');
const mysql=require('mysql');
const app=express();
const bodyParser= require('body-parser');
const port=4000

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
})

db.connect((err) => {
    if(err) throw err;
    console.log("Database is connected");
})

app.post('/query',(req,res)=>{
    console.log(req.body);

    const sql ="INSERT INTO `netninja`(`email`,`fullName`,`subject`,`query`) VALUES (?)";
    const values =[
        req.body.email,
        req.body.fullName,
        req.body.subject,
        req.body.query
    ]

    db.query(sql, [values],(err,result) =>{
        if (err){
            throw err
        }
        else{
            console.log('Data inserted successfully:', result);
            res.redirect('/class.html')
        }
    })
})


// app.get('/', (req, res)=>{
//     res.sendFile('./views/index.html', {root: __dirname})
// })

// app.get('/', (req, res)=>{
//     res.sendFile('./views/contact.html', {root: __dirname})
// })

app.listen(port, ()=> {
    console.log("Server is running on port 4000")
})