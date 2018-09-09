//container for the handler

// Sample handler
sample = function(data,callback){
    callback(406,{'name':'sample handler'});
};



module.exports = sample;