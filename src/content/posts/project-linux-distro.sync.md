---
title: "创建 Linux 发行版 (shu-linux)"
published: 2026-08-08
category: "项目实战"
image: "/assets/images/posts/d4.avif"
tags: ["Linux", "LFS", "BLFS", "系统构建", "项目"]
description: "亲手从 LFS/BLFS 构建一个名为 shu-linux 的完整 Linux 发行版，深入理解 Linux 系统的每一个组件。"
draft: false
slug: "project-linux-distro"
---

## 项目背景

LFS（Linux From Scratch）是 Linux 世界中最极致的"造轮子"体验——不从任何现成的发行版（如 Ubuntu、CentOS）安装系统，而是从零开始，亲手下载并编译每一个源代码包，包括内核、工具链、基础库、Shell，一步一步组装出完整的操作系统。

本项目最终命名为 **shu-linux**，是自己打造的独立 Linux 发行版。

## 构建过程

### 工具链自举

首先需要在一个宿主机环境中构建一个临时的工具链（binutils、gcc、glibc），交叉编译出一个独立于宿主系统的编译环境。然后用这个工具链编译出目标系统的所有组件，实现工具链的"自举"。

### 编译 Linux 内核

使用 `make defconfig` 生成默认配置，然后手动调整：
- 确保 SATA 硬盘驱动编译进内核（否则内核找不到根文件系统导致 Kernel Panic）
- 配置网络驱动支持

编译命令：
```bash
make -j$(nproc)
make modules_install
cp arch/x86/boot/bzImage /boot/vmlinuz-6.7.4-shu-linux
```

### 基础用户态系统

按 LFS 第八章顺序，依次编译数百个基础软件包：
- GNU Coreutils、Util-linux（基础命令）
- Bash、GCC、Make（编译环境和 Shell）
- GRUB（引导加载程序）
- sysvinit（init 系统）

### 攻克 Kernel Panic

首次开机最容易遇到的错误：
```
VFS: Unable to mount root fs on unknown-block(0,0)
```
原因：内核默认没有 SCSI 驱动，而 VMware 虚拟机可能将虚拟硬盘挂载为 SCSI 接口。解决方法：在 VM 设置中将硬盘接口改为 SATA，或在内核中编译 SCSI 驱动。

### 修复 GRUB 引导

Grub 配置中的 `root=/dev/sda1` 可能在虚拟机中被错误识别。通过进入 GRUB 命令行手动引导：
```grub
set root=(hd0,1)
linux /boot/vmlinuz-6.7.4-shu-linux root=/dev/sda1 ro
boot
```
成功启动后将正确配置写入 `/etc/fstab` 和 `/boot/grub/grub.cfg`。

## 网络配置

shu-linux 使用静态 IP 配置：
- 编辑 `/etc/sysconfig/ifconfig.eth0` 设置 IP、GATEWAY
- 配置 `/etc/resolv.conf` 添加 DNS 服务器（114.114.114.114、8.8.8.8）
- 配置 `/etc/nsswitch.conf` 确保 DNS 解析正常工作

## BLFS 扩展：图形界面

在 LFS 基础上继续 BLFS（Beyond Linux From Scratch）：
- 编译安装 OpenSSL、Wget（网络工具）
- 安装 Xorg 图形显示服务器
- 编译 XFCE 轻量级桌面环境

## 项目收获

- 深入理解 Linux 系统启动全流程（BIOS → GRUB → Kernel → init → login）
- 掌握工具链自举和交叉编译原理
- 熟悉数百个 GNU/Linux 核心软件包的编译依赖关系
- 学会从 Kernel Panic、网络不通、登录失败等底层错误中排错

shu-linux 是一台没有多余商业代码、没有后门、每一行代码都由自己编译的系统——这是计算机学习中最有成就感的里程碑之一。