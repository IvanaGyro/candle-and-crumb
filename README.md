# Candle & Crumb

公開的純靜態網站。直接開啟 `index.html`，或將此 repo 的分支根目錄設為 GitHub Pages 發布來源。
不需要伺服器、帳號或 API 金鑰。

不需要 build、npm 或 Python。直接編輯並發布：

- `index.html`：頁面文字、結構與 `point-data` 區段的地點名稱／座標。
- `assets/style.css`：響應式版面。
- `assets/app.js`：頁面操作。
- `assets/daily-core.js`：每日日期與點位計算。
- `assets/cafe-map.jpg`：地圖圖片。

GitHub Pages 選擇 main 分支的根目錄，保留整個 `assets/` 資料夾。所有資源使用相對路徑，支援專案子路徑。`.nojekyll` 用於停用 Jekyll。

地圖作者：@sky_solsuga（2025-01-05）。底圖保留署名，本站添加編號與每日顏色。
來源及授權：https://sky-children-of-the-light.fandom.com/wiki/Map:Alice%27s_Wonderland_Cafe
底圖不適用於本 repo 自訂的程式碼授權。

選擇日期可查閱其他遊戲日；「回到今天」恢復每日自動更新。
依太平洋時間午夜換日，包含夏令時間。

## 地圖編號

1 為入口上方平台，2 為入口旁禮物附近地板。沿左側座位、上方、右側吧檯順時針，最後由下往上走中央圓桌。編號是找路順序，不是燭光生成順序。

驗證：`node tests/daily.cjs`。

手機版使用單欄版面；地圖可放大後滑動，當日清單亦可點選地點。日期按鈕與清單具有至少 44px 高的操作區。
