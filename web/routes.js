module.exports = function (app) {
    let mysqlScript = require('./mysqlScript.js')
    let fs = require('fs')

    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.get('/', (req,res) => {
      res.render(__dirname+'/HTML/index.html')
    })

    // users Table CRUD
    app.get('/create_users', (req,res) => { mysqlScript.create_users(req,res) })
    app.get('/read_users', (req,res) => { mysqlScript.read_users(req,res) })
    app.get('/update_users', (req,res) => { mysqlScript.update_users(req,res) })
    app.get('/delete_users', (req,res) => { mysqlScript.delete_users(req,res) })
    app.get('/delete_users_all', (req,res) => { mysqlScript.delete_users_all(req,res) })
    app.get('/transfer_user', (req,res) => { mysqlScript.transfer_user(req,res) })
    app.get('/shift_user', (req,res) => {mysqlScript.shift_user(req,res)})
}
