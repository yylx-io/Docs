# 常见错误

接入 yylx.io 后，如果客户端返回错误，可以先对照下表排查。表格按错误码（error_code）、错误信息（error_message）和说明整理，涵盖最常见的几类情况。

遇到错误时，建议先确认 Base URL、API Key、模型名称是否正确，再结合下表定位原因。多数错误与客户端配置或当前用量有关，调整后重试即可恢复。

## 错误码速查

| 错误码 | 错误信息（error_message） | 说明 |
| --- | --- | --- |
| 400 / `api_error` | `API key group platform is not gemini` | API Key 所属平台与请求的接口不匹配。请确认使用的 Key 类型与接口端点一致，例如 gemini 接口需要使用 gemini 平台的 Key。 |
| 401 / `api_error` | `User account is not active` | 账号未激活或已被停用。请检查账号状态，或联系管理员确认。 |
| 403 / `api_error` | `This group is restricted to Claude Code clients (/v1/messages only)` | 当前分组仅允许 Claude Code 客户端访问。请改用 Claude Code，或在控制台更换为支持当前客户端的分组 / Key。 |
| 403 / `api_error` | `Access denied. Your IP is <ip>` | 当前 IP 被限制访问。如确认自身网络无异常仍持续出现，请联系管理员核查。 |
| 404 / `api_error` | `Model "<name>" is not supported by any configured account in this group` | 模型名称不被当前分组支持。请到控制台核对完整的模型名称，注意区分大小写，不要使用未发布或拼写错误的模型名。 |
| 429 / `rate_limit_error` | `Too many pending requests, please retry later` | 短时间内并发请求过多。请降低并发，或稍后重试。 |
| 500 / `api_error` | `All available accounts exhausted` | 当前服务资源紧张，暂时无法处理请求，请稍后重试。 |
| 502 / `api_error` | `Upstream request failed` | 服务暂时不可用，请稍后重试。 |
| 502 / `api_error` | `Upstream stream ended without a response` | 响应尚未开始就被中断，请重新发起请求。 |
| 503 / `api_error` | `No available accounts: this group only allows Claude Code clients` | 当前分组只放行 Claude Code 客户端。请改用 Claude Code，或在控制台更换为支持当前客户端的分组 / Key。 |
| 200 / `api_error` | `Recovered upstream error 502/403/429/500`（流式响应中途返回） | 响应在输出过程中中断，收到的内容可能不完整，请重新发起请求。 |

## 排查建议

1. **先核对配置**：确认 Base URL、API Key、模型名称三项都与控制台一致。
2. **看错误码**：4xx 多与请求本身或账号/分组配置有关；5xx 与服务端临时状态有关，通常稍后重试即可。
3. **降低重试频率**：遇到 429、503 时，频繁重试反而会加剧问题，建议逐步退避后重试。
4. **保留现场再反馈**：如果重试仍无法解决，请把请求时间、错误码、error_message 一起反馈，方便定位。
