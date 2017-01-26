function InsightController(dependencies) {

    /// Dependencies   
    var _mongoose;

    /// Properties
    var _entity;

    var constructor = function () {
        _mongoose = dependencies.mongoose;

        _entity = require('../Models/Insight')(dependencies);
        _entity.Initialize();
    }

    var createInsight = function (data, callback) {

        var insight = new _entity.GetModel()(
            {
                App: data.App,
                Duration: data.Duration,
            });

        insight.save().then(function (result) {
            // When database return a result call the return
            callback();
        })
    }

    var deleteInsight = function (data, callback) {
        _entity.GetModel().findOneAndRemove(data, function (err, result) {
            callback(result);
        })
    }

    var getInsightById = function (data, callback) {
        _entity.GetModel().findOne({ "_id": data }, function (err, result) {
            if (err) console.log(err);

            callback(result);
        })
    }


    var getAllInsight = function (data, callback) {
        _entity.GetModel().find({}, function (err, result) {
            if (err) console.log(err);

            callback(result);
        })
    }

    var getEntity = function () {
        return _entity;
    }

    return {
        Initialize: constructor,
        CreateInsight: createInsight,
        DeleteInsight: deleteInsight,
        GetInsightById: getInsightById,
        GetAllInsight: getAllInsight,
        Entity: getEntity
    }
}

module.exports = InsightController;