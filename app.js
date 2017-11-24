/**
 * Created by Balkishan on 11/24/2017.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    amqp = require('amqp'),
    bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.connectionStatus = 'No server connection';
app.exchangeStatus = 'No exchange established';
app.queueStatus = 'No queue established';

app.get('/', function (req, res) {
    res.render('index.jade',
        {
            title: 'Welcome to rabbitMq and Node/Express project.',
            connectionStatus: app.connectionStatus,
            exchangeStatus: app.exchangeStatus,
            queueStatus: app.queueStatus
        })
});

app.post('/start-server', function (req, res) {
    console.log('called');
    app.rabbitMqConnection = amqp.createConnection({host: 'localhost'});
    app.rabbitMqConnection.on('ready', function () {
        app.connectionStatus = 'Connected';
        console.log('amqp connected');
        res.redirect('/');
    })
});

app.post('/new-exchange', function (req, res) {
    app.e = app.rabbitMqConnection.exchange('test-exchange');
    app.exchangeStatus = 'An exchange has been established!';
    res.redirect('/');
});

app.post('/new-queue', function (req, res) {
    app.q = app.rabbitMqConnection.queue('test-queue');
    app.queueStatus = 'The queue is ready for use!';
    res.redirect('/');
});

app.get('/message-service', function (req, res) {
    app.q.bind(app.e, 'routingKey');
    res.render('messageService.jade',
        {
            title: 'Welcome to messaging service',
            sendMessage: ''
        });
});

app.post('/newMessage', function (req, res) {
    var newMessage = req.body.newMessage;
    app.e.publish('routingKey', {message: newMessage});

    app.q.subscribe(function (msg) {
        console.log(msg);
        res.render('messageService.jade',
            {
                title: 'you\'ve got mail',
                sendMessage: msg.message
            });
    })
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("RabbitMq app started running at : " + app.get('port'));
});