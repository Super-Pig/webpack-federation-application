# 一个基于 webpack federation 的微前端实现方案

## 概述

当前案例中包含三个微应用

1. Marketing: 营销微应用，包含首页组件和价格组件
2. Authentication: 身份验证微应用，包含登录组件
3. Dashboard: 仪表盘微应用，包含仪表盘组件

容器应用、营销应用、身份验证应用使用 React 框架，仪表盘应用使用 Vue 框架

## 路由配置

容器应用使用 BrowserHistory 路由，微应用使用 MemoryHistory 路由

1. 为防止容器应用和微应用同时操作 url 而产生冲突，在为前端架构中，只允许容器应用更新 url，微应用不允许更新 url，MemoryHistory 是基于内存的路由，不会改变浏览器地址栏中的 url

2. 如果不同的应用程序需要传达有关路由的相关信息，应该尽可能的使用通用的方式，memoryHistory 在 React 和 Vue 中都有提供

### 使用 plop 生成微应用模板

```
npm run plop
```