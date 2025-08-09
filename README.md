# 电商管理系统（优化版）

## 项目简介

本项目是一个基于 **React + Vite** 的电商/零售管理系统，涵盖了商品展示、购物车、订单管理、用户认证以及后台管理等完整功能。
在原有代码的基础上，我对项目进行了**全方位的性能、架构和安全优化**，包括：

1. **状态管理**
   - 引入 **Redux Toolkit** 替代散落的多个 Context，统一管理用户、购物车、商品等全局状态。
   - 提供 `useSelector` 与 `dispatch` 的简洁 API，提升代码可维护性。

2. **性能优化**
   - 使用 `React.lazy` + `Suspense` 实现组件懒加载，减小首次加载体积。
   - 对列表渲染的商品卡片组件使用 `React.memo`，避免不必要的重渲染。
   - 为图片添加 `loading="lazy"`，提升页面渲染速度。

3. **代码结构优化**
   - 通过 Vite 的别名 (`@components`, `@utils` 等) 简化导入路径。
   - 将公共业务抽离为 **hooks**（如 `useApi`）和 **API Service**，统一请求处理、错误捕获及统一返回格式。

4. **安全与认证**
   - 统一的 `AuthContext` 改为 Redux，实现登录、登出、错误处理以及 token 刷新机制。
   - `RutasProtegidas` 组件加入 `state.from`，在未登录时记录目标路径，登录后可自动跳转。

5. **错误边界**
   - 添加 `ErrorBoundary` 组件，捕获运行时错误并提供友好回退 UI，防止单个错误导致整个应用崩溃。

6. **性能监控**
   - `PerformanceMonitor` 用于测量组件渲染时间、API 请求耗时以及内存使用情况，便于后期调优。

7. **代码分割**
   - 在 `vite.config.js` 中配置 `manualChunks`，将第三方库、核心组件、UI 组件分别打包，实现更细粒度的缓存。

8. **自定义 Hook**
   - `useApi` 抽象了数据获取的生命周期（loading、error、data），在页面中直接使用，提高复用性。

## 技术栈

- **React 18** + **React Router v6**
- **Redux Toolkit** + **React‑Redux**
- **Vite 4**（构建与开发服务器）
- **ESLint**（代码规范）
- **CSS**（模块化样式）

## 项目结构（部分）

```
src/
 ├─ components/          # UI 组件
 ├─ layout/              # 页面布局
 ├─ auth/                # 认证相关（登录、受保护路由）
 ├─ context/             # 旧的 Context（已迁移至 Redux）
 ├─ hooks/               # 自定义 Hook（useApi 等）
 ├─ utils/
 │   ├─ api.js           # 统一 API Service
 │   └─ performance.js   # 性能监控工具
 ├─ store/
 │   ├─ index.js         # Redux store 配置
 │   ├─ authSlice.js
 │   ├─ cartSlice.js
 │   └─ productSlice.js
 └─ main.jsx
public/
 └─ assets/              # 静态资源（图片、json 数据）
```

## 如何运行

```bash
# 克隆仓库
git clone https://github.com/Charly-Cheng/ecommerce-optimized.git
cd ecommerce-optimized

# 安装依赖
npm install

# 开发模式启动
npm run dev

# 构建生产包
npm run build
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 `git checkout -b feature/xxx`
3. 提交代码 `git commit -m "feat: xxx"`
4. 推送分支并发起 Pull Request

## 许可证

本项目采用 MIT 许可证，欢迎自由使用与二次开发。

---

*本 README 为项目的详细中文介绍，已包含所有优化点和使用说明，供开发者快速上手和进一步改进。*
```

