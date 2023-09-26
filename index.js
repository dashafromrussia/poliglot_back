const http = require('http');
const https = require('https');
const url = require('url');
const { parse } = require('querystring');
const fs = require('fs');
var nodemailer = require('nodemailer');
//var io = require('socket.io').listen(server);

//подкл модуль мскл для работы с бд
/*res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
//Access-Control-Allow-Headers', 'X-Requested-With,content-type
var server = http.createServer((req, res) => {
let urlParts = url.parse(req.url);
console.log(urlParts);
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // If needed
res.setHeader('Access-Control-Allow-Credentials', true);
res.setHeader('Content-Type', 'application/json; charset=utf-8');
console.log("uu",urlParts);
if (req.method == 'GET') {
 res.end('get server work');
}
else {
// POST
console.log('post')
let body = '';
req.on('data', chunk => {
body += chunk;
});
req.on('end', () => {
let params = JSON.parse(body);
console.log(`${params}papapapapar`);

//конфигурация подключ
const mysql = require('mysql');
const conn = mysql.createConnection({ //в качестве параметров передаем обьект
host: "localhost",
user: "root",
database: "poliglot",
password: ""
});
//создание подключения
conn.connect(err =>{
if(err){
console.log(err);
}
else {
console.log("database----ok");
}
});
//nzsbgzsazrgifwii
let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user:'dariavladimirowna@gmail.com',
pass:'nzsbgzsazrgifwii',
},
});

let mailOptions = {
from: 'dariavladimirowna@gmail.com', // sender address
to: params.email, // list of receivers
subject: 'Poliglot', // Subject line
text: params.code, // plain text body
// html: output // html body
};




let query
switch(urlParts.pathname){ //если ссылка post запроса ведет на:
case '/sendmess':
transporter.sendMail(mailOptions, function (err, info) {
if (err) {
console.log(err);
res.end('0')
} else {
console.log(info);
console.log(1)
res.end('1')
}
});
break
case "/getuser":
query = `SELECT * FROM users WHERE email ="${params.email}" AND password ="${params.password}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(`${result}resull`); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
//SELECT * FROM users WHERE (`EMAIL` >= 2 AND `ID` < 5) OR (`ID` > 10 AND `NAME` LIKE 'Мышь%');

case "/findemail":
query = `SELECT * FROM users WHERE email ="${params.email}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(`${result}resull`); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadusers":
query = `SELECT * FROM users`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
// console.log(`${JSON.stringify(result)}result`); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addimg":
query = `INSERT INTO img (img) VALUES ("${params.img}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(`${params.img.length}lengthhhh`);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о
//ICANN Verification Required
//params.name
//полях таблицы
})
break;
case "/getimg":
query = `SELECT * FROM img`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/adduser":
query = `INSERT INTO users (userid, name, email, age, activity, country, story, language, job, image, date, password) VALUES ("${params.userid}", "${params.name}", "${params.email}", "${params.age}", "${params.activity}","${params.country}","${params.story}","${params.language}","${params.job}","${params.image}","${params.date}","${params.password}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о
//ICANN Verification Required
//params.name
//полях таблицы
})
break;
case "/updatepassword":
query = `UPDATE users SET password = "${params.password}" WHERE email = "${params.email}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('yes');
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updateuser":
query = `UPDATE users SET name = "${params.name}", password = "${params.password}", image = "${params.image}", age = "${params.age}", activity = "${params.activity}", story = "${params.story}", job = "${params.job}", language = "${params.language}" WHERE email = "${params.email}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadarticles":
query = `SELECT * FROM articles`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadonearticles":
query = `SELECT * FROM articles WHERE id ="${params.id}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updateviews":
query = `UPDATE articles SET views = ${params.views} WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updatelikes":
query = `UPDATE articles SET likes = '${params.likes}' WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updatestatus":
query = `UPDATE statuses SET status = "${params.status}" WHERE userid = "${params.userid}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadstatuses":
query = `SELECT * FROM statuses`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addstatus":
query = `INSERT INTO statuses (userid,status) VALUES ("${params.userid}", "${params.status}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delstatus":
query=`DELETE FROM statuses WHERE userid = "${params.userid}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log('deeeeellll');
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break

/* case "/loadcontacts":
query = `SELECT * FROM contacts`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addcontacts":
query = `INSERT INTO contacts (userid, contacts) VALUES ("${params.userid}", '${params.contacts}')`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updatecontacts":
query = `UPDATE contacts SET contacts = '${params.contacts}' WHERE
userid = "${params.userid}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delallcontacts":
query = `DELETE FROM contacts`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadcomments":
query = `SELECT * FROM comments`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addcomment":
query = `INSERT INTO comments (idpost, who, whom, new, comment, time) VALUES ("${params.idpost}", "${params.who}", "${params.whom}", "${params.new}", "${params.comment}", "${params.time}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
//`DELETE FROM comments WHERE id ="${data.id}"`
case "/delcomment":
query = `DELETE FROM comments WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadpech":
query = `SELECT * FROM pechat WHERE whome ="${params.whome}" AND name ="${params.name}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addpech":
query = `INSERT INTO pechat (whome, name) VALUES ("${params.whome}", "${params.name}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delpech":
query = `DELETE FROM pechat WHERE whome ="${params.whome}" AND name ="${params.name}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadmess":
query = `SELECT * FROM messagess WHERE name ="${params.name}" OR towhome ="${params.name}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addmess":
query = `INSERT INTO messagess (name, mess, towhome, images, new, redirect, sharepost, time) VALUES ("${params.name}", "${params.mess}", "${params.towhome}", '${params.images}', "${params.new}", '${params.redirect}', '${params.sharepost}', "${params.time}")`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delblockmess":
query = `DELETE FROM messagess WHERE name ="${params.name}" AND towhome="${params.towhome}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delmess":
query = `DELETE FROM messagess WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delallmess":
query = `DELETE FROM messagess`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field);
//содерж данные о полях таблицы
})
break
case "/updatemess":
query = `UPDATE messagess SET new ="${params.new}" WHERE name = "${params.name}" AND towhome = "${params.towhome}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadblock":
query = `SELECT * FROM block`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updateblock":
query = `UPDATE block SET blocks = '${params.blocks}' WHERE userid = "${params.userid}"`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addblock":
query = `INSERT INTO block (userid, blocks) VALUES ("${params.userid}", '${params.blocks}')`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/loadarticle":
query = `SELECT * FROM articles`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result); //здесь лежит массив данных из таблицы
res.end(JSON.stringify(result))
//console.log(field); //содерж данные о полях таблицы
})
break
case "/delarticle":
query = `DELETE FROM articles WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/addarticle":
query = `INSERT INTO articles (author, header, twoheader, text, images, category, time, views, likes) VALUES ("${data.author}", "${data.header}, "${data.twoheader}", "${data.text}", '${data.images}', "${data.category}", "${data.time}", ${data.views}, '${data.likes}')`;
conn.query(query,(err,result,field)=>{
console.log(err);
console.log(result.insertId);
res.end(result.insertId.toString())
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updateviews":
query = `UPDATE articles SET views = ${params.views} WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break
case "/updatelikes":
query = `UPDATE articles SET likes = '${params.likes}' WHERE id = ${params.id}`;
conn.query(query,(err,result,field)=>{
console.log(err);
res.end('1')
//console.log(field); //содерж данные о полях таблицы
})
break */
default:
res.end('404')
break
}
/////закрытие подключения
conn.end(err =>{
if(err){
console.log(err);
}
else {
console.log("database----close");
}

});
})
}
});

server.listen(3500);
/*const http = require('http');
const https = require('https');
const url = require('url');
const { parse } = require('querystring');
const fs = require('fs');
var nodemailer = require('nodemailer');

 //подкл модуль мскл для работы с бд

http.createServer((req, res) => {
    let urlParts = url.parse(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log("uu",urlParts);
    if (req.method == 'GET') {
            res.end('get server work');
    }
    else {
        // POST

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let params = JSON.parse(body);
            console.log(params)
           
    //конфигурация подключ
    const mysql = require('mysql');
    const conn = mysql.createConnection({ //в качестве параметров передаем обьект
        host: "localhost",
        user: "root",
        database: "poliglot",
        password: ""
    });
    //создание подключения
    conn.connect(err =>{
        if(err){
            console.log(err);
        }
        else {
            console.log("database----ok");
        }
    });
    //vlqmdcjjvcwgtkvv
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'dariavladimirowna@gmail.com',
          pass:'vlqmdcjjvcwgtkvv',
        },
      });

  let mailOptions = {
    from: 'dariavladimirowna@gmail.com', // sender address
    to: params.email, // list of receivers
    subject: 'Poliglot', // Subject line
    text: params.code, // plain text body
   // html: output // html body
  };




 let query   
switch(urlParts.pathname){ //если ссылка post запроса ведет на: 
    case '/sendmess':
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
              res.end('0')
            } else {
              console.log(info);
              console.log(1)
              res.end('1')
            }
          });
        break
    case "/loadusers": 
query = `SELECT * FROM users`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
conn.query(query,(err,result,field)=>{
    console.log(err);
   console.log(result); //здесь лежит массив данных из таблицы
    res.end(JSON.stringify(result))
    //console.log(field); //содерж данные о полях таблицы
})
break
case "/adduser":
    query = `INSERT INTO users (cookie, login, email, password, image) VALUES ("${params.cookie}", "${params.login}", "${params.email}", "${params.password}", "${params.image}")`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end(result.insertId.toString())
        //console.log(field); //содерж данные о полях таблицы
    })
    break
    case "/updateuser":
        query = `UPDATE users SET login = "${params.login}", email = "${params.email}", password = "${params.password}", image = "${params.image}"  WHERE cookie = "${params.cookie}"`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log(result.insertId);
            res.end(result.insertId.toString())
            //console.log(field); //содерж данные о полях таблицы
        })
        break 
    case "/loadarticles": 
    query = `SELECT * FROM articles`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
     conn.query(query,(err,result,field)=>{
    console.log(err);
   console.log(result); //здесь лежит массив данных из таблицы
    res.end(JSON.stringify(result))
    //console.log(field); //содерж данные о полях таблицы
})
break    
case "/updateviews":
    query = `UPDATE articles SET views = ${params.views}  WHERE id = ${params.id}`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    })
    break    
case "/updatelikes":
        query = `UPDATE articles SET likes = '${params.likes}'  WHERE id = ${params.id}`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            res.end('1')
            //console.log(field); //содерж данные о полях таблицы
        })
        break 
    case "/updatestatus":
         query = `UPDATE statuses SET status = "${params.status}"  WHERE userid = "${params.userid}"`;
         conn.query(query,(err,result,field)=>{
             console.log(err);
             console.log(result.insertId);
             res.end(result.insertId.toString())
             //console.log(field); //содерж данные о полях таблицы
         })
         break 
         case "/loadstatuses": 
         query = `SELECT * FROM statuses`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
         conn.query(query,(err,result,field)=>{
             console.log(err);
            console.log(result); //здесь лежит массив данных из таблицы
             res.end(JSON.stringify(result))
             //console.log(field); //содерж данные о полях таблицы
         })
         break
         case "/addstatus":
             query = `INSERT INTO statuses (userid,status) VALUES ("${params.userid}", "${params.status}")`;
             conn.query(query,(err,result,field)=>{
                 console.log(err);
                 console.log(result.insertId);
                 res.end(result.insertId.toString())
                 //console.log(field); //содерж данные о полях таблицы
             })
             break    
    case "/delstatus":    
        query=`DELETE FROM statuses  WHERE userid = "${params.userid}"`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log('deeeeellll');
            res.end('1')
            //console.log(field); //содерж данные о полях таблицы
        }) 
        break
   /* case "/loadcontacts":
        query = `SELECT * FROM contacts`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
        conn.query(query,(err,result,field)=>{
            console.log(err);
           console.log(result); //здесь лежит массив данных из таблицы
            res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
        })  
    break
    case "/addcontacts":
    query = `INSERT INTO contacts (userid, contacts) VALUES ("${params.userid}", '${params.contacts}')`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end(result.insertId.toString())
        //console.log(field); //содерж данные о полях таблицы
    })
    break
    case "/updatecontacts":
        query = `UPDATE contacts SET contacts = '${params.contacts}'  WHERE userid = "${params.userid}"`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            res.end('1')
            //console.log(field); //содерж данные о полях таблицы
        })
        break
        case "/delallcontacts":    
        query = `DELETE FROM contacts`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            res.end('1')
            //console.log(field); //содерж данные о полях таблицы
        }) 
        break
        case "/loadcomments":
        query = `SELECT * FROM comments`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
        conn.query(query,(err,result,field)=>{
            console.log(err);
           console.log(result); //здесь лежит массив данных из таблицы
            res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
        })  
    break
    case "/addcomment":
    query = `INSERT INTO comments (idpost, who, whom, new, comment, time) VALUES ("${params.idpost}", "${params.who}", "${params.whom}", "${params.new}", "${params.comment}", "${params.time}")`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end(result.insertId.toString())
        //console.log(field); //содерж данные о полях таблицы
    })
    break
    //`DELETE FROM comments WHERE id ="${data.id}"`
    case "/delcomment":    
    query = `DELETE FROM comments  WHERE id = ${params.id}`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break
    case "/loadpech":
        query =  `SELECT * FROM pechat  WHERE whome ="${params.whome}" AND name ="${params.name}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
        conn.query(query,(err,result,field)=>{
            console.log(err);
           console.log(result); //здесь лежит массив данных из таблицы
            res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
        })  
    break
    case "/addpech":
        query = `INSERT INTO pechat (whome, name) VALUES ("${params.whome}", "${params.name}")`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log(result.insertId);
            res.end(result.insertId.toString())
            //console.log(field); //содерж данные о полях таблицы
        })
        break
    case "/delpech":    
    query = `DELETE FROM pechat  WHERE whome ="${params.whome}" AND name ="${params.name}"`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break   
    case "/loadmess":
        query = `SELECT * FROM messagess  WHERE name ="${params.name}" OR towhome ="${params.name}"`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
        conn.query(query,(err,result,field)=>{
            console.log(err);
           console.log(result); //здесь лежит массив данных из таблицы
            res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
        })  
    break 
    case "/addmess":
        query = `INSERT INTO messagess (name, mess, towhome, images, new, redirect, sharepost, time) VALUES ("${params.name}", "${params.mess}", "${params.towhome}", '${params.images}', "${params.new}", '${params.redirect}', '${params.sharepost}', "${params.time}")`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log(result.insertId);
            res.end(result.insertId.toString())
            //console.log(field); //содерж данные о полях таблицы
        })
        break
    case "/delblockmess":    
    query = `DELETE FROM messagess  WHERE name ="${params.name}" AND towhome="${params.towhome}"`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break      
    case "/delmess":    
    query = `DELETE FROM messagess  WHERE id = ${params.id}`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break      
    case "/delallmess":    
    query = `DELETE FROM messagess`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break  
    case "/updatemess":
        query = `UPDATE messagess SET new ="${params.new}"  WHERE name = "${params.name}" AND towhome = "${params.towhome}"`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            res.end('1')
            //console.log(field); //содерж данные о полях таблицы
        })
        break    
    case "/loadblock":
            query = `SELECT * FROM block`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
            conn.query(query,(err,result,field)=>{
                console.log(err);
                console.log(result); //здесь лежит массив данных из таблицы
               res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
            })  
        break 
        case "/updateblock":
            query = `UPDATE block SET blocks = '${params.blocks}'  WHERE userid = "${params.userid}"`;
            conn.query(query,(err,result,field)=>{
                console.log(err);
                res.end('1')
                //console.log(field); //содерж данные о полях таблицы
            })
            break
        case "/addblock":
        query = `INSERT INTO block (userid, blocks) VALUES ("${params.userid}", '${params.blocks}')`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log(result.insertId);
            res.end(result.insertId.toString())
            //console.log(field); //содерж данные о полях таблицы
        })
        break    
        case "/loadarticle":
            query = `SELECT * FROM articles`; //делаем запрос sql к таблице бд..идет выбор всех данных из таблицы
            conn.query(query,(err,result,field)=>{
                console.log(err);
                console.log(result); //здесь лежит массив данных из таблицы
               res.end(JSON.stringify(result))
            //console.log(field); //содерж данные о полях таблицы
            })  
        break 
        case "/delarticle":    
    query = `DELETE FROM articles  WHERE id = ${params.id}`;
    conn.query(query,(err,result,field)=>{
        console.log(err);
        console.log(result.insertId);
        res.end('1')
        //console.log(field); //содерж данные о полях таблицы
    }) 
    break 
    case "/addarticle":
        query = `INSERT INTO articles (author, header, twoheader, text, images, category, time, views, likes) VALUES ("${data.author}", "${data.header}, "${data.twoheader}", "${data.text}", '${data.images}', "${data.category}", "${data.time}", ${data.views}, '${data.likes}')`;
        conn.query(query,(err,result,field)=>{
            console.log(err);
            console.log(result.insertId);
            res.end(result.insertId.toString())
            //console.log(field); //содерж данные о полях таблицы
        })
        break
        case "/updateviews":
            query = `UPDATE articles SET views = ${params.views}  WHERE id = ${params.id}`;
            conn.query(query,(err,result,field)=>{
                console.log(err);
                res.end('1')
                //console.log(field); //содерж данные о полях таблицы
            })
            break    
        case "/updatelikes":
                query = `UPDATE articles SET likes = '${params.likes}'  WHERE id = ${params.id}`;
                conn.query(query,(err,result,field)=>{
                    console.log(err);
                    res.end('1')
                    //console.log(field); //содерж данные о полях таблицы
                })
                break      */
/*default:
    res.end('404')
    break
}
/////закрытие подключения
conn.end(err =>{
    if(err){
        console.log(err);
    }
    else {
        console.log("database----close");
    }
           
        });
    })  
  }
}).listen(3500);*/