var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var cfg=require('./config.js');
var gcfg=path.join(path.dirname(__dirname),'config.js');

var domain = require('domain'); //进程守护，防止崩溃
var Domain = domain.create();
Domain.on( 'error', function( e ){    //监听异步错误
    console.log( 'error ' + e)
});

if(fs.existsSync(gcfg)){
    cfg=require(gcfg);
}

exports.cfg=cfg;
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: path.join(path.dirname(__filename),'/bin/logs/access.log'),
            backups: 3,
            maxLogSize: 20480,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

//var logger = log4js.getLogger('normal');
//logger.setLevel('INFO');
exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel(cfg.logLevel||'ERROR');
    return logger;
}
var app = express();
// view engine setup
if(cfg.test){
    app.set('views', path.join(__dirname, 'views'));
}else{
    app.set('views', path.join(__dirname, 'views_dist'));
}
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon('http://assets.lrts.me/images/favicon.ico'));
//app.use(logger('dev'));
app.use(log4js.connectLogger(this.logger('normal'),{level:'auto',format:':method :url'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if(cfg.test){
    app.use(express.static(path.join(__dirname, 'public')));
}else{
    app.use(express.static(path.join(__dirname, 'dist')));
}
app.use('/', function (req, res, next){
    req.query.test = cfg.test;
    var userAgent=req.headers['user-agent'];
    global.userAgent=req.headers['user-agent'];
    //console.log(userAgent);
    if(!req.cookies.token){
        if(!req.query.token){ // 如果app传递token,则token以app为主 HLP，TODO
            req.headers['cookie']='token='+cfg.token;
        }else{
            req.headers['cookie']='';
        }
    }
    try{
        if(userAgent){
            var useragent=req.headers['user-agent'].match(/([\w+\.\d;\/\s-]+)/g)[1];
            if(useragent){
                var arr=useragent.split('; ');
                if(useragent.indexOf('Android')>-1){
                    req.headers['user-agent']='Android 4.4/yytingwap/'+arr[2].split(' ')[0].replace('\/','')+'/'+arr[2].split(' ')[1].replace('\/','')+'/ch_hiapk/160/Android';
                    console.log(req.headers['user-agent']);
                }else if(useragent.indexOf('Mac OS')>-1){
                    req.headers['user-agent']='IOS '+(useragent.match(/[\d\_]+/)[0].replace(/\_/g,'.')).replace('\/','')+'/yytingwap/Apple/'+arr[0].replace('\/','')+'/ch_AppStore/2.3.7/iPhone';
                    console.log(req.headers['user-agent']);
                }else{ //fake UserAgent For PC Wap
                    req.headers['user-agent']='Android 4.4/yytingwap/yytingwap/Chrome/ch_yytingwap/160/Android';
                }
            }
        }
    }catch(err){
        throw err;
    }
    //console.log('useragent:'+req.headers['user-agent']);
    //next();
    Domain.run( function(){
        next();    //包装异步处理，这样回调出错，也不会造成项目崩溃
    });
});

// 所有活动页面统一在此路由下 2016-06-20
var h5Activity = require('./routes/h5');
app.use('/h5', h5Activity);

var activity = require('./routes/activity');
app.use('/', activity);

var bookstore = require('./routes/bookstore');
app.use('/', bookstore);
var new_index = require('./routes/new_index');//类首页
app.use('/', new_index);
var sns = require('./routes/sns');
app.use('/', sns);
var user = require('./routes/user');
app.use('/', user);
var freeflow = require('./routes/freeflow');
app.use('/', freeflow);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        if(err.status==404){
            res.render('404',{query:req.query,path: req.path});
        }else {
            res.render('error', {
                message: err.message,
                error: err,
                path: req.path
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if(err.status==404){
        res.render('404',{query:req.query,path: req.path});
    }else{
        res.render('error', {
            message: err.message,
            error: {},
            path: req.path
        });
    }
});

module.exports = app;
