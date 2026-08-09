---
title: "HTML5 & CSS3 完整知识体系"
published: 2026-08-08
category: "学习笔记"
image: "/assets/images/posts/d3.avif"
tags: ["HTML", "CSS", "前端", "学习笔记"]
description: "大一上学期从零开始学习 HTML5 和 CSS3 的完整笔记，涵盖语义化标签、盒模型、Flexbox/Grid布局、CSS动画、响应式设计等核心知识点。"
draft: false
slug: "learning-html-css"
---

## HTML5 完整知识体系

这是我进入大学后学习的第一门技术。大一上学期，从完全零基础开始学习 HTML 和 CSS。记得第一次在浏览器里看到自己写的"Hello World"时那种兴奋感，至今难忘。

HTML (HyperText Markup Language) 不是编程语言，而是标记语言。它用标签来描述网页的结构和内容。浏览器解析 HTML 文档，构建 DOM 树，再结合 CSS 渲染出我们看到的页面。

### 一、HTML5 简介

#### 1、HTML5 的定义

HTML 是一种用符号来创建结构文档的语义。比如标题、章节、列表、链接、引用和其他各种元素都可以包含在结构文档中。HTML5 在 W3C 中的定义：HTML 5 是下一代的 HTML，设计 HTML5 最初目的是为了在移动设备上支持多媒体。HTML5 规范于 2014 年 10 月 29 日由万维网联盟正式宣布，HTML 万维网不等同于互联网，HTML 是万维网最核心的超文本标记语言。但它是依靠互联网运行的服务之一，万维网又简写为 www，它可以实现在互联网的帮助下，访问由许多互相链接的超文本组成的系统。

#### 2、HTML5 的发展历史

在 1984 年那个时候，世界上没有浏览器，也没有万维网(WWW)，人们传递信息与资源交换也只能通过电话和邮件的方式进行。Tim Berners-Lee 对此很感兴趣，努力之后，世界上第一款浏览器 Enguire 也因此诞生（用于数据的浏览与共享）。随后，Tim Berners-Lee 仍在研究，并在 1989 年开发出了世界上第一个 Web 服务器与 Web 客户端，并将这项发明取名为 World Wide Web，也就是我们现在所说的 WWW 万维网。HTML 也因此诞生。2014 年 10 月 29 日，万维网联盟泪流满面地宣布，经过几乎 8 年的艰辛努力，HTML5 标准规范终于最终制定完成了，并已公开发布。

| 版本 | 年份 | 说明 |
|------|------|------|
| HTML | 1991 | WWW 在互联网上首次露面，引起了巨大的轰动 |
| HTML+ | 1993 | ITEF 发布草案，各种标签混乱。1994 年 Tim Berners-Lee 创建 W3C |
| HTML 2.0 | 1995 | 正式发布 |
| HTML 3.2 | 1996 | W3C 对 HTML 进行规范化，1997 年成为推荐标准 |
| HTML 4.01 | 1999 | 发布后 W3C 转向 XML，认为 HTML 存在缺陷，出现 XHTML |
| XHTML 1.0 | 2000 | 与 HTML4.01 内容相同，但语法更严格：必须小写、属性加引号、每个标签需结束标签 |
| XHTML 1.1 | 2001 | 强制文档标注为 xml 而非 html，很多浏览器不能很好解析 |
| XHTML 2.0 | 2004 | 浏览器厂商脱离 W3C 成立 WHATWG，开始 HTML5 研究。XHTML 生态环境破碎 |
| HTML5 | 2014 | 2007 年 W3C 重建 HTML 工作组，在 WHATWG 基础上继续。2014年正式发布 |

HTML5 的第一份正式草案于 2008 年 1 月 22 日公布。2009 年，W3C 宣布停止 XHTML2 研究工作。2012 年 12 月 17 日，W3C 正式宣布 HTML5 规范正式定稿。2013 年 5 月 6 日，HTML 5.1 正式草案公布。2014 年 10 月 29 日，万维网联盟宣布 HTML5 标准规范最终制定完成。

#### 3、HTML5 做了哪些改变

1) HTML 声明不同：HTML 4.01 规定了三种不同的 DOCTYPE 声明，分别是 Strict、Transitional 和 Frameset。HTML5 中仅规定了一种 DOCTYPE：`<!DOCTYPE html>`;

2) 新语义标签的引入，淘汰过时的或冗余的属性：section, article, nav, header, footer, aside, hgroup, mark, figure, figcaption, data, time, output, progress 等;

3) HTML 多媒体元素引入音频和视频：`<audio>` 和 `<video>` 元素，脱离 Flash 直接在浏览器播放;

4) 新表单控件引入（date, time, email, number, range 等）及 input 的属性（autocomplete, autofocus, novalidate 等）;

5) 脱离 Flash 和 Silverlight 直接在浏览器中显示图形或动画——Canvas 标签;

6) 本地数据库（本地存储），对本地离线存储有更好的支持;

7) 一些 API：文件读取、地理位置、网络信息等。

#### 4、HTML5 新增的元素

以前 `<div>` 元素可以把整个 HTML 文档分隔为页眉、导航条、正文、页脚等，`<div>` + 样式很强大，但是不够透明——在查看源码时很难区分哪个 div 表示什么内容。为此新增了语义元素，所有语义元素都有一个显著的特征：不真正做任何事情，但标记了内容的含义。

语义元素特性：1) 让网页的结构更清晰; 2) 容易修改和维护; 3) 无障碍; 4) 搜索引擎优化; 5) 未来的功能。

#### 5、HTML5 中移除的元素

HTML5 一方面添加了新元素，另一方面也从官方标准中剔除了少量表现性元素（如 font, center, big, strike, tt 等），这些都可以在 CSS 中完成。

### 二、HTML 文档的基本骨架

每一个 HTML 页面都从 DOCTYPE 声明开始。这个声明决定了浏览器使用标准模式还是怪异模式来渲染页面。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="页面的描述信息，搜索引擎会显示这个">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <title>页面标题 - 显示在浏览器标签页上</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" href="favicon.png">
</head>
<body>
    <!-- 所有可见内容都写在 body 里面 -->
    <script src="app.js"></script>
</body>
</html>
```

Head 标签虽然不显示在页面上，但它包含了页面的元信息。charset 告诉浏览器用什么编码解析文档（UTF-8 是最通用的选择）。viewport 是响应式设计的基石——没有它，手机浏览器会以 980px 的桌面宽度渲染页面，文字小得看不清。

### 三、块级元素与行内元素

理解块级和行内的区别，是 CSS 布局的第一课。

- **块级元素 (Block)**：独占一行，默认宽度等于父容器 100%，可以设置 width/height/margin/padding。代表：div, p, h1~h6, header, nav, main, footer, section, article, ul, ol, li, table, form
- **行内元素 (Inline)**：不换行，与其他行内元素排列在同一行，无法设置 width 和 height，垂直方向的 margin/padding 不影响布局。代表：span, a, strong, em, code, label
- **行内块元素 (Inline-block)**：不换行但可以设置宽高。代表：img, input, button

这三种显示模式可以通过 CSS 的 display 属性自由切换。

### 四、HTML5 语义化标签详解

一个语义元素能够清楚地描述其意义给浏览器和开发者。无语义元素实例: `<div>` 和 `<span>`，无需考虑内容。语义元素实例: `<form>`, `<table>`, `<img>`，清楚定义了内容。

| 元素 | 说明 |
|------|------|
| `<header>` | 表示增强型的标题，可以包含 HTML 标题和其他内容。其他内容可以是标志、作者署名、或一组指向后面内容的导航链接 |
| `<hgroup>` | 表示增强型的标题，分组两个或多个标题元素，不包含其他内容。主要目的是把标题和副标题联系到一起 |
| `<nav>` | 表示页面中的重要的一组链接。一个页面中可以包含多个 nav |
| `<section>` | 表示文档中的一个区块。是一个通用容器，内容必须始于一个标题。应该在其他语义元素不适用的情况下再选择 |
| `<article>` | 表示一篇独立的内容区块，如新闻报道、论坛帖子或者博客文章 |
| `<aside>` | 表示独立于周围环境内容的一个完整的内容块，可以创建附注栏 |
| `<figure>` | 表示一副插图，标注 figcaption 和插入图片的 img 元素 |
| `<figcaption>` | 标注图题（插图的标题） |
| `<footer>` | 表示页面的底部页脚，通常包含版权声明、简单链接等 |

**完整示例代码：**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>测试语义标签</title>
    <style>
        #s2 { width: 800px; height: 300px; border: 2px red double; }
        aside { width: 60px; height: 100%; float: left; text-align: left; border: 2px blue double; }
        #a2 { width: 730px; height: 100%; float: left; border: 2px yellow double; }
    </style>
</head>
<body>
    <nav>
        <a href="#">首页</a>
        <a href="#">标签变化</a>
        <a href="#">网页布局</a>
        <a href="#">属性变化</a>
    </nav>
    <article>
        <header>
            <h1>我是一级标题</h1>
            <p><time pubdate datetime="2020-11-27"></time></p>
        </header>
        <p>我是文章内容...</p>
    </article>
    <section>
        <figure>
            <figcaption>音视频标题名称</figcaption>
            <div class="video">...</div>
        </figure>
    </section>
    <section id="s2">
        <aside>
            <a href="#h1">article1</a>
            <a href="#h2">article2</a>
            <a href="#h3">article3</a>
        </aside>
        <article id="a2">
            <h1>我是文章内容标题1</h1>
            <h2>我是文章内容标题2</h2>
            <h3>我是文章内容标题3</h3>
        </article>
    </section>
    <footer>版权所有 © 2026</footer>
</body>
</html>
```

#### 文本级语义元素

| 元素 | 说明 |
|------|------|
| `<time>` | 定义公历的时间（24 小时制）或日期，时间和时区偏移可选 |
| `<mark>` | 定义带有记号的文本（默认标记黄色背景） |

### 五、WEB 表单完整体系

Web 表单就是一组文本框、列表、按钮及其他可以点击的小控件，用于收集网站访客的某些信息。

| 表单元素 | 说明 |
|----------|------|
| `<form>` | 定义一个 HTML 表单，用于用户输入 |
| `<input>` | 定义一个输入控件 |
| `<textarea>` | 定义多行的文本输入控件 |
| `<button>` | 定义按钮 |
| `<select>` | 定义选择列表（下拉列表） |
| `<optgroup>` | 定义选择列表中相关选项的组合 |
| `<option>` | 定义选择列表中的选项 |
| `<label>` | 定义 input 元素的标注 |
| `<fieldset>` | 定义围绕表单中元素的边框 |
| `<legend>` | 定义 fieldset 元素的标题 |
| `<datalist>` | (新增) 规定了 input 元素可能的选项列表 |
| `<output>` | (新增) 定义不同类型的输出，比如脚本的输出 |

#### form 元素属性

| 属性 | 值 | 描述 |
|------|-----|------|
| accept-charset | charset_list | 规定服务器可处理的表单数据字符集 |
| action | URL | 规定当提交表单时向何处发送表单数据 |
| autocomplete | on/off | (新增) 规定是否启用表单的自动完成功能 |
| enctype | 见说明 | 规定在发送表单数据之前如何对其进行编码 |
| method | get/post | 规定用于发送 form-data 的 HTTP 方法 |
| name | form_name | 规定表单的名称 |
| novalidate | novalidate | (新增) 提交表单时不进行验证 |
| target | _blank/_self/_parent/_top | 规定在何处打开 action URL |

#### enctype 编码类型详解

在 Form 元素的语法中，EncType 表明提交数据的格式。

| 值 | 描述 |
|-----|------|
| application/x-www-form-urlencoded | 默认。发送前对所有字符进行编码（空格→+, 特殊字符→ASCII HEX）。数据格式：key1=val1&key2=val2 |
| multipart/form-data | 不对字符编码。当使用文件上传控件时必须使用。窗体数据编码为一条消息，每个控件对应一个部分 |
| text/plain | 空格→+，但不编码特殊字符。纯文本形式 |

```html
<form action="/urlencoded" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="text" name="username" value="sid the sloth"/>
    <input type="password" name="password" value="slothsecret"/>
    <input type="submit" value="Submit"/>
</form>
```

enctype="application/x-www-form-urlencoded" 编码方式：
- POST 请求中空格使用 %20 代替
- 表单提交中空格使用 + 代替
- 数据按照 key1=val1&key2=val2 方式编码

传输大数据量二进制数据时，必须使用 enctype="multipart/form-data"。

#### input 元素属性

| 属性 | 值 | 描述 |
|------|-----|------|
| accept | mime_type | 规定通过文件上传提交的文件的类型 |
| alt | text | 定义图像输入的替代文本 |
| autocomplete | on/off | (新增) 是否使用输入字段的自动完成功能 |
| autofocus | autofocus | (新增) 页面加载时是否获得焦点 |
| checked | checked | input 元素首次加载时应被选中 |
| disabled | disabled | 禁用 input 元素 |
| form | form_id | (新增) 规定 input 所属的一个或多个表单 |
| formaction | URL | (新增) 覆盖 form 的 action |
| formenctype | 见说明 | (新增) 覆盖 form 的 enctype |
| formmethod | get/post | (新增) 覆盖 form 的 method |
| formnovalidate | formnovalidate | (新增) 覆盖 form 的 novalidate |
| formtarget | _blank等 | (新增) 覆盖 form 的 target |
| height | pixels/percent | (新增) image 类型的高度 |
| width | pixels/percent | (新增) image 类型的宽度 |
| list | datalist_id | (新增) 引用 datalist |
| max/min | number/date | (新增) 最大值/最小值 |
| maxlength | number | 最大字符数 |
| multiple | multiple | (新增) 可选择多个值 |
| name | text | 名称 |
| pattern | regexp | (新增) 正则验证 |
| placeholder | text | (新增) 占位提示 |
| readonly | readonly | 只读 |
| required | required | (新增) 必填 |
| size | number | 可见字符数 |
| src | URL | image 类型的图片 URL |
| step | number | (新增) 步长 |
| type | 见下表 | input 类型 |
| value | text | 默认值 |

#### input type 类型大全

| 类型 | 描述 |
|------|------|
| text | 默认。单行文本 |
| password | 密码字段 |
| submit | 提交按钮 |
| reset | 重置按钮 |
| button | 普通按钮 |
| radio | 单选按钮 |
| checkbox | 复选框 |
| file | 文件上传 |
| hidden | 隐藏字段 |
| image | 图像提交按钮 |
| email | (新增) 邮箱地址 |
| url | (新增) URL 地址 |
| number | (新增) 数字输入 |
| range | (新增) 滑块 |
| date | (新增) 日期选择 |
| month | (新增) 月份选择 |
| week | (新增) 周选择 |
| time | (新增) 时间选择 |
| datetime-local | (新增) 本地日期时间 |
| color | (新增) 颜色选择器 |
| search | (新增) 搜索框 |
| tel | (新增) 电话号码 |

### 六、HTML 实体

有些字符在 HTML 中有特殊含义，需要用实体表示：

| 实体 | 显示 | 说明 |
|------|------|------|
| `&lt;` | < | 小于号 |
| `&gt;` | > | 大于号 |
| `&amp;` | & | 与符号 |
| `&quot;` | " | 双引号 |
| `&apos;` | ' | 单引号 |
| `&nbsp;` | | 不间断空格 |
| `&copy;` | (c) | 版权符号 |
| `&times;` | x | 乘号 |
| `&rarr;` | -> | 右箭头 |
| `&yen;` | Y | 人民币符号 |
| `&reg;` | (R) | 注册商标 |

## CSS3 核心知识体系

如果说 HTML 是房间的骨架，那 CSS 就是装修。CSS 全称"层叠样式表" (Cascading Style Sheets)，当多条规则作用于同一元素时按优先级决定最终效果。

### 一、CSS 引入方式

1. **行内样式**：`<div style="color:red;">` (优先级最高，但不推荐)
2. **内部样式表**：`<style>div{color:red;}</style>` (写在 head 中)
3. **外部样式表**：`<link rel="stylesheet" href="style.css">` (推荐，结构和样式分离)
4. **@import 导入**：`@import url("style.css");` (CSS 内部导入，性能不如 link)

### 二、CSS 选择器的世界

**优先级计算 (Specificity)**：!important > 内联样式(1000) > ID(100) > 类/伪类/属性(10) > 元素/伪元素(1)。注意这不是十进制。

```css
/* === 基础选择器 === */
* { box-sizing: border-box; }       /* 通配符选择器 */
div { color: red; }                 /* 元素选择器 */
.class-name { font-size: 16px; }    /* 类选择器（最常用） */
#id-name { background: #000; }      /* ID 选择器（尽量少用） */
h1, h2, h3 { font-family: sans-serif; } /* 分组选择器 */

/* === 关系组合选择器 === */
div p { line-height: 1.8; }         /* 后代选择器：div 内所有 p */
div > p { margin-bottom: 10px; }    /* 子代选择器：div 的直接子元素 p */
div + p { border-top: 1px solid; }  /* 相邻兄弟：紧接 div 后的第一个 p */
div ~ p { color: #666; }            /* 通用兄弟：div 后所有同级 p */
div.container { max-width: 1200px; }/* 交集选择器 */

/* === 属性选择器 === */
[href] { color: blue; }                      /* 有 href 属性 */
[href^="https"] { }                          /* 以 https 开头 */
[href$=".pdf"]::after { content: " (PDF)"; }  /* 以 .pdf 结尾 */
[href*="github"] { }                          /* 包含 github */
[class~="btn"] { }                            /* class 含 btn 单词 */
[class|="en"] { }                             /* class 为 en 或 en-* */

/* === 伪类选择器 === */
a:link { color: blue; }              /* 未访问链接 */
a:visited { color: purple; }         /* 已访问链接 */
a:hover { text-decoration: underline; } /* 鼠标悬停 */
a:active { color: red; }             /* 鼠标按下 */
a:focus { outline: 2px solid blue; } /* 键盘聚焦 */

/* 结构伪类（不用加 class 就能精确选择） */
li:first-child { }                   /* 第一个子元素 */
li:last-child { }                    /* 最后一个子元素 */
li:nth-child(odd) { }                /* 奇数项 1,3,5... */
li:nth-child(even) { }               /* 偶数项 2,4,6... */
li:nth-child(3n+1) { }               /* 第 1,4,7,10... 项 */
li:nth-child(-n+3) { }               /* 前 3 项 */
li:nth-last-child(2) { }             /* 倒数第 2 个 */
li:only-child { }                    /* 唯一子元素 */
li:first-of-type { }                 /* 同类型中的第一个 */
li:last-of-type { }                  /* 同类型中的最后一个 */
li:nth-of-type(2) { }                /* 同类型中的第 2 个 */
li:not(.exclude) { }                 /* 排除指定选择器 */
li:empty { display: none; }          /* 空元素隐藏 */

/* 表单状态伪类 */
input:enabled { }                    /* 启用状态 */
input:disabled { opacity: 0.5; }    /* 禁用状态 */
input:checked + label { color: green; } /* 选中状态 */
input:required { border-color: red; }   /* 必填 */
input:optional { }                       /* 非必填 */
input:valid { border-color: green; }     /* 验证通过 */
input:invalid { border-color: red; }     /* 验证失败 */

/* === 伪元素选择器 === */
::before { content: "→ "; }          /* 元素内容前插入 */
::after { content: ""; display: block; clear: both; } /* 清除浮动 */
::first-letter { font-size: 2em; float: left; }  /* 首字下沉 */
::first-line { font-weight: bold; }               /* 首行加粗 */
::selection { background: yellow; color: black; } /* 选中文本 */
::placeholder { color: #999; font-style: italic; } /* 占位符 */
::marker { color: red; }             /* 列表标记 */
```

### 三、盒模型深度理解

```
┌────────────────────────────────┐
│            margin              │  ← 外边距（透明，无背景色）
│  ┌──────────────────────────┐  │
│  │          border          │  │  ← 边框
│  │  ┌────────────────────┐  │  │
│  │  │      padding       │  │  │  ← 内边距（有背景色）
│  │  │  ┌──────────────┐  │  │  │
│  │  │  │   content    │  │  │  │  ← 内容区域
│  │  │  └──────────────┘  │  │  │
│  │  └────────────────────┘  │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

```css
/* content-box（浏览器默认） */
.box {
    box-sizing: content-box;
    width: 300px;           /* 只计算内容区宽度 */
    padding: 20px;          /* 左右各加 20px */
    border: 5px solid #333; /* 左右各加 5px */
    /* 实际占据宽度 = 300 + 40 + 10 = 350px */
}

/* border-box（推荐全局使用） */
.box {
    box-sizing: border-box;
    width: 300px;           /* width = content + padding + border */
    padding: 20px;
    border: 5px solid #333;
    /* 内容区自动缩小为 250px，总宽度仍是 300px */
}
```

**Margin 的诡异行为：**

Margin 塌陷（Collapse）：父元素第一个/最后一个子元素的上/下 margin 会"穿透"父元素，表现成父元素有了 margin。解决方案：overflow:hidden, border, padding, display:flow-root。

Margin 合并：相邻兄弟元素的上下 margin 会合并取最大值。

### 四、Flexbox 弹性布局

一维布局方案，解决传统布局痛点：垂直居中、等宽列、自适应空间分配。

```css
.container {
    display: flex;                  /* 或 inline-flex */
    
    /* 主轴方向 */
    flex-direction: row;            /* 默认: 左->右 */
    flex-direction: row-reverse;    /* 右->左 */
    flex-direction: column;         /* 上->下 */
    flex-direction: column-reverse; /* 下->上 */
    
    /* 是否换行 */
    flex-wrap: nowrap;              /* 默认: 不换行 */
    flex-wrap: wrap;                /* 换行 */
    flex-wrap: wrap-reverse;        /* 反向换行 */
    
    /* flex-flow: row wrap; */     /* 简写 */
    
    /* 主轴对齐 */
    justify-content: flex-start;    /* 起点对齐 */
    justify-content: flex-end;      /* 终点对齐 */
    justify-content: center;        /* 居中 */
    justify-content: space-between; /* 两端对齐，中间均分 */
    justify-content: space-around;  /* 子项两侧间距相等 */
    justify-content: space-evenly;  /* 所有间距完全相等 */
    
    /* 交叉轴对齐 */
    align-items: stretch;           /* 默认: 拉伸填满 */
    align-items: flex-start;        /* 起点 */
    align-items: flex-end;          /* 终点 */
    align-items: center;            /* 居中 */
    align-items: baseline;          /* 文字基线对齐 */
    
    /* 多行对齐 (仅 wrap 时有效) */
    align-content: center;
    
    /* 间距 */
    gap: 16px;
    row-gap: 20px;
    column-gap: 10px;
}

/* 子项属性 */
.item {
    flex: 1;                        /* grow shrink basis 的简写 */
    flex: 0 0 300px;                /* 不放大、不缩小、基础 300px */
    flex-grow: 1;                   /* 放大比例 */
    flex-shrink: 0;                 /* 缩小比例，0=不缩小 */
    flex-basis: auto;               /* 基础尺寸，优先级高于 width */
    align-self: center;             /* 单独设置交叉轴对齐 */
    order: -1;                      /* 排序，越小越靠前 */
}
```

**Flex 经典布局：**

```css
/* 1. 水平垂直居中 */
.center { display: flex; justify-content: center; align-items: center; }

/* 2. 左侧固定 + 右侧自适应 */
.layout { display: flex; }
.sidebar { width: 240px; flex-shrink: 0; }
.main { flex: 1; min-width: 0; }

/* 3. 等宽多列自动换行 */
.grid { display: flex; flex-wrap: wrap; gap: 16px; }
.col { flex: 1 1 calc(33.33% - 16px); min-width: 250px; }

/* 4. 圣杯布局 */
.page { display: flex; flex-direction: column; min-height: 100vh; }
.content { flex: 1; }

/* 5. 响应式导航栏 */
.nav { display: flex; justify-content: space-between; align-items: center; }
.nav-links { display: flex; gap: 24px; }
```

### 五、Grid 网格布局

二维布局方案，适合整体页面结构。Grid 做页面骨架，Flex 做组件内部排列。

```css
.container {
    display: grid;
    
    /* 定义列 */
    grid-template-columns: 100px 200px 300px;       /* 固定三列 */
    grid-template-columns: 1fr 2fr 1fr;              /* fr 按比例分配 */
    grid-template-columns: repeat(3, 1fr);           /* 三等分 */
    grid-template-columns: repeat(4, 1fr);           /* 四等分 */
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* 自适应填充 */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* 拉伸填充 */
    
    /* auto-fill: 有空位就创建新列(保留空轨道)
       auto-fit: 拉伸现有列填满容器 */
    
    /* 定义行 */
    grid-template-rows: 60px 1fr auto;   /* header/主体/footer */
    grid-auto-rows: minmax(100px, auto); /* 隐式行最小高度 */
    
    /* 间距 */
    gap: 20px;
    row-gap: 16px;
    column-gap: 24px;
    
    /* 单元格内容对齐 */
    justify-items: center;      /* 水平 */
    align-items: center;        /* 垂直 */
    place-items: center;        /* 简写 */
    
    /* 网格在容器中的对齐 */
    justify-content: center;
    align-content: center;
}

/* 子项属性 */
.item {
    grid-column-start: 1;
    grid-column-end: 3;         /* 从第1根线到第3根线 = 占2列 */
    grid-column: 1 / 3;         /* 简写 */
    grid-column: 1 / -1;        /* 占满整行 */
    grid-column: span 2;        /* 跨2列 */
    grid-row: 2 / 4;            /* 占第2行和第3行 */
    justify-self: start;
    align-self: end;
}

/* Grid 命名区域布局（最优雅的方式） */
.page {
    display: grid;
    grid-template-areas:
        "header  header"
        "sidebar main  "
        "footer  footer";
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main   { grid-area: main; }
.footer { grid-area: footer; }
```

### 六、定位（Position）

```css
/* static - 默认，正常文档流 */
.static { position: static; }

/* relative - 相对定位：相对自身偏移，原位置仍占空间
   常用于给 absolute 子元素提供定位参照 */
.relative { position: relative; top: 10px; left: 20px; }

/* absolute - 绝对定位：脱离文档流
   相对最近的非 static 祖先定位 */
.absolute { position: absolute; top: 0; right: 0; }

/* fixed - 固定定位：脱离文档流，相对视口
   导航栏吸顶、回到顶部按钮、弹窗遮罩 */
.fixed { position: fixed; top: 0; left: 0; width: 100%; z-index: 100; }

/* sticky - 粘性定位：混合 relative 和 fixed
   滚动到阈值前正常占位，之后固定在屏幕上 */
.sticky-header { position: sticky; top: 0; }
```

z-index 仅对定位元素生效，在同一个"层叠上下文"内比较。创建层叠上下文的方式：position+z-index, opacity<1, transform, filter 等。

### 七、CSS 动画系统

```css
/* Transition（过渡）：状态切换 */
.btn {
    background: #2E8B57;
    transition: background 0.3s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn:hover { background: #00FF7F; transform: scale(1.05); }

/* timing-function: ease / linear / ease-in / ease-out / ease-in-out / steps(n) */

/* Keyframes（关键帧动画） */
@keyframes slideUp {
    0%   { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.1); }
}

.element {
    /* name duration timing-function delay iteration-count direction fill-mode */
    animation: slideUp 0.6s ease forwards;
}

/* Transform（变换） */
.element {
    transform: translate(50px, 20px);     /* 平移 */
    transform: translateX(100px);          /* 水平 */
    transform: translateY(-50%);           /* 垂直 (%相对自身) */
    transform: rotate(45deg);              /* 旋转 */
    transform: rotateX(180deg);            /* 3D 旋转 */
    transform: scale(1.2);                 /* 缩放 */
    transform: skew(10deg, 5deg);          /* 倾斜 */
}
```

### 八、响应式设计

核心原则：移动优先（Mobile First）。

```css
/* 手机（默认样式） */
.card { width: 100%; padding: 12px; }

/* 平板竖屏 >= 576px */
@media (min-width: 576px) { .card { width: calc(50% - 8px); } }

/* 平板横屏 >= 768px */
@media (min-width: 768px) { .card { width: calc(33.33% - 12px); padding: 16px; } }

/* 小桌面 >= 992px */
@media (min-width: 992px) { .card { width: calc(25% - 16px); } }

/* 大桌面 >= 1200px */
@media (min-width: 1200px) { .container { max-width: 1140px; margin: 0 auto; } }
```

Bootstrap 5 断点：xs(<576) / sm(>=576) / md(>=768) / lg(>=992) / xl(>=1200) / xxl(>=1400)

### 九、CSS 变量（自定义属性）

```css
:root {
    /* 品牌色 */
    --primary: #2E8B57;
    --primary-light: #00FF7F;
    --primary-dark: #1a5c35;
    
    /* 中性色 */
    --bg: #0d1117;
    --bg-card: rgba(22, 27, 34, 0.6);
    --text: #c9d1d9;
    --text-muted: #8b949e;
    --border: rgba(255, 255, 255, 0.1);
    
    /* 尺寸 */
    --radius: 8px;
    --radius-lg: 12px;
    --max-width: 1200px;
    
    /* 阴影 */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
}

.card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
}
.element { color: var(--undefined, #fff); }  /* 带默认值 */
```

### 十、常用 CSS 技巧

```css
/* 文本溢出省略号 */
.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* 多行省略 */
.clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* 毛玻璃效果 */
.glass { background: rgba(22, 27, 34, 0.35); backdrop-filter: blur(10px); }

/* 清除浮动 */
.clearfix::after { content: ""; display: table; clear: both; }

/* 隐藏元素三种方式 */
.hide-visually { visibility: hidden; }          /* 不可见但占位 */
.hide-layout   { display: none; }               /* DOM 移除 */
.hide-accessible {                                /* 屏幕阅读器可访问 */
    position: absolute; width: 1px; height: 1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
}

/* 防止图片底部空隙 */
img { display: block; }   /* 或 vertical-align: middle; */

/* 平滑滚动 */  html { scroll-behavior: smooth; }
/* 自定义选中颜色 */  ::selection { background: #2E8B57; color: white; }
/* 禁止选中 */  .no-select { user-select: none; }
```

### 学习心得

大一上学期的 HTML/CSS 学习让我第一次感受到"创造"的乐趣。从最初只能写出黑底白字的简单页面，到后来能独立复刻复杂的网页布局，最重要的不是记住了多少属性，而是培养了"视觉拆解"的能力。打开浏览器 DevTools，在 Styles 面板里实时修改 CSS 属性观察页面变化，这是学习 CSS 最快的方式。