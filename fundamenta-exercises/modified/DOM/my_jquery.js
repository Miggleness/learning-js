(function () {
    $ = function (selector) {
        
        if(!(this instanceof $)) {
            return new $(selector);
        }
        
        var r = document.querySelectorAll(selector);
        //this.length = r.length;
        // //$.extend(self, new Array());
        // 
        // self.length = r.length;
        // $.each(r, function(index, value){
        //     self[index] = value;
        // });
       
        Array.prototype.push.apply(this, r);
        
        
    };

    $.extend = function (target, object) {
        for (var prop in object) {
            target[prop] = object[prop];
        }
        return target;
    };

    // Static methods
    var isArrayLike = function (obj) {
        return typeof obj.length === 'number' && ((obj.length - 1) in obj);
    };

    $.extend($, {
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        each: function (collection, cb) {
            if (isArrayLike(collection)) {
                for (var index = 0; index < collection.length; index++) {
                    cb.call(collection[index], index, collection[index]);
                }
            }
            else {
                for (var prop in collection) {
                    if (collection.hasOwnProperty(prop)) {
                        var value = collection[prop];
                        cb.call(value, prop, value);
                    }
                }
            }
            return collection;
        },
        makeArray: function (arr) {
            var newArr = [];

            $.each(arr, function (index, value) {
                newArr[index] = value;
            })

            return newArr;
        },
        proxy: function (fn, context) {
            return function () { 
                return fn.apply(context, arguments);
            };
        }
    });

    $.extend($.prototype, {
        html: function (newHtml) {
            if(arguments.length===0){
                return this[0].innerHTML;
            } 
            else{
               $.each(this, function(i, el){
                  el.innerHTML = newHtml; 
               });
               
               return this;
            }
        },
        val: function (newVal) {
             if(arguments.length===0){
                return this[0].value;
            } 
            else{
               $.each(this, function(i, el){
                  el.value= newVal;
               });
               
               return this;
            }
        },
        text: function (newText) { },
        find: function (selector) { },
        next: function () { },
        prev: function () { },
        parent: function () { },
        children: function () { },
        attr: function (attrName, value) { },
        css: function (cssPropName, value) { },
        width: function () { },
        offset: function () {
            var offset = this[0].getBoundingClientRect();
            return {
                top: offset.top + window.pageYOffset,
                left: offset.left + window.pageXOffset
            };
        },
        hide: function () { },
        show: function () { },

        // Events
        bind: function (eventName, handler) { },
        unbind: function (eventName, handler) { },
        has: function (selector) {
            var elements = [];

            $.each(this, function (i, el) {
                if (el.matches(selector)) {
                    elements.push(el);
                }
            });

            return $(elements);
        },
        on: function (eventType, selector, handler) {
            return this.bind(eventType, function (ev) {
                var cur = ev.target;
                do {
                    if ($([cur]).has(selector).length) {
                        handler.call(cur, ev);
                    }
                    cur = cur.parentNode;
                } while (cur && cur !== ev.currentTarget);
            });
        },
        off: function (eventType, selector, handler) { },
        data: function (propName, data) { },

        // Extra
        addClass: function (className) { },
        removeClass: function (className) { },
        append: function (element) { }
    });

    $.buildFragment = function (html) { };
})();