---
title: "Vue 3 完整学习指南"
published: 2026-08-08
category: "学习笔记"
image: "/assets/images/posts/d6.avif"
tags: ["Vue3", "前端", "Pinia", "学习笔记"]
description: "大二上学期学习 Vue 3 的完整笔记，涵盖响应式基础、Composition API、组件通信、Pinia状态管理、Vue Router等核心知识点。"
draft: false
slug: "learning-vue3"
---

## Vue 3 完整学习指南

大二上学期开始接触 Vue 3，这是我学习的第一个前端框架。从最初的 Options API 到后来全面转向 Composition API + script setup，Vue 的渐进式设计让我体会到了框架设计的优雅。

Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型。

### 一、什么是 Vue？

Vue 的两个核心功能：

1. **声明式渲染**：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

2. **响应性**：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

```javascript
import { createApp } from 'vue'

createApp({
  data() {
    return { count: 0 }
  }
}).mount('#app')
```

```html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

预备知识：需要对 HTML、CSS 和 JavaScript 已经基本熟悉。如果你对前端开发完全陌生，最好不要直接从框架入门。

### 二、渐进式框架

Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。根据需求场景，可以用不同方式使用 Vue：

- 无需构建步骤，渐进式增强静态的 HTML
- 在任何页面中作为 Web Components 嵌入
- 单页应用 (SPA)
- 全栈 / 服务端渲染 (SSR)
- Jamstack / 静态站点生成 (SSG)
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

Vue 被称为"渐进式框架"是因为它可与你共同成长、适应不同需求。

### 三、单文件组件 (SFC)

在大多数启用了构建工具的 Vue 项目中，使用 .vue 单文件组件将组件的逻辑 (JS)、模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button { font-weight: bold; }
</style>
```

### 四、API 风格对比

Vue 3 支持两种 API 风格：

**选项式 API (Options API)：** 用 `data`、`methods`、`mounted` 等选项来描述组件逻辑。所有选项定义的属性暴露在 `this` 上。

```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

**组合式 API (Composition API)：** 通过导入 API 函数来描述组件逻辑。通常与 `<script setup>` 搭配使用。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)
function increment() { count.value++ }

onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

**选择建议**：
- 学习阶段：推荐采用更易于自己理解的风格
- 简单场景/不需要构建工具：推荐选项式 API
- 单页应用生产项目：推荐组合式 API + SFC

选项式 API 实际上是在组合式 API 的基础上实现的。

### 五、模板语法

Vue 使用基于 HTML 的模板语法，允许声明式地将 DOM 绑定至底层组件实例的数据。

#### 文本插值

```html
<span>Message: {{ msg }}</span>
```

双大括号会将数据解释为纯文本。使用 `v-once` 指令执行一次性插值。

#### 原始 HTML

```html
<p>Using v-html: <span v-html="rawHtml"></span></p>
```
注意：动态渲染 HTML 可能导致 XSS 攻击，只对可信内容使用 v-html。

#### 属性绑定 (v-bind)

```html
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>           <!-- 简写 -->
<button :disabled="isButtonDisabled">Button</button>

<!-- 动态绑定多个属性 -->
<div v-bind="objectOfAttrs"></div>
<!-- objectOfAttrs = { id: 'container', class: 'wrapper' } -->

<!-- 动态参数 -->
<a v-bind:[attributeName]="url">Link</a>
<a :[attributeName]="url">Link</a>    <!-- 简写 -->
<a @[eventName]="doSomething">        <!-- 动态事件 -->
```

动态参数值的限制：需为字符串或 null。当值为 null 时，绑定被移除。

#### 使用 JavaScript 表达式

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```

**注意**：只支持单一表达式。以下不会生效：
```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 条件控制也不支持 -->
{{ if (ok) { return message } }}
```

#### 修饰符

```html
<form @submit.prevent="onSubmit">...</form>
<a @click.stop="doThis"></a>
<input @keyup.enter="submit" />
<div @click.self="doThat">...</div>
```

### 六、响应式基础

#### ref() 声明响应式状态

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count)        // { value: 0 }
console.log(count.value)  // 0
count.value++             // 1
```

ref() 接收参数，并将其包裹在带有 .value 属性的 ref 对象中。在模板中使用 ref 时，不需要 .value（自动解包）。

#### 为什么需要 ref？

普通变量无法被 Vue 的响应式系统追踪。ref 通过 getter/setter 拦截访问和修改：

```javascript
// 伪代码
const myRef = {
  _value: 0,
  get value() { track(); return this._value; },
  set value(newValue) { this._value = newValue; trigger(); }
}
```

ref 可以传递给函数，同时保留对最新值和响应式连接的访问。

#### reactive()

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
// 模板中
<button @click="state.count++">{{ state.count }}</button>
```

reactive() 返回的是一个原始对象的 Proxy，它和原始对象不相等：

```javascript
const raw = {}
const proxy = reactive(raw)
console.log(proxy === raw) // false
```

#### reactive() 的局限性

1. **有限的值类型**：只能用于对象类型（对象、数组、Map、Set），不能持有 string、number 等原始类型。
2. **不能替换整个对象**：重新赋值会丢失响应性连接。
3. **对解构操作不友好**：解构原始类型属性会失去响应性。

由于这些限制，建议使用 `ref()` 作为声明响应式状态的主要 API。

#### 深层响应性

默认状态是深层响应的。改变嵌套对象或数组时，变化也会被检测到。

```javascript
const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})
obj.value.nested.count++   // 触发更新
obj.value.arr.push('baz')  // 触发更新
```

浅层响应式可优化大型数据性能：`shallowRef()`, `shallowReactive()`。

#### 响应式代理 vs. 原始值

Vue 3 基于 Proxy 实现响应式。与 Vue 2 (Object.defineProperty) 不同：
- 可直接检测数组索引和 length 修改
- 可直接检测对象属性添加和删除
- 需要始终通过代理访问响应式状态

#### DOM 更新时机

DOM 更新不是同步的。Vue 在 "next tick" 更新周期中缓冲所有状态修改。

```javascript
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

### 七、计算属性 (Computed)

计算属性用于描述依赖响应式状态的复杂逻辑。

```javascript
// 选项式 API
export default {
  data() { return { author: { books: [] } } },
  computed: {
    publishedBooksMessage() {
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: ['Vue 2', 'Vue 3', 'Vue 4']
})

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>
```

#### 计算属性缓存 vs 方法

- **计算属性**：基于响应式依赖缓存，依赖不变时不重新计算
- **方法**：每次重渲染都会执行

```javascript
// 这个计算属性永远不会更新（Date.now() 不是响应式依赖）
const now = computed(() => Date.now())
```

#### 可写计算属性

```javascript
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

#### 最佳实践

- Getter 不应有副作用（不要改变其他状态、做异步请求或更改 DOM）
- 避免直接修改计算属性值，应该更新它所依赖的源状态

### 八、Components / Props

Props 用作父组件向子组件传递数据。

#### Props 声明

```javascript
// 字符串数组
defineProps(['foo', 'bar'])

// 对象形式（带校验）
defineProps({
  title: String,
  likes: Number
})
```

#### 传递不同类型的 Props

```html
<!-- Number -->
<BlogPost :likes="42" />

<!-- Boolean -->
<BlogPost is-published />           <!-- 隐式 true -->
<BlogPost :is-published="false" />

<!-- Array -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Object -->
<BlogPost :author="{ name: 'Veronica', company: 'Vue' }" />

<!-- 使用一个对象绑定多个 prop -->
<BlogPost v-bind="post" />
```

#### 单向数据流

Props 遵循单向绑定原则。子组件不应修改 props。

不要直接修改 prop，应该：
1. 用 prop 初始化局部数据属性
2. 基于 prop 定义计算属性

```javascript
// 正确做法1: 使用局部变量
const counter = ref(props.initialCounter)

// 正确做法2: 使用计算属性
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

#### Prop 校验

```javascript
defineProps({
  propA: Number,                          // 基础类型
  propB: [String, Number],                // 多种类型
  propC: { type: String, required: true }, // 必传
  propD: { type: Number, default: 100 },   // 默认值
  propE: {                                 // 对象默认值（工厂函数）
    type: Object,
    default() { return { message: 'hello' } }
  },
  propF: {                                 // 自定义校验
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
```

#### Boolean 类型转换

声明为 Boolean 的 prop 有特殊规则：

```html
<!-- 等同于 :disabled="true" -->
<MyComponent disabled />
<!-- 等同于 :disabled="false" -->
<MyComponent />
```

### 九、生命周期钩子

```
┌──────────────────────────────────────────┐
│  setup() / beforeCreate / created         │
├──────────────────────────────────────────┤
│  onBeforeMount    → 编译模板              │
├──────────────────────────────────────────┤
│  onMounted        → 挂载到 DOM            │
├──────────────────────────────────────────┤
│  onBeforeUpdate   → 数据变化，准备更新     │
├──────────────────────────────────────────┤
│  onUpdated        → DOM 更新完成          │
├──────────────────────────────────────────┤
│  onBeforeUnmount  → 卸载前（清理工作）    │
├──────────────────────────────────────────┤
│  onUnmounted      → 组件卸载完成          │
└──────────────────────────────────────────┘
```

**常用生命周期：**

```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

// 挂载后 — 发起 API 请求、初始化第三方库
onMounted(() => {
  fetchData()
})

// 卸载前 — 清理定时器、事件监听、订阅
let timer
onMounted(() => { timer = setInterval(update, 1000) })
onBeforeUnmount(() => { clearInterval(timer) })
</script>
```

**特殊钩子：**
- `onActivated` / `onDeactivated`：配合 `<KeepAlive>` 使用
- `onErrorCaptured`：捕获后代组件错误
- `onServerPrefetch`：SSR 预取数据

### 十、事件处理

```html
<!-- 内联事件处理器 -->
<button @click="count++">Add 1</button>

<!-- 方法事件处理器 -->
<button @click="greet">Greet</button>

<!-- 传参 -->
<button @click="say('hello')">Say hello</button>
<button @click="say('hello', $event)">Say hello</button>

<!-- 事件修饰符 -->
<a @click.stop="doThis"></a>        <!-- 阻止冒泡 -->
<form @submit.prevent="onSubmit"></form> <!-- 阻止默认 -->
<a @click.stop.prevent="doThat"></a>    <!-- 串联 -->
<div @click.self="doThat">...</div>     <!-- 仅自身触发 -->
<button @click.once="doThis"></button>  <!-- 仅触发一次 -->

<!-- 按键修饰符 -->
<input @keyup.enter="submit" />
<input @keyup.ctrl.enter="submit" />
<!-- 常用按键别名：enter, tab, delete, esc, space, up, down, left, right -->

<!-- 系统修饰符：ctrl, alt, shift, meta -->
<!-- .exact 精确匹配 -->
<button @click.ctrl.exact="onCtrlClick">Ctrl+Click</button>

<!-- 鼠标修饰符：left, right, middle -->
```

### 十一、类与样式绑定

```html
<!-- 对象语法 -->
<div :class="{ active: isActive, 'text-danger': hasError }"></div>

<!-- 数组语法 -->
<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>

<!-- 行内样式绑定 -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="[baseStyles, overridingStyles]"></div>
```

### 十二、条件渲染

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else-if="good">Vue is good</h1>
<h1 v-else>Oh no</h1>

<!-- v-show：始终渲染，只是切换 display CSS -->
<h1 v-show="ok">Hello!</h1>
```

**v-if vs v-show**：v-if 是真正的条件渲染（切换时销毁/重建），v-show 是 CSS 切换。v-if 初始渲染开销小（值为 false 时不渲染），v-show 切换开销小。频繁切换用 v-show，条件很少改变用 v-if。

### 十三、列表渲染

```html
<!-- v-for 遍历数组 -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index }} - {{ item.message }}
</li>

<!-- v-for 遍历对象 -->
<li v-for="(value, key, index) in myObject" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</li>

<!-- v-for 遍历数字 -->
<span v-for="n in 10" :key="n">{{ n }}</span>

<!-- 在 template 上使用 -->
<template v-for="item in items" :key="item.id">
  <li>{{ item.name }}</li>
  <li class="divider"></li>
</template>
```

**key 的重要性**：key 帮助 Vue 跟踪节点身份，在数据变化时高效重用和重排元素。如果没有 key，Vue 使用"就地更新"策略，可能导致状态错乱。

### 十四、Pinia 状态管理

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({ count: 0, name: 'Counter' }),

  // Getters (类似计算属性)
  getters: {
    doubleCount: (state) => state.count * 2,
    doublePlusOne: (state) => state.count * 2 + 1
  },

  // Actions (可异步)
  actions: {
    increment() { this.count++ },
    async fetchData() {
      const data = await api.get()
      this.count = data.count
    }
  }
})
```

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
// 直接访问和修改
counter.count++
counter.$patch({ count: counter.count + 1 })
// 或调用 action
counter.increment()

// 解构需要 storeToRefs 保持响应性
import { storeToRefs } from 'pinia'
const { count, doubleCount } = storeToRefs(counter)
</script>
```

### 十五、Vue Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('@/views/Post.vue'),
    props: true  // 将路由参数作为 props 传入
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { top: 0 }
  }
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) next('/login')
  else next()
})

export default router
```

```vue
<template>
  <!-- 声明式导航 -->
  <router-link to="/">Home</router-link>
  <router-link :to="{ name: 'Post', params: { id: 123 } }">Post</router-link>

  <!-- 命名视图 -->
  <router-view />
  <router-view name="sidebar" />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 编程式导航
router.push('/')
router.push({ name: 'Post', params: { id: 123 } })
router.replace('/')

// 路由参数
console.log(route.params.id)
console.log(route.query.search)
</script>
```

### 十六、常用组合式函数

```javascript
// watch：侦听响应式数据源变化
import { watch } from 'vue'

// 侦听 ref
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
})

// 侦听 getter 函数
watch(() => props.id, (newId) => { fetchData(newId) })

// 侦听多个源
watch([fooRef, barRef], ([newFoo, newBar], [oldFoo, oldBar]) => {
  // ...
})

// 立即执行 + 深层侦听
watch(source, callback, { immediate: true, deep: true })

// watchEffect：自动追踪依赖
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log(`Count is ${count.value}`)
  // 自动追踪 count.value，变化时重新执行
})

// 停止侦听
const stop = watch(source, callback)
// 组件卸载时自动停止，也可手动停止
stop()
```

### 十七、组件通信方式总结

| 方式 | 说明 | 适用场景 |
|------|------|---------|
| Props | 父→子数据传递 | 单向数据流 |
| Emits | 子→父事件通知 | 子通知父 |
| Provide/Inject | 祖先→后代 | 深层次传递 |
| Pinia | 全局状态 | 跨组件共享 |
| v-model | 双向绑定 | 表单组件 |
| ref template | 父访问子实例 | 直接操作 |
| Mitt/eventBus | 事件总线 | 任意组件 |

### 学习心得

从零开始学 Vue 3，最深的体会是：Composition API 的灵活性远超 Options API。把组件的逻辑按"业务关注点"用组合式函数组织，而不是按"选项种类"分散在 data/methods/computed 里，这让代码的可维护性和复用性都有了质的飞跃。建议初学者先理解 Options API 的概念，然后尽快过渡到 Composition API。