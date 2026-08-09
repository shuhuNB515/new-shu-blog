---
title: "Misc杂项题目学习笔记"
published: 2026-08-08
category: "CTF"
image: "/assets/images/posts/d6.avif"
tags: ["CTF", "Misc", "隐写", "流量分析", "取证"]
description: "隐写、流量分析、编码解码、取证等Misc杂项题目学习记录——这是我为数不多的舒适区。"
draft: false
slug: "ctf-misc"
---

## Misc方向概述

Misc（Miscellaneous）是CTF中的"杂项"方向，涵盖各种不便于归类的题目。

## 常见题型

### 1. 编码与解码

CTF中最基础的技能，需要熟悉各种编码格式：

- **Base家族**：Base64, Base32, Base16, Base58, Base91
- **进制转换**：二进制、八进制、十进制、十六进制
- **古典密码**：凯撒密码、维吉尼亚密码、栅栏密码、培根密码
- **编码**：URL编码、HTML实体、Unicode、Morse

### 2. 隐写术 (Steganography)

#### 图片隐写
- LSB隐写（最低有效位）
- EXIF信息隐藏
- 图片拼接/图层隐藏
- 双图对比（盲水印）

#### 音频隐写
- 频谱图分析（Sonic Visualiser）
- LSB音频隐写
- Morse电码音频

#### 其他
- PDF隐写
- ZIP伪加密
- NTFS数据流

### 3. 流量分析

- Wireshark使用基础
- HTTP流量提取
- USB键盘流量分析
- 无线流量分析（802.11）

### 4. 电子取证

- 内存取证（Volatility）
- 磁盘取证
- 日志分析
- 注册表分析

## 常用工具

| 工具 | 用途 |
|------|------|
| binwalk | 文件提取与分离 |
| foremost | 文件恢复 |
| stegsolve | 图片隐写分析 |
| Wireshark | 流量分析 |
| Volatility | 内存取证 |

## 学习建议

Misc题目入门门槛低，但考察面广。关键是要见多识广，遇到新题型时知道用什么工具。