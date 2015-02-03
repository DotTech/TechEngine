TechEngine.log("Loading 'techengine.array.js'...", true);

/*
//  Namespace:      TechEngine.Array
//  Description:    Extends the array object
*/

Array.prototype.contains = function (v) 
{
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) {
        	return true;
        }
    }

    return false;
};

Array.prototype.unique = function () 
{
    var arr = [];

    for(var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }

    return arr; 
}

TechEngine.log("Success!");
TechEngine.includeNext();