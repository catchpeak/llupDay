// http1.0 http 1.1 ,http2.0 http 3.0分别做了哪些优化
// http1.0 引入HTTP/0.9未定义的请求方法，支持持久连接，引入HTTP头，引入状态码，content-type,
// http1.1 引入了管道机制，默认使用持久连接，支持缓存，增加请求方法：除了GET和POST之外，HTTP/1.1还引入了PUT、DELETE、OPTIONS、TRACE和CONNECT等方法
// http2.0 引入二进制分帧层，支持多路复用，头部压缩，服务器推送
// http3.0 基于UDP的传输，引入QUIC协议内置了TLS加密，连接迁移，支持在网络变化（如从Wi-Fi切换到4G）时无缝迁移连接，而无需重新建立连接

// 死锁产生的条件
// 互斥条件 请求和保持条件 不剥夺条件 循环等待条件

// CDN是什么
// 是一种分布式网络，旨在提高互联网内容的传输速度和可靠性。通过将内容缓存在离用户更近的服务器上，CDN能够显著减少数据传输的延迟，提高用户访问网站的体验。
// 用户发起请求
// DNS查询 ，返回CDN的DNS服务器
// CDN的DNS服务器 返回CDN的负载均衡服务器IP
// 负载均衡服务器 根据用户的IP地址和请求的内容，将请求转发到离用户最近的缓存服务器
// 缓存服务器 返回用户请求的内容


// 进程之间的通讯方式
// 管道通信 命名管道 消息队列 共享内存 信号量 信号 套接字

// https的TLS握手过程
// 服务端存储证书 私钥
// 客户端发起请求 发送证书请求
// 服务端发送证书 私钥
// 客户端验证证书 生成随机数 加密随机数
// 服务端解密随机数 生成对称密钥
//  证书验证 密钥交换 加密通信

// 网络七层模型
// 物理层 数据链路层 网络层 传输层 会话层 表示层 应用层

// 网络四层模型
// 链路层 网络层 传输层 应用层

// TCP是怎么判断丢包的
// 校验和，序列号，确认应答，超时重传，连接管理，流量控制，拥塞控制

// tcp连接建立过程
// https://juejin.cn/post/6844903958624878606

// flatten数组扁平化
function flatten(arr) {
    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}

// 函数柯里化
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return (...args2) => curried.apply(this, args.concat(args2));
        }
    };
}

// 生成质数
function getPrimes() {
    let cur = 1;
    function isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
    function createPrime() {
        cur++;
        while (!isPrime(cur)) {
            cur++;
        }
        return cur;
    }
    return createPrime;
}

// deepClone 支持对象、数组、Date、RegExp等类型的深拷贝。
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item, hash));
    }

    const clone = {};
    hash.set(obj, clone); // 添加到哈希表，避免循环引用
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], hash);
        }
    }
    return clone;
}

// 函数防抖和节流，实现防抖（Debounce）和节流（Throttle）函数
function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, delay);
    };
}
function throttle(func, delay) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}

// 实现一个事件总线（Event Bus）
class EventBus {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(fn => fn !== listener);
        }
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(fn => fn(...args));
        }
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

// 螺旋矩阵


// 数组转树
// 递归查找获取子节点
const getChild = (list, result, pid) => {
    for (const item of list) {
        if (item.pid === pid) {
            const newItem = { ...item, children: [] };
            result.push(newItem);
            getChild(list, newItem.children, item.id);
        }
    }
};
// 调用递归实现
const listToTree = (list, pid) => {
    const result = [];
    getChild(list, result, pid);
    return result;
};
// listToTree(list, 0);
// const listToTree = (list, key) => {
//     const tree = list.filter(function(parent) {
//       // 返回每一项得的子级数据
//       const branchArr = list.filter((child) => parent.id === child[key]);
//       parent.children = [];
//       // 如果存在子级，则给父级添加一个children属性并赋值
//       if (branchArr.length > 0) {
//         parent.children = branchArr;
//       }
//       // 返回第一层
//       return parent[key] == 0;
//     });
//     return tree;
//   }
//   // 传入原始数据和父级pid的key
//   listToTree(list, 'pid')

// LazyMan 链式调用
class _LazyMan {
    constructor(name) {
        this.tasks = [];
        const task = () => {
            console.log(`Hi! This is ${name}`);
            this.next();
        };
        this.tasks.push(task);
        setTimeout(() => {// 把 this.next() 放到调用栈清空之后执行
            this.next();
        }, 0);
    }

    next() {
        const task = this.tasks.shift(); // 取第一个任务执行
        task && task();
    }

    sleep(time) {
        this._sleepWrapper(time, false);
        return this;// 链式调用
    }

    sleepFirst(time) {
        this._sleepWrapper(time, true);
        return this;
    }

    _sleepWrapper(time, first) {
        const task = () => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                this.next();
            }, time * 1000);
        };
        if (first) {
            this.tasks.unshift(task);// 放到任务队列顶部
        } else {
            this.tasks.push(task);// 放到任务队列尾部
        }
    }

    eat(name) {
        const task = () => {
            console.log(`Eat ${name}`);
            this.next();
        };
        this.tasks.push(task);
        return this;
    }
}

function LazyMan(name) {
    return new _LazyMan(name);
}

// 实现一个LRU缓存淘汰算法
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }
        const node = this.map.get(key);
        this.moveToHead(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            this.moveToHead(node);
        } else {
            const newNode = new ListNode(key, value);
            this.map.set(key, newNode);
            this.addToHead(newNode);
            if (this.map.size > this.capacity) {
                const tail = this.popTail();
                this.map.delete(tail.key);
            }
        }
    }

    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }

    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    popTail() {
        const tail = this.tail.prev;
        this.removeNode(tail);
        return tail;
    }
}

// 示例使用
const cache = new LRUCache(3);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
console.log(cache.get(1)); // 输出 1
cache.put(4, 4);
console.log(cache.get(2)); // 输出 -1 (因为 2 被淘汰了)

// treeshaking 原理
// Tree Shaking 的原理基于静态分析。在编译阶段，编译器会分析模块之间的依赖关系，并识别出哪些代码是被其他代码依赖的，哪些代码是未被使用的。
// 依赖关系分析：编译器会遍历所有模块，分析每个模块的导入（import）和导出（export）语句，以确定模块间的依赖关系。
// 死代码检测：编译器会标记那些没有被其他模块依赖的代码块，这些代码块即为“"死代码”"。


// 跨域解决方案
// 1. JSONP
// 2. CORS
// 3. 代理服务器
// 4. Nginx反向代理
// 5. WebSocket
// 6. postMessage
// 7. document.domain
// 8. window.name

// 浏览器渲染机制是怎样的？从输入URL到页面展示的过程。
// 1. 输入URL
// 用户在浏览器地址栏输入URL，按下回车。
// 2. DNS解析
// 浏览器通过DNS（域名系统）将域名解析为对应的IP地址，找到目标服务器的位置。
// 3. 建立TCP连接
// 浏览器通过TCP协议与服务器建立可靠的网络连接（如果是HTTPS，还会进行SSL/TLS握手加密）。
// 4. 发送HTTP请求
// 浏览器向服务器发送HTTP请求，请求获取页面资源（如HTML、CSS、JavaScript等）。
// 5. 服务器处理请求并返回响应
// 服务器接收到请求后，处理请求（如查询数据库、生成动态内容），返回HTTP响应，包括HTML文件、CSS文件、JavaScript文件等资源。
// 6. 浏览器解析HTML
// 浏览器接收到HTML后，开始解析HTML代码，构建DOM树（Document Object Model）。DOM树是页面的结构表示，每个节点代表一个HTML元素。
// 7. 浏览器解析CSS
// 浏览器解析CSS代码，构建CSSOM树（CSS Object Model）。CSSOM树是页面的样式表示，包含所有CSS规则。
// 8. 生成渲染树（Render Tree）
// 浏览器将DOM树和CSSOM树合并，生成渲染树。渲染树只包含需要渲染的节点（如可见的HTML元素及其样式）。
// 9. 布局（Layout）
// 浏览器根据渲染树计算每个元素的位置和大小，进行布局（也称为“回流”或“重排”）。
// 10. 绘制（Painting）
// 浏览器将布局后的元素绘制到屏幕上，生成最终的视觉呈现（也称为“重绘”）。
// 11. 执行JavaScript
// 如果HTML中包含<script>标签或外部JavaScript文件，浏览器会暂停解析HTML，下载并执行JavaScript代码。JavaScript可以动态修改DOM和CSSOM，触发重新布局和绘制。
// 12. 页面加载完成
// 当所有资源（如图片、字体等）加载完成，页面完全渲染，用户可以看到完整的页面。

// koa洋葱模型
function compose(ctx, middleware) {
    return dispatch(0);

    function dispatch(i) {
        let fn = middleware[i];
        if (!fn) {
            return Promise.resolve();
        } // 栈底返回

        // 执行当前中间件
        return Promise.resolve(
            fn(ctx, () => dispatch(i + 1)) // 传入next函数
        ).catch(err => {
            console.error(err);
            ctx.status(500);
            ctx.body = 'Internal Server Error';
        });
    }
}

// 介绍下webSocket协议
// 全双工通信
// 客户端和服务端可同时发送数据，无需等待响应
// 单一连接
// 建立后持续保持，避免 HTTP 的重复握手
// 二进制支持
// 原生支持二进制数据流传输（如图片/音频）
// 轻量协议头
// 固定 2 字节协议头，相比 HTTP 更高效

// websocket 中的 Handshaking 是什么？
// Handshaking 是 WebSocket 建立连接的第一步，它是一个类似于 HTTP 请求的过程，在客户端和服务器之间交换握手信息，以确定双方是否支持 WebSocket 协议，并建立起 WebSocket 连接。其主要步骤如下：
// 客户端向服务器发送升级协议请求：客户端通过普通的 HTTP GET 请求向服务器发送一个包含特殊头部字段 Upgrade 和 Connection 的HTTP 请求。
// 服务器相应升级协议请求：当服务器收到客户端的升级协议请求后，会对该请求进行处理，并返回一个特殊的响应头部字段 Upgrade 和 Connection，并附上一个随机生成的字符串（Sec-WebSocket-Key）作为握手口令。
// 客户端发送握手确认请求：客户端接收到服务器的响应之后，会对该响应进行处理，并根据约定的算法将服务器返回的 Sec-WebSocket-Key 字符串与一个魔术字符串拼接起来，然后进行 SHA1 加密，并将结果转换成 Base64 编码格式，最后将加密后的结果作为 Sec-WebSocket-Accept 字段值附在新的请求头部中，再次发送给服务器。
// 服务器确认握手请求：当服务器收到客户端的握手确认请求后，会对请求头中的 Sec-WebSocket-Accept 字段进行验证，如果验证通过，则表示握手成功，并且服务器会返回一个状态码为 101 的 HTTP 响应，表示 WebSocket 连接已经建立。
// WebSocket 连接建立：当客户端收到服务器的确认响应之后，WebSocket 连接就正式建立了，此时客户端和服务器都可以通过 WebSocket 协议进行双向通信。
// 在 Handshaking 过程中，需要交换的头部字段包括 Upgrade、Connection、Sec-WebSocket-Key 和 Sec-WebSocket-Accept 等，其中 Sec-WebSocket-Key、Sec-WebSocket-Accept 是握手过程的关键参数，用于实现加密和验证。同时，在 Handshaking 过程中，需要保证请求和响应头部的正确性和完整性，以防止出现安全漏洞和错误数据。


// 实现垂直居中布局
// 1. 使用 flexbox
// .container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// }

// 2. 使用 grid
// .container {
//   display: grid;
//   place-items: center;
//   height: 100vh;
// }

// 3. 使用绝对定位
// .container {
//   position: relative;
//   height: 100vh;
// }
// .content {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// 4. 使用表格布局
// .container {
//   display: table;
//   height: 100vh;
//   width: 100%;
// }
// .content {
//   display: table-cell;
//   vertical-align: middle;
//   text-align: center;
//