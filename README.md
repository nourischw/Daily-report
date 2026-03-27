# 每日 IT 資訊報告

一個使用 Astro + TailwindCSS 建構的靜態網站，展示每日 IT 資訊報告。

## 📋 報告分類

1. **GitHub 熱度** - GitHub 趨勢專案與熱門討論
2. **AI 新聞** - 人工智慧最新動態
3. **IT 資訊** - 科技產業新聞
4. **IT 工作介紹** - 職涯機會與技能需求
5. **Polymarket 預測** - 預測市場熱門話題

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

## 📁 新增報告

將 Markdown 檔案放入 `reports/` 目錄，命名規則：

- `github.md` - GitHub 熱度
- `ai.md` - AI 新聞
- `it.md` - IT 資訊
- `jobs.md` - IT 工作介紹
- `polymarket.md` - Polymarket 預測

## 🌐 GitHub Pages 部署

1. Fork 或複製此 Repo
2. 在 GitHub Settings > Pages 中設定：
   - Source: GitHub Actions
3. 推送 Markdown 檔案到 `reports/` 目錄即可觸發自動部署

手動觸發：在 GitHub Actions 頁面選擇 "Deploy Daily Report" workflow 並點擊 "Run workflow"

## 📝 報告格式範例

```markdown
## 今日重點

### 熱門專案
- [專案名稱](URL) - 簡短描述

### 趨勢分析
...
```

## 許可證

MIT
