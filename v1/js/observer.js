
// function defineReactive(data, key, val) {
//     observe(val); // 递归遍历所有子属性
//     Object.defineProperty(data, key, {
//         enumerable: true,
//         configurable: true,
//         get: function() {
//             return val;
//         },
//         set: function(newVal) {
//             val = newVal;
//             console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
//         }
//     });
// }
//
// function observe(data) {
//     if (!data || typeof data !== 'object') {
//         return;
//     }
//     Object.keys(data).forEach(function(key) {
// 	    defineReactive(data, key, data[key]);
// 	});
// };
//
// var library = {
//     book1: {
//         name: ''
//     },
//     book2: ''
// };
// observe(library);
// library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
// library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
//
//
// function defineReactive(data, key, val) {
//     observe(val); // 递归遍历所有子属性
//     var dep = new Dep();
//     Object.defineProperty(data, key, {
//         enumerable: true,
//         configurable: true,
//         get: function() {
//             dep.addSub(watcher); // 在这里添加一个订阅器
//             return val;
//         },
//         set: function(newVal) {
//             if (val === newVal) {
//                 return;
//             }
//             val = newVal;
//             console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
//             dep.notify(); // 如果数据变化，通知所有订阅者
//         }
//     });
// }
//
// function Dep () {
//     this.subs = [];
// }
// Dep.prototype = {
//     addSub: function(sub) {
//         this.subs.push(sub);
//     },
//     notify: function() {
//         this.subs.forEach(function(sub) {
//             sub.update();
//         });
//     }
// };


function Observer(data) {
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
