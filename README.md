# Preview Images

基于 Electron + Vue 3 + TypeScript 的本地图片预览桌面客户端。

## 功能

- 浏览本地文件夹中的图片
- 瀑布流布局展示
- 多种图片尺寸切换
- 文件夹导航面包屑
- 批量选择图片
- 支持格式：jpg, jpeg, png, gif, bmp, webp, svg

## 技术栈

- **前端**: Vue 3 + TypeScript + Tailwind CSS + Pinia
- **桌面端**: Electron
- **构建工具**: Vite + vite-plugin-electron

## 开发

```bash
# 安装依赖
npm install

# 启动开发模式
npm run dev
```

## 构建

```bash
# 构建生产版本
npm run build
```

## 项目结构

```
preview-images/
├── electron/
│   ├── main.ts          # Electron 主进程
│   └── preload.ts       # 预加载脚本
├── src/
│   ├── components/      # Vue 组件
│   ├── views/           # 页面视图
│   ├── stores/          # Pinia 状态管理
│   ├── types/           # TypeScript 类型定义
│   └── utils/           # 工具函数
├── index.html
├── vite.config.ts
└── package.json
```
