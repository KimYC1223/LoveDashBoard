var mysql       = require('mysql')
let queryString = require('querystring')
let fs          = require('fs')

let dbpw        = fs.readFileSync('/home/keti/private/LoveDashBoard/web/dbpw.txt','utf8')

var connection  = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : dbpw.trim(),
  port     : 3306,
  database : 'love_dash_board'
});

let datetimeParse = (timestamp) => {
  let year = timestamp.getFullYear();       // 년도
  let month = timestamp.getMonth() + 1;     // 월
  let date = timestamp.getDate();           // 날짜
  let hours = timestamp.getHours();         // 시
  let minutes = timestamp.getMinutes();     // 분
  let seconds = timestamp.getSeconds();     // 초

  return `${year}-${parseInt(month/10)}${month%10}-${parseInt(date/10)}${date%10} `+
         `${parseInt(hours/10)}${hours%10}:${parseInt(minutes/10)}${minutes%10}:${parseInt(seconds/10)}${seconds%10}`
}

let dateParse = (timestamp) => {
  let year = timestamp.getFullYear();       // 년도
  let month = timestamp.getMonth() + 1;     // 월
  let date = timestamp.getDate();           // 날짜

  return `${year}-${parseInt(month/10)}${month%10}-${parseInt(date/10)}${date%10}`
}


connection.connect();
module.exports = (function() {
  return{
    //=====================================================================================================================================
    //
    //  USER TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2022.04.18 KimYC1223
    /*
        +---------------+------------+------+-----+---------+----------------+
        | Field         | Type       | Null | Key | Default | Extra          |
        +---------------+------------+------+-----+---------+----------------+
        | id_num        | int(11)    | NO   | PRI | NULL    | auto_increment |
        | id            | char(50)   | YES  |     | NULL    |                |
        | pw            | text       | YES  |     | NULL    |                |
        | name          | char(20)   | YES  |     | NULL    |                |
        | gender        | char(20)   | YES  |     | NULL    |                |
        | birth         | date       | YES  |     | NULL    |                |
        | creation_date | date       | YES  |     | NULL    |                |
        | email         | char(255)  | YES  |     | NULL    |                |
        | auth_num      | int(11)    | YES  |     | NULL    |                |
        | is_auth       | tinyint(1) | NO   |     | NULL    |                |
        | couple_num    | int(11)    | YES  |     | NULL    |                |
        | title         | int(11)    | YES  |     | NULL    |                |
        +---------------+------------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_users
    //=====================================================================================================================================
    create_users: function (req,res) {
      let id = req.query.id
      let pw = req.query.pw
      let name = req.query.name
      let gender = req.query.gender
      let birth = req.query.birth
      let creation_date = req.query.creation_date
      let email = req.query.email
      let auth_num = Math.floor(Math.random() * 1001);
      let queryString = 'INSERT INTO users (id,pw,name,gender,birth,creation_date,email,'
              + 'auth_num,is_auth,couple_num,couple_num,title) '
              + `VALUES ("${id}","${pw}","${name}","${gender}","${birth}","${creation_date}",`
              + `"${email}",${auth_num},0,-1,0);`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return; }
        connection.query(`SELECT id_num FROM users WHERE id = "${id}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write('error2'); res.end(); return;}
          console.log(rows2[rows2.length - 1].id)
          res.write(`${rows2[rows2.length - 1].id}`);
          res.end();
        })
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ read_users
    //=====================================================================================================================================
    read_users: function (req,res) {
      let id = req.query.id
      let id_num = req.query.id_num
      let queryString = `SELECT * FROM users WHERE id = '${id}';`
      if(id == null) {
        if(searchName == null)
          queryString = `SELECT * FROM users;`
        else queryString = `SELECT * FROM users WHERE id_num = '${id_num}';`
      }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) {
          res.write('null')
          res.end();
          return;
        }
        try{
          let str = `{\n\t"users" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"id_num" : ${rows[i].id_num},\n`
            str += `\t"id" : "${rows[i].id}",\n`
            str += `\t"pw" : "${rows[i].pw}",\n`
            str += `\t"name" : "${rows[i].name}",\n`
            str += `\t"gender" : "${rows[i].gender}",\n`
            str += `\t"birth" : "${dateParse(rows[i].birth)})",\n`
            str += `\t"creation_date" : "${dateParse(rows[i].creation_date)}",\n`
            str += `\t"email" : "${rows[i].email}",\n`
            str += `\t"auth_num" : ${rows[i].auth_num},\n`
            str += `\t"is_auth" : ${rows[i].is_auth},\n`
            str += `\t"couple_num" : ${rows[i].couple_num},\n`
            str += `\t"title" : ${rows[i].title}\n}`
            if(i != (rows.length-1))
              str += ', '
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ update_users
    //=====================================================================================================================================
    update_users: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let arr = []
      let arrStr = ``
      if(req.query.pw != null) { arr.push(`pw = "${req.query.moa_band_name}"`) }
      if(req.query.name != null) { arr.push(`name = "${req.query.item_0}"`) }
      if(req.query.gender != null) { arr.push(`gender = "${req.query.item_1}"`) }
      if(req.query.birth != null) { arr.push(`birth = "${req.query.item_2}"`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${req.query.item_3}"`) }
      if(req.query.email != null) { arr.push(`email = "${req.query.item_4}"`) }
      if(req.query.is_auth != null) { arr.push(`is_auth = ${req.query.breakfast_time}`) }
      if(req.query.couple_num != null) { arr.push(`couple_num = ${req.query.lunch_time}`) }
      if(req.query.title != null) { arr.push(`title = ${req.query.dinner_time}`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE users SET ${arrStr} WHERE id_num = ${id_num};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`);
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_users
    //=====================================================================================================================================
    delete_users: function (req,res) {
      let id_num = req.query.id_num
      let queryString = `DELETE FROM users WHERE id_num = '${id_num}';`
      if(id_num == null){ res.write('error'); res.end(); return; }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    },


    //=====================================================================================================================================
    //
    //  ACHIEVEMENT TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2022.04.18 KimYC1223
    /*
        +-----------------+---------+------+-----+---------+----------------+
        | Field           | Type    | Null | Key | Default | Extra          |
        +-----------------+---------+------+-----+---------+----------------+
        | achievement_num | int(11) | NO   | PRI | NULL    | auto_increment |
        | owner           | int(11) | YES  |     | NULL    |                |
        | creation_date   | date    | YES  |     | NULL    |                |
        +-----------------+---------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_achievement
    //=====================================================================================================================================
    create_achievement: function (req,res) {
      let owner = req.query.owner
      let creation_date = req.query.creation_date
      let queryString = 'INSERT INTO achievement (owner,creation_date)'
              + `VALUES ("${owner}","${creation_date}");`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        connection.query(`SELECT achievement_num FROM achievement WHERE owner = "${owner}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write('error2'); res.end(); return;}
          console.log(rows2[rows2.length - 1].id)
          res.write(`${rows2[rows2.length - 1].id}`);
          res.end();
        })
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ read_achievement
    //=====================================================================================================================================
    read_achievement: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let queryString = `SELECT * FROM achievement WHERE id_num = '${id_num}';`
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) { res.write('null'); res.end(); return; }
        try{
          let str = `{\n\t"achievement" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"achievement_num" : ${rows[i].id_num},\n`
            str += `\t"owner" : "${rows[i].id}",\n`
            str += `\t"creation_date" : "${dateParse(rows[i].pw)}"\n}`
            if(i != (rows.length-1))
              str += ', '
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ update_achievement
    //=====================================================================================================================================
    update_achievement: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let arr = []
      let arrStr = ``
      if(req.query.owner != null) { arr.push(`owner = "${req.query.owner}"`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${dateParse(req.query.creation_date)}"`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE achievement SET ${arrStr} WHERE id_num = ${id_num};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`);
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_achievement
    //=====================================================================================================================================
    delete_achievement: function (req,res) {
      let id_num = req.query.id_num
      let queryString = `DELETE FROM achievement WHERE id_num = '${id_num}';`
      if(id_num == null){ res.write('error'); res.end(); return; }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    },


    //=====================================================================================================================================
    //
    //  TITLE TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2022.04.18 KimYC1223
    /*
        +---------------+---------+------+-----+---------+----------------+
        | Field         | Type    | Null | Key | Default | Extra          |
        +---------------+---------+------+-----+---------+----------------+
        | title_num     | int(11) | NO   | PRI | NULL    | auto_increment |
        | owner         | int(11) | YES  |     | NULL    |                |
        | creation_date | date    | YES  |     | NULL    |                |
        +---------------+---------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_title
    //=====================================================================================================================================
    create_title: function (req,res) {
      let owner = req.query.owner
      let creation_date = req.query.creation_date
      let queryString = 'INSERT INTO title (owner,creation_date)'
              + `VALUES ("${owner}","${creation_date}");`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        connection.query(`SELECT title_num FROM title WHERE owner = "${owner}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write('error2'); res.end(); return;}
          console.log(rows2[rows2.length - 1].id)
          res.write(`${rows2[rows2.length - 1].id}`);
          res.end();
        })
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ read_title
    //=====================================================================================================================================
    read_title: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let queryString = `SELECT * FROM title WHERE id_num = '${id_num}';`
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) { res.write('null'); res.end(); return; }
        try{
          let str = `{\n\t"title" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"title_num" : ${rows[i].id_num},\n`
            str += `\t"owner" : "${rows[i].id}",\n`
            str += `\t"creation_date" : "${dateParse(rows[i].pw)}"\n}`
            if(i != (rows.length-1))
              str += ', '
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ update_title
    //=====================================================================================================================================
    update_title: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let arr = []
      let arrStr = ``
      if(req.query.owner != null) { arr.push(`owner = "${req.query.owner}"`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${dateParse(req.query.creation_date)}"`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE title SET ${arrStr} WHERE id_num = ${id_num};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`);
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_title
    //=====================================================================================================================================
    delete_title: function (req,res) {
      let id_num = req.query.id_num
      let queryString = `DELETE FROM title WHERE id_num = '${id_num}';`
      if(id_num == null){ res.write('error'); res.end(); return; }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    },


    
    //=====================================================================================================================================
    //
    //  COUPON TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2022.04.18 KimYC1223
    /*
        +---------------+----------+------+-----+---------+----------------+
        | Field         | Type     | Null | Key | Default | Extra          |
        +---------------+----------+------+-----+---------+----------------+
        | coupon_id     | int(11)  | NO   | PRI | NULL    | auto_increment |
        | couple_num    | int(11)  | YES  |     | NULL    |                |
        | name          | char(50) | YES  |     | NULL    |                |
        | reason        | text     | YES  |     | NULL    |                |
        | creation_date | date     | YES  |     | NULL    |                |
        | author_id     | int(11)  | YES  |     | NULL    |                |
        | author_name   | char(20) | YES  |     | NULL    |                |
        | taker_id      | int(11)  | YES  |     | NULL    |                |
        | taker_name    | char(20) | YES  |     | NULL    |                |
        | icon          | int(11)  | YES  |     | NULL    |                |
        | picture       | text     | YES  |     | NULL    |                |
        +---------------+----------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_coupon
    //=====================================================================================================================================
    create_coupon: function (req,res) {
      let couple_num = req.query.couple_num
      let name = req.query.name
      let reason = req.query.reason
      let creation_date = req.query.creation_date
      let author_id = req.query.author_id
      let author_name = req.query.author_name
      let taker_id = req.query.taker_id
      let taker_name = req.query.taker_name
      let icon = req.query.icon
      let picture = req.query.picture
      let queryString = `INSERT INTO coupon (couple_num,name,reason,creation_date,author_id,author_name,`
              + `taker_id,taker_name,icon,picture) `
              + `VALUES (${couple_num},"${name}","${reason}","${dateParse(creation_date)}",${author_id},"${author_name}",'`
              + `${taker_id},"${taker_name}",${icon},"${picture}"); `
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        connection.query(`SELECT coupon_id FROM coupon WHERE author_id = "${author_id}" AND ` +
                         `taker_id = "${taker_id}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write('error2'); res.end(); return;}
          console.log(rows2[rows2.length - 1].id)
          res.write(`${rows2[rows2.length - 1].id}`);
          res.end();
        })
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ read_coupon
    //=====================================================================================================================================
    read_coupon: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let queryString = `SELECT * FROM coupon WHERE id_num = '${id_num}';`
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) { res.write('null'); res.end(); return; }
        try{
          let str = `{\n\t"coupon" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"coupon_id" : ${rows[i].id_num},\n`
            str += `\t"coupon_num" : ${rows[i].coupon_num},\n`
            str += `\t"name" : "${rows[i].name}",\n`
            str += `\t"reason" : "${rows[i].reason}",\n`
            str += `\t"creation_date" : "${dateParse(rows[i].pw)}",\n`
            str += `\t"author_id" : ${rows[i].author_id},\n`
            str += `\t"author_name" : "${rows[i].author_name}",\n`
            str += `\t"taker_id" : ${rows[i].taker_id},\n`
            str += `\t"taker_name" : "${rows[i].taker_name}",\n`
            str += `\t"icon" : ${rows[i].icon},\n`
            str += `\t"picture" : "${rows[i].picture}"\n}`
            if(i != (rows.length-1))
              str += ', '
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ update_coupon
    //=====================================================================================================================================
    update_coupon: function (req,res) {
      let coupon_id = req.query.coupon_id
      if(coupon_id == null){ res.write('error'); res.end(); return; }
      let arr = []
      let arrStr = ``
      if(req.query.couple_num != null) { arr.push(`couple_num = ${req.query.couple_num}`) }
      if(req.query.name != null) { arr.push(`name = "${req.query.name}"`) }
      if(req.query.reason != null) { arr.push(`reason = "${req.query.reason}"`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${dateParse(req.query.creation_date)}"`) }
      if(req.query.author_id != null) { arr.push(`author_id = ${req.query.author_id}`) }
      if(req.query.author_name != null) { arr.push(`author_name = "${req.query.author_name}"`) }
      if(req.query.taker_id != null) { arr.push(`taker_id = ${req.query.taker_id}`) }
      if(req.query.taker_name != null) { arr.push(`taker_name = "${req.query.taker_name}"`) }
      if(req.query.icon != null) { arr.push(`icon = ${req.query.icon}`) }
      if(req.query.picture != null) { arr.push(`picture = "${req.query.picture}"`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE coupon SET ${arrStr} WHERE coupon_id = ${coupon_id};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`);
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_coupon
    //=====================================================================================================================================
    delete_coupon: function (req,res) {
      let coupon_id = req.query.coupon_id
      let queryString = `DELETE FROM coupon WHERE coupon_id = '${coupon_id}';`
      if(coupon_id == null){ res.write('error'); res.end(); return; }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    },

    //=====================================================================================================================================
    //
    //  WISH TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2022.04.18 KimYC1223
    /*
        +-------------------------+------------+------+-----+---------+----------------+
        | Field                   | Type       | Null | Key | Default | Extra          |
        +-------------------------+------------+------+-----+---------+----------------+
        | wish_id                 | int(11)    | NO   | PRI | NULL    | auto_increment |
        | couple_num              | int(11)    | YES  |     | NULL    |                |
        | name                    | char(50)   | YES  |     | NULL    |                |
        | creation_date           | date       | YES  |     | NULL    |                |
        | is_issuance_immediately | tinyint(1) | NO   |     | NULL    |                |
        | cost                    | text       | YES  |     | NULL    |                |
        | reason                  | text       | YES  |     | NULL    |                |
        | wish_state              | int(11)    | YES  |     | NULL    |                |
        | is_dead_line            | tinyint(1) | NO   |     | NULL    |                |
        | deadline                | date       | YES  |     | NULL    |                |
        | author_id               | int(11)    | YES  |     | NULL    |                |
        | author_name             | char(20)   | YES  |     | NULL    |                |
        | taker_id                | int(11)    | YES  |     | NULL    |                |
        | taker_name              | char(20)   | YES  |     | NULL    |                |
        | icon                    | int(11)    | YES  |     | NULL    |                |
        | picture                 | text       | YES  |     | NULL    |                |
        +-------------------------+------------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_wish
    //=====================================================================================================================================
    create_wish: function (req,res) {
      let couple_num = req.query.couple_num
      let name = req.query.name
      let creation_date = req.query.creation_date
      let is_issuance_immediately = req.query.is_issuance_immediately
      let cost = req.query.cost
      let reason = req.query.reason
      let wish_state = req.query.wish_state
      let is_dead_line = req.query.is_dead_line
      let deadline = req.query.deadline
      let author_id = req.query.author_id
      let author_name = req.query.author_name
      let taker_id = req.query.taker_id
      let taker_name = req.query.taker_name
      let icon = req.query.icon
      let picture = req.query.picture
      let queryString = `INSERT INTO wish (couple_num,name,creation_date,is_issuance_immediately,cost,`
              + `reason,wish_state,is_dead_line,deadline,author_id,author_name,taker_id,taker_name,icon,picture) `
              + `VALUES (${couple_num},"${name}","${dateParse(creation_date)}",${is_issuance_immediately},${cost},`
              + `"${reason}",${wish_state},${is_dead_line},"${dateParse(deadline)}",${author_id},`
              + `"${author_name}",${taker_id},"${taker_name}",${icon},"${picture}");`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        connection.query(`SELECT wish_id FROM wish WHERE author_id = "${author_id}" AND ` +
                         `taker_id = "${taker_id}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write('error2'); res.end(); return;}
          console.log(rows2[rows2.length - 1].id)
          res.write(`${rows2[rows2.length - 1].id}`);
          res.end();
        })
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ read_wish
    //=====================================================================================================================================
    read_wish: function (req,res) {
      let id_num = req.query.id_num
      if(id_num == null){ res.write('error'); res.end(); return; }
      let queryString = `SELECT * FROM wish WHERE id_num = '${id_num}';`
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) { res.write('null'); res.end(); return; }
        try{
          let str = `{\n\t"wish" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"wish_id" : ${rows[i].id_num},\n`
            str += `\t"coupon_num" : ${rows[i].coupon_num},\n`
            str += `\t"name" : "${rows[i].name}",\n`
            str += `\t"creation_date" : "${dateParse(rows[i].pw)}",\n`
            str += `\t"is_issuance_immediately" : ${rows[i].is_issuance_immediately},\n`
            str += `\t"cost" : ${rows[i].cost},\n`
            str += `\t"reason" : "${rows[i].reason}",\n`
            str += `\t"wish_state" : ${rows[i].wish_state},\n`
            str += `\t"is_dead_line" : ${rows[i].is_dead_line},\n`
            str += `\t"deadline" : "${rows[i].deadline}",\n`
            str += `\t"author_id" : ${rows[i].author_id},\n`
            str += `\t"author_name" : "${rows[i].author_name}",\n`
            str += `\t"taker_id" : ${rows[i].taker_id},\n`
            str += `\t"taker_name" : "${rows[i].taker_name}",\n`
            str += `\t"icon" : ${rows[i].icon},\n`
            str += `\t"picture" : "${rows[i].picture}"\n}`
            if(i != (rows.length-1))
              str += ', '
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ update_wish
    //=====================================================================================================================================
    update_wish: function (req,res) {
      let wish_id = req.query.wish_id
      if(wish_id == null){ res.write('error'); res.end(); return; }
      let arr = []
      let arrStr = ``
      if(req.query.couple_num != null) { arr.push(`couple_num = ${req.query.couple_num}`) }
      if(req.query.name != null) { arr.push(`name = "${req.query.name}"`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${dateParse(req.query.creation_date)}"`) }
      if(req.query.is_issuance_immediately != null) { arr.push(`is_issuance_immediately = ${req.query.is_issuance_immediately}`) }
      if(req.query.cost != null) { arr.push(`cost = ${req.query.cost}`) }
      if(req.query.reason != null) { arr.push(`reason = "${req.query.reason}"`) }
      if(req.query.wish_state != null) { arr.push(`wish_state = ${req.query.wish_state}`) }
      if(req.query.is_dead_line != null) { arr.push(`is_dead_line = ${req.query.is_dead_line}`) }
      if(req.query.deadline != null) { arr.push(`deadline = "${dateParse(req.query.deadline)}"`) }
      if(req.query.author_id != null) { arr.push(`author_id = ${req.query.author_id}`) }
      if(req.query.author_name != null) { arr.push(`author_name = "${req.query.author_name}"`) }
      if(req.query.taker_id != null) { arr.push(`taker_id = ${req.query.taker_id}`) }
      if(req.query.taker_name != null) { arr.push(`taker_name = "${req.query.taker_name}"`) }
      if(req.query.icon != null) { arr.push(`icon = ${req.query.icon}`) }
      if(req.query.picture != null) { arr.push(`picture = "${req.query.picture}"`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE wish SET ${arrStr} WHERE id_num = ${id_num};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_wish
    //=====================================================================================================================================
    delete_wish: function (req,res) {
      let wish_id = req.query.wish_id
      let queryString = `DELETE FROM wish WHERE wish_id = '${wish_id}';`
      if(wish_id == null){ res.write('error'); res.end(); return; }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write('error'); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    }
 }
})()
