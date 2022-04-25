module.exports = function (app) {
    let mysqlScript = require('./mysqlScript.js')
    let fs = require('fs')

    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.get('/', (req,res) => { res.render(__dirname+'/HTML/index.html') })
    app.get('/login', (req,res) => { res.render(__dirname+'/HTML/login.html') })

    // users Table CRUD
    app.get('/create_users', (req,res) => { mysqlScript.create_users(req,res) })
    app.get('/read_users', (req,res) => { mysqlScript.read_users(req,res) })
    app.get('/update_users', (req,res) => { mysqlScript.update_users(req,res) })
    app.get('/delete_users', (req,res) => { mysqlScript.delete_users(req,res) })

    // achievement Table CRUD
    app.get('/create_achievement', (req,res) => { mysqlScript.create_achievement(req,res) })
    app.get('/read_achievement', (req,res) => { mysqlScript.read_achievement(req,res) })
    app.get('/update_achievement', (req,res) => { mysqlScript.update_achievement(req,res) })
    app.get('/delete_achievement', (req,res) => { mysqlScript.delete_achievement(req,res) })

    // title Table CRUD
    app.get('/create_title', (req,res) => { mysqlScript.create_title(req,res) })
    app.get('/read_title', (req,res) => { mysqlScript.read_title(req,res) })
    app.get('/update_title', (req,res) => { mysqlScript.update_title(req,res) })
    app.get('/delete_title', (req,res) => { mysqlScript.delete_title(req,res) })

    // coupon Table CRUD
    app.get('/create_coupon', (req,res) => { mysqlScript.create_coupon(req,res) })
    app.get('/read_coupon', (req,res) => { mysqlScript.read_coupon(req,res) })
    app.get('/update_coupon', (req,res) => { mysqlScript.update_coupon(req,res) })
    app.get('/delete_coupon', (req,res) => { mysqlScript.delete_coupon(req,res) })

    // wish Table CRUD
    app.get('/create_wish', (req,res) => { mysqlScript.create_wish(req,res) })
    app.get('/read_wish', (req,res) => { mysqlScript.read_wish(req,res) })
    app.get('/update_wish', (req,res) => { mysqlScript.update_wish(req,res) })
    app.get('/delete_wish', (req,res) => { mysqlScript.delete_wish(req,res) })
}
