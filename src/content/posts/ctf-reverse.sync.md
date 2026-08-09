---
title: "逆向工程学习之路"
published: 2026-08-08
category: "CTF"
image: "/assets/images/posts/d4.avif"
tags: ["CTF", "逆向工程", "IDA", "反汇编", "二进制"]
description: "打开IDA后我只会按F5——记录我学习逆向的过程，每一步都是血泪。"
draft: false
slug: "ctf-reverse"
---

## 逆向工程概述

逆向工程（Reverse Engineering）是通过分析二进制程序来理解其功能和逻辑的过程。

## 常用工具

### IDA Pro
- 最强大的静态分析工具
- F5 一键反编译（Hex-Rays Decompiler）
- 支持多种架构（x86, x64, ARM, MIPS等）

### Ghidra
- NSA开源的逆向工具
- 免费且功能强大
- 内置反编译器

### x64dbg / OllyDbg
- Windows平台动态调试工具
- 支持断点、步进、内存查看

### GDB + pwndbg
- Linux平台调试利器
- pwndbg插件提供更好的体验

## 基础技能

### 汇编语言
- x86/x64 汇编基础
- 函数调用约定（cdecl, stdcall, fastcall）
- 栈帧结构

### 文件格式
- PE 格式（Windows可执行文件）
- ELF 格式（Linux可执行文件）

## 常见题型

1. **算法逆向**：分析加密/编码算法，写出解密脚本
2. **反调试**：绕过反调试机制
3. **虚拟机保护**：分析自定义VM的opcode
4. **花指令**：去除干扰指令
5. **加壳/脱壳**：UPX、VMP等

## 学习心得

逆向真的很难。刚开始对着IDA一脸茫然，F5出来的代码也看不懂。但坚持下来的方法就是：
- 从简单题开始
- 一定要动手调试
- 一遍遍看别人的Writeup