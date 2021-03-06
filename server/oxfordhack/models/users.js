var mongoose = require('mongoose');

var User = mongoose.model('User', { name: String,
    _id: {type: Number, index: {unique: true}},
    history: [{
    date: {type: Date, default: Date.now},
    anger: Number,
    contempt: Number,
    disgust: Number,
    fear: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    surprise: Number }] });

var addUser = function (id) {
    User.update({_id: id}, {}, {upsert: true, setDefaultsOnInsert: true}, function () {});
};

var addResult = function (id, result) {
    User.findByIdAndUpdate(
        id,
        {$push: {history: result}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(model);
        }
    );
};

var getHistory = function (id, callback) {
    User.findById(id, function (err, user) {
        if (err) {
            console.error('No such user ' + toString(user) + '!');
            return handleError(err);
        }

        callback(user.history);
    });
};

module.exports = {
    addUser: addUser,
    addResult: addResult,
    getHistory: getHistory
};