var mysql      = require('mysql')
let queryString = require('querystring')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : 3306,
  database : 'love_dash_board'
});

let dateParse = (timestamp) => {
  let year = timestamp.getFullYear(); // 년도
  let month = timestamp.getMonth() + 1;  // 월
  let date = timestamp.getDate();  // 날짜
  let hours = timestamp.getHours(); // 시
  let minutes = timestamp.getMinutes();  // 분
  let seconds = timestamp.getSeconds();  // 초

  return `${year}-${parseInt(month/10)}${month%10}-${parseInt(date/10)}${date%10} `+
         `${parseInt(hours/10)}${hours%10}:${parseInt(minutes/10)}${minutes%10}:${parseInt(seconds/10)}${seconds%10}`
}


connection.connect();
module.exports = (function() {
  return{
    //=====================================================================================================================================
    //
    //  USER TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2020.11.22 KimYC1223
    /*
        +-------------------+----------+------+-----+---------+----------------+
        | Field             | Type     | Null | Key | Default | Extra          |
        +-------------------+----------+------+-----+---------+----------------+
        | id                | int(11)  | NO   | PRI | NULL    | auto_increment |
        | name              | char(10) | YES  |     | NULL    |                |
        | moa_band_name     | char(30) | YES  |     | NULL    |                |
        | item_0            | int(11)  | YES  |     | NULL    |                |
        | item_1            | int(11)  | YES  |     | NULL    |                |
        | item_2            | int(11)  | YES  |     | NULL    |                |
        | item_3            | int(11)  | YES  |     | NULL    |                |
        | item_4            | int(11)  | YES  |     | NULL    |                |
        | morning_call_time | time     | YES  |     | NULL    |                |
        | breakfast_time    | time     | YES  |     | NULL    |                |
        | lunch_time        | time     | YES  |     | NULL    |                |
        | dinner_time       | time     | YES  |     | NULL    |                |
        | school_time       | time     | YES  |     | NULL    |                |
        | home_time         | time     | YES  |     | NULL    |                |
        | water_skip        | time     | YES  |     | NULL    |                |
        | drink_skip        | time     | YES  |     | NULL    |                |
        | pee_skip          | time     | YES  |     | NULL    |                |
        | poop_skip         | time     | YES  |     | NULL    |                |
        | font_family       | char(20) | YES  |     | NULL    |                |
        | font_size         | int(11)  | YES  |     | NULL    |                |
        | creation_date     | datetime | YES  |     | NULL    |                |
        +-------------------+----------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_users
    //=====================================================================================================================================
    //=====================================================================================================================================
    //
    //  USER TABLE CRUD (Create, Read, Update, Delete)
    //  @ 2020.11.22 KimYC1223
    /*
        +-------------------+----------+------+-----+---------+----------------+
        | Field             | Type     | Null | Key | Default | Extra          |
        +-------------------+----------+------+-----+---------+----------------+
        | id                | int(11)  | NO   | PRI | NULL    | auto_increment |
        | name              | char(10) | YES  |     | NULL    |                |
        | moa_band_name     | char(30) | YES  |     | NULL    |                |
        | item_0            | int(11)  | YES  |     | NULL    |                |
        | item_1            | int(11)  | YES  |     | NULL    |                |
        | item_2            | int(11)  | YES  |     | NULL    |                |
        | item_3            | int(11)  | YES  |     | NULL    |                |
        | item_4            | int(11)  | YES  |     | NULL    |                |
        | morning_call_time | time     | YES  |     | NULL    |                |
        | breakfast_time    | time     | YES  |     | NULL    |                |
        | lunch_time        | time     | YES  |     | NULL    |                |
        | dinner_time       | time     | YES  |     | NULL    |                |
        | school_time       | time     | YES  |     | NULL    |                |
        | home_time         | time     | YES  |     | NULL    |                |
        | water_skip        | time     | YES  |     | NULL    |                |
        | drink_skip        | time     | YES  |     | NULL    |                |
        | pee_skip          | time     | YES  |     | NULL    |                |
        | poop_skip         | time     | YES  |     | NULL    |                |
        | font_family       | char(20) | YES  |     | NULL    |                |
        | font_size         | int(11)  | YES  |     | NULL    |                |
        | creation_date     | datetime | YES  |     | NULL    |                |
        | birthday          | datetime | YES  |     | NULL    |                |
        | gender            | char(8)  | YES  |     | NULL    |                |
        | periode           | int(11)  | YES  |     | NULL    |                |
        +-------------------+----------+------+-----+---------+----------------+
    */
    //
    //=====================================================================================================================================
    //  ▶ create_users
    //=====================================================================================================================================
    create_users: function (req,res) {
      let name = req.query.name
      let moa_band_name = req.query.moa_band_name
      let item_0 = req.query.item_0
      let item_1 = req.query.item_1
      let item_2 = req.query.item_2
      let item_3 = req.query.item_3
      let item_4 = req.query.item_4
      let morning_call_time = req.query.morning_call_time
      let breakfast_time = req.query.breakfast_time
      let lunch_time = req.query.lunch_time
      let dinner_time = req.query.dinner_time
      let school_time = req.query.school_time
      let home_time = req.query.home_time
      let water_skip = req.query.water_skip
      let drink_skip = req.query.drink_skip
      let pee_skip = req.query.pee_skip
      let poop_skip = req.query.poop_skip
      let font_family = req.query.font_family
      let font_size = req.query.font_size
      let creation_date = req.query.creation_date
      let birthday = req.query.birthday
      let gender = req.query.gender
      let periode = req.query.periode
      let queryString = 'INSERT INTO users (name,moa_band_name,item_0,item_1,item_2,item_3,item_4,morning_call_time,'
              + 'breakfast_time,lunch_time,dinner_time,school_time,home_time,'
              + 'water_skip,drink_skip,pee_skip,poop_skip,font_family,font_size,creation_date,birthday,gender,periode)'
              + `VALUES ("${name}","${moa_band_name}",${item_0},${item_1},${item_2},${item_3},${item_4},"${morning_call_time}",`
              + `"${breakfast_time}","${lunch_time}","${dinner_time}","${school_time}","${home_time}",`
              + `"${water_skip}","${drink_skip}","${pee_skip}","${poop_skip}","${font_family}",${font_size},"${creation_date}",`
              + `"${birthday} 00:00:00","${gender}",${periode});`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write(error); res.end(); return;}
        connection.query(`SELECT id FROM users WHERE name = "${name}";`, function(error2,rows2,fields2) {
          if(error2) {console.log(error2); res.write(error2); res.end(); return;}
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
      let searchName = req.query.searchName
      let queryString = `SELECT * FROM users WHERE id = '${id}';`
      if(id == null) {
        if(searchName == null)
          queryString = `SELECT * FROM users;`
        else queryString = `SELECT * FROM users WHERE name = '${searchName}';`
      }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) {
          res.write('null')
          res.end();
          return;
        }
        try{
          let str = `{\n\t"UserLogs" : [\n`
          for(var i = 0; i < rows.length; i ++) {
            str +=' {\n'
            str += `\t"id" : ${rows[i].id},\n`
            str += `\t"name" : "${rows[i].name}",\n`
            str += `\t"moa_band_name" : "${rows[i].moa_band_name}",\n`
            str += `\t"item_0" : ${rows[i].item_0},\n`
            str += `\t"item_1" : ${rows[i].item_1},\n`
            str += `\t"item_2" : ${rows[i].item_2},\n`
            str += `\t"item_3" : ${rows[i].item_3},\n`
            str += `\t"item_4" : ${rows[i].item_4},\n`
            str += `\t"morning_call_time" : "${rows[i].morning_call_time}",\n`
            str += `\t"breakfast_time" : "${rows[i].breakfast_time}",\n`
            str += `\t"lunch_time" : "${rows[i].lunch_time}",\n`
            str += `\t"dinner_time" : "${rows[i].dinner_time}",\n`
            str += `\t"school_time" : "${rows[i].school_time}",\n`
            str += `\t"home_time" : "${rows[i].home_time}",\n`
            str += `\t"water_skip" : "${rows[i].water_skip}",\n`
            str += `\t"drink_skip" : "${rows[i].drink_skip}",\n`
            str += `\t"pee_skip" : "${rows[i].pee_skip}",\n`
            str += `\t"poop_skip" : "${rows[i].poop_skip}",\n`
            str += `\t"font_family" : "${rows[i].font_family}",\n`
            str += `\t"font_size" : ${rows[i].font_size},\n`
            str += `\t"creation_date" : "${dateParse(rows[i].creation_date)}",\n`
            str += `\t"birthday" : "${dateParse(rows[i].birthday)}",\n`
            str += `\t"gender" : "${rows[i].gender}",\n`
            str += `\t"periode" : ${rows[i].periode}\n}`
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
      let id = req.query.id
      if(id == null){
        res.write('error')
        res.end();
        return;
      }
      let arr = []
      let arrStr = ``
      if(req.query.name != null) { arr.push(`name = "${req.query.name}"`) }
      if(req.query.moa_band_name != null) { arr.push(`moa_band_name = "${req.query.moa_band_name}"`) }
      if(req.query.item_0 != null) { arr.push(`item_0 = ${req.query.item_0}`) }
      if(req.query.item_1 != null) { arr.push(`item_1 = ${req.query.item_1}`) }
      if(req.query.item_2 != null) { arr.push(`item_2 = ${req.query.item_2}`) }
      if(req.query.item_3 != null) { arr.push(`item_3 = ${req.query.item_3}`) }
      if(req.query.item_4 != null) { arr.push(`item_4 = ${req.query.item_4}`) }
      if(req.query.morning_call_time != null) { arr.push(`morning_call_time = "${req.query.morning_call_time}"`) }
      if(req.query.breakfast_time != null) { arr.push(`breakfast_time = "${req.query.breakfast_time}"`) }
      if(req.query.lunch_time != null) { arr.push(`lunch_time = "${req.query.lunch_time}"`) }
      if(req.query.dinner_time != null) { arr.push(`dinner_time = "${req.query.dinner_time}"`) }
      if(req.query.school_time != null) { arr.push(`school_time = "${req.query.school_time}"`) }
      if(req.query.home_time != null) { arr.push(`home_time = "${req.query.home_time}"`) }
      if(req.query.water_skip != null) { arr.push(`water_skip = "${req.query.water_skip}"`) }
      if(req.query.drink_skip != null) { arr.push(`drink_skip = "${req.query.drink_skip}"`) }
      if(req.query.pee_skip != null) { arr.push(`pee_skip = "${req.query.pee_skip}"`) }
      if(req.query.poop_skip != null) { arr.push(`poop_skip = "${req.query.poop_skip}"`) }
      if(req.query.poop_skip != null) { arr.push(`poop_skip = "${req.query.poop_skip}"`) }
      if(req.query.font_family != null) { arr.push(`font_family = "${req.query.font_family}"`) }
      if(req.query.font_size != null) { arr.push(`font_size = ${req.query.font_size}`) }
      if(req.query.creation_date != null) { arr.push(`creation_date = "${req.query.creation_date}"`) }
      if(req.query.birthday != null) { arr.push(`birthday = "${req.query.birthday} 00:00:00"`) }
      if(req.query.gender != null) { arr.push(`gender = "${req.query.gender}"`) }
      if(req.query.periode != null) { arr.push(`periode = "${req.query.periode}"`) }
      if(arr.length == 0){ res.write('error'); res.end(); return; }

      for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if( i != arr.length-1) {arrStr += ',';}
      }

      let queryString = `UPDATE users SET ${arrStr} WHERE id = ${id};`
      connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error); res.write(error); res.end(); return;}
        res.write(`1`);
        res.end();
      });
      return;
    },

    //=====================================================================================================================================
    //  ▶ delete_users
    //=====================================================================================================================================
    delete_users: function (req,res) {
      let id = req.query.id
      let queryString = `DELETE FROM users WHERE id = '${id}';`
      if(id == null) {
        res.write('null')
        res.end();
        return;
      }
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(error) {console.log(error); res.write(error); res.end(); return;}
        res.write(`1`); res.end(); return;
      });
      return;
    }
 }
})()
