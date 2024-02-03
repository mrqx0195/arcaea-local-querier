# Arcaea Local Querier(modify by mrqx0195)

## 这是什么？

一个通过读取 Arcaea 的本地分数存档文件来计算玩家 b30/r10 的工具。

前身为 starsky919 所开发的 Arcaea Local Querier（https://github.com/StarSky919/arcaea-local-querier）。

## 我该如何使用？

首先，你需要获取 Arcaea 的本地分数存档文件（st3）。

获取的方法多种多样，例如通过解包 Android 的备份文件（.ab）获取，也可以使用 root 等方法直接获取存档。

然后，打开这个网页（如果在本地运行，你可能需要 Nginx 等工具），单击“导入数据”，导入你的存档文件。

接着，单击“生成图片”，填入你的昵称（可以不是 Arcaea 用户名）和当前 ptt（建议如实填写）。

等待数秒，会出现一个弹窗提示你下载图片，单击“下载”即可将图片保存至本地。

## 报错了？

请先确认您的网络是否正常（如果在本地运行，确认已下载所有文件），然后尝试刷新网页。

若仍未解决，请在 GitHub 上提交 issues 并说明详细情况，附带截图。

## 曲目定数不准确/未更新？

本工具的版本号对应 Arcaea 本体的版本号，请先检查版本号前两位是否与 Arcaea 本体相同或更高。

定数来自 Arcaea 中文 Wiki 及 Arcaea Fandom Wiki，新版本更新后 wiki 需要一定时间测定新曲数据，请耐心等待。
