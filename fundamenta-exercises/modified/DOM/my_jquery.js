(function () {
    $ = function (selector) {
        
        // Use this in case NEW is not used
        if (!(this instanceof $)) {
            return new $(selector);
        }

        if (!(selector instanceof Array)) {
            selector = document.querySelectorAll(selector);
        }

        Array.prototype.push.apply(this, selector);
    };

    $.extend = function (target, object) {
        for (var prop in object) {
            target[prop] = object[prop];
        }
        return target;
    };

    var getText = function (el) {
        var txt = '';

        if (el.nodeType === 3) {
            txt += el.nodeValue;
        }

        $.each(el.childNodes, function (i, childNode) {
            //getText.call(this, childNode);
            if (childNode.nodeType === 3) {
                txt += childNode.nodeValue;
            } else if (childNode.nodeType === 1) {
                txt += getText(childNode);
            }
        });

        return txt;
    }

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
            if (arguments.length === 0) {
                return this[0].innerHTML;
            }
            else {
                $.each(this, function (i, el) {
                    el.innerHTML = newHtml;
                });

                return this;
            }
        },
        val: function (newVal) {
            if (arguments.length === 0) {
                return this[0].value;
            }
            else {
                $.each(this, function (i, el) {
                    el.value = newVal;
                });

                return this;
            }
        },
        text: function (newText) {
            if (arguments.length) {
                $.each(this, function (i, el) {
                    el.innerHTML = "";
                    el.appendChild(document.createTextNode(newText));
                });

                return this;
            }
            else {
                // var returnTxt = '';
                // 
                // $.each(this, function(i, el){
                //       returnTxt += el.textContent;
                // })
                // 
                // return returnTxt;
                
                return this[0] && getText.call(this[0], this[0]);
            }
        },
        find: function (selector) {
            var accumulator = [];

            $.each(this, function (i, el) {
                var r = el.querySelectorAll(selector);

                [].push.apply(accumulator, r)
            });

            return $(accumulator);
        },
        next: function () {
            var accumulator = [];

            $.each(this, function (i, el) {
                var current = el.nextSibling;

                while (current && current.nodeType != Node.ELEMENT_NODE) {
                    current = current.nextSibling;
                }

                if (current) {
                    accumulator.push(current);
                }

            });

            return $(accumulator);

        },
        prev: function () { },
        parent: function () {
            var accumulator = [];
            $.each(this, function (i, el) {
               var r = el.parentNode;

                [].push.apply(accumulator, r)
            });

            return $(accumulator); 
            
        },
        children: function () {
            var accumulator = [];

            $.each(this, function (i, el) {
                var r = el.childNodes;

                [].push.apply(accumulator, r)
            });

            return $(accumulator);

        },
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