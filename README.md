# yylx.io 

yylx.io 是面向开发者和 AI 工具用户的 API 中转服务。你可以通过统一的 API Key 和兼容接口，将模型能力接入 Claude Code、Codex、Cursor、Cherry Studio 等常用工具，适合需要在多个 AI 客户端、代码工具或自动化工作流中复用同一套模型资源的用户。

> [!TIP]
> 建议为每个客户端单独创建 API Key。这样既方便统计消耗，也方便在某个工具配置泄露时单独禁用。

## 适合谁使用

| 用户 | 典型需求 |
| --- | --- |
| 开发者 | 在 Codex、Claude Code、Cursor 等工具中接入模型 |
| AI 工具用户 | 在 Cherry Studio 等客户端中统一管理模型 |
| 小团队 | 为成员提供统一的 Key、额度和模型入口 |
| 运维用户 | 需要关注可用性、余额、倍率和请求错误 |

## 快速开始

1. 在 yylx.io 控制台创建 API Key。
2. 选择要使用的客户端或工具。
3. 按对应页面填写 Base URL、API Key 和模型名称。
4. 发送一次测试请求，确认配置生效。

## 常用信息

yylx.io 以兼容接口为主。大多数支持 OpenAI 兼容接口的工具，只需要填写下面这几类信息：

| 项目 | 说明 |
| --- | --- |
| OpenAI 兼容地址 | `https://api.yylx.io/v1` |
| Anthropic 兼容地址 | `https://app.yylx.io/v1/messages` |
| API Key | 在控制台创建，区分平台，格式以控制台展示为准（如 `sk-...`） |
| Model | 控制台模型列表中的模型名称 |
| 模型列表 | [https://app.yylx.io/model/pricing](https://app.yylx.io/model/pricing) |
| 服务状态 | 查看控制台公告或独立状态页 |

## 推荐使用 CC Switch 来导入配置

CC Switch 是一个跨平台的 AI CLI 配置管理工具，可用于集中管理 Claude Code、Codex、Gemini CLI、OpenCode 等工具的模型提供商（Provider）配置。它把 Base URL、API Key、模型名称等信息统一保存，让你在多个 CLI 工具或多套 Provider 之间一键切换，避免反复修改环境变量或配置文件。

下载安装、一键导入与手动配置的详细步骤见 [导入到 CC Switch](access/cc-switch.md)。

## 推荐路径

第一次使用时，建议按这个顺序阅读：

1. [创建 API Key](access/create-api-key.md)
2. [接入概览](access/overview.md)
3. 选择你的客户端接入页面
