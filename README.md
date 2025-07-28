# Resumind - AI 简历智能分析平台

_Resumind_ 是一个现代化的 AI 简历分析平台，利用大型语言模型（LLM）技术智能评估简历与职位描述的匹配程度，为求职者提供 ATS 评分以及专业、个性化的改进建议。

## ✨ 核心优势

| 功能特性                     | 用户价值                                     |
| ---------------------------- | -------------------------------------------- |
| **🔒 隐私优先架构**          | 所有数据仅在本地存储，无需再担心个人信息泄漏 |
| **🎯 精准匹配分析**          | 深度解析简历与职位描述的契合度，提供量化评分 |
| **💡 智能优化建议**          | 针对每个职位生成定制化的简历改进方案         |
| **🧩 现代响应式设计**        | 简洁美观的 UI，响应式布局适配所有设备        |
| **🔄 OpenAI-Compatible API** | 兼容任何 OpenAI API 标准的本地/云端 LLM 模型 |

## 🚀 在线体验

[https://resumind-taupe.vercel.app](https://resumind-taupe.vercel.app)

⚠️ Demo 实例受成本限制，目前无法稳定提供服务。

如果这个项目对你有价值，欢迎[为我充电](https://space.bilibili.com/281356255)！

## 🛠️ 技术栈

- Next.js
- Tailwind CSS
- TypeScript

## ⚡ 快速开始

按照以下步骤在本地机器上设置项目：

**前置条件**

本地运行支持 OpenAI API 的 LLM（推荐选择之一）：

- [Jan](https://jan.ai/)（跨平台图形界面，Vulkan Runtime 对 AMD 显卡用户友好）
- [Ollama](https://ollama.com/)（跨平台命令行）

**克隆代码仓库**

```bash
git clone https://github.com/jerryshell/resumind.git
cd resumind
```

**安装**

使用 npm 安装项目依赖：

```bash
npm install --legacy-peer-deps
```

_为什么要使用 `--legacy-peer-deps`？这是 OpenAI 上游解决 Zod 4 冲突之前的绕过方法：<https://github.com/openai/openai-node/issues/1576>_

**配置 LLM API**

在项目根目录下创建一个 `.env.local` 文件，并添加以下内容：

```env
# LLM 服务地址，以 Jan 为例
NEXT_LLM_BASE_URL="http://localhost:1337/v1"

# API 密钥
NEXT_LLM_API_KEY=""

# 模型名称，参数量太小的模型可能无法得到良好的结果，建议 8b 及以上
NEXT_LLM_MODEL="Menlo:Jan-nano-128k-gguf:jan-nano-128k-iQ4_XS.gguf"
```

**启动应用**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用！

## 📸 项目截图

<div align="center">
  <img src="./readme.img/1.jpg" width="80%" alt="项目主界面">
  <p><em>项目主界面 - 清晰展示目标职位和匹配评分</em></p>

  <img src="./readme.img/2.jpg" width="80%" alt="简历提交界面">
  <p><em>简历提交界面 - 充分考虑目标职位的要求</em></p>

  <img src="./readme.img/3.jpg" width="80%" alt="详细分析报告">
  <p><em>详细分析报告 - 分项评估简历各维度表现</em></p>
</div>

## 🤝 贡献指南

欢迎通过 Issue 提交功能建议或 Bug 报告，Pull Request 流程：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -am 'Add your feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📜 开源协议

本项目采用 [GNU Affero General Public License v3.0](LICENSE) 开源协议
