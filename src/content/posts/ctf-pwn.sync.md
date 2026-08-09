---
title: "PWN？不，是Please Wait Noob"
published: 2026-08-08
category: "CTF"
image: "/assets/images/posts/d1.avif"
tags: ["CTF", "PWN", "栈溢出", "ROP", "二进制"]
description: "栈溢出、堆利用、ROP链——二进制漏洞利用初探。"
draft: false
slug: "ctf-pwn"
---

## PWN方向概述

PWN是CTF中技术含量最高的方向之一，涉及二进制漏洞的发现与利用。

## 前置知识

- C语言程序设计
- x86/x64汇编基础
- Linux系统基础
- 编译与链接原理
- GDB调试基础

## 常见漏洞类型

### 栈溢出 (Stack Overflow)

最经典的二进制漏洞：

```c
// 危险代码示例
char buf[64];
gets(buf);  // 没有长度检查！
```

#### 利用方法
1. **覆盖返回地址**：控制程序执行流
2. **ret2text**：返回到程序中的代码
3. **ret2shellcode**：返回到shellcode
4. **ret2libc**：返回到libc函数
5. **ROP (Return-Oriented Programming)**：利用gadget链

### 堆利用 (Heap Exploitation)

更复杂但更强大的利用方式：

- **Use After Free (UAF)**：释放后重用
- **Double Free**：重复释放
- **堆溢出**：溢出到相邻堆块
- **Off-by-one**：越界一个字节
- **Fastbin Attack**、**Tcache Attack**

## 保护机制及绕过

| 保护 | 说明 | 绕过方式 |
|------|------|----------|
| NX (DEP) | 栈不可执行 | ROP / ret2libc |
| Stack Canary | 栈保护 | 泄露canary / 覆盖__stack_chk_fail |
| PIE | 地址随机化 | 泄露基址 |
| ASLR | 地址随机 | 信息泄露 |
| Full RELRO | 完整重定位只读 | 绕过GOT表 |

## 常用工具

- **pwntools**：Python利用框架（必备！）
- **GDB + pwndbg/peda/gef**：调试
- **ROPgadget / ropper**：ROP链构建
- **checksec**：检查保护机制
- **one_gadget**：找execve的gadget

## 学习心得

PWN真的很难——Please Wait Noob 不是玩笑。建议先从x86 32位开始，因为32位的调用约定更简单（参数全在栈上），64位涉及寄存器传参更复杂。最重要的是多动手，每个漏洞类型都自己写demo调试一遍。