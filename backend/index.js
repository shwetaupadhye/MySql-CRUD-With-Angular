const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect to Mysql Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo',
    port: 3306

});


//check database connection
db.connect(err => {
    if (err) { console.log('err') }
    console.log('database connected...!!!')
})

// get all data

app.get('/users', (req, res) => {
    //console.log('get all user');
    let qrr = `SELECT * FROM users`;
    db.query(qrr, (err, results) => {
        if (err) {
            console.log(err, 'err');
        }
        if (results.length > 0) {
            res.send({
                message: 'All Users Data',
                data: results

            });
        };
    });
});

//getting single data by id
app.get('/user/:id', (req, res) => {
    // console.log('Get data by ID')
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM users where id = ${qrId}`;
    db.query(qr, (err, results) => {
        if (err) {
            console.log(err);

        }
        if (results.length > 0) {
            res.send({
                message: "Get data by id",
                data: results
            })
        } else {
            res.send({
                message: "Data not found Sorry!",
            });
        }

    })

});

// create or post or insert data

app.post('/user', (req, res) => {
    // console.log('post data ')
    // console.log(req.body, 'Post Data success');
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr = `insert into users(fullname,email,mobile)value('${fullName}','${eMail}','${Mobile}')`;
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }

        res.send({
            message: "Data Created Successuly2222",
            // data: results
        })


    })
})

//update data
app.put('/user/:id', (req, res) => {
    // console.log(req.body, "update data")
    let uId = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr = 'update `users` set `fullname` = "' + fullName + '" ,`email` = "' + eMail + '", `mobile` = "' + Mobile + '" where `id`= ' + uId;
    console.log(qr);
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }
        res.send({
            message: "Data Updated Successfully",
            // data: results
        })
    })
})

//delete
app.delete('/user/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `delete from users where id = '${uId}' `;
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }
        res.send({
            message: "Data Deleted Successfully",

        })
    })
})




app.listen(3000, () => {
    console.log("server is running on port 3000");
})