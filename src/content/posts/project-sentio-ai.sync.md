---
title: "Sentio-AI (七流云) — AI 视觉对话助手"
published: 2026-08-08
category: "项目实战"
image: "/assets/images/posts/d2.avif"
tags: ["AI", "Vue3", "Flask", "OpenAI", "项目"]
description: "基于视觉的 AI 语音助手。支持摄像头实时分析、多模态对话、语音输入/输出、创意工具栏等。前端 Vue 3 + 后端 Flask + OpenAI API。"
draft: false
slug: "project-sentio-ai"
---

## 项目概览

Sentio-AI 是一个基于视觉的 AI 语音助手项目，支持摄像头实时画面分析、多轮 AI 对话、语音输入/输出。前端使用 Vue 3 构建，后端基于 Flask，通过 OpenAI-compatible API 驱动视觉与语言模型。

## 技术栈

| 层 | 技术 |
|---|------|
| 前端框架 | Vue 3 (Composition API + `<script setup>`) |
| 状态管理 | Composable (useAuth) |
| 路由 | Vue Router 4 |
| 构建工具 | Vite 5 |
| 后端框架 | Flask 3 |
| 认证 | JWT (flask-jwt-extended + bcrypt) |
| 数据库 | SQLite |
| AI 服务 | OpenAI-compatible API (视觉、对话、TTS、STT) |
| 部署 | GitHub Pages (前端) + PythonAnywhere (后端) |

## 项目结构

```
AI-qiliuyun/
├── frontend/                 # Vue 3 前端
│   ├── src/
│   │   ├── api/index.js      # API 请求层
│   │   ├── components/       # 组件
│   │   │   ├── CameraView.vue      # 摄像头视图
│   │   │   ├── ChatPanel.vue       # 聊天面板
│   │   │   ├── VoiceInput.vue      # 语音输入
│   │   │   ├── QuickActions.vue    # 快捷视觉操作
│   │   │   ├── RecognitionPanel.vue # 识别记录
│   │   │   ├── CreativeToolbar.vue  # 创意工具栏(滤镜/对比)
│   │   │   ├── SettingsModal.vue    # 设置弹窗
│   │   │   ├── StatusBar.vue       # 状态栏
│   │   │   ├── ConfirmModal.vue     # 确认弹窗
│   │   │   └── RainEffect.vue      # 雨滴粒子特效
│   │   ├── composables/useAuth.js   # 认证逻辑
│   │   ├── views/
│   │   │   ├── MainPage.vue   # 主页面
│   │   │   └── LoginPage.vue  # 登录页
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   └── vite.config.js
├── backend/                  # Flask 后端
│   ├── app.py                # 主应用 (413行)
│   ├── config.py             # 配置管理 (模型路由、API密钥)
│   ├── wsgi.py               # PythonAnywhere WSGI入口
│   ├── services/             # 服务层
│   │   ├── chat.py           # AI对话服务 (会话管理、模型路由)
│   │   ├── vision.py         # 视觉分析服务
│   │   ├── speech.py         # 语音识别/合成
│   │   ├── database.py       # 数据库CRUD
│   │   └── cost_control.py   # 成本控制 (限流/压缩/缓存)
│   └── requirements.txt
└── .github/workflows/deploy.yml  # CI/CD 自动部署
```

## 后端 API 设计

| 路由 | 方法 | 说明 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册 |
| `/api/auth/login` | POST | 用户登录 |
| `/api/auth/me` | GET | 获取当前用户信息 |
| `/api/conversations` | GET/POST | 对话列表/新建 |
| `/api/conversations/<id>` | GET/PUT/DELETE | 对话详情/更新/删除 |
| `/api/chat` | POST | 多模态对话 (文本+图像) |
| `/api/multimodal` | POST | 全模态对话 (支持TTS) |
| `/api/vision/quick` | POST | 快捷视觉 (描述/OCR/物体识别/翻译/情绪) |
| `/api/stt` | POST | 语音转文字 |
| `/api/tts` | POST | 文字转语音 |
| `/api/screenshots` | GET/POST | 截图管理 |
| `/api/stats` | GET | 使用统计 |

## 核心功能

### 实时视觉理解

- 摄像头实时画面捕获
- 场景描述、文字识别(OCR)、物体识别、翻译、情绪分析
- 帧采样间隔控制（降低 API 调用成本）

### 多模态对话

- 基于当前画面 + 语音的上下文对话
- 视觉上下文摘要（描述缓存，避免重复 API 调用）
- 模型智能路由：纯文本用廉价模型，带图用视觉模型
- 对话历史裁剪（防止 token 超限）

### 语音交互

- 语音转文字 (STT) 输入
- 文字转语音 (TTS) 播报
- 语音+视觉联动问答

### 创意工具栏

- 实时滤镜效果
- 前后对比分析（拍两张图，AI 分析差异）
- 语音命令快捷操作

## 成本控制策略

项目使用了多层成本优化：

1. **模型分离路由** — 纯文本请求路由到低价 Flash 模型，仅视觉请求才用 Omni 模型
2. **帧采样间隔** — 不逐帧分析，隔帧采样降低 API 调用频率
3. **图像压缩** — 上传前将图像压缩到 512px + JPEG 质量 70%
4. **限流机制** — 每分钟最多 20 次请求
5. **对话历史裁剪** — 最多保留最近 10 轮对话
6. **视觉描述缓存** — 描述结果缓存 TTL 300s，避免重复分析

## 部署配置

- **前端部署**: GitHub Pages (`https://shuhuNB515.github.io/Sentio-AI/`)
- **后端部署**: PythonAnywhere
- **CI/CD**: GitHub Actions 自动构建推送至 gh-pages 分支
- **Vite 配置**: 使用相对路径 `base: './'` 兼容子路径部署