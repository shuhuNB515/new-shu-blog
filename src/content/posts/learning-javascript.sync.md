---
title: "JavaScript 完整知识体系"
published: 2026-08-08
category: "学习笔记"
image: "/assets/images/posts/d1.avif"
tags: ["JavaScript", "前端", "ES6", "学习笔记"]
description: "大一下学期学习 JavaScript 的完整笔记，涵盖语法基础、数据类型、函数闭包、异步编程、ES6+新特性、BOM/DOM等核心知识点。"
draft: false
slug: "learning-javascript"
---

## JavaScript 完整知识体系

大一下学期开始学习 JavaScript。记得学完 HTML/CSS 后发现自己做的网页虽然好看但"一动不动"，这让我对 JS 产生了强烈的好奇。从最初的 `alert("Hello World")` 到后来用 Fetch 请求后端 API，JS 让我的页面真正"活"了起来。

JavaScript 是 Web 的编程语言。所有现代的 HTML 页面都可以使用 JavaScript。JavaScript 是 web 开发人员必须学习的 3 门语言之一：1) HTML 定义了网页的内容; 2) CSS 描述了网页的布局; 3) JavaScript 控制了网页的行为。

### 一、JavaScript 简介与输出

JavaScript 没有任何打印或者输出的函数。可以通过不同方式输出数据：

1. **window.alert()** — 弹出警告框
2. **document.write()** — 将内容写到 HTML 文档中（注意：文档加载完成后执行会覆盖整个页面）
3. **innerHTML** — 写入到 HTML 元素
4. **console.log()** — 写入到浏览器控制台

```javascript
// 操作 HTML 元素
document.getElementById("demo").innerHTML = "段落已修改。";

// 写到 HTML 文档
document.write(Date());

// 写到控制台
a = 5; b = 6; c = a + b;
console.log(c);

// 弹出警告框
window.alert(5 + 6);
```

### 二、JavaScript 语法基础

JavaScript 是一个脚本语言，轻量级但功能强大。

**字面量（Literal）**：编程语言中的固定值。

- 数字字面量：`3.14`, `1001`, `123e5`
- 字符串字面量：`"Hello"`, `'World'`
- 表达式字面量：`5 + 6`, `5 * 10`
- 数组字面量：`[40, 100, 1, 5, 25, 10]`
- 对象字面量：`{firstName:"John", lastName:"Doe", age:50}`
- 函数字面量：`function myFunction(a, b) { return a * b; }`

**变量与赋值：**

```javascript
var x, length;
x = 5;
length = 6;
```

**大小写敏感**：JavaScript 对大小写敏感。`getElementById` 与 `getElementbyID` 是不同的。

**驼峰命名法**：JavaScript 中常见的命名规则是驼峰法，如 `lastName` (而不是 `lastname`)。

**注释**：双斜杠 `//` 后的内容会被忽略。

### 三、JavaScript 保留关键字

| abstract | else | instanceof | super |
|----------|------|------------|-------|
| boolean | enum | int | switch |
| break | export | interface | synchronized |
| byte | extends | let | this |
| case | false | long | throw |
| catch | final | native | throws |
| char | finally | new | transient |
| class | float | null | true |
| const | for | package | try |
| continue | function | private | typeof |
| debugger | goto | protected | var |
| default | if | public | void |
| delete | implements | return | volatile |
| do | import | short | while |
| double | in | static | with |

### 四、JavaScript 数据类型

JavaScript 有动态类型。这意味着相同变量可作不同类型使用。

**值类型（基本类型）**：String、Number、Boolean、Null、Undefined、Symbol (ES6)

**引用数据类型**：Object、Array、Function，及两个特殊对象：正则（RegExp）和日期（Date）

```javascript
var x;               // x 为 undefined
var x = 5;           // 现在 x 为数字
var x = "John";      // 现在 x 为字符串

typeof "John"                // 返回 "string"
typeof 3.14                  // 返回 "number"
typeof false                 // 返回 "boolean"
typeof [1,2,3,4]             // 返回 "object"（早期设计缺陷）
typeof {name:'John', age:34} // 返回 "object"

// 正确检测数组的方法
Array.isArray([1,2,3]);      // true
[1,2,3] instanceof Array;    // true
```

#### 字符串 (String)

```javascript
var carname = "Volvo XC60";
var carname = 'Volvo XC60';

// 字符串中使用引号
var answer = "It's alright";
var answer = 'He is called "Johnny"';

// 字符串属性和方法
var txt = "Hello World!";
txt.length;          // 12
txt.indexOf("World"); // 6
txt.replace("World", "JavaScript");
txt.toUpperCase();   // "HELLO WORLD!"
txt.toLowerCase();   // "hello world!"
txt.split(" ");      // ["Hello", "World!"]
txt.charAt(0);       // "H"
txt.slice(0, 5);     // "Hello"

// 模板字符串 (ES6)
var name = "John";
var greeting = `Hello, ${name}!`;
var multiLine = `第一行
第二行
第三行`;
```

#### 数字 (Number)

```javascript
var x1 = 34.00;       // 带小数点
var x2 = 34;          // 不带小数点
var y = 123e5;        // 12300000 (科学计数法)
var z = 123e-5;       // 0.00123

// Number 方法
var num = 3.14159;
num.toFixed(2);       // "3.14"
num.toPrecision(3);   // "3.14"
Number("123");        // 123
parseInt("123px");    // 123
parseFloat("3.14");   // 3.14
isNaN("Hello");       // true
isFinite(123);        // true

// 特殊值
Infinity;             // 无穷大
-Infinity;            // 负无穷
NaN;                  // Not a Number (NaN !== NaN)
```

#### 布尔 (Boolean)

```javascript
var x = true;
var y = false;

Boolean(0);       // false
Boolean("");      // false
Boolean(null);    // false
Boolean(undefined); // false
Boolean(NaN);     // false
Boolean("Hello"); // true
Boolean(42);      // true
```

#### 数组 (Array)

```javascript
var cars = new Array();
cars[0] = "Saab";
cars[1] = "Volvo";
cars[2] = "BMW";
// 或
var cars = ["Saab", "Volvo", "BMW"];

// 数组方法
cars.length;           // 3
cars.push("Audi");     // 末尾添加
cars.pop();            // 末尾删除
cars.shift();          // 头部删除
cars.unshift("Ford");  // 头部添加
cars.splice(1, 1);     // 从索引1删除1个
cars.slice(0, 2);      // 截取 [0, 2)
cars.join(" - ");      // "Saab - Volvo - BMW"
cars.reverse();        // 反转
cars.sort();           // 排序
cars.indexOf("Volvo"); // 查找索引
cars.includes("BMW");  // 是否包含

// 遍历
cars.forEach(function(item, index) {
    console.log(index + ": " + item);
});
cars.map(function(item) { return item.toUpperCase(); });
cars.filter(function(item) { return item.length > 3; });
cars.reduce(function(total, item) { return total + " " + item; });
cars.find(function(item) { return item.startsWith("B"); });
cars.some(function(item) { return item === "Volvo"; });
cars.every(function(item) { return item.length > 0; });

// 扩展运算符 (ES6)
var moreCars = [...cars, "Tesla", "BYD"];
```

#### 对象 (Object)

```javascript
var person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

// 访问属性
person.lastName;
person["lastName"];

// 对象方法
Object.keys(person);       // ["firstName", "lastName", "id", "fullName"]
Object.values(person);     // ["John", "Doe", 5566, function...]
Object.entries(person);    // [["firstName","John"], ["lastName","Doe"], ...]
Object.assign({}, person); // 浅拷贝

// 解构赋值 (ES6)
var { firstName, lastName } = person;

// 扩展运算符
var personCopy = { ...person, age: 30 };

// this 关键字
var obj = {
    name: "Object",
    showName: function() { console.log(this.name); }
};
```

#### Undefined 和 Null

```javascript
var x;              // undefined（未赋值）
var y = null;       // null（主动设置为空）

typeof undefined;   // "undefined"
typeof null;        // "object"（历史遗留 bug）

undefined == null;  // true（宽松相等）
undefined === null; // false（严格相等）
```

### 五、类型转换

```javascript
// String 转换
String(123);        // "123"
String(true);       // "true"
(123).toString();   // "123"

// Number 转换
Number("123");      // 123
Number("123.45");   // 123.45
Number("123abc");   // NaN
Number("");         // 0
Number(true);       // 1
Number(false);      // 0

parseInt("123px");  // 123
parseFloat("3.14"); // 3.14

// Boolean 转换
Boolean(0);         // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
Boolean(1);         // true
Boolean("Hello");   // true
```

### 六、运算符

```javascript
// 算术运算符
+ - * / % ** ++ --

// 赋值运算符
= += -= *= /= %=

// 比较运算符
== != === !== > < >= <=

// 逻辑运算符
&& || !
// 短路求值：a && b (a 为 false 返回 a)；a || b (a 为 true 返回 a)

// 三元运算符
var result = condition ? value1 : value2;
var age = 20;
var status = age >= 18 ? "成人" : "未成年";

// 类型运算符
typeof variable
variable instanceof Object

// 位运算符
& | ^ ~ << >> >>>
```

### 七、流程控制

```javascript
// if/else if/else
if (time < 10) {
    greeting = "Good morning";
} else if (time < 20) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}

// switch
switch (new Date().getDay()) {
    case 0: day = "Sunday"; break;
    case 6: day = "Saturday"; break;
    default: day = "Weekday";
}

// for 循环
for (var i = 0; i < 5; i++) {
    console.log(i);
}
// for...in 遍历对象属性
for (var key in person) { console.log(key + ": " + person[key]); }
// for...of 遍历可迭代对象 (ES6)
for (var item of cars) { console.log(item); }

// while 循环
while (i < 10) { i++; }
// do...while 循环
do { i++; } while (i < 10);

// break 跳出循环，continue 跳过当前迭代
```

### 八、函数

JavaScript 使用关键字 `function` 定义函数。

```javascript
// 函数声明（会被提升）
function myFunction(a, b) {
    return a * b;
}
myFunction(4, 3); // 12

// 函数表达式（不会被提升）
var x = function(a, b) { return a * b; };
var z = x(4, 3);

// Function 构造函数（不推荐）
var myFunction = new Function("a", "b", "return a * b");

// 函数提升（Hoisting）
// 声明式函数可以在定义前调用
myFunction(5); // OK！
function myFunction(y) { return y * y; }

// 自调用函数 (IIFE)
(function() {
    var x = "Hello!!";
})();

// 函数可作为值使用
function myFunction(a, b) { return a * b; }
var x = myFunction(4, 3);
var y = myFunction(4, 3) * 2;

// 函数是对象，有属性和方法
function myFunction(a, b) { return arguments.length; }
myFunction.toString(); // 返回函数源码

// 箭头函数 (ES6)
var x = (x, y) => x * y;
var x = (x, y) => { return x * y; };

// 箭头函数的 this 绑定外层
const obj = {
    name: "Obj",
    sayHello: () => { console.log(this.name); } // 不绑定 obj
};
```

### 九、参数与返回值

```javascript
// 参数默认值 (ES6)
function multiply(a, b = 1) {
    return a * b;
}

// arguments 对象
function findMax() {
    var max = -Infinity;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) max = arguments[i];
    }
    return max;
}

// 剩余参数 (ES6)
function sumAll(...args) {
    return args.reduce((a, b) => a + b, 0);
}
sumAll(1, 2, 3, 4); // 10

// call() 方法 - 调用函数并指定 this
var person = { fullName: function() { return this.firstName + " " + this.lastName; } };
var person1 = { firstName: "John", lastName: "Doe" };
person.fullName.call(person1); // "John Doe"

// apply() 方法 - 与 call 类似，但参数以数组形式传入
Math.max.apply(null, [1, 2, 3]); // 3

// bind() 方法 - 创建新函数并绑定 this
var bound = person.fullName.bind(person1);
bound(); // "John Doe"
```

### 十、闭包 (Closure)

闭包是 JavaScript 最强大的特性之一。闭包是指有权访问另一个函数作用域中的变量的函数。

```javascript
// 计数器
var add = (function() {
    var counter = 0;
    return function() { return counter += 1; };
})();
add(); // 1
add(); // 2
add(); // 3
// counter 变量受保护，外部无法直接访问

// 闭包应用：私有变量
function createPerson(name) {
    var age = 0;
    return {
        getName: function() { return name; },
        getAge: function() { return age; },
        birthday: function() { age++; }
    };
}
```

### 十一、异步编程

```javascript
// 回调函数
setTimeout(function() { console.log("3秒后执行"); }, 3000);
setInterval(function() { console.log("每秒执行"); }, 1000);

// Promise (ES6)
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.example.com/data");
    xhr.onload = function() {
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(xhr.statusText);
    };
    xhr.onerror = function() { reject("Network Error"); };
    xhr.send();
});
promise.then(function(data) {
    console.log("Success:", data);
}).catch(function(err) {
    console.log("Error:", err);
}).finally(function() {
    console.log("Done!");
});

// Promise 方法
Promise.all([p1, p2, p3]);      // 全部成功
Promise.race([p1, p2, p3]);     // 首个完成（成功或失败）
Promise.allSettled([p1, p2]);   // 全部完成（不管成功失败）
Promise.any([p1, p2, p3]);      // 首个成功 (ES2021)

// Async/Await (ES2017)
async function fetchData() {
    try {
        var response = await fetch("https://api.example.com/data");
        var data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch API
fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Fetch POST
fetch("https://api.example.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John", age: 30 })
}).then(res => res.json());

// 请求中断
var controller = new AbortController();
var signal = controller.signal;
setTimeout(() => controller.abort(), 5000);
fetch(url, { signal }).then(res => res.json());

// 超时处理
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeout)
        )
    ]);
}
```

### 十二、正则表达式 (RegExp)

```javascript
// 创建正则
var re1 = /hello/i;                    // 字面量
var re2 = new RegExp("hello", "i");    // 构造函数

// 修饰符：i(忽略大小写) g(全局匹配) m(多行匹配) s(允许.匹配换行)

// 方法
re.test("Hello World");    // true
re.exec("Hello World");    // ["Hello"]
"Hello World".match(/hello/i);     // ["Hello"]
"Hello World".replace(/hello/i, "Hi"); // "Hi World"
"Hello World".search(/world/i);    // 6
"1 2 3".split(/\s+/);             // ["1", "2", "3"]

// 常用元字符
// . 任意字符（除换行）
// \d 数字 \D 非数字
// \w 单词字符 \W 非单词字符
// \s 空白字符 \S 非空白字符
// ^ 开头 $ 结尾
// * 0或多次 + 1或多次 ? 0或1次
// {n} n次 {n,} 至少n次 {n,m} n到m次
// (x) 捕获组 (?:x) 非捕获组
// x|y x或y [xyz] 字符集 [^xyz] 非字符集

// 邮箱验证
var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### 十三、JSON 操作

```javascript
// JSON 是存储和传输数据的格式
var person = {
    name: "John",
    age: 30,
    city: "New York"
};

// JSON.stringify() 把 JS 对象转为 JSON 字符串
var jsonStr = JSON.stringify(person); // '{"name":"John","age":30,"city":"New York"}'

// JSON.parse() 把 JSON 字符串转为 JS 对象
var obj = JSON.parse('{"name":"John","age":30}');

// JSON 值类型：string, number, object, array, boolean, null
// JSON 不支持：Date, function, undefined
```

### 十四、Web Storage

```javascript
// localStorage（永久存储，除非手动删除）
localStorage.setItem("name", "John");
var name = localStorage.getItem("name");
localStorage.removeItem("name");
localStorage.clear();

// 存储对象需要转为 JSON
var user = { name: "John", age: 30 };
localStorage.setItem("user", JSON.stringify(user));
var userObj = JSON.parse(localStorage.getItem("user"));

// sessionStorage（会话存储，关闭浏览器后清除）
sessionStorage.setItem("key", "value");
var val = sessionStorage.getItem("key");

// cookie
document.cookie = "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";
```

### 十五、BOM（浏览器对象模型）

```javascript
// window 对象
window.innerWidth;    // 浏览器窗口内部宽度
window.innerHeight;   // 浏览器窗口内部高度
window.alert("Hello");
window.confirm("确定吗？");
window.prompt("请输入：");
window.open("https://example.com", "_blank");
window.close();
window.resizeTo(800, 600);
window.moveTo(100, 100);
window.print();       // 打印
window.scrollTo(0, 100);

// location 对象
location.href;        // 当前 URL
location.hostname;    // 主机名
location.pathname;    // 路径
location.protocol;    // 协议 (http: / https:)
location.reload();    // 刷新
location.replace();   // 替换（不产生历史记录）

// history 对象
history.back();       // 后退
history.forward();    // 前进
history.go(-2);       // 后退2页

// navigator 对象
navigator.userAgent;  // 用户代理字符串
navigator.language;   // 浏览器语言
navigator.onLine;     // 是否在线
navigator.cookieEnabled; // Cookie 是否启用

// screen 对象
screen.width;         // 屏幕宽度
screen.height;        // 屏幕高度
screen.availWidth;    // 可用宽度（去掉任务栏）
screen.availHeight;   // 可用高度

// 定时器
var id = setTimeout(fn, 3000);   // 延迟执行一次
clearTimeout(id);                 // 取消
var id2 = setInterval(fn, 1000); // 周期执行
clearInterval(id2);               // 取消
```

### 十六、错误处理

```javascript
try {
    // 可能出错的代码
    var result = riskyFunction();
    if (!result) throw "Empty result";
} catch (err) {
    console.log("Error:", err.message || err);
} finally {
    // 始终执行
    console.log("Cleanup");
}

// 自定义错误
throw new Error("Something went wrong");
throw new TypeError("Invalid type");
```

### 十七、严格模式 (Strict Mode)

```javascript
"use strict";

// 严格模式下的变化：
// 1. 未声明的变量赋值会报错
x = 3.14; // Error!

// 2. 删除变量/函数/参数 报错
var x = 3.14;
delete x; // Error!

// 3. 函数参数名不能重复
function x(p1, p1) {}; // Error!

// 4. 八进制字面量不允许
var x = 010; // Error!

// 5. with 语句不允许
// 6. eval 不创建外层变量
// 7. this 在函数中为 undefined（非严格模式指向 window）
```

### 十八、ES6+ 重要特性

```javascript
// let 和 const (ES6)
let x = 10;    // 块级作用域，可修改
const PI = 3.14; // 块级作用域，不可重新赋值
// var 是函数作用域，let/const 是块级作用域

// 解构赋值
var [a, b] = [1, 2];
var { name, age } = { name: "John", age: 30 };

// 扩展运算符
var arr = [1, 2, 3];
var arr2 = [...arr, 4, 5];

var obj = { a: 1, b: 2 };
var obj2 = { ...obj, c: 3 };

// 模块 (ES6)
export default function() { };
import myFunc from './module.js';

export const name = "John";
import { name } from './module.js';

// class (ES6)
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`Hello, ${this.name}`);
    }
    static create(name) {
        return new Person(name);
    }
}

// 继承
class Student extends Person {
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }
}

// Set 和 Map (ES6)
var set = new Set([1, 2, 2, 3]); // {1, 2, 3}
set.add(4); set.has(2); set.delete(3); set.size;

var map = new Map();
map.set("key", "value");
map.get("key"); map.has("key"); map.size;

// 可选链 (ES2020)
var name = user?.profile?.name;
var result = obj.method?.();

// 空值合并 (ES2020)
var value = x ?? "default"; // 仅当 x 为 null 或 undefined 时使用默认值
```

### 学习心得

学习 JS 最大的感触是：不要死记 API，要理解语言的设计哲学。闭包、原型链、事件循环——这三个概念是 JS 的精髓，理解了它们才算真正入门。另外，打开浏览器 Console 直接写代码调试是学 JS 最快的方式。