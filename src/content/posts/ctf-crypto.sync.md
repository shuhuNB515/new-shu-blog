---
title: "密码学：RSA到底是什么东西？"
published: 2026-08-08
category: "CTF"
image: "/assets/images/posts/d3.avif"
tags: ["CTF", "密码学", "RSA", "AES", "Crypto"]
description: "记录我艰难的密码学入门之路，从古典密码到现代密码RSA。"
draft: false
slug: "ctf-crypto"
---

## 密码学方向概述

密码学（Cryptography）是CTF中的核心方向之一，从古典密码到现代公钥密码体系都有涉及。

## 古典密码

### 单表替换密码
- 凯撒密码：每个字母按固定偏移量替换
- 仿射密码：E(x) = (ax + b) mod 26

### 多表替换密码
- 维吉尼亚密码（Vigenère）
- 希尔密码（Hill Cipher）

### 置换密码
- 栅栏密码（Rail Fence）
- 列置换密码

## 现代密码

### 对称加密
- **AES**：当前最常用的对称加密算法
  - ECB模式（不安全，相同明文→相同密文）
  - CBC模式（需要IV）
  - CTR模式（流密码模式）

### 非对称加密
- **RSA**：最经典的非对称加密

```
# RSA的基本原理
c = m^e mod n    # 加密
m = c^d mod n    # 解密

n = p × q         # p,q 是大素数
φ(n) = (p-1)(q-1) # 欧拉函数
e × d ≡ 1 (mod φ(n))
```

## RSA常见攻击

1. **分解N**：当p和q太小或相邻时使用
2. **共模攻击**：同一明文用不同e加密
3. **低加密指数攻击**：e=3，明文较小
4. **维纳攻击 (Wiener)**：d较小
5. **Franklin-Reiter**：相关明文攻击

## 常用工具

- **Python + gmpy2/pycryptodome**：核心计算
- **sagemath**：数学计算瑞士军刀
- **yafu**：大整数分解
- **RsaCtfTool**：RSA综合利用工具

## 学习建议

密码学需要数学基础（数论、线性代数、概率论），但入门阶段可以先记套路，再理解原理。