var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE);


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Answer = new mongoose.Schema({

    _id: {
        type: ObjectId,
        default: function f() {
            return new mongoose.Types.ObjectId();
        }
    },
    programme: String,
    startYear: String,
    sessionID: String,
    ip: String,
    searchTerms: String
}, {timestamps: true});


mongoose.model('Answer', Answer);

module.exports = mongoose.models;

