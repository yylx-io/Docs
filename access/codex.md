# 导入到 Codex

> [!WARNING]
> 推荐使用 [CC Switch](cc-switch.md) 来管理和切换 Codex 的 Provider 配置，无需手动改环境变量或配置文件。

Codex CLI 可以通过配置文件添加自定义模型提供商。适合把 yylx.io 作为一个独立 Provider 保存下来，之后在 Codex 中直接选择使用。

> [!INFO]
> Codex 的配置文件适合长期使用。如果只是临时测试，也可以先只设置环境变量，再用命令行参数指定模型。

## 准备信息

| 字段 | 填写内容 |
| --- | --- |
| Provider ID | `yylx` |
| Provider Name | `yylx.io` |
| Base URL | `https://app.yylx.io/v1` |
| API Key 环境变量 | `YYLX_API_KEY` |
| Model | 控制台模型列表中的模型名称 |

先在 yylx.io 控制台进入「API 密钥」页面，创建或选择一个专门给 Codex 使用的 Key。建议名称中带上 `codex`，后续排查消耗时更清楚。

![在 API 密钥页创建 Codex 专用 Key](../assets/screenshots/access/api-key-page-actions.png)

## 配置 API Key

先在终端中设置 API Key：

```bash
export YYLX_API_KEY="sk-your-api-key"
```

如需长期使用，可以写入 `~/.zshrc` 或 `~/.bashrc`。

如果你写入了 Shell 配置文件，保存后记得执行：

```bash
source ~/.zshrc
```

确认当前终端能读取到变量：

```bash
echo $YYLX_API_KEY
```

只要能看到非空输出即可，不要把完整 Key 发到公开聊天或 issue 中。

## 配置 Codex Provider

编辑 `~/.codex/config.toml`，加入：

```toml
model = "your-model-name"
model_provider = "yylx"

[model_providers.yylx]
name = "yylx.io"
base_url = "https://app.yylx.io/v1"
env_key = "YYLX_API_KEY"
wire_api = "responses"
```

把 `your-model-name` 替换为 yylx.io 控制台展示的模型名称。

### 配置说明

| 配置项 | 说明 |
| --- | --- |
| `model_provider` | 当前默认使用的 Provider ID |
| `base_url` | yylx.io 的 OpenAI 兼容地址 |
| `env_key` | Codex 从哪个环境变量读取 API Key |
| `wire_api` | Codex 使用的接口形态，以当前 Codex 版本支持为准 |

> [!TIP]
> 如果你的 Codex 版本配置字段与示例略有不同，请保留同样的核心信息：Provider ID、Base URL、环境变量名和模型名称。升级 Codex 后，也建议回头确认一次配置文件格式。

## 启动

```bash
codex
```

如果需要临时切换模型，可以在 Codex 启动参数或会话内按 Codex 的模型选择方式切换。第一次启动时，建议先发一个轻量请求，例如让模型输出当前配置的模型名或一句简短说明，确认 Provider 已经生效。

## 验证请求走到 yylx.io

可以从两边验证：

| 位置 | 看什么 |
| --- | --- |
| Codex 终端 | 是否能正常返回，是否出现认证或模型不存在错误 |
| yylx.io 使用记录 | 是否出现刚才这次 Codex 请求 |

如果 yylx.io 使用记录中没有请求，通常说明 Codex 没有启用 `yylx` Provider，或者当前终端没有读到 `YYLX_API_KEY`。

## 常见问题与排查

如果报认证错误，先确认当前终端中能读到环境变量：

```bash
echo $YYLX_API_KEY
```

如果报模型不存在，确认 `model` 字段与控制台模型名称完全一致。

如果报网络或接口格式错误，重点检查 `base_url` 是否只填写到 `/v1`，不要写成 `/v1/chat/completions` 或 `/v1/responses`。

> [!TIP]
> 如果你经常切换多个 Provider，可以把 yylx.io 配置交给 CC Switch 管理，减少手动编辑 `~/.codex/config.toml` 的次数。
