---
title: "Web安全方向学习笔记"
published: 2026-08-08
category: "CTF"
image: "/assets/images/posts/d5.avif"
tags: ["CTF", "Web安全", "SQL注入", "XSS", "SSRF"]
description: "SQL注入、XSS跨站脚本、SSRF服务端请求伪造、命令执行等Web方向安全学习笔记"
draft: false
slug: "ctf-web"
---

## Web安全方向概述

Web安全是CTF竞赛中最常出现的题型之一，也是网络安全领域最重要的方向。

## 常见漏洞类型

### SQL注入 (SQL Injection)

SQL注入是最常见的Web漏洞之一，攻击者通过构造恶意的SQL语句来操作数据库。

**基本原理**：
- 用户输入被直接拼接到SQL查询语句中
- 攻击者可以闭合引号、注释后续语句、执行额外查询

**常见类型**：
- 联合查询注入 (UNION SELECT)
- 报错注入 (Error-based)
- 布尔盲注 (Boolean-based Blind)
- 时间盲注 (Time-based Blind)
- 堆叠注入 (Stacked Queries)

### XSS 跨站脚本攻击

XSS 允许攻击者将恶意脚本注入到其他用户浏览的页面中。

**三种类型**：
- 反射型 XSS：恶意脚本通过URL参数传递
- 存储型 XSS：恶意脚本被存储在服务器上
- DOM型 XSS：通过修改DOM环境执行

### SSRF 服务端请求伪造

SSRF 允许攻击者通过服务器发起请求，访问内网资源或绕过防火墙。

**常见利用**：
- 读取云元数据（AWS/Azure/GCP metadata）
- 端口扫描内网服务
- 利用 file:// 协议读取文件
- 利用 gopher:// 协议攻击Redis/MySQL等

### 命令注入

当应用程序调用系统命令时，攻击者可以通过注入额外的命令来执行任意操作。

**常见场景**：
- ping 测试工具
- DNS 查询工具
- 文件处理功能

## 学习建议

1. 搭建本地环境（Docker + 漏洞靶场）
2. 理解每种漏洞的原理，再学利用方法
3. 多看Writeup，学习别人的思路
4. 代码审计能力是长期目标