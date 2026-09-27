# Telegram Loon Plugin

支持 `t.me` 和 `telegram.me` 链接。选择官方 Telegram 时直接放行；选择 Nagram、Swiftgram、Turrit、iMe、Nicegram 或 Lingogram 时，将网页链接重定向到对应客户端的 URL Scheme。

## 订阅

```text
https://raw.githubusercontent.com/cactus20201010/telegram-loon-plugin/main/Telegram.plugin
```

导入后选择目标客户端。HTTPS 链接需要在 Loon 中启用 MITM，并安装、信任 Loon CA 证书。Nagram 按上游脚本使用 `tg://` Scheme，实际由 iOS 的 Scheme 关联决定打开哪个应用。

转换自 [IBL3ND/module](https://github.com/IBL3ND/module) 的 Egern 模块；原作者为 panda𝕏。
