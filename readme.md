# 旅游小程序（uni-app + Vue3）

这是一个基于 **uni-app + Vue3 + TypeScript** 的旅游小程序，包含首页景点瀑布流、详情页、收藏页、个人中心登录以及地图定位等完整流程。

## 项目特性

- 首页
- 轮播图（`/api/user/getBanner`）
- 景点瀑布流列表（`/api/user/getHomeList`）
- 下拉到底部后追加模拟数据
- 滚动超过阈值显示“回到顶部”按钮

- 景点详情
- 展示景点基础信息（名称、简介、开放时间）
- 游玩推荐项目（`/api/detail/project`）
- 点击推荐项目跳转定位页

- 定位页
- 地图组件展示坐标和 marker
- 推荐指数 + 横向滚动推荐内容（`/api/project/info?id=xxx`）

- 收藏页
- 复用景点卡片组件展示收藏列表（`/api/like/list`）

- 个人中心
- `uni.login` 登录后请求 token（`/api/login`）
- 拉取用户信息（`/api/getUserInfo`）
- 支持头像和昵称更新（本地存储）

## 技术栈

- `uni-app`（跨端框架）
- `Vue 3` + `TypeScript`
- `Vite`
- `Pinia` + `pinia-plugin-persistedstate`
- `uview-plus` + `uni-ui`

## 目录结构

```text
travel-mini-program/
├─ src/
│  ├─ pages/                # 页面（首页/收藏/个人中心/详情/定位）
│  ├─ components/           # 公共组件（AttractionList）
│  ├─ composables/          # 业务组合式函数（banner、景点、登录、定位等）
│  ├─ services/http.ts      # 请求封装
│  ├─ stores/index.ts       # Pinia 注册
│  ├─ pages.json            # 路由与 tabBar
│  └─ manifest.json         # uni-app 平台配置
├─ package.json
└─ readme.md
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
# H5
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin
```

### 3. 生产打包

```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin
```

## 脚本说明

`package.json` 中已提供多端命令，常用包括：

- `dev:h5` / `build:h5`
- `dev:mp-weixin` / `build:mp-weixin`
- `dev:mp-alipay` / `build:mp-alipay`
- `type-check`

## 接口与数据来源

项目默认请求地址见 `src/services/http.ts`：

- `baseURL`: `https://m1.apifoxmock.com/m1/4728220-0-default`

当前示例数据来自 mock 接口，适合用于功能演示与前端联调。

## 状态与缓存

- token 存储：`uni.setStorageSync('token', ...)`
- 用户信息缓存：`uni.setStorageSync('userInfo', ...)`
- 请求头自动携带 `token`

## 注意事项

- 本项目为示例项目，部分文案/数据为演示用途。
- 若切换为真实后端，请优先替换 `src/services/http.ts` 中 `baseURL`，并统一接口返回结构。
