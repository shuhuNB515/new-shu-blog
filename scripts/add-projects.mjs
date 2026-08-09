import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_PATH = path.join(__dirname, "..", "src", "data", "blog.json");

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readDB() {
  return JSON.parse(fs.readFileSync(BLOG_PATH, "utf-8"));
}

function writeDB(db) {
  fs.writeFileSync(BLOG_PATH, JSON.stringify(db, null, 2), "utf-8");
}

const projects = [
  {
    slug: "project-polymorphx",
    title: "PolyMorphX — 多态控制流规避框架",
    description: "工业级多态Shellcode规避框架，支持9种规避技术、可编程加密链、Jinja2模板生成。Python/Rust/C++ 多语言实现，集成CLI + Flask Web管理面板。",
    tags: ["C++", "Python", "Rust", "安全", "免杀", "项目"],
    category: "项目展示",
    image: "/assets/images/posts/d4.avif",
    pinned: true,
    content: `## 项目概览

PolyMorphX 是一个工业级多态控制流规避框架，专为红队和渗透测试设计。通过对 Shellcode 进行多层加密和动态模板生成，实现 EDR/AV 规避。

## 技术栈

| 层 | 技术 |
|---|------|
| 核心语言 | Python 3.10+, C++, Rust |
| 模板引擎 | Jinja2 |
| Web 管理 | Flask + Bootstrap |
| 加密算法 | XOR, RC4, AES-256-GCM, ChaCha20 |
| 编译工具 | MinGW-w64 (C++), Cargo (Rust) |

## 9 大规避技术

| 序号 | 技术 | 说明 |
|------|------|------|
| 1 | 控制流平坦化 | 将线性代码块重构为 switch-case 调度循环 |
| 2 | 间接系统调用 | 绕过用户态 hook，直接通过 syscall 指令调用内核 |
| 3 | 休眠混淆 | 随机化休眠时间，对抗沙箱时间加速检测 |
| 4 | 栈伪造 | 伪造调用栈回溯，隐藏真实调用链 |
| 5 | API 哈希 | 动态解析 API 地址，避免导入表暴露 |
| 6 | 字符串加密 | 编译时加密字符串常量，运行时解密 |
| 7 | 反调试 | IsDebuggerPresent、NtQueryInformationProcess 等检测 |
| 8 | 反沙箱 | 检测虚拟机/沙箱环境特征 |
| 9 | IAT 混淆 | 延迟解析导入函数，干扰静态分析 |

## 加密链架构

\`\`\`
原始 Shellcode
  → XOR 单字节加密 (Key: 随机生成)
    → RC4 流加密 (Key: 随机 16 字节)
      → AES-256-GCM 加密 (Key + Nonce)
        → ChaCha20 加密 (Key + Nonce)
          → 最终 Ciphertext
\`\`\`

支持可编程的加密链组合，可自由选择加密层数和顺序。解密时反向执行。

## 项目结构

\`\`\`
PolyMorphX/
├── core/                    # Python 核心引擎
│   ├── obfuscator.py        # 控制流混淆引擎
│   ├── encryptor.py         # 多层加密链
│   ├── loader_generator.py  # Jinja2 C++/Rust 模板生成
│   └── techniques/          # 9 种规避技术实现
├── templates/               # Jinja2 代码模板
│   ├── cpp_loader.j2        # C++ Loader 模板
│   └── rust_loader.j2       # Rust Loader 模板
├── web/                     # Flask Web 管理面板
│   ├── app.py
│   ├── templates/
│   └── static/
├── cli.py                   # 命令行工具
└── config.yaml              # 全局配置
\`\`\`

## 核心功能

### CLI 命令行工具

\`\`\`bash
# 生成加密 Shellcode
python cli.py encrypt --input shellcode.bin --chain aes256,chacha20,xor

# 生成 C++ Loader
python cli.py generate --lang cpp --encrypted payload.enc --output loader/

# 生成 Rust Loader  
python cli.py generate --lang rust --encrypted payload.enc --output loader/
\`\`\`

### Web 管理面板 (Flask)

- 可视化选择规避技术组合
- 上传 Shellcode → 加密链配置 → 一键生成 Loader
- 支持 C++ 和 Rust 双语言输出
- 实时预览生成的代码

## 部署指南

### 环境要求
- Python 3.10+
- MinGW-w64 (C++ 编译)
- Rust toolchain (可选)
- pip install -r requirements.txt

### 快速开始
\`\`\`bash
git clone https://github.com/shuhuNB515/PolyMorphX.git
cd PolyMorphX
pip install -r requirements.txt
python cli.py --help
# 或启动 Web 面板
cd web && python app.py
\`\`\`

## 安全声明

本项目仅供安全研究和授权测试使用。使用者需遵守当地法律法规，对滥用本项目造成的后果，开发者不承担任何责任。`,
    published: "2025-07-20",
    updated: null,
    draft: false,
    password: null,
  },
  {
    slug: "project-kubevigil",
    title: "KubeVigil (K8s 守夜人) — 运行时威胁检测与响应",
    description: "基于 eBPF 的 Kubernetes 运行时安全工具。内核态探针监控 execve/openat/connect 系统调用，YAML 规则引擎实时匹配，自动执行 Kill/Label/NetworkPolicy 响应。",
    tags: ["Go", "eBPF", "Kubernetes", "安全", "云原生", "项目"],
    category: "项目展示",
    image: "/assets/images/posts/d6.avif",
    pinned: true,
    content: `## 项目概览

> 传统安全扫描是静态的，但真实攻击是动态的。

KubeVigil（K8s 守夜人）是一个基于 eBPF 的 Kubernetes 运行时威胁检测与自动响应工具。它在 Linux 内核态挂载系统调用 tracepoint，以零侵入方式实时捕获容器内的异常行为，通过可定制的 YAML 规则引擎进行匹配，一旦检测到威胁即可自动执行隔离、终止、网络阻断等响应策略。

## 技术栈

| 组件 | 技术 |
|------|------|
| eBPF 探针 | C + BPF CO-RE |
| 用户态 Agent | Go 1.21 |
| eBPF 库 | cilium/ebpf |
| K8s 客户端 | client-go |
| CLI 框架 | cobra |
| 配置格式 | YAML |
| 部署方式 | DaemonSet + Helm |

## 核心架构

\`\`\`
┌─────────────────────────────────────────────────┐
│              Kubernetes Cluster                  │
│  ┌────────────────────────────────────────────┐  │
│  │          KubeVigil DaemonSet               │  │
│  │                                            │  │
│  │  ┌──────────────┐   ┌───────────────────┐  │  │
│  │  │ eBPF Probes  │   │  User-space Agent │  │  │
│  │  │  (Kernel)    │   │      (Go)         │  │  │
│  │  │              │   │                   │  │  │
│  │  │ • execve     │───│→ Event Receiver   │  │  │
│  │  │ • openat     │   │       ↓           │  │  │
│  │  │ • connect    │   │  Rule Engine (YAML)│  │  │
│  │  │              │   │       ↓           │  │  │
│  │  │ CO-RE (C)    │   │  K8s Context      │  │  │
│  │  └──────────────┘   │  PID → Pod 映射    │  │  │
│  │                     │       ↓           │  │  │
│  │                     │  Response:        │  │  │
│  │                     │  Label/Kill/NetPol│  │  │
│  │                     └───────────────────┘  │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
\`\`\`

## 核心价值

| 传统静态扫描 | KubeVigil 运行时防护 |
|---|---|
| 检查镜像中已知漏洞 (CVE) | 捕获运行时的未知攻击 (0day) |
| 检查 YAML 配置是否规范 | 监控实际系统调用行为 |
| 无法发现 0day 漏洞利用 | 内核态视角，攻击者无法绕过 |
| 事后审计，攻击已造成损失 | 实时检测 + 自动响应，秒级阻断 |
| 需要修改应用代码或注入 Sidecar | 零侵入，以 DaemonSet 独立运行 |

## 内置安全规则

| 规则 | 类型 | 严重等级 | 响应动作 | 描述 |
|---|---|---|---|---|
| reverse-shell-detected | execve | Critical | Kill Pod | 检测 nc/socat + /dev/tcp/ 反弹 Shell |
| suspicious-download | execve | High | Label | 检测 curl \`\| bash 等管道下载执行 |
| crypto-mining | execve | Critical | Kill Pod | 检测 xmrig/minerd 等挖矿程序 |
| sensitive-file-access | open | High | Label | 检测 /etc/shadow、K8s Secret 访问 |
| c2-communication | connect | Critical | NetworkPolicy | 检测与已知 C2 服务器的通信 |

## 自动响应动作

| 动作 | 说明 |
|---|---|
| alert | 仅告警，不执行动作 |
| label | 给 Pod 打上隔离标签，触发 NetworkPolicy 阻断 |
| kill | 立即终止受感染的 Pod |
| network_policy | 标记 Pod 并触发 NetworkPolicy 网络隔离 |

## 监控能力

- **进程执行监控 (execve)** — 捕获容器内所有新启动进程，含父进程追踪 (PPID)
- **文件访问监控 (open)** — 监控对敏感文件的非授权读取
- **网络连接监控 (connect)** — 捕获恶意外连请求（自动处理网络字节序）

## 运维能力

- **规则热重载** — 发送 SIGHUP 信号即可重载规则，无需重启 Agent
- **日志级别控制** — 支持 debug/info/warn/error 四级日志过滤
- **优雅关闭** — 收到 SIGINT/SIGTERM 后优雅关闭 Ring Buffer 和探针
- **线程安全** — 规则引擎读写锁保护，热重载不影响事件处理
- **健康检查** — DaemonSet 配置 livenessProbe，K8s 自动重启异常 Agent

## 快速开始

\`\`\`bash
# 前置要求：K8s >= 1.24, Linux Kernel >= 5.8 + BTF
git clone https://github.com/shuhuNB515/KubeVigil.git
cd KubeVigil

# Helm 一键安装
helm install kubevigil ./charts/kubevigil \\
  --namespace kubevigil \\
  --create-namespace

# 查看运行状态
kubectl get daemonset -n kubevigil
kubectl logs -n kubevigil -l app.kubernetes.io/name=kubevigil -f

# 规则热重载
kubectl exec -n kubevigil <pod-name> -- kill -HUP 1
\`\`\`

## 项目结构

\`\`\`
KubeVigil/
├── bpf/probes/probes.bpf.c    # eBPF 内核态探针 (C, CO-RE)
├── cmd/kubevigil/main.go      # CLI 入口
├── internal/
│   ├── agent/agent.go         # 用户态 Agent 核心
│   ├── config/config.go       # 配置管理
│   ├── event/event.go         # 事件模型与告警
│   ├── k8s/resolver.go        # PID→Pod 映射 + 响应执行
│   └── rules/engine.go        # YAML 规则引擎
├── configs/
│   ├── config.yaml            # 全局配置
│   └── rules.yaml             # 默认安全规则
├── charts/kubevigil/          # Helm Chart
├── Dockerfile                 # 多阶段构建
├── Makefile
└── LICENSE
\`\`\`

## 许可证

Apache License 2.0

致谢: cilium/ebpf、tracee、Falco 等项目`,
    published: "2025-07-10",
    updated: null,
    draft: false,
    password: null,
  },
  {
    slug: "project-taskflow",
    title: "TaskFlow — 轻量级全栈任务看板",
    description: "Vue 3 + Spring Boot 全栈任务管理系统。支持看板拖拽、团队协作、WebSocket 实时聊天、论坛、OSS 文件上传。JWT 认证 + H2 内嵌数据库。",
    tags: ["Vue3", "Spring Boot", "Java", "全栈", "项目"],
    category: "项目展示",
    image: "/assets/images/posts/d3.avif",
    pinned: false,
    content: `## 项目概览

TaskFlow 是一个轻量级全栈任务看板系统，支持个人和团队的任务管理。前端基于 Vue 3 + Vite 构建，后端 Spring Boot 2.7 + MyBatis，集成 WebSocket 实时聊天、论坛、文件上传等功能。

## 技术栈

| 层 | 技术 |
|---|------|
| 前端框架 | Vue 3 (Composition API + script setup) |
| 路由 | Vue Router 4 |
| HTTP 客户端 | Axios |
| CSS | UnoCSS + Tailwind CSS |
| 构建工具 | Vite 8 |
| 后端框架 | Spring Boot 2.7.3 |
| ORM | MyBatis + Spring Data JPA |
| 数据库 | H2 内存数据库 / MySQL |
| 认证 | JWT (jjwt 0.9.1) |
| 实时通信 | WebSocket (Spring WebSocket) |
| 文件存储 | 阿里云 OSS |
| 语言 | Java 17 |

## 功能模块

### 看板管理 (Kanban)
- 创建/编辑/删除看板
- 列表和任务卡片的 CRUD
- 拖拽排序（流畅的交互体验）
- 任务状态流转

### 团队协作
- 创建/加入团队
- 团队成员管理
- 基于团队的看板共享

### 论坛系统
- 发帖/回帖/评论
- 帖子分类和搜索

### 实时聊天
- WebSocket 双向通信
- 聊天历史持久化
- 多人在线

### 文件上传
- 阿里云 OSS 云存储
- 头像上传

## 项目结构

\`\`\`
TaskFlow/
├── taskflow-vue/              # Vue 3 前端
│   ├── src/
│   │   ├── views/             # 登录/看板/团队/个人中心
│   │   ├── components/        # NavBar 等通用组件
│   │   ├── api/http.js        # Axios 封装 + API 接口
│   │   ├── router/index.js    # 路由配置
│   │   └── store.js           # 响应式用户状态
│   └── package.json
└── taskFlow/service/          # Spring Boot 后端
    ├── src/main/java/com/taskflow/service/
    │   ├── Controller/        # REST API 控制器
    │   │   ├── BoardController.java      # 看板
    │   │   ├── ColumnsController.java    # 列表
    │   │   ├── TaskController.java       # 任务
    │   │   ├── UserController.java       # 用户
    │   │   ├── TeamController.java       # 团队
    │   │   ├── ForumController.java      # 论坛
    │   │   └── ChatHttpController.java   # 聊天
    │   ├── Service/           # 业务逻辑层
    │   ├── mapper/            # MyBatis Mapper
    │   ├── entity/            # 实体 + DTO + VO
    │   ├── config/            # WebSocket/CORS/OSS 配置
    │   └── Interceptor/       # JWT 拦截器
    └── pom.xml
\`\`\`

## API 接口

| 路由 | 方法 | 说明 |
|------|------|------|
| /auth/login | POST | 用户登录 |
| /auth/register | POST | 用户注册 |
| /boards | GET/POST | 看板列表/创建 |
| /boards/{id} | PUT/DELETE | 更新/删除看板 |
| /columns | GET/POST | 列表管理 |
| /tasks | GET/POST | 任务管理 |
| /users/profile | GET/PUT | 用户信息 |
| /teams | GET/POST | 团队管理 |
| /forum/posts | GET/POST | 论坛帖子 |
| /ws/chat | WebSocket | 实时聊天 |

## 路由表

| 路径 | 组件 | 说明 |
|---|---|---|
| /login | Login | 登录页 |
| /boards | BoardList | 看板列表 |
| /kanban | Kanban | 看板详情 (拖拽) |
| /teams | Team | 团队管理 |
| /profile | Profile | 个人中心 |

## 快速开始

### 后端
\`\`\`bash
cd taskFlow/service
mvn spring-boot:run
# 启动在 http://localhost:8080
# H2 控制台: http://localhost:8080/h2-console
\`\`\`

### 前端
\`\`\`bash
cd taskflow-vue
npm install
npm run dev
# 启动在 http://localhost:5173
\`\`\`

### 配置
- 后端使用 H2 内存数据库，开箱即用
- 生产环境可切换为 MySQL
- OSS 配置在 application.yml 中设置

## 数据库设计

| 表 | 说明 |
|---|---|
| board | 看板 |
| columns | 列表 |
| task | 任务卡片 |
| user | 用户 |
| team | 团队 |
| team_member | 团队成员 |
| forum_post | 论坛帖子 |
| forum_comment | 论坛评论 |
| chat_message | 聊天记录 |`,
    published: "2025-06-25",
    updated: null,
    draft: false,
    password: null,
  },
  {
    slug: "project-vocalendar",
    title: "「言程」Vocalendar — 语音优先智能日历管家",
    description: "以 Voice-First 为核心设计理念的智能日历管理工具。React + FastAPI 全栈，支持ASR语音识别、NLP语义解析、TTS语音反馈，让日程管理更自然。",
    tags: ["React", "FastAPI", "Python", "AI", "语音", "全栈", "项目"],
    category: "项目展示",
    image: "/assets/images/posts/d1.avif",
    pinned: false,
    content: `## 产品概述

「言程」Vocalendar 是一款以 **Voice-First（语音优先）** 为核心设计理念的智能日历管理工具，通过 NLP 和 ASR 技术将口语化表达转化为结构化日程，让用户在通勤、驾驶、做家务等场景下无需打字即可高效管理时间。

### 解决的痛点
- 传统日历操作繁琐，需要逐项填写表单
- 驾驶、通勤等场景无法安全操作手机
- 视障人士和老年人难以使用传统日历界面
- 口语化表达无法直接转化为结构化日程

## 技术栈

| 层 | 技术 |
|---|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 6 |
| 状态管理 | Zustand v5 |
| 路由 | React Router v7 |
| 样式 | Tailwind CSS 3 |
| 图标 | Lucide React |
| 日期处理 | date-fns |
| 后端框架 | FastAPI 0.111 |
| ORM | SQLAlchemy 2.0 |
| 数据库 | aioSQLite (异步 SQLite) |
| 认证 | JWT (python-jose) |
| AI 服务 | OpenAI API (ASR / NLP / TTS) |

## 核心功能

### 用户角色

| 角色 | 注册方式 | 核心权限 |
|------|----------|----------|
| 普通用户 | 邮箱注册/登录 | 语音创建、查询、修改、删除日程，管理个人设置 |
| 访客 | 无需注册 | 浏览产品介绍页，了解功能特性 |

### 功能模块

1. **主页面** — 语音交互入口、日历视图、当日日程概览、语音波形动画
2. **日程管理页** — 日程列表、搜索筛选、批量操作
3. **设置页** — API Key 配置、提醒偏好、账户管理

### 语音创建日程流程

\`\`\`
用户点击麦克风 → 开始录音
  → ASR 语音识别为文本
    → NLP 解析提取时间/地点/事件
      → 生成日程预览卡片
        → 用户语音/点击确认
          → 保存日程
            → TTS 语音反馈确认
\`\`\`

### 对话式查询流程

\`\`\`
用户语音提问 → ASR 识别
  → NLP 意图识别（查询类）
    → 检索日程数据
      → TTS 语音播报结果
\`\`\`

### 页面详情

| 页面 | 模块 | 功能描述 |
|------|------|----------|
| 主页面 | 语音交互区 | 点击麦克风按钮开始输入，实时波形动画，识别文本展示，解析结果确认卡片 |
| 主页面 | 日历视图 | 月/周/日三种视图切换，日程标记点，点击日期查看详情 |
| 主页面 | 当日日程概览 | 时间轴展示当日日程，显示时间、标题、地点标签 |
| 主页面 | 智能提醒浮层 | 事件前语音播报提醒，浮层展示提醒内容 |
| 日程管理页 | 日程列表 | 按日期分组展示，支持滑动删除 |
| 日程管理页 | 搜索筛选 | 按关键词、日期范围、标签筛选 |
| 日程管理页 | 批量操作 | 多选日程批量删除、修改 |
| 设置页 | API Key 配置 | 输入并保存 ASR/NLP/TTS 服务的 API Key，加密存储 |
| 设置页 | 提醒偏好 | 设置默认提醒时间，提醒方式（语音/通知） |
| 设置页 | 账户管理 | 修改密码、退出登录 |

## 项目结构

\`\`\`
Vocalendar/
├── src/                      # React 前端
│   ├── components/           # 通用组件
│   ├── pages/                # 页面组件
│   ├── stores/               # Zustand 状态管理
│   ├── hooks/                # 自定义 Hooks
│   └── App.tsx
├── backend/                  # FastAPI 后端
│   ├── app.py                # 主应用
│   ├── models.py             # SQLAlchemy 模型
│   ├── routes/               # API 路由
│   └── requirements.txt
└── package.json
\`\`\`

## API 概览

| 路由 | 方法 | 说明 |
|------|------|------|
| /api/auth/register | POST | 用户注册 |
| /api/auth/login | POST | 用户登录 |
| /api/events | GET/POST | 日程列表/创建 |
| /api/events/{id} | GET/PUT/DELETE | 日程详情/更新/删除 |
| /api/voice/process | POST | 语音处理 (ASR+NLP) |
| /api/voice/tts | POST | 文字转语音 |
| /api/settings/keys | GET/PUT | API Key 管理 |

## 设计风格

| 属性 | 值 |
|------|-----|
| 主色调 | 深靛蓝 #1E3A5F |
| 强调色 | 暖橙 #FF8C42 |
| 风格 | 现代简约，深色主题 |

## 快速开始

### 前端
\`\`\`bash
npm install
npm run dev
# 启动在 http://localhost:5173
\`\`\`

### 后端
\`\`\`bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
# 启动在 http://localhost:8000
\`\`\`

## 适用场景

- **职场精英** — 通勤途中语音安排全天会议和任务
- **驾驶人群** — 无需触碰手机，语音创建和查询日程
- **视障人士/老年人** — 语音优先设计，降低使用门槛`,
    published: "2025-06-05",
    updated: null,
    draft: false,
    password: null,
  },
];

// Add projects to blog.json
const db = readDB();

for (const project of projects) {
  // Check if already exists
  if (db.posts.some((p) => p.slug === project.slug)) {
    console.log(`Skipping existing: ${project.slug}`);
    continue;
  }

  const post = {
    id: project.slug,
    slug: project.slug,
    title: project.title,
    published: project.published,
    updated: project.updated,
    description: project.description,
    tags: project.tags,
    category: project.category,
    image: project.image,
    draft: project.draft,
    pinned: project.pinned,
    password: project.password,
    content: project.content,
  };

  db.posts.unshift(post);
  console.log(`Added: ${project.title}`);
}

writeDB(db);
console.log(`\nDone! Total posts: ${db.posts.length}`);
