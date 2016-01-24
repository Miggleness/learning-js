// 05 Context
var DOT = function(obj, prop){
    if(obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        else {
            return DOT(obj.__proto__, prop);
        }
    }

// 05 Context
var DOTCALL = function(obj, prop, args){
    var fn = DOT(obj, prop);
    
    if(typeof fn === 'function') {
        return fn.apply(obj, args);
    }

}

// 06 Prototypes
var NEW = function(constructor, args){

}

var INSTANCEOF = function(obj, constructor){

}