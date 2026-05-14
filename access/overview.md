# 接入概览

yylx.io 的接入信息通常由三部分组成：Base URL、API Key 和模型名称。

> [!INFO]
> 不同客户端对字段命名可能不同，例如 API 地址、Base URL、Endpoint、接口地址通常表达的是同一类配置。

## OpenAI 兼容接入

大多数客户端使用 OpenAI 兼容配置：

| 字段 | 填写内容 |
| --- | --- |
| Base URL | `https://api.yylx.io/v1` |
| API Key | 控制台创建的 API Key |
| Model | 控制台模型列表中的模型名称 |

不要把 Base URL 写成完整接口路径。例如不要填写 `https://api.yylx.io/v1/chat/completions`。

适合使用 OpenAI 兼容接入的工具包括 Codex、Cursor、Cherry Studio，以及其他支持自定义 OpenAI Provider 的客户端。具体配置入口可能叫做 API Address、Endpoint、Override Base URL 或 Provider URL，本质上都填写同一个地址。

### 快速连通性测试

```bash
curl https://api.yylx.io/v1/models \
  -H "Authorization: Bearer sk-your-api-key"
```

如果返回模型列表，说明 OpenAI 兼容接口、Key 和网络连接基本正常。

## Claude/Anthropic 接入

Claude Code 等工具使用 Anthropic 相关环境变量或配置项。请以控制台显示的 Claude/Anthropic 接入地址为准。

在 API 密钥列表中点击「使用密钥」后，可以看到 Claude Code 的配置入口。复制时请使用控制台展示的实际 Key，文档示例只会使用占位符。

![使用密钥弹窗中的 Claude Code 配置入口](../assets/screenshots/access/api-key-use-dialog-header.png)

| 字段 | 说明 |
| --- | --- |
| Anthropic Base URL | 控制台展示的 Claude/Anthropic 接入地址 |
| Anthropic Token/API Key | 控制台创建的 API Key |
| Model | 控制台支持的 Claude 模型名称 |

## 推荐接入顺序

第一次配置时，建议按下面的顺序走一遍：

1. 先创建一个新的 API Key，并用清晰名称标记用途。
2. 确认要接入的工具使用 OpenAI 兼容协议还是 Claude/Anthropic 协议。
3. 按对应页面填写 Base URL、API Key 和模型名称。
4. 先发送一条短消息测试，再开始长上下文或高消耗任务。
5. 回到 yylx.io 使用记录确认请求确实来自刚配置的 Key。

## 建议选择

| 使用场景 | 推荐页面 |
| --- | --- |
| 多个 CLI 工具切换 | [导入到 CC Switch](cc-switch.md) |
| 主要使用 Claude Code | [导入到 Claude Code](claude-code.md) |
| 主要使用 Codex CLI | [导入到 Codex](codex.md) |
| 在编辑器里使用 Cursor | [导入到 Cursor](cursor.md) |
| 图形化聊天客户端 | [导入到 Cherry Studio](cherry-studio.md) |

> [!WARNING]
> 如果同一个工具里同时配置了官方 Key 和 yylx.io Key，请确认当前实际启用的是哪一个 Provider，避免请求走到错误账户。
