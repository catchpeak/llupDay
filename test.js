/** 1.实现一个计数器函数 */
function createCounter() {
    // 补全代码
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        reset: () => count = 0,
        log: () => console.log(count)
    };
}
// const counter = createCounter();
// counter.log(); // 0
// counter.increment();
// counter.log(); // 1
// counter.increment();
// counter.log(); // 2
// counter.decrement();
// counter.log(); // 1
// counter.reset();
// counter.log();// 0


/** 2. 模拟实现 instanceof */
function myInstanceof(obj, constructor) {
    // 补全代码
    while (obj) {
        let newObj = Object.getPrototypeOf(obj);
        if (newObj === constructor.prototype) {
            return true;
        }
        obj = newObj;
    }
    return false;
}
// console.log(myInstanceof([], Number));// false
// console.log(myInstanceof([], Array)); // true
// console.log(myInstanceof([], Object)); // true


/** 3. 实现寄生组合继承 */
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function () {
    console.log(this.name);
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
// 补全继承代码
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
// const childInstance = new Child('zwx', 18);
// console.log(childInstance instanceof Parent, childInstance instanceof Child); // true true
// console.log(childInstance.age); // 18
// childInstance.sayName(); // zwx

/** 4. 实现 Promise.all */
Promise.myAll = function (promises) {
    // 补全代码
    return new Promise((resolve, reject) => {
        let result = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(res => {
                result[i] = res;
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            });
        }
        if (promises.length === 0) {
            resolve(result);
        }
    });
};

// const promise1 = Promise.resolve(1);
// const promise2 = new Promise(resolve => setTimeout(resolve, 1000, 2));
// Promise.myAll([promise1, promise2]).then(res => {
//     console.log('myAll', res);
// });

/** 5. 实现红绿灯交替 */
function trafficLight() {
    // 用async/await实现红绿黄灯交替

}

/** 6. 实现一个深拷贝函数 */
function deepClone(obj) {
    // 处理Date、RegExp等特殊对象
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

/** 7. 实现数组扁平化 */
function flatten(arr) {
    return arr.reduce((acc, cur) => {
        let newArr = acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
        return newArr;
    }, []);
}
console.log(flatten([1, [2, [3, 4], 5], 6]));

/** 8.实现事件委托 */
function delegate(parent, eventType, selector, handler) {
    // 补全事件监听逻辑
    parent.addEventListener(eventType, function (e) {
        let target = e.target;
        while (target !== parent) {
            if (target.matches(selector)) {
                handler.call(target, e);
                break;
            }
            target = target.parentElement;
        }
    });
}

/** 9.动态加载脚本 */
function loadScript(url, callback) {
    // 处理异步加载和错误情况
    let script = document.createElement('script');
    script.src = url;
    script.onload = () => {
        callback();
    };
    script.onerror = () => {
        console.error('加载失败');
    };
    document.head.appendChild(script);
}

/** 10.实现一个防抖函数 */
function debounce(func, delay) {
    // 补全防抖逻辑
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/** 11.实现一个节流函数 */
function throttle(func, interval) {
    // 补全节流逻辑
    let timer = null;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, interval);
    };
}