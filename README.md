# 惜食共學｜三校永續行動平台

長興、港西、長樂國小共同發起的公開教育網站，適用國小三至六年級。

公開網站：https://aa9792.github.io/foodwise-school-network/

## 內容

校園插畫首頁、三校剩食觀測站、共同行動、12節教案與學習單下載、惜食知識、小小惜食家任務及教師填報入口。所有分頁採用綠、黃、藍、橘色卡片風格，支援手機。

## 資料與教師填報

GitHub Pages 是靜態網站。本網站顯示 `public/data/platform.json` 的公開資料快照，**不是即時資料庫**。目前尚無實際量測紀錄，顯示待量測；介面示範模式全部為虛構，不能作為三校成果。

教師填報連回原本的受權限管理平台。填報後，須將經核對且適合公開的學校／班級彙總更新至 JSON，再提交到 main，由 GitHub Actions 自動重新發布。不得放入學生姓名、健康資料、教師帳號、權限名單或憑證。請同步更新 syncedAt；records 與 actions 的格式參考 src/model.ts。

## 本機開發與部署

```sh
npm ci
npm run dev
npm run build
```

網站基底路徑為 `/foodwise-school-network/`。建置會產生每個分頁的 index.html，支援分頁直接開啟與重新整理。main 的更新會透過 GitHub Actions 發布到 GitHub Pages。

本倉庫不包含原平台的資料庫、登入後端、環境變數、存取憑證或私人版本紀錄。校園插畫為 AI 生成；教案與資料請依實際施作持續修正。
