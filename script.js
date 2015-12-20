 function ObjectWithMethodOverloading() {
     var obj = {},
         methods = [];

     obj.overload = function (name, fn, types) {
         if (typeof fn === 'function') {
             var stringTypes;
             if (types !== undefined) {
                 stringTypes = types.map(function (cur) {
                     return cur.name.toLowerCase();
                 }).join(',');
             }
             methods.push([fn.length, stringTypes, fn.bind(this)]);

             obj[name] = function () {
                 var method,
                     args = [].slice.call(arguments),
                     types = args.map(function (cur) {
                         return typeof cur;
                     }).join(',');
                 methods.forEach(function (cur) {
                     if (cur[0] == args.length && (cur[1] == types || cur[1] === undefined)) {
                         method = cur[2];
                     }
                 });
                 return method.apply(this, arguments);
             };
         }
     };
     return obj;
 }
