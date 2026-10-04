# 惜食共學｜三校永續行動平台

長興、港西、長樂國小共同發起的公開教育網站，適用國小三至六年級。

公開網站：https://aa9792.github.io/foodwise-school-network/

## 內容

校園插畫首頁、三校剩食觀測站、共同行動、12節教案與學習單下載、惜食知識、小小惜食家任務及教師填報入口。所有分頁採用綠、黃、藍、橘色卡片風格，支援手機。

## 資料與教師填報

網站直接讀取 Google 試算表的兩個已發布CSV分頁，每60秒重新讀取，無需更新JSON或重新部署來更新量測。Google發布更新可能延遲數分鐘。尚無實際紀錄時顯示待量測；示範模式全為虛構，不代表三校成效。

共用填報試算表：https://docs.google.com/spreadsheets/d/1NF5RyZT49ZMj9FrEKcWSyWZND6-aJyNsYVWtVXkR6FA/edit

教師工作台提供「量測紀錄」與「行動紀錄」入口；教師須由管理者透過Google共用取得編輯權限。原始紀錄維持受限分享，僅發布「公開量測」「公開行動」兩個分頁。填報後先核對，再把公開狀態設為「已核對」，公式才會輸出至公開資料。

測量使用 date、schoolId、cohort、phase、participants、plateG、unservedG、inedibleG、version、updatedAt。網站會檢查必填、非負重量、有效日期、正整數人數、學校代碼與重複紀錄；連線／格式錯誤會顯示提示，不把缺漏當成零。公開量測不輸出菜色或教師備註。

已預留300筆；延伸資料時同步延伸Google公式、驗證與保護範圍。新增學校時更新學校清單、下拉選項與 src/model.ts 的 CORE_SCHOOLS。修改舊紀錄直接更新原列，選「撤回」停止公開。

只放學校、班級彙總，不填學生姓名、健康資料、教師帳號或聯絡方式。請勿把整份試算表設定為公開編輯。

## 本機開發與部署

```sh
npm ci
npm run dev
npm run build
```

網站基底路徑為 `/foodwise-school-network/`。建置會產生每個分頁的 index.html，支援分頁直接開啟與重新整理。main 的更新會透過 GitHub Actions 發布到 GitHub Pages。

本倉庫不包含原平台的資料庫、登入後端、環境變數、存取憑證或私人版本紀錄。校園插畫為 AI 生成；教案與資料請依實際施作持續修正。
