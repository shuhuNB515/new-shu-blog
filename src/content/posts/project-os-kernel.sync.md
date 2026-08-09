---
title: "打造独立操作系统内核"
published: 2026-08-08
category: "项目实战"
image: "/assets/images/posts/d1.avif"
tags: ["操作系统", "C语言", "汇编", "底层开发", "项目"]
description: "从零开始构建不属于 Windows 也不属于 Linux 的独立操作系统内核。涵盖 Bare Bones 环境搭建、交叉编译器构建、汇编启动入口、C 语言内核主程序、VGA 显存输出。"
draft: false
slug: "project-os-kernel"
---

## 项目简介

创建一个完全属于自己的、独立于 Windows 和 Linux 之外的操作系统内核，是计算机科学中最硬核、也最有成就感的项目之一。这个项目从零开始（Bare Bones），抛弃平时编程时依赖的几乎所有东西——没有标准库（没有 `printf`），没有内存管理（没有 `malloc`），甚至一开始连屏幕输出都没有。一切都要亲自与硬件对话。

## 第一阶段：环境搭建

虽然要写的是一个非 Linux 的内核，但需要借助完善的底层编译工具链。

1. **必备语言**：C 语言（主要逻辑）和汇编语言（处理最底层的硬件交互，如启动和中断）。
2. **构建交叉编译器**：不能使用系统默认的 `gcc`，需要构建一个目标为独立裸机环境的编译器（如 `i686-elf-gcc`），确保编译出的代码不带上任何已有操作系统的"痕迹"。
3. **虚拟机测试**：安装 QEMU 或 Bochs，避免每次写完代码都要重启真机测试。

## 第二阶段：启动与入口

电脑开机时，硬件会寻找引导加载程序。为专注内核开发，使用现成的 GRUB 引导程序，遵循 Multiboot 规范。

编写汇编入口 (`boot.s`) 的工作：
- 向 GRUB 证明"我是一个符合规范的内核"（通过 Multiboot 魔法数字）
- 设置 CPU 的栈，因为 C 语言运行需要栈
- 跳转到 C 语言主函数

## 第三阶段：内核主程序 (C Kernel)

这是内核真正开始运作的地方。通过直接操作 VGA 文本模式的显存地址 `0xB8000` 来在屏幕上显示字符：

```c
void kernel_main(void) {
    unsigned short *terminal_buffer = (unsigned short *) 0xB8000;
    terminal_buffer[0] = (unsigned short) 'H' | (unsigned short) 0x0700;
    terminal_buffer[1] = (unsigned short) 'i' | (unsigned short) 0x0700;
    // 死循环保持运行
    for (;;) { asm volatile("hlt"); }
}
```

## 链接器脚本

需要一个链接器脚本告诉编译器如何把汇编和 C 代码组合成一个可被 GRUB 加载的二进制文件，指定代码入口、section 布局和地址对齐。

## 收获与展望

完成这个内核后，不仅深刻理解了计算机从按下电源键到操作系统启动的完整过程，还掌握了交叉编译、链接脚本、裸机编程等底层技能。未来计划为此内核添加中断处理、内存管理（分页）、简单的文件系统等模块。