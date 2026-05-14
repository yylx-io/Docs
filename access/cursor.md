# 导入到 Cursor

Cursor 支持在设置中填写自定义 API Key。不同版本的设置项名称可能略有差异，请以当前版本界面为准。

## 先准备 API Key

在 yylx.io 控制台创建一个专门给 Cursor 使用的 API Key。建议名称写成 `cursor-desktop`、`cursor-work` 这类能看出来源的名字，后续在使用记录里更容易定位。

![在 API 密钥页为 Cursor 准备 Key](../assets/screenshots/access/api-key-page-actions.png)

Cursor 通常走 OpenAI 兼容配置，因此需要准备三项信息：

| 字段 | 填写内容 |
| --- | --- |
| API Key | yylx.io 控制台创建的 Key |
| Base URL | `https://api.yylx.io/v1` |
| Model | 控制台模型列表中的模型名称 |

## 配置步骤

1. 打开 Cursor 设置。
2. 进入 `Models` 或 `API Keys` 相关页面。
3. 找到 OpenAI API Key、自定义 OpenAI 兼容配置，或 Override OpenAI Base URL 之类的设置项。
4. API Key 填写 yylx.io 控制台创建的 Key。
5. Base URL 或 Override OpenAI Base URL 填写：

```text
https://api.yylx.io/v1
```

6. 如果界面允许手动添加模型，填写 yylx.io 控制台展示的模型名称。
7. 保存后点击 Verify，或新建一次聊天测试。

## 模型名称

如果 Cursor 允许手动添加模型，请填写 yylx.io 控制台展示的模型名称。

如果当前 Cursor 版本不支持自定义 Base URL，则无法直接指向 yylx.io 网关。可以改用 Codex、Claude Code、Cherry Studio，或等待 Cursor 版本支持对应配置项。

## 测试方式

保存配置后，建议先做一次很轻量的测试：

```text
请只回复一句话：Cursor 已连接。
```

如果能正常回复，再开始使用 Composer、Chat 或 Agent。测试失败时，不要连续重试大任务，先检查 Key、Base URL 和模型名称。

## 注意事项

Cursor 的自定义 API Key 通常只覆盖部分标准聊天模型能力。Tab Completion、内置模型、部分 Agent 能力可能仍然走 Cursor 自带服务。

如果 Verify 失败，请确认：

| 检查项 | 说明 |
| --- | --- |
| Base URL | 只填到 `/v1`，不要填完整接口路径 |
| API Key | 没有多余空格或换行 |
| 模型 | 使用控制台存在且可用的模型 |
| 余额 | 当前账户余额或套餐仍可用 |
| 设置作用范围 | 确认当前功能确实使用自定义 OpenAI Provider，而不是 Cursor 内置模型 |
