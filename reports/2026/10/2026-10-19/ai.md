# AI 新聞

**日期：2026-10-19**｜**精選 100 則**

---

### 1. [Cloudflare建立爬蟲信任評等，預計供網站控管流量](https://www.ithome.com.tw/news/179786)

Cloudflare公布爬蟲信任評估機制，針對已通過身分驗證的機器人，持續觀察是否遵守網站抓取規則，以及收到降低請求頻率的要求後是否配合，再依長期行為建立信任評等。該機制目前已在內部使用，未來預計開放客戶設定信任門檻，決定如何處理爬蟲流量。
評估對象是Cloudflare的已驗證機器人（Verified Bots），原有機制會確認爬蟲身分及宣稱的用途，並要求不得濫用網站資源。不過，機器人即使通過驗證，仍可能無視網站不希望被抓取的範圍，或在網站要求減少存取後繼續發出大量請求。

- 📰 **iThome 科技**

### 2. [Sucuri揭露可自我重建的WordPress惡意程式SC，移除後數秒便會重現](https://www.ithome.com.tw/news/179785)

資安業者Sucuri於9月30日揭露WordPress後門程式SC，名稱源自惡意程式中的「SC_」標記，研究人員在網站清理過程中發現，該後門程式具備自我重建能力，遭移除後數秒便會重現。

- 📰 **iThome 科技**

### 3. [Vercel Labs推出tsc-ts，以TypeScript重寫Go版TypeScript 7編譯器](https://www.ithome.com.tw/news/179784)

Vercel旗下開發團隊Vercel Labs推出開放原始碼編譯器tsc-ts，將微軟以Go語言開發的TypeScript 7.0.2編譯器重新以TypeScript實作，再透過自家工具scriptc轉換成可直接執行的原生程式。新工具支援型別檢查、JavaScript程式碼輸出及增量建置，目前仍屬實驗性專案。

- 📰 **iThome 科技**

### 4. [Linux核心PwnEscape漏洞可突破虛擬機隔離，導致主機記憶體洩漏](https://www.ithome.com.tw/news/179780)

資安研究團隊pwn.AI揭露Linux核心重大漏洞PwnEscape（CVE-2026-99999）。

- 📰 **iThome 科技**

### 5. [Arch Linux軟體市集出現惡意套件，攻擊者藉此散布惡意程式以取得root權限](https://www.ithome.com.tw/news/179783)

Arch Linux社群套件庫AUR（Arch User Repository）再傳惡意套件攻擊，根據資安新聞網站Bleeping Computer的報導，攻擊者以拼字相近的名稱偽冒熱門AUR輔助工具yay與paru，將包含惡意安裝腳本的套件上傳至AUR。使用者若誤將其安裝到系統中，可能導致攻擊者執行具root權限的遠端Shell指令，進而取得系統的高權限控制能力。

- 📰 **iThome 科技**

### 6. [雲端版辦公室軟體Collabora Online漏洞遭到利用，攻擊者試圖入侵Nextcloud伺服器](https://www.ithome.com.tw/news/179782)

10月14日美國國家漏洞資料庫（NVD）公布重大等級的漏洞CVE-2026-110447，此弱點存在於雲端服務Nextcloud的雲端版辦公室軟體應用程式Collabora Online Built-in 代碼 伺服器（richdocumentscode），可被用於遠端程式碼執行（RCE），CVSS v4.0嚴重程度評分為9.2，此為作業系統命令注入漏洞，存在於proxy.php元件，在代碼 伺服器尚未執行的狀態下可被利用。

- 📰 **iThome 科技**

### 7. [Drupal修補重大RCE漏洞，呼籲用戶儘速採取行動](https://www.ithome.com.tw/news/179781)

10月14日內容管理系統Drupal開發團隊發布資安公告，修補兩個重大等級的資安漏洞CVE-2026-108097、CVE-2026-108099，攻擊者都有機會將其用於遠端執行任意程式碼（RCE），在Drupal的嚴重程度評分裡，皆被評為19分（滿分25分），呼籲用戶應儘速套用新版程式修補。

- 📰 **iThome 科技**

### 8. [傳Accenture將公司員工的Claude AI補助額度降為29美元](https://www.ithome.com.tw/news/179778)

404Media報導，由於員工使用AI成本太高，IT委外服務大廠Accenture要求自2026年10月起，員工使用Claude企業版的支出，每人每月上限29美元，超過者必須從專案經費扣除。一名用量超過的員工因此被暫停存取。

- 📰 **iThome 科技**

### 9. [【資安日報】10月19日，Google揭露中國相關駭客利用BeyondTrust零時差漏洞入侵企業內網](https://www.ithome.com.tw/news/179777)

本日新聞焦點
● Google揭露中國相關駭客利用BeyondTrust零時差漏洞入侵企業內網
● 中國駭客UAT-11985濫用Google服務從事網釣，鎖定臺灣研究機構
● 駭客組織UNC5820鎖定電信公司，利用Fortinet漏洞散布惡意軟體

- 📰 **iThome 科技**

### 10. [Rust 1.99.1修正跨語言函式回傳錯誤，並排除UEFI與macOS建置問題](https://www.ithome.com.tw/news/179775)

Rust開發團隊發布Rust 1.99.1，修正3項先前版本的問題，其中一項可能使C等其他語言呼叫Rust函式時，取得錯誤的回傳數值，影響程式判斷。新版還排除UEFI韌體程式建置失敗，以及macOS部分開發環境無法啟動連結工具的問題。
跨語言函式回傳錯誤與外部函式介面（FFI）有關，FFI是讓不同程式語言互相呼叫函式的機制。Rust函式可以用布林值表示真或假，C程式取得結果時，通常應讀到1或0，但Rust 1.99.0在部分x86-64平臺未正確處理回傳資料��可能讓C程式收到其他數字。

- 📰 **iThome 科技**

### 11. [Linux核心將取消AI輔助開發標註要求，開發者仍須對程式碼負責](https://www.ithome.com.tw/news/179770)

Linux核心準備取消AI輔助開發的標註要求，核心開發者Sasha Levin於10月13日提交修訂版，移除開發者使用AI協助撰寫程式碼時，必須在提交紀錄加入Assisted-by標註的規定。文件維護者Jonathan Corbet已於14日接受修改，後續仍須整合至Linux主線。

- 📰 **iThome 科技**

### 12. [Microchip為NVMe SSD控制器導入CNSA 2.0後量子密碼學支援](https://www.ithome.com.tw/news/179774)

晶片供應商Microchip於10月12日宣布擴充資料中心產品組合，為Flashtec SSD控制器引進後量子密碼學支援，並推出強化安全性功能的Switchtec PCIe 6.0交換器，更新Flashtec SSD控制器及Adaptec SmartRAID 4300系列NVMe RAID儲存加速器，因應AI資料中心對連線效能���儲存容量

- 📰 **iThome 科技**

### 13. [Adobe Commerce重大漏洞BlockStrap恐讓攻擊者直接在伺服器執行任意程式碼](https://www.ithome.com.tw/news/179773)

上週Adobe修補Adobe Commerce（Magento 開源）一系列資安漏洞，其中包含CVSS嚴重程度達到滿分10分的CVE-2026-103849。

- 📰 **iThome 科技**

### 14. [Adobe於10月上半修補176個資安漏洞](https://www.ithome.com.tw/news/179772)

10月13日Adobe發布本月上半的例行更新，為11種應用程式及系統元件推出修補程式，總共修補了176個資安漏洞。

- 📰 **iThome 科技**

### 15. [162個M365租戶遭未授權存取，ConnectWise備份API憑證遭濫用](https://www.ithome.com.tw/news/179771)

資安業者Huntress於10��16日揭露，ConnectWise 雲端 Backup的Microsoft 365應用程式憑證遭到濫用，攻擊者藉此未經授權登入162個Microsoft 365租戶。

- 📰 **iThome 科技**

### 16. [中國駭客UAT-11985利用Google服務從事AiTM網釣，鎖定臺灣研究機構](https://www.ithome.com.tw/news/179769)

思科威脅情報團隊Talos發現專門針對臺灣研究機構的進階持續性威脅（APT）魚叉式網路釣魚活動，中國駭客UAT-11985部署先進的對手中間人攻擊（AitM）釣魚框架，模擬Google身分驗證網頁，假借臺灣歐盟中心、政治大學國際關係研究中心，以及臺灣智庫等機構的名義寄送釣魚信。相關攻擊於2026年中旬發現，特別的是，UAT-11985這些信件具有高度相似的結構與措辭，內容先以冗長的地緣政治及政策分析建立專業形象，再針對收件者加入稱讚、專屬邀請或VIP席位等說詞，最後提供活動時間、地點及報名方式。

- 📰 **iThome 科技**

### 17. [駭客組織UNC5820鎖定電信公司，利用Fortinet資安漏洞散布惡意軟體PeerStitch](https://www.ithome.com.tw/news/179767)

上週末美國網路安全與基礎設施安全局（CISA）發布公告，將Fortinet設備資安漏洞CVE-2025-61624列入已遭利用的漏洞名單（KEV），在此之前有資安公司透露，他們在駭客組織UNC5820（CL-STA-0954）攻擊一家電信公司的事故裡，發現相關漏洞利用活動。

- 📰 **iThome 科技**

### 18. [日本漢堡王CRM系統遭駭，外洩逾1,100萬會員個資](https://www.ithome.com.tw/news/179766)

速食連鎖業者日本漢堡王上週公告官方App會員情報管理系統遭駭，導致超過千萬會員資訊外洩。
漢堡王在10月13日發現管理App會員資訊的系統遭到未授權存取。該公司在發現時已立即切斷連線。初步判斷，攻擊者是在10月2日到10月7日存取系統並竊走資訊。攻擊者如何成功駭入系統，該公司偕同外部資安廠商調查中。

- 📰 **iThome 科技**

### 19. [OpenBSD修補源自37年前程式碼的記憶體漏洞，研究人員已公開取得root權限的攻擊程式](https://www.ithome.com.tw/news/179765)

繼今年4月Anthropic的AI模型 Claude Mythos Preview，在自主滲透與漏洞挖掘測試中，於以安全著稱的開源Unix作業系統OpenBSD發現一個隱藏27年的遠端當機漏洞後，資安業者Calif又於10月16日揭露OpenBSD存在可串連利用的核心漏洞，最早可追溯至1988年的原始BSD程式碼，至今已存在37年。

- 📰 **iThome 科技**

### 20. [Meta、蘋果合作將Muse帶到Mac電腦上執行](https://www.ithome.com.tw/news/179764)

Meta上週推出Mac版Muse App，並開放多模態AI模型Muse Spark Open的權重，同時與蘋果合作，讓這款大型模型能在Mac Studio上執行。

- 📰 **iThome 科技**

### 21. [微軟公布尖端模型MAI-Base-2，算力耗用是競爭模型的1/4](https://www.ithome.com.tw/news/179763)

微軟上周公布自行開發的尖端模型MAI-Base-2，號稱在多項核心效能與基準測試上超越OpenAI的主流模型，且在推論與訓練過程中所消耗的算力僅需對手的1/4。

- 📰 **iThome 科技**

### 22. [CISA呼籲BeyondTrust用戶儘速修補遠端支援系統重大漏洞](https://www.ithome.com.tw/news/179762)

10月16日美國網路安全與基礎設施安全局（CISA）更新已遭利用漏洞名單（KEV），納入Fortinet漏洞CVE-2025-61624、BeyondTrust漏洞CVE-2026-102764，其中在公布之前就遭到利用的零時差漏洞CVE-2026-102764，格外引起關注。

- 📰 **iThome 科技**

### 23. [BeyondTrust、Fortinet漏洞遭積極利用](https://www.ithome.com.tw/news/179761)

10月16日美國網路安全與基礎設施安全局（CISA）表示，他們根據已掌握的積極利用證據，在已遭利用漏洞名單（KEV）增列兩個新漏洞，這些漏洞是：Fortinet應用系統路徑遍歷漏洞CVE-2025-61624，以及BeyondTrust 遠端 Support身分驗證繞過漏洞CVE-2026-102764，聯邦機構必須在10月19日前完成修補。

- 📰 **iThome 科技**

### 24. [Nginx修補5項漏洞，3項恐導致遠端程式碼執行](https://www.ithome.com.tw/news/179759)

網路應用與資安業者F5旗下Nginx專案於10月14日發布1.30.6及1.31.7版，修補5項資安漏洞。其中3項涉及記憶體處理問題，攻擊者在符合特定利用條件時，可能造成Nginx工作處理程序崩潰，甚至在伺服器上執行程式碼。另外兩項漏洞分別涉及TLS工作階段票證及HTTP/3請求處理，可能讓攻擊者繞過用戶端憑證驗證，或在Nginx轉送至後端伺服器的HTTP請求中插入額外資料。

- 📰 **iThome 科技**

### 25. [G7將舉行AI網路攻擊演練，檢驗金融業應變能力](https://www.ithome.com.tw/news/179758)

AI技術快速發展，也讓金融業面臨新的網路攻擊風險。七大工業國集團（G7）計畫舉行桌上演練，模擬金融體系遭到AI輔助的網路攻擊，檢驗各國財政部門與中央銀行的應變能力。根據路透社報導，日本財務大臣片山皐月（Satsuki Katayama）表示，這項計畫已獲G7部長層級同意。日本財務省官員指出，G7將藉此檢驗現有應變程序，並根據結果修訂應變手冊，民間金融機構也可能視模擬情境參與。

- 📰 **iThome 科技**

### 26. [Proofpoint以63億美元併購Varonis，擴大資料與AI安全業務](https://www.ithome.com.tw/news/179755)

資安業者Proofpoint於10月15日宣布，與資料安全業者Varonis簽署併購協議，將以約63億美元全現金併購Varonis，預計2027年上半年完成。

- 📰 **iThome 科技**

### 27. [Google揭露中國相關駭客利用BeyondTrust零時差漏洞入侵企業內網](https://www.ithome.com.tw/news/179742)

Google威脅情報團隊（GTIG）與Mandiant於10月16日揭露，疑似與中國有關的網路間諜組織ARMORY CASTLE利用BeyondTrust 遠端 Support零時差漏洞CVE-2026-102764入侵企業遠端支援設備，並進一步存取企業內部系統。

- 📰 **iThome 科技**

### 28. [微軟打擊跨國網釣犯罪服務，涉及逾10億則惡意訊息](https://www.ithome.com.tw/news/179734)

微軟宣布打擊跨國網釣犯罪服務，與醫療產業資安資訊分享與分析中心Health-ISAC合作，依據美國聯邦法院命令，接管並重新導向地下犯罪服務YAM Store、CoGUI及Iron Man使用的部分惡意網域。根據微軟統計，今年1月以來，犯罪者利用這些服務發送超過10億則網釣電子郵件及簡訊，鎖定全球150多個國家的消費者及逾7.5萬個組織，其中超過7.5億則訊息針對微軟客戶。

- 📰 **iThome 科技**

### 29. [AI發展與普及速度受制於安全性不足，SailPoint創辦人��籲整個產業持續投入並付諸行動](https://www.ithome.com.tw/news/179760)

近期頂尖AI模型服務失控事件引發關注，日前造訪香港的SailPoint執行長暨創辦人Mark McClain表示，AI不會也不該停下發展的腳步，關鍵在於設法提升AI安全性。他也談到該公司提倡的適應性身分，這是為了因應動態環境即時處理需求而發展的身分防護機制。最後，為了讓大家理解AI與安全性之間的關係，他特別用F1賽車為喻，指出煞車是否完善，是影響跑車能否發揮速度的關鍵，AI也是如此。

- 📰 **iThome 科技**

### 30. [Ubuntu 26.10全面改用Rust版核心工具，軟體更新驗證與企業登入也獲強化](https://www.ithome.com.tw/news/179750)

Canonical發布Linux作業系統Ubuntu 26.10，代號Stonking Stingray。新版完成Rust核心工具coreutils遷移，改用Sequoia PGP驗證軟體更新來源，並強化網路加密及Microsoft Entra ID企業帳號登入功能。Ubuntu 26.10並非長期支援版，提供9個月維護更新，支援期限至2027年7月。

- 📰 **iThome 科技**

---

### 更多 AI 新聞 (70則)

- All-Clad Factory Seconds Sale: Cookware Deals for Fall Cooking (**Wired**)
- WhatsApp Help Pages Leaked Hidden Instructions for a Meta Chatbot (**Wired**)
- Nathan Fielder’s Surprise Call From Elizabeth Holmes: ‘I Trust You’ (**Wired**)
- How the Xbox’s Disc-to-Digital Program Works (**Wired**)
- Maricopa County, Arizona, Is Again Ground Zero of Election Conspiracy Theories (**Wired**)
- The Story of Billy Evans and ‘Theranos 2.0’ (**Wired**)
- How Elizabeth Holmes Tricked WIRED—and Everyone Else (**Wired**)
- 15 最佳 White Elephant Gifts, Plus a Prank Box to Put Them In (2026) (**Wired**)
- Insta360 Luna Ultra and Luna Pro Review (2026): Steady Does It (**Wired**)
- Disney Asked Character.AI to Go Bankrupt for a Get-Out-of-Lawsuits Card (**Wired**)
- 20 最佳 Gifts for Men, Manly Men, and Manly Man Men (2026) (**Wired**)
- OnlyFans Creators Are Pissed That Meta Lets Muse Talk Dirty (**Wired**)
- Data Centers Have a 新 PR Plan: Your Kid’s Field Trip (**Wired**)
- Valerion VisionMaster Max 4K Projector Review: Looks Great, Sounds OK (**Wired**)
- Climate Change Has It In for the World’s 最佳 Surfing (**Wired**)
- Magnesium May Not Reach Your Brain, Despite Supplement Label Promises (**Wired**)
- The 最佳 AirPods Cases We’ve Used In Our Day-to-Day Lives (2026) (**Wired**)
- Encryption Is Getting Squeezed From All Sides (**Wired**)
- The 最佳 LED Grow Lights for Houseplants This Winter (2026) (**Wired**)
- These 12 Automatic Cat Feeders Were the 最佳 We Tested in 2026 (**Wired**)
- HTC Made Smart Glasses That Are Way More Private (**Wired**)
- Don’t Let a Crypto Inheritance Get Stuck on the Blockchain (**Wired**)
- Microplastics React With Water, a 新 Study Says. That’s a Problem for Biology (**Wired**)
- 為什麼 AI Isn’t Ready to Tackle Our Convoluted Genomes (**Wired**)
- The Leap Second Is No More (**Wired**)
- Katie Zacharia Was Linked to an AI Rare-Earths Startup. It’s Even Weirder Than It Sounds (**Wired**)
- Chicago-Area Cops Helped HSI Spy on Minnesota Anti-ICE Activists (**Wired**)
- Here’s Exactly How Tesla Made Its 新 230-Mph Car ‘Fly’ (**Wired**)
- Razer Barracuda V2 Pro Review: A Gaming Headset for the Office (**Wired**)
- Thank Gen Z for the ‘Girls’ Revival (**Wired**)
- Elon Musk Is Almost Single-Handedly Funding the Republican Midterms Push (**Wired**)
- Maybe Chatbots Shouldn’t Get to Say ‘I’ or ‘Me’ (**Wired**)
- Microsoft Surface Laptop Ultra Review: The First Real AI PC (**Wired**)
- AWOL Vision Aetherion Max RGB Laser UST Projector Review: A 熱門 Buy (**Wired**)
- AI-Generated Hot Girls Are Ripping Off Comedians to Boost Their Horny Content (**Wired**)
- The 最佳 Digital Wall Calendar (2026): Skylight, Everblog, Greenlight (**Wired**)
- Jabra Enhance Select M3 Review (2026): A Big Price for Small Wins (**Wired**)
- The 新 Fan’s Guide to the Unreal World of Nathan Fielder (**Wired**)
- Egypt’s Climate-Resilient ‘Super Corals’ Are Starting to Feel the Heat (**Wired**)
- Surfshark Promo Codes: 87% Off | October 2026 (**Wired**)
- Skechers Coupon Codes 20% Off (**Wired**)
- Total Wireless Promo Codes &amp; Deals: 50% Off Select Plans (**Wired**)
- HP Coupon Codes and Deals October 2026 (**Wired**)
- A Tesla Flying Car? I Don’t Know, Man (**Wired**)
- The Tesla Roadster 2 Is Here—and It Flies (**Wired**)
- We Got Hot and Heavy With Meta’s Muse—and Baffled by Apple’s HomeView (**Wired**)
- AI Hacks Leave a Mess That AI Companies Aren’t Paying For (**Wired**)
- Upgrade Your Thermostat for Winter With This Ecobee Deal for $120 (**Wired**)
- White House Press Secretary Katie Zacharia Was an Affiliate Marketer for a Fitness MLM (**Wired**)
- Junji Ito’s Manga Horrors Hit Harder as Live-Action TV (**Wired**)
- How I Get Free Traffic from ChatGPT in 2025 (AIO vs SEO) (**TechCrunch**)
- 熱門 10 AI Tools That Will Transform Your Content Creation in 2025 (**TechCrunch**)
- LimeWire AI Studio Review 2023: Details, Pricing &amp; Features (**TechCrunch**)
- 熱門 10 AI Tools in 2023 That Will Make Your Life Easier (**TechCrunch**)
- 熱門 10 AI Content Generator &amp; Writer Tools in 2022 (**TechCrunch**)
- Beginner Guide to CJ Affiliate (Commission Junction) in 2022 (**TechCrunch**)
- 熱門 11 AI MARKETING TOOLS YOU SHOULD USE (Updated 2022) (**TechCrunch**)
- Most Frequently Asked Questions About Affiliate Marketing (**TechCrunch**)
- 什麼是 Blockchain: Everything You Need to Know (2022) (**TechCrunch**)
- ProWritingAid VS Grammarly: Which Grammar Checker is Better in (2022) ? (**TechCrunch**)
- Sellfy Review 2022: How Good Is This Ecommerce Platform? (**TechCrunch**)
- Ahrefs vs SEMrush: Which SEO Tool Should You Use? (**TechCrunch**)
- 熱門 10 最佳 PLR(Private Label Rights)  Websites | Which One You Should Join in 2022? (**TechCrunch**)
- Canva Review 2022: Details, Pricing &amp; Features (**TechCrunch**)
- 熱門 7 最佳 Wordpress Plugin Of All Time (**TechCrunch**)
- Ginger VS Grammarly: Which Grammar Checker is Better in (2022) ? (**TechCrunch**)
- Most Frequently Asked Questions About NFTs(Non-Fungible Tokens) (**TechCrunch**)
- 10 最佳 Chrome Extensions That Are Perfect for Everyone (**TechCrunch**)
- Most Frequently Asked Questions About  Email Marketing (**TechCrunch**)
- 7 Free Websites Every Content Creator Needs to Know (**TechCrunch**)


---

📡 數據來源：AI News、MIT 科技評論、VentureBeat、NVIDIA、TechCrunch
