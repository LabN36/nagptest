var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var Comment = require('./comment').Comment;
var Product = require('./product').Product;
var shortid = require('shortid');
app.set('port', 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,charset');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
mongoose.connect(config.MONGO_URL);
var product = new Product({
    productName: 'Sony XYZ',
    productType: 'TV'
});
Product.find({}, function (err, data) {
    console.log(err);
    console.log(data);
});

app.get('/fetchComment', function (req, res) {
    // res.json({ status: true, data: masterComment });
    Comment.find({}, function (err, data) {
        if (err) {
            res.json({ status: false, message: 'Something Went Wrong', error: err });
        } else {
            res.json({ status: true, data: data })
        }
    }).sort({ "time": -1 });
});
var masterComment = [];
app.post('/addComment', function (req, res) {
    console.log(moment().unix());
    if (req && req.body && req.body.comment) {
        var comment = {
            commentId: shortid.generate(),
            time: moment().unix(),
            text: req.body.comment
        }
        var commentDb = new Comment({
            commentId: shortid.generate(),
            time: moment().unix(),
            text: req.body.comment
        })
        masterComment.push(comment);
        commentDb.save(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                Comment.find({}, function (err, commentList) {
                    if (err) {
                        res.json({ status: false, message: 'Something Went Wrong', error: err });
                    } else {
                        // res.json({ status: true, data: commentList })
                        res.json({ status: true, message: 'Added Successfully', data: commentList });
                    }
                }).sort({ "time": -1 });

            }
        });
    } else {
        res.json({ status: false, message: 'Bad Request', data: masterComment });
    }

});

app.listen(app.get('port'), function (err) {
    if (err) {
        console.log("Error Occured while starting the server");
    } else {
        console.log("Server is Up");
    }
})