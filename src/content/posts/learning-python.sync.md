---
title: "Python 完整学习笔记"
published: 2026-08-08
category: "学习笔记"
image: "/assets/images/posts/d5.avif"
tags: ["Python", "Flask", "后端", "学习笔记"]
description: "大一下学期系统学习 Python 的完整笔记，涵盖变量类型、字符串、列表字典、函数装饰器、面向对象、文件操作、异常处理、迭代器生成器、Flask框架等核心知识点。"
draft: false
slug: "learning-python"
---

## Python 完整学习笔记

大一下学期后半段开始系统学习 Python。虽然之前学 JS 时接触过编程概念，但 Python 简洁优雅的语法让我真正爱上了写代码。从最初写爬虫抓取数据，到后来用 Flask 搭建博客后端，Python 成了我最顺手的工具。

Python 是 Guido van Rossum 在 1991 年发布的一门解释型、面向对象的高级编程语言。它的设计哲学强调代码可读性，使用有意义的空白缩进代替花括号。

### 一、为什么要学 Python？

- 语法简洁，入门极快
- 标准库丰富，第三方包海量
- 应用场景极广：Web 开发(Flask/Django/FastAPI)、数据分析(NumPy/Pandas)、机器学习(PyTorch/TensorFlow)、爬虫(Scrapy)、自动化脚本、运维部署
- 社区活跃，遇到问题容易找到答案

### 二、变量与数据类型

Python 是动态强类型语言。变量无需声明类型，但运行时类型严格——不能把字符串和整数相加（不像 JS 会自动转换）。

```python
# 变量赋值
x = 42                # int
y = 3.14              # float
name = "shu-linux"    # str
is_admin = True       # bool
nothing = None        # NoneType

# 类型检查
type(x)               # <class 'int'>
isinstance(x, int)    # True
isinstance(x, (int, float))  # True — 支持元组

# 数值类型
a = 10
b = 0b1010            # 二进制 = 10
c = 0o12              # 八进制 = 10
d = 0xa               # 十六进制 = 10
e = 1_000_000         # 数字分隔符（Python 3.6+），= 1000000
f = 3.14e-2           # 科学计数法 = 0.0314

# Python 整数是无限精度的
big = 2 ** 1000       # 计算结果准确，不会溢出
# 但浮点数依然是 IEEE 754 双精度，有精度损失
0.1 + 0.2             # 0.30000000000000004

# 类型转换
int("123")            # 123
int(3.9)              # 3（截断，非四舍五入）
float("3.14")         # 3.14
str(42)               # "42"
bool(0)               # False
bool("")              # False
bool([])              # False
bool(None)            # False
```

### 三、字符串与编码

```python
s = "Hello, World!"
len(s)                # 13
s[0]                  # 'H'（索引从 0 开始）
s[-1]                 # '!'（负数从末尾开始）
s[0:5]                # "Hello"（切片，左闭右开）
s[7:]                 # "World!"
s[:5]                 # "Hello"
s[::2]                # "Hlo ol!"（步长 2）
s[::-1]               # "!dlroW ,olleH"（反转字符串）

# 字符串方法
s.upper()             # "HELLO, WORLD!"
s.lower()             # "hello, world!"
s.title()             # "Hello, World!"
s.count("l")          # 3
s.find("World")       # 7（找不到返回 -1）
s.index("World")      # 7（找不到抛异常）
s.replace("World", "Python")  # "Hello, Python!"
s.startswith("Hello")  # True
s.endswith("!")       # True
s.strip()             # 去除首尾空白
s.split(", ")         # ["Hello", "World!"]
", ".join(["a", "b", "c"])  # "a, b, c"
"42".zfill(5)         # "00042"（补零）

# 字符串判断
"123".isdigit()       # True
"abc".isalpha()       # True
"abc123".isalnum()    # True
"  ".isspace()        # True
"ABC".isupper()       # True

# f-string（Python 3.6+，推荐）
name, age = "shuhu", 20
f"{name} is {age} years old"
f"{name.upper()} is {age + 1} next year"
f"{3.14159:.2f}"      # "3.14"（格式化）

# 编码
"你好".encode("utf-8")           # b'\xe4\xbd\xa0\xe5\xa5\xbd'
b'\xe4\xbd\xa0'.decode("utf-8")  # "你"
ord("A")               # 65（字符→Unicode码）
chr(65)                # "A"（Unicode码→字符）
```

### 四、列表 (List)

列表是 Python 最常用的数据结构，可存储任意类型，可变。

```python
fruits = ["apple", "banana", "cherry"]

# 常见操作
fruits.append("orange")    # 末尾添加
fruits.insert(1, "mango")  # 指定位置插入
fruits.extend(["kiwi", "grape"])  # 批量添加
fruits.pop()               # 弹出末尾，返回 "grape"
fruits.pop(0)              # 弹出索引0
fruits.remove("banana")    # 按值删除（仅第一个）
fruits.index("cherry")     # 查找索引
fruits.count("apple")      # 计数
fruits.sort()              # 原地排序
fruits.sort(reverse=True)  # 降序
fruits.sort(key=len)       # 自定义排序 key
fruits.reverse()           # 原地反转
fruits.copy()              # 浅拷贝
fruits.clear()             # 清空

# 切片操作
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]         # [1, 2, 3]
nums[:3]          # [0, 1, 2]
nums[3:]          # [3, 4, 5]
nums[::2]         # [0, 2, 4]
nums[::-1]        # [5, 4, 3, 2, 1, 0]
nums[1:4] = [10, 20, 30]  # 切片赋值

# 多维列表
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
matrix[1][2]      # 6

# 注意：创建二维列表的正确方式
dp = [[0] * m for _ in range(n)]  # 每个子列表独立
# 错误方式：dp = [[0] * m] * n     # 所有子列表是同一引用！

# 常用内置函数
len(nums)          # 长度
sum(nums)          # 求和
min(nums)          # 最小值
max(nums)          # 最大值
sorted(nums)       # 返回新列表（不修改原列表）
any(nums)          # 是否有真值
all(nums)          # 是否全为真值
enumerate(nums)    # 带索引遍历
zip(a, b)          # 并行遍历
```

### 五、元组 (Tuple)

不可变序列，可以哈希，适合做字典的 key。

```python
t = (1, 2, 3)
point = (10, 20)
x, y = point          # 解包
a, *rest = (1, 2, 3, 4)  # a=1, rest=[2,3,4]

# 单元素元组需要逗号
single = (42,)        # tuple
not_tuple = (42)      # int

# 元组转列表
list(t)
```

### 六、字典 (Dict)

键值对集合，Python 3.7+ 保持插入顺序。

```python
person = {
    "name": "shuhu",
    "age": 20,
    "skills": ["Python", "JS", "Vue"]
}

# 访问
person["name"]        # "shuhu"
person.get("email", "N/A")  # "N/A"（键不存在返回默认值）
person.get("name")    # "shuhu"

# 修改
person["age"] = 21
person.update({"city": "Beijing", "email": "shu@example.com"})

# 删除
del person["email"]
email = person.pop("email", None)  # 安全删除
person.popitem()      # 弹出最后一项 (Python 3.7+)

# 遍历
for key in person:
    print(key, person[key])
for key, value in person.items():
    print(key, value)
for key in person.keys():
    print(key)
for value in person.values():
    print(value)

# 字典推导式
squares = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}

# 合并字典 (Python 3.9+)
d1 = {"a": 1}
d2 = {"b": 2}
merged = d1 | d2      # {"a": 1, "b": 2}

# defaultdict（常用！自动创建默认值）
from collections import defaultdict
dd = defaultdict(list)
dd["key"].append(1)   # 不需要先判断 key 是否存在
dd = defaultdict(int)
dd["count"] += 1

# Counter（计数器）
from collections import Counter
cnt = Counter("abracadabra")  # Counter({'a': 5, 'b': 2, 'r': 2, ...})
cnt.most_common(2)            # [('a', 5), ('b', 2)]
```

### 七、集合 (Set)

无序、不重复的集合。底层是哈希表，查找 O(1)。

```python
s = {1, 2, 3}
s.add(4)
s.remove(2)           # 不存在抛 KeyError
s.discard(5)          # 不存在不报错
s.pop()               # 随机弹出一个

# 集合运算
a = {1, 2, 3}
b = {2, 3, 4}
a | b                 # {1, 2, 3, 4} 并集
a & b                 # {2, 3}       交集
a - b                 # {1}          差集
a ^ b                 # {1, 4}       对称差

# 集合推导式
{x**2 for x in range(10) if x % 2 == 0}

# 去重
list(set([1, 1, 2, 2, 3]))  # [1, 2, 3]
```

### 八、流程控制

```python
# if / elif / else
x = 10
if x > 0:
    print("positive")
elif x < 0:
    print("negative")
else:
    print("zero")

# 三元表达式
status = "even" if x % 2 == 0 else "odd"

# match-case（Python 3.10+）
match x:
    case 0:
        print("zero")
    case 1 | 2:
        print("one or two")
    case _:
        print("other")

# for 循环
for i in range(10):                        # 0..9
for i in range(2, 10):                     # 2..9
for i in range(0, 10, 2):                  # 0,2,4,6,8
for i, v in enumerate(arr):                # 带索引
for k, v in dct.items():                   # 字典
for a, b in zip(l1, l2):                   # 并行遍历

# while 循环
while x > 0:
    x //= 2

# break / continue / pass
for x in data:
    if x is None:
        continue    # 跳过 None
    if x < 0:
        break       # 遇到负数退出
    process(x)
```

### 九、列表推导式（List Comprehension）

Pythonic 的精髓，一行代码完成循环+条件+变换。

```python
# 基本形式
squares = [x**2 for x in range(10)]

# 带过滤
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# 嵌套（但别嵌套太深，影响可读性）
matrix = [[i*j for j in range(5)] for i in range(5)]

# if-else 在表达式位置
labels = ["even" if x % 2 == 0 else "odd" for x in range(10)]

# 字典/集合推导式
d = {x: x**2 for x in range(5)}
s = {x % 3 for x in range(20)}

# 生成器表达式（省内存）
sum(x**2 for x in range(10**7))  # 不会先创建列表
```

### 十、函数

```python
def greet(name: str, greeting: str = "Hello") -> str:
    """返回问候语。"""
    return f"{greeting}, {name}!"

# 调用
greet("World")               # "Hello, World!"
greet("Python", "Hi")        # "Hi, Python!"
greet(greeting="Hey", name="You")  # 关键字参数

# 可变参数
def sum_all(*args):           # args 是元组
    return sum(args)
sum_all(1, 2, 3, 4)          # 10

def print_info(**kwargs):     # kwargs 是字典
    for k, v in kwargs.items():
        print(f"{k}: {v}")

# 参数顺序：位置参数 → *args → 关键字参数 → 默认参数 → **kwargs
def func(a, b, *args, x=0, **kwargs):
    pass

# Lambda（匿名函数）
add = lambda x, y: x + y
sorted(data, key=lambda x: x[1])  # 按第二项排序
filter(lambda x: x > 0, numbers)  # 过滤
map(lambda x: x * 2, numbers)     # 变换

# 作用域规则：LEGB
# Local → Enclosing → Global → Built-in
x = "global"
def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)        # "local"
    inner()
```

### 十一、装饰器

装饰器本质上是一个接收函数、返回函数的高阶函数，用于在不修改原函数代码的情况下增强功能。

```python
# 基本装饰器
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_func():
    import time
    time.sleep(1)

# 带参数的装饰器
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Hello {name}!")

# 保留函数元信息（使用 functools.wraps）
from functools import wraps

def my_decorator(func):
    @wraps(func)  # 保留 __name__, __doc__ 等
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

# 类装饰器 — Flask 的路由就是装饰器
@app.route("/api/data")
def get_data():
    return {"data": [...]}

# lru_cache — 最常见的实用装饰器
from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
```

### 十二、面向对象

```python
class Animal:
    # 类属性（所有实例共享）
    kingdom = "Animalia"

    def __init__(self, name, age=0):
        # 实例属性
        self.name = name
        self._age = age          # 约定：_ 开头表示"受保护"
        self.__secret = None     # 约定：__ 开头触发名称改写（name mangling）

    def speak(self):
        print(f"{self.name} makes a sound")

    def get_age(self):
        return self._age

    # 静态方法 — 不需要 self
    @staticmethod
    def is_mammal():
        return True

    # 类方法 — self 是类本身
    @classmethod
    def create(cls, name):
        return cls(name)

    # 属性装饰器 — getter/setter 更 Pythonic
    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative!")
        self._age = value

    # 特殊方法（魔术方法）
    def __str__(self):            # 用户友好表示
        return f"Animal({self.name})"

    def __repr__(self):           # 开发者表示 → 应能eval还原
        return f"Animal(name='{self.name}', age={self._age})"

    def __eq__(self, other):      # == 比较
        return self.name == other.name and self._age == other._age

    def __lt__(self, other):      # < 比较（sorted 使用）
        return self._age < other._age

    def __hash__(self):
        return hash((self.name, self._age))

    def __enter__(self):          # with 语句
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


# 继承
class Dog(Animal):
    def __init__(self, name, breed, age=0):
        super().__init__(name, age)
        self.breed = breed

    def speak(self):              # 方法重写
        print(f"{self.name} barks! Woof!")

    def fetch(self):              # 子类特有方法
        print(f"{self.name} is fetching...")


# 多继承与方法解析顺序 (MRO)
class Flyer:
    def fly(self):
        print("Flying...")

class Swimmer:
    def swim(self):
        print("Swimming...")

class Duck(Animal, Flyer, Swimmer):
    pass
```

### 十三、文件操作

```python
# 读取文件
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()           # 读取全部
    # 或者
    lines = f.readlines()        # 按行读取为列表
    # 或者
    for line in f:               # 逐行迭代（大文件推荐）
        print(line.strip())

# 写入文件
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("Hello\n")
    f.writelines(["Line 1\n", "Line 2\n"])

# 追加
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("appended line\n")

# 二进制模式
with open("image.jpg", "rb") as f:
    image_data = f.read()

# 文件模式总结
# r  — 只读（默认，文件必须存在）
# w  — 只写（覆盖，不存在则创建）
# a  — 追加（不存在则创建）
# x  — 排他创建（文件存在则报错）
# b  — 二进制模式
# t  — 文本模式（默认）
# +  — 读写模式（r+/w+/a+）

# pathlib（Python 3.4+，推荐替代 os.path）
from pathlib import Path

p = Path("data/input.txt")
p.exists()             # 判断存在
p.name                 # "input.txt"
p.suffix               # ".txt"
p.stem                 # "input"
p.parent               # Path("data")
p.read_text()          # 读取文本
p.write_text("hello")  # 写入文本
p.iterdir()            # 遍历目录

# 遍历目录树
for py_file in Path(".").rglob("*.py"):
    print(py_file)

# os.path 常用函数
import os
os.path.exists(path)
os.path.join("dir", "file.txt")        # 跨平台路径拼接
os.path.basename(path)                 # 文件名
os.path.dirname(path)                  # 目录名
os.path.splitext(path)                 # 分离扩展名
```

### 十四、异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Cannot divide by zero: {e}")
except (TypeError, ValueError) as e:
    print(f"Type or value error: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
else:
    print("No exception occurred!")
finally:
    print("This always runs")

# 自定义异常
class MyError(Exception):
    def __init__(self, message, code=500):
        super().__init__(message)
        self.code = code

# 抛出异常
raise ValueError("Invalid value!")
raise MyError("Something went wrong", code=400)
```

### 十五、迭代器与生成器

```python
# 迭代器 — 实现 __iter__ 和 __next__
class CountDown:
    def __init__(self, start):
        self.current = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# 生成器 — 使用 yield（推荐！）
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i)  # 5, 4, 3, 2, 1

# 生成器表达式
squares = (x**2 for x in range(10))
sum(squares)         # 省内存！

# yield from（委托子生成器）
def flatten(nested):
    for item in nested:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item
```

### 十六、常用标准库

| 模块 | 用途 | 示例 |
|------|------|------|
| os / os.path | 操作系统接口 | `os.listdir(".")` |
| sys | 系统参数 | `sys.argv`, `sys.stdin` |
| json | JSON 序列化 | `json.dumps(obj)`, `json.loads(s)` |
| re | 正则表达式 | `re.search(r"\d+", s)` |
| datetime | 日期时间 | `datetime.datetime.now()` |
| collections | 高级数据结构 | defaultdict, Counter, deque, OrderedDict |
| itertools | 迭代器工具 | permutations, combinations, product, accumulate |
| functools | 高阶函数工具 | lru_cache, reduce, partial, wraps |
| random | 随机数 | `random.randint(1, 100)` |
| math | 数学函数 | `math.sqrt`, `math.gcd`, `math.lcm` |
| statistics | 统计函数 | `statistics.mean`, `statistics.median` |
| heapq | 堆队列 | `heappush`, `heappop` |
| bisect | 二分查找 | `bisect_left`, `bisect_right` |
| threading | 线程 | `threading.Thread` |
| subprocess | 子进程 | `subprocess.run(["ls"])` |
| argparse | 命令行解析 | 创建 CLI 工具 |
| pickle | 序列化 | `pickle.dump`, `pickle.load` |
| csv | CSV 文件 | `csv.reader`, `csv.writer` |
| logging | 日志 | `logging.info("message")` |
| re | 正则 | `re.match`, `re.sub`, `re.findall` |

### 十七、正则表达式

```python
import re

text = "My phone is 123-456-7890 and email is user@example.com"

# 搜索
re.search(r"\d{3}-\d{3}-\d{4}", text)   # 返回第一个匹配或 None
re.findall(r"\d+", text)                 # 返回所有匹配列表
re.sub(r"\d", "*", text)                 # 替换

# 分组
m = re.search(r"(\d{3})-(\d{3})-(\d{4})", text)
m.group(0)    # "123-456-7890" 整个匹配
m.group(1)    # "123"
m.group(2)    # "456"
m.group(3)    # "7890"
m.groups()    # ("123", "456", "7890")

# 常用模式
# \d 数字 \w 单词字符 \s 空白
# .  任意字符（除换行）
# *  0或多次 +  1或多次 ?  0或1次
# {n} n次 {n,m} n到m次
# ^  开头 $  结尾
# [abc] 字符集 [^abc] 非字符集

# 贪婪 vs 非贪婪
re.findall(r"<.*>", "<a> <b>")    # ['<a> <b>'] 贪婪
re.findall(r"<.*?>", "<a> <b>")   # ['<a>', '<b>'] 非贪婪

# 编译正则（重复使用推荐）
pattern = re.compile(r"\d+", re.IGNORECASE)
pattern.findall(text)
```

### 十八、并发编程

```python
# 多线程（I/O 密集型任务推荐）
import threading
import time

def worker(name, delay):
    print(f"{name} starting...")
    time.sleep(delay)
    print(f"{name} done!")

threads = []
for i in range(5):
    t = threading.Thread(target=worker, args=(f"Worker-{i}", i))
    t.start()
    threads.append(t)

for t in threads:
    t.join()  # 等待所有线程结束

# GIL（全局解释器锁）：Python 多线程不能真正并行执行 Python 字节码
# 但 I/O 操作会释放 GIL，所以多线程适合 I/O 密集型

# 多进程（CPU 密集型任务推荐）
from multiprocessing import Pool

def square(x):
    return x ** 2

with Pool(4) as p:
    results = p.map(square, range(100))

# asyncio（异步 I/O，现代推荐方式）
import asyncio

async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # 模拟网络请求
    return f"Data from {url}"

async def main():
    urls = ["url1", "url2", "url3"]
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())
```

### 十九、Web 框架 Flask 快速参考

```python
from flask import Flask, request, jsonify, session

app = Flask(__name__)
app.secret_key = "your-secret-key"

# 路由
@app.route("/")
def index():
    return "Hello World"

@app.route("/api/data")
def get_data():
    return jsonify({"status": "ok", "data": [...]})

@app.route("/api/data", methods=["POST"])
def create_data():
    data = request.get_json()
    return jsonify({"message": "created"}), 201

@app.route("/api/<int:id>")
def get_item(id):
    return jsonify({"id": id})

# 蓝图 - 组织模块
from flask import Blueprint
api = Blueprint("api", __name__)

@api.route("/users")
def get_users():
    return jsonify([...])

app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
```

### 学习心得

Python 的哲学是"人生苦短，我用 Python"（Life is short, you need Python）。它的简洁不是偷懒，而是把认知负担从语法细节转移到问题本身。从写爬虫到搭博客，从数据处理到竞赛刷题，Python 陪我走过了编程入门最关键的阶段。

最重要的学习方式：打开一个 Jupyter Notebook 或 IPython 终端，边写边试。Python 的 REPL 交互式环境是最友好的老师。