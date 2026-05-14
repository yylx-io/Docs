# 导入到 Cherry Studio

Cherry Studio 支持添加自定义模型服务。通过 OpenAI 兼容方式，可以把 yylx.io 配置为一个新的 Provider。

## 准备 API Key

先在 yylx.io 控制台创建一个 Cherry Studio 专用 Key。图形化客户端通常会长期保存 Key，因此不建议和命令行工具共用同一个 Key。

![在 API 密钥页为 Cherry Studio 准备 Key](../assets/screenshots/access/api-key-page-actions.png)

需要准备的信息如下：

| 字段 | 填写内容 |
| --- | --- |
| Provider 名称 | `yylx.io` |
| API Key | yylx.io 控制台创建的 Key |
| API 地址 | `https://api.yylx.io/v1` |
| 模型名称 | 控制台模型列表中的模型名称 |

## 添加 Provider

1. 打开 Cherry Studio。
2. 进入设置中的「模型服务」或 Provider 管理页面。
3. 新增一个 OpenAI 兼容 Provider。
4. 名称填写 `yylx.io`。
5. API Key 填写 yylx.io 控制台创建的 Key。
6. API 地址填写：

```text
https://api.yylx.io/v1
```

7. 保存配置。

保存后，如果 Cherry Studio 提供「检查」或「测试连接」按钮，建议先点一次。能正常拉取模型列表或返回成功提示，再继续添加模型。

## 添加模型

如果 Cherry Studio 没有自动拉取模型列表，可以手动添加控制台展示的模型名称。

建议先添加一个最常用的模型进行测试，确认能正常对话后，再补充其他模型。模型名称要完整复制，大小写、横线、日期后缀都不要改。

## 测试连接

在 Cherry Studio 中新建对话，选择 `yylx.io` Provider 和对应模型，发送一条简短消息：

```text
你好，请用一句话介绍你自己。
```

如果模型正常回复，说明配置成功。

## 使用建议

如果你会在 Cherry Studio 里保存多个 Provider，建议把 yylx.io 的模型名称和官方模型名称区分开，避免选错服务。也可以只先添加常用模型，等确认稳定后再补全其他模型。

## 排查建议

如果连接失败，请检查 API 地址是否只填写到 `/v1`，不要填写 `/chat/completions` 或其他完整接口路径。

| 问题 | 处理方式 |
| --- | --- |
| 认证失败 | 重新复制 API Key，确认没有多余空格 |
| 连接超时 | 换网络或稍后重试，并查看 yylx.io 服务状态 |
| 模型不可用 | 使用控制台模型列表中的完整模型名 |
| 能拉模型但不能聊天 | 检查当前对话是否选择了 `yylx.io` Provider |
