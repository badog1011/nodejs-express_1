/**
*
* Module dependience
*
**/

var express = require('express')
  , search = require('./search')


 /**
 *
 * Create App
 *
 **/

 var app = express.createServer();

 /**
 *
 * 配置
 *
 **/

 app.set('view engine', 'ejs');//注意小寫
 app.set('views', __dirname + '/views');
 app.set('view options', { layout: false });
 console.log(app.set('views'));//獲取配置訊息

 // app.register('.html', require('jade'));
 app.get('/search', function (req, res, next) {
 	search(req.query.q, function (err, tweets) {//接收兩個參數:1. 錯誤對象(如果有的話)2. 查詢到的推文數據
 		if (err) return next(err);
 		res.render('search', { results: tweets, search: req.query.q});
 	});
 });

 /**
 *
 * Router
 *
 **/

 app.get('/', function (req, res) {
 	res.render('index');//因為視圖引擎已宣告為ejs所以無須指名index.ejs
 });

 app.listen(3000);