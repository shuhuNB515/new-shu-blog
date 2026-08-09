---
title: "Python 算法竞赛刷题笔记"
published: 2026-08-08
category: "学习笔记"
image: "/assets/images/posts/d2.avif"
tags: ["Python", "算法", "竞赛", "学习笔记"]
description: "大二开始刷算法题的完整笔记，涵盖二分查找、贪心、单调栈/队列、搜索剪枝、动态规划、线段树/BIT/并查集/Trie、图论、数学等算法竞赛核心内容。"
draft: false
slug: "learning-algorithm"
---

## Python 算法竞赛完整笔记

大二开始刷算法，目标是蓝桥杯和各类 OJ 比赛。从最基础的二分查找到复杂的最短路径、网络流，算法世界打开了编程的另一扇门。算法不是死记硬背——理解背后的思想比记住代码重要一万倍。

### 复杂度速查表

| 数据规模 n | 可行复杂度 | 常见算法 |
|-----------|-----------|----------|
| n <= 10 | O(n!) | 全排列、暴力枚举 |
| n <= 20 | O(2^n) | 状态压缩 DP、子集枚举 |
| n <= 100 | O(n^3) | Floyd、区间 DP |
| n <= 500 | O(n^3) | 三重循环 DP |
| n <= 2000 | O(n^2) | 简单 DP、暴力匹配 |
| n <= 10^5 | O(n log n) | 排序、二分、线段树、Dijkstra |
| n <= 10^6 | O(n) | 线性 DP、前缀和、尺取法 |
| n <= 10^12 | O(sqrt(n)) | 质因数分解、试除法 |
| n > 10^12 | O(log n) | 快速幂、矩阵快速幂、二分答案 |

### Python 竞赛快读模板

```python
import sys
input = sys.stdin.readline  # 快读，比 input() 快 10 倍

def ii(): return int(input())
def mi(): return map(int, input().split())
def li(): return list(map(int, input().split()))

sys.setrecursionlimit(10**6)  # 递归深度

INF = 10**18                  # 无穷大
MOD = 10**9 + 7               # 常用模数（质数）

from collections import defaultdict, deque, Counter
from heapq import heappush, heappop, heapify
from itertools import accumulate, combinations, permutations, product
from bisect import bisect_left, bisect_right
from math import gcd, lcm, sqrt, ceil, floor, comb, factorial
```

---

## 第一阶段：基础算法 (Day 1-6)

### Day 1 — 二分查找与二分答案

核心思想：利用「单调性」不断缩小搜索范围，时间复杂度 O(log n)。

```python
# 经典二分查找
def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1

# bisect 库（推荐直接用）
import bisect
pos = bisect.bisect_left(arr, target)   # 左边界，>= target 的第一个位置
pos = bisect.bisect_right(arr, target)  # 右边界，> target 的第一个位置
# 计数：bisect_right - bisect_left = target 的出现次数
```

**三个经典变体：**

```python
# 1. 查找左边界 — 第一个 >= target 的位置
def lower_bound(arr, target):
    l, r = 0, len(arr)
    while l < r:
        mid = (l + r) // 2
        if arr[mid] >= target:
            r = mid
        else:
            l = mid + 1
    return l

# 2. 查找右边界 — 最后一个 <= target 的位置
def upper_bound(arr, target):
    l, r = 0, len(arr)
    while l < r:
        mid = (l + r) // 2
        if arr[mid] > target:
            r = mid
        else:
            l = mid + 1
    return l - 1

# 3. 浮点数二分（固定迭代次数，避免精度问题）
def binary_search_float():
    l, r = 0.0, 1e18
    for _ in range(100):  # 100 次精度 = 1e-30
        mid = (l + r) / 2
        if check(mid):
            l = mid
        else:
            r = mid
    return l
```

**二分答案模式：** 当问题具有单调性时，二分答案 + O(n) check 验证。典型问题：「最大值最小化」、「最小值最大化」、「第 k 小/大」。

```python
# 典型例题：最小化最大间距
def can_place(arr, dist, k):
    """是否能在距离 >= dist 的情况下放置 k 个元素"""
    count, last = 1, arr[0]
    for x in arr:
        if x - last >= dist:
            count += 1
            last = x
    return count >= k
```

### Day 2 — 贪心算法

核心思想：局部最优 → 全局最优。需要归纳法或交换论证证明正确性。

```python
# 活动选择：选择最多的不重叠区间
def max_activities(intervals):
    intervals.sort(key=lambda x: x[1])  # 按结束时间排序
    count, last_end = 0, -float('inf')
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count

# 合并区间
def merge_intervals(intervals):
    intervals.sort()
    res = [[intervals[0][0], intervals[0][1]]]
    for s, e in intervals[1:]:
        if s <= res[-1][1]:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res

# 区间覆盖：最少区间覆盖一条线段
def min_cover(intervals, target_end):
    """选择最少的区间覆盖 [0, target_end]"""
    intervals.sort()  # 按左端点排序
    count, i, cur_end, n = 0, 0, 0, len(intervals)
    while cur_end < target_end:
        max_reach = cur_end
        while i < n and intervals[i][0] <= cur_end:
            max_reach = max(max_reach, intervals[i][1])
            i += 1
        if max_reach == cur_end:
            return -1  # 无法覆盖
        cur_end = max_reach
        count += 1
    return count
```

贪心 vs DP：贪心无法处理「后效性」问题。0-1 背包贪心失效（取单位价值最高的不一定最优），必须用 DP。

### Day 3 — 单调栈与单调队列

**单调栈：** 在 O(n) 时间内解决「下一个更大/更小元素」问题。

```python
# 下一个更大元素
def next_greater(nums):
    n = len(nums)
    res = [-1] * n
    stack = []
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            res[stack.pop()] = nums[i]
        stack.append(i)
    return res

# 每日温度（经典面试题）
def daily_temperatures(T):
    n = len(T)
    res = [0] * n
    stack = []
    for i in range(n):
        while stack and T[stack[-1]] < T[i]:
            idx = stack.pop()
            res[idx] = i - idx
        stack.append(i)
    return res

# 柱状图中的最大矩形
def largest_rectangle(heights):
    heights = [0] + heights + [0]
    stack, res = [], 0
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            cur_h = heights[stack.pop()]
            cur_w = i - stack[-1] - 1
            res = max(res, cur_h * cur_w)
        stack.append(i)
    return res
```

**单调队列（滑动窗口最大值）：**

```python
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # 存储索引，保持递减
    res = []
    for i, v in enumerate(nums):
        # 移除越界元素
        if dq and dq[0] <= i - k:
            dq.popleft()
        # 维护递减
        while dq and nums[dq[-1]] <= v:
            dq.pop()
        dq.append(i)
        # 记录结果
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res

# 也可以用 heapq（懒删除）
import heapq
def max_sliding_window_heap(nums, k):
    # 存储 (-value, index)
    heap, res = [], []
    for i, v in enumerate(nums):
        heapq.heappush(heap, (-v, i))
        while heap[0][1] <= i - k:
            heapq.heappop(heap)
        if i >= k - 1:
            res.append(-heap[0][0])
    return res
```

### Day 4-6 — DFS/BFS 与搜索剪枝

**DFS (深度优先)：** 递归/栈实现，适合路径问题、排列组合。

```python
# DFS 模板（排列问题）
def dfs(path, used, nums, res):
    if len(path) == len(nums):
        res.append(path[:])
        return
    for i in range(len(nums)):
        if used[i]:
            continue
        if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
            continue  # 去重
        used[i] = True
        path.append(nums[i])
        dfs(path, used, nums, res)
        path.pop()
        used[i] = False
```

**BFS (广度优先)：** 队列实现，适合最短路径、层序遍历。

```python
# BFS 模板（迷宫最短路径）
from collections import deque

def bfs_shortest_path(grid, start, end):
    m, n = len(grid), len(grid[0])
    q = deque([(start[0], start[1], 0)])
    visited = [[False] * n for _ in range(m)]
    visited[start[0]][start[1]] = True
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while q:
        x, y, dist = q.popleft()
        if (x, y) == end:
            return dist
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n and not visited[nx][ny] and grid[nx][ny] != '#':
                visited[nx][ny] = True
                q.append((nx, ny, dist + 1))
    return -1
```

**剪枝策略：**
- **可行性剪枝：** 当前状态不可能达到目标 → 提前返回
- **最优性剪枝：** 当前代价 >= 已知最优解 → 提前返回
- **记忆化搜索：** 缓存已计算的状态（DFS + memo = DP）
- **启发式搜索 (A\*)：** 优先扩展 f = g + h 最小的节点

```python
# 记忆化搜索（斐波那契）
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]

# 也可以用 Python 内置
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n < 2:
        return n
    return fib_cached(n-1) + fib_cached(n-2)
```

---

## 第二阶段：动态规划 (Day 7-12)

DP 核心三要素：状态定义、状态转移方程、初始条件和边界。

### 线性 DP

```python
# 最长上升子序列 (LIS)
# O(n^2) 版本
def LIS_n2(nums):
    n = len(nums)
    dp = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# O(n log n) 贪心+二分
def LIS_nlogn(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

# 最长公共子序列 (LCS)
def LCS(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# 编辑距离
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n+1) for _ in range(m+1)]
    for i in range(m+1):
        dp[i][0] = i
    for j in range(n+1):
        dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

# 最大子数组和 (Kadane's Algorithm)
def max_subarray(nums):
    cur_max = global_max = nums[0]
    for x in nums[1:]:
        cur_max = max(x, cur_max + x)
        global_max = max(global_max, cur_max)
    return global_max
```

### 背包 DP

```python
# 0-1 背包 — 每个物品最多选一次
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        for j in range(capacity, weights[i] - 1, -1):  # 逆序遍历！
            dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
    return dp[capacity]

# 完全背包 — 每个物品可选无限次
def knapsack_unbounded(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        for j in range(weights[i], capacity + 1):  # 正序遍历
            dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
    return dp[capacity]

# 多重背包 — 每个物品有数量限制，用二进制拆分优化
def knapsack_multiple(weights, values, counts, capacity):
    items = []
    for w, v, c in zip(weights, values, counts):
        k = 1
        while c >= k:
            items.append((w * k, v * k))
            c -= k
            k <<= 1
        if c:
            items.append((w * c, v * c))

    dp = [0] * (capacity + 1)
    for w, v in items:
        for j in range(capacity, w - 1, -1):
            dp[j] = max(dp[j], dp[j - w] + v)
    return dp[capacity]
```

### 区间 DP

```python
# 石子合并（最小代价）
def merge_stones(stones):
    n = len(stones)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + stones[i]

    dp = [[0] * n for _ in range(n)]
    for length in range(2, n+1):  # 枚举区间长度
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + prefix[j+1] - prefix[i]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n-1]
```

### 树形 DP

```python
# 树的最大独立集（没有上司的舞会）
def max_independent_set(edges, values, n):
    # edges: 邻接表；values: 节点权值
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # dp[u][0] = 不选 u 的最大值，dp[u][1] = 选 u 的最大值
    dp = [[0, 0] for _ in range(n)]

    def dfs(u, parent):
        dp[u][1] = values[u]  # 选 u
        for v in graph[u]:
            if v == parent:
                continue
            dfs(v, u)
            dp[u][0] += max(dp[v][0], dp[v][1])
            dp[u][1] += dp[v][0]

    dfs(0, -1)
    return max(dp[0][0], dp[0][1])
```

### 状态压缩 DP

```python
# 旅行商问题 (TSP)
def tsp(dist, n):
    # dp[mask][i] = 经过 mask 集合、当前在 i 的最短距离
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # 从城市 0 出发

    for mask in range(1 << n):
        for i in range(n):
            if not (mask >> i) & 1:
                continue
            for j in range(n):
                if (mask >> j) & 1:
                    continue
                new_mask = mask | (1 << j)
                dp[new_mask][j] = min(dp[new_mask][j], dp[mask][i] + dist[i][j])

    return min(dp[(1 << n) - 1][i] + dist[i][0] for i in range(n))
```

---

## 第三阶段：数据结构 (Day 13-18)

### 前缀和与差分

```python
# 前缀和 — 区间和 O(1)
def prefix_sum(arr):
    n = len(arr)
    pref = [0] * (n + 1)
    for i in range(n):
        pref[i+1] = pref[i] + arr[i]

    # 查询 [l, r] 和 = pref[r+1] - pref[l]

# 二维前缀和
def prefix_sum_2d(matrix):
    m, n = len(matrix), len(matrix[0])
    pref = [[0] * (n+1) for _ in range(m+1)]
    for i in range(m):
        for j in range(n):
            pref[i+1][j+1] = pref[i][j+1] + pref[i+1][j] - pref[i][j] + matrix[i][j]
    # 查询 (r1,c1)-(r2,c2) 和 = pref[r2+1][c2+1] - pref[r2+1][c1] - pref[r1][c2+1] + pref[r1][c1]

# 差分 — 区间修改 O(1)
def difference(arr, updates):
    n = len(arr)
    diff = [0] * (n + 2)
    for l, r, val in updates:
        diff[l] += val
        diff[r+1] -= val
    # 求前缀和还原
    for i in range(1, n):
        diff[i] += diff[i-1]
    return [arr[i] + diff[i] for i in range(n)]
```

### 线段树 (Segment Tree)

区间查询 O(log n)，支持单点/区间修改。

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self._build(arr, node*2, start, mid)
        self._build(arr, node*2+1, mid+1, end)
        self.tree[node] = self.tree[node*2] + self.tree[node*2+1]

    def update(self, idx, val, node=1, start=None, end=None):
        if start is None:
            start, end = 0, self.n - 1
        if start == end:
            self.tree[node] = val
            return
        mid = (start + end) // 2
        if idx <= mid:
            self.update(idx, val, node*2, start, mid)
        else:
            self.update(idx, val, node*2+1, mid+1, end)
        self.tree[node] = self.tree[node*2] + self.tree[node*2+1]

    def query(self, l, r, node=1, start=None, end=None):
        if start is None:
            start, end = 0, self.n - 1
        if r < start or l > end:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return self.query(l, r, node*2, start, mid) + self.query(l, r, node*2+1, mid+1, end)
```

### 树状数组 (Fenwick Tree / BIT)

比线段树轻量，支持单点修改 + 区间求和。`lowbit(x) = x & -x`。

```python
class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def lowbit(self, x):
        return x & -x

    def add(self, idx, val):
        """下标从 1 开始"""
        while idx <= self.n:
            self.tree[idx] += val
            idx += self.lowbit(idx)

    def sum(self, idx):
        """前缀和 [1, idx]"""
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= self.lowbit(idx)
        return res

    def range_sum(self, l, r):
        """区间和 [l, r]"""
        return self.sum(r) - self.sum(l-1)
```

### 并查集 (DSU / Union-Find)

路径压缩 + 按秩合并，近乎 O(1) 的合并与查找。

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.size = [1] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # 路径压缩
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        # 按秩合并
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        self.size[px] += self.size[py]
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

    def is_same(self, x, y):
        return self.find(x) == self.find(y)

    def get_size(self, x):
        return self.size[self.find(x)]
```

### ST 表 (Sparse Table)

O(n log n) 预处理，O(1) 查询区间最值（静态数组）。

```python
class SparseTable:
    def __init__(self, arr):
        self.n = len(arr)
        self.log = [0] * (self.n + 1)
        for i in range(2, self.n + 1):
            self.log[i] = self.log[i // 2] + 1

        k = self.log[self.n] + 1
        self.st = [[0] * k for _ in range(self.n)]
        for i in range(self.n):
            self.st[i][0] = arr[i]

        for j in range(1, k):
            for i in range(self.n - (1 << j) + 1):
                self.st[i][j] = max(self.st[i][j-1], self.st[i + (1 << (j-1))][j-1])

    def query(self, l, r):
        j = self.log[r - l + 1]
        return max(self.st[l][j], self.st[r - (1 << j) + 1][j])
```

### Trie (字典树)

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0  # 经过此节点的单词数

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
            node.count += 1
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._find(prefix) is not None

    def _find(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

---

## 第四阶段：图论 (Day 19-24)

### 最短路径

```python
# Dijkstra — 非负权图，O((V+E) log V)
def dijkstra(graph, start, n):
    # graph: 邻接表 [(next, weight), ...]
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue  # 过时数据
        for v, w in graph[u]:
            if dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist

# Bellman-Ford — 可处理负权边，检测负环，O(VE)
def bellman_ford(edges, start, n):
    dist = [float('inf')] * n
    dist[start] = 0
    for _ in range(n - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break
    # 第 n 轮仍能更新 → 存在负环
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[v] > dist[u] + w:
            return None  # 负环存在
    return dist

# Floyd-Warshall — 全源最短路径，O(V^3)
def floyd(graph, n):
    # graph: 邻接矩阵，graph[i][j] = 权重, or INF
    dist = [row[:] for row in graph]
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist
```

### 最小生成树 (MST)

```python
# Kruskal — O(E log E)，基于并查集
def kruskal(edges, n):
    # edges: [(w, u, v), ...]
    edges.sort()
    dsu = DSU(n)
    mst_weight = 0
    for w, u, v in edges:
        if dsu.union(u, v):
            mst_weight += w
    return mst_weight

# Prim — O((V+E) log V)，基于优先队列
def prim(graph, n):
    # graph: 邻接表 [(next, weight), ...]
    visited = [False] * n
    pq = [(0, 0)]
    mst_weight = 0
    edges_used = 0

    while pq and edges_used < n:
        w, u = heapq.heappop(pq)
        if visited[u]:
            continue
        visited[u] = True
        mst_weight += w
        edges_used += 1
        for v, weight in graph[u]:
            if not visited[v]:
                heapq.heappush(pq, (weight, v))
    return mst_weight
```

### 拓扑排序

```python
# Kahn 算法 — BFS + 入度
def topological_sort(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    q = deque([i for i in range(n) if indegree[i] == 0])
    res = []
    while q:
        u = q.popleft()
        res.append(u)
        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)

    return res if len(res) == n else []  # 有环返回空
```

### LCA (最近公共祖先)

```python
# 倍增法 LCA — O(n log n) 预处理，O(log n) 查询
class LCA:
    def __init__(self, n, edges, root=0):
        self.n = n
        self.log_n = n.bit_length()
        self.graph = [[] for _ in range(n)]
        for u, v in edges:
            self.graph[u].append(v)
            self.graph[v].append(u)

        self.depth = [0] * n
        self.parent = [[-1] * self.log_n for _ in range(n)]
        self._dfs(root, -1, 0)

        for j in range(1, self.log_n):
            for i in range(n):
                if self.parent[i][j-1] != -1:
                    self.parent[i][j] = self.parent[self.parent[i][j-1]][j-1]

    def _dfs(self, u, p, d):
        self.depth[u] = d
        self.parent[u][0] = p
        for v in self.graph[u]:
            if v != p:
                self._dfs(v, u, d + 1)

    def query(self, u, v):
        if self.depth[u] < self.depth[v]:
            u, v = v, u
        # 抬升 u 到 v 同一深度
        diff = self.depth[u] - self.depth[v]
        for j in range(self.log_n):
            if diff >> j & 1:
                u = self.parent[u][j]
        if u == v:
            return u
        # 同时上跳
        for j in range(self.log_n - 1, -1, -1):
            if self.parent[u][j] != self.parent[v][j]:
                u = self.parent[u][j]
                v = self.parent[v][j]
        return self.parent[u][0]
```

---

## 第五阶段：数学 (Day 25-30)

### 快速幂与逆元

```python
# 快速幂 — a^b mod m
def fast_pow(a, b, m):
    res = 1
    while b:
        if b & 1:
            res = res * a % m
        a = a * a % m
        b >>= 1
    return res

# 直接用 Python 内置
pow(a, b, m)  # a^b mod m，高效！

# 逆元 — mod 为质数用费马小定理
def mod_inv(a, mod):
    """a 在模 mod 下的乘法逆元（mod 为质数）"""
    return pow(a, mod - 2, mod)

# 扩展欧几里得求逆元（任意模数，条件是 gcd(a, m) = 1）
def exgcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = exgcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

def mod_inv_exgcd(a, mod):
    g, x, _ = exgcd(a, mod)
    if g != 1:
        return None  # 逆元不存在
    return x % mod
```

### 筛法求素数

```python
# 埃拉托斯特尼筛法 — O(n log log n)
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]

# 欧拉线性筛 — O(n)，顺手求出最小质因子
def linear_sieve(n):
    primes = []
    min_prime = [0] * (n + 1)
    for i in range(2, n + 1):
        if min_prime[i] == 0:
            min_prime[i] = i
            primes.append(i)
        for p in primes:
            if p * i > n or p > min_prime[i]:
                break
            min_prime[p * i] = p
    return primes, min_prime
```

### 组合数

```python
# 预处理阶乘 + 逆元 — O(1) 查询
def preprocess_comb(n_max, mod=10**9+7):
    fact = [1] * (n_max + 1)
    inv_fact = [1] * (n_max + 1)
    for i in range(1, n_max + 1):
        fact[i] = fact[i-1] * i % mod
    inv_fact[n_max] = pow(fact[n_max], mod-2, mod)
    for i in range(n_max, 0, -1):
        inv_fact[i-1] = inv_fact[i] * i % mod

    def C(n, k):
        if k < 0 or k > n:
            return 0
        return fact[n] * inv_fact[k] % mod * inv_fact[n-k] % mod

    return C

# 卢卡斯定理 — n,m 很大但 mod 是质数时使用
def lucas(n, m, mod):
    def C_small(n, m):
        if m > n:
            return 0
        up, down = 1, 1
        for i in range(m):
            up = up * (n - i) % mod
            down = down * (i + 1) % mod
        return up * pow(down, mod-2, mod) % mod

    if m == 0:
        return 1
    return lucas(n//mod, m//mod, mod) * C_small(n%mod, m%mod) % mod
```

### 数论杂项

```python
from math import gcd, lcm

# 欧拉函数 φ(n) — 小于 n 且与 n 互质的正整数个数
def euler_phi(n):
    res = n
    i = 2
    while i * i <= n:
        if n % i == 0:
            res = res // i * (i - 1)
            while n % i == 0:
                n //= i
        i += 1
    if n > 1:
        res = res // n * (n - 1)
    return res

# 线性筛求欧拉函数
def euler_phi_range(n):
    phi = list(range(n + 1))
    primes = []
    is_prime = [True] * (n + 1)
    for i in range(2, n + 1):
        if is_prime[i]:
            primes.append(i)
            phi[i] = i - 1
        for p in primes:
            if i * p > n:
                break
            is_prime[i * p] = False
            if i % p == 0:
                phi[i * p] = phi[i] * p
                break
            else:
                phi[i * p] = phi[i] * (p - 1)
    return phi

# 中国剩余定理 (CRT)
def exgcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = exgcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

def crt(remainders, moduli):
    """余数数组和模数数组，模数两两互质"""
    M = 1
    for m in moduli:
        M *= m
    res = 0
    for r, m in zip(remainders, moduli):
        Mi = M // m
        _, inv, _ = exgcd(Mi, m)
        res = (res + r * Mi * inv) % M
    return res
```

---

## 常见题型与模板

| 题型 | 关键词 / 方法 | 复杂度 |
|------|-------------|--------|
| 区间和查询 | 前缀和 / 线段树 / BIT | O(1) / O(log n) |
| 区间最值 | ST 表(静态) / 线段树(动态) | O(1) / O(log n) |
| 区间修改 | 差分数组 / 线段树(lazy tag) | O(1) / O(log n) |
| 排序 | Python `sort()` — Timsort 算法 | O(n log n) |
| 第 K 大/小 | 快速选择 / 堆 / 排序 | O(n) / O(n log k) |
| 最短路径 | BFS(无权) / Dijkstra / SPFA | O(V+E) / O(E log V) |
| 负权图 / 负环 | Bellman-Ford / SPFA | O(VE) |
| 全源最短路径 | Floyd | O(V^3) |
| 最小生成树 | Kruskal / Prim | O(E log E) |
| 连通分量 | BFS / DFS / DSU | O(V+E) |
| 强连通分量 | Tarjan / Kosaraju | O(V+E) |
| 拓扑排序 | Kahn 算法 | O(V+E) |
| 最大流 | Dinic | O(V^2 E) |
| 二分图匹配 | 匈牙利算法 / 最大流 | O(VE) |
| LCA | 倍增法 / Tarjan 离线 | O(log n) / O(n+m) |
| 字符串匹配 | KMP / 哈希 / Z-function | O(n+m) |
| 最长回文子串 | Manacher | O(n) |
| 数位 DP | 记忆化搜索 | O(10 * 位数) |
| 博弈论 | SG 函数 / Nim | O(状态数) |

学习算法最大的体会：先理解为什么，再想怎么写。手算几个简单例子理解算法流程，然后再写代码——这样远比死记模板高效。算法的本质不是代码，是思想。