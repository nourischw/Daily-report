# AI 新聞

**日期：2026-07-06**｜**精選 100 則**

---

### 1. [Claude Cowork遭指可被濫用取得VM root權限](https://www.ithome.com.tw/news/177116)

資安研究團隊Armadin揭露，Anthropic的Claude Desktop for Windows中，Claude Cowork使用的沙箱隔離機制，可能在攻擊者已能於Windows主機執行程式的情況下遭濫用。研究人員指出，攻擊者可借用Claude Desktop元件與本機服務溝通，在Claude Cowork使用的Ubuntu虛擬機器內取得root權限，並放寬原本限制對外連線的管制。

- 📰 **iThome 科技**

### 2. [研究人員揭露透過提示注入繞過ChatGPT防護機制漏洞，OpenAI已完成修補](https://www.ithome.com.tw/news/177127)

資安研究人員zer0dac近日揭露ChatGPT一項安全防護機制繞過漏洞，攻擊者可透過提示注入（Prompt Injection）手法，以誤刪上傳檔案為由，誘使AI模型暴露資料存取路徑，再結合透過路徑遍歷（Path Traversal）方式，繞過存取路徑限制，取得額外資料，目前OpenAI已修補此問題。

- 📰 **iThome 科技**

### 3. [【資安日報】7月6日，檔案系統元件FatFs��點恐影響大量隨身碟與SD記憶卡](https://www.ithome.com.tw/news/177114)

本日新聞焦點
● 檔案系統模組FatFs存在多個弱點，廣泛影響物聯網與工控設備
● 研究人員驚傳逕自公布逾30項弱點的PoC
● Google聯手FBI打擊NetNut常駐代理網路 

- 📰 **iThome 科技**

### 4. [研究人員公開Control 網頁 Panel重大漏洞PoC程式，若未及時修補恐遭攻擊者遠端接管伺服器](https://www.ithome.com.tw/news/177113)

資安業者Karma近日揭露網站主機管理平臺Control 網頁 Panel（CWP）重大漏洞CVE-2026-57517，並公開概念驗證（PoC）利用程式，0.9.8.1224以前版本均受影響。Control 網頁 Panel是Linux伺服器常用的網站與主機管理平臺，整合網站、資料庫、電子郵件及DNS等管理功能，廣泛部署於企業虛擬主機與伺服器環境。一旦前述漏洞遭到利用，攻擊者可能取得系統管理權限，進而危及整臺伺服器安全，用戶應儘速更新至已修補的0.9.8.1225以上版本。

- 📰 **iThome 科技**

### 5. [Apache修補HttpComponents Core兩項高風險漏洞，未更新可能導致服務阻斷攻擊](https://www.ithome.com.tw/news/177106)

Apache軟體基金會於7月1日發布兩份資安公告，修補Java HTTP元件Apache HttpComponents Core的兩項高風險漏洞，分別為CVE-2026-54428與CVE-2026-54399，影響5.4.2以前與5.5-beta1等版本。

- 📰 **iThome 科技**

### 6. [Godot更新貢獻規範，禁止AI代理提交程式碼](https://www.ithome.com.tw/news/177105)

開源遊戲引擎Godot上周更新貢獻規範，開始禁止使用自主AI代理（Autonomous AI 代理）提交程式碼，並禁止利用AI產生大段程式碼投稿，同時要求開發者若使用AI輔助撰寫程式碼必須主動揭露。
近來生成式AI與AI代理工具大幅降低程式碼撰寫門檻，卻也使開源專案收到愈來愈多AI生成的程式碼拉取請求（Pull Request，PR），導致維護者審查負擔增加，也引發程式碼品質、責任歸屬及開源治理等討論。

- 📰 **iThome 科技**

### 7. [WatchGuard修補Firebox防火牆17項漏洞，包含可能導致遠端執行任意程式碼的重大漏洞](https://www.ithome.com.tw/news/177104)

資安業者WatchGuard於7月2日發布資安公告，修補其防火牆設備Firebox共17項漏洞，包含CVSS v4嚴重性評分達9.2分的重大漏洞CVE-2026-13368，問題源自防火牆的Fireware OS作業系統使用外部LDAP驗證伺服器時，可能觸發競態條件漏洞（Race Condition），進一步導致記憶體已釋放卻仍被使用（UAF）問題，攻擊者可在未經身分驗證情況下藉此執行任意程式碼。

- 📰 **iThome 科技**

### 8. [具41年歷史的荒謬C語言競賽，首度有臺灣人上榜](https://www.ithome.com.tw/news/177102)

國際混淆C程式碼競賽（International Obfuscated C 代碼 Contest，IOCCC）上個月公布2025年得獎名單，23件得獎作品中包括366 bytes的電腦模擬器、會重新編譯自己的Pong遊戲，以及臺���開發者jingp49所製作的《Doctor Who》片頭動畫程式。

- 📰 **iThome 科技**

### 9. [駭客團體Armored Likho鎖定政府機關、能源產業，散布竊資軟體BusySnake Stealer](https://www.ithome.com.tw/news/177101)

資安公司卡巴斯基發現目標式網路釣魚活動，被稱為Armored Likho、Eagle Werewolf的APT駭客組織於俄羅斯、巴西與哈薩克從事攻擊，對象包括政府機構與電力部門組織，利用以Python打造的竊資軟體BusySnake Stealer，從事竊取帳密資料、Cookie，並在受害電腦建立反向SSH隧道進行通訊。

- 📰 **iThome 科技**

### 10. [JetBrains修補開發環境身分管理平臺重大漏洞，未更新恐導致帳號接管與權限提升](https://www.ithome.com.tw/news/177100)

軟體開發工具業者JetBrains近日發布資安公告，修補其身分與存取管理平臺JetBrains Hub的三項重大漏洞。在JetBrains的開發環境中，JetBrains Hub用於提供使用者帳號、驗證、授權及單一登入（SSO）的集中管理，可為其他JetBrains產品提供身分驗證服務，一旦遭到入侵，可能影響整個開發環境的帳號與權限管理，用戶應儘速升級至已修補的2026.1到2024.2等分支版本。

- 📰 **iThome 科技**

### 11. [AWS為Amazon OpenSearch Service新增日誌分析引擎，改善儲存與查詢效率](https://www.ithome.com.tw/news/177099)

7月1日AWS宣布，旗下託管式搜尋與分析服務Amazon OpenSearch Service新增專為日誌分析設計的最佳化引擎，協助企業降低大量日誌資料的分析與儲存成本。AWS表示，這項功能不會額外收取引擎費用，目標是改善大量日誌資料的攝取、查詢與儲存效率，因應企業可觀測性需求，以及安全監控資料量持續成長所帶來的壓力。

- 📰 **iThome 科技**

### 12. [Google與FBI打擊NetNut常駐代理網路，涉及至少200萬臺家用連網裝置](https://www.ithome.com.tw/news/177098)

繼今年1月打擊IPIDEA常駐網路（residential proxy 網絡）後，7月初Google宣布與美國聯邦調查局（FBI）、電信業者Lumen等單位合作，針對大型常駐代理網路NetNut採取行動，削弱其營運能力。

- 📰 **iThome 科技**

### 13. [研究人員未通報開發團隊即公開PoC，涉及SSH函式庫libssh2重大漏洞](https://www.ithome.com.tw/news/177097)

資安媒體Infosecurity Magazine報導，一名匿名資安研究人員近日以bikini帳號，在GitHub公開名為Exploitarium的儲存庫，釋出多項漏洞研究與概念驗證（Proof of Concept，PoC）程式，至少涉及30項軟體產品與開源專案。

- 📰 **iThome 科技**

### 14. [思科修補開源防毒軟體ClamAV長達20年的資安漏洞](https://www.ithome.com.tw/news/177096)

思科針對旗下開源防毒軟體ClamAV產品線，於7月1日發布安全更新1.5.3與1.4.5版，總���修補7項高風險資安漏洞，其中最受到關注的地方，在於大部分資安漏洞從約20年前被引入，影響眾多舊版用戶。

- 📰 **iThome 科技**

### 15. [Microsoft Teams加強控管外部機器人，經會議組織者確認後才放行](https://www.ithome.com.tw/news/177095)

隨著AI會議助理、轉錄與筆記工具普及，企業線上會議也開始面臨「非人類與會者」的控管問題。微軟（Microsoft）6月29日宣布，Microsoft Teams推出新的外部機器人管理政策，當外部機器人嘗試加入會議時，須由會議組織者批准加入。

- 📰 **iThome 科技**

### 16. [開源遠端桌面工具UltraVNC修補重大漏洞，未更新可能導致遠端執行程式碼攻擊](https://www.ithome.com.tw/news/177094)

開源遠端桌面管理工具UltraVNC近日發布1.8.2.4版，修補UltraVNC Repeater元件兩項重大漏洞CVE-2026-7839與CVE-2026-7840。UltraVNC是Windows平臺常見的開��遠端桌面管理工具，Repeater則是負責中繼遠端桌面連線的元件，可協助位於防火牆後方的主機建立遠端桌面存取，常部署於企業對外網路，因而相關漏洞更容易為遠端攻擊者利用，1.8.2.2版以前的UltraVNC都會受到影響，用戶應儘速升級至已修補版本。

- 📰 **iThome 科技**

### 17. [Google 雲端擴大機密運算版圖，強化AI推論與提示詞加密防護](https://www.ithome.com.tw/news/177093)

6月下旬雲端服務供應商Google 雲端宣布擴大機密運算（Confidential Computing）服務，包括推出搭載NVIDIA Blackwell架構GPU的Confidential G4 VMs預覽版、用於加密AI提示詞與模型回應的開源Prompt Encryption SDKs，並強化Confidential Space與Confidential VMs等服務，擴大

- 📰 **iThome 科技**

### 18. [資安署啟動第二屆產品資安獵捕活動，臺灣軟體產品成核心目標](https://www.ithome.com.tw/news/177092)

為鼓��國內業者重視產品資安，國家資通安全研究院（資安院）自去年4月起不僅積極推動PSIRT（產品資安事件應變小組）的建置風氣，更將「臺灣產品漏洞獵捕計畫」列為發展重點，年底舉辦的「產品資安漏洞獵捕活動」首屆聚焦資通訊（ICT）硬體產品，而即將開跑的第二屆活動則迎來重大轉型

- 📰 **iThome 科技**

### 19. [醫材大廠美敦力資料外洩事件，影響逾380萬人](https://www.ithome.com.tw/news/177091)

醫療器材大廠美敦力（Medtronic）上周通知客戶4月發生駭客入侵事件。根據官方文件，事件導致超過380萬人資料外洩。

- 📰 **iThome 科技**

### 20. [小型嵌入式裝置檔案系統元件FatFs存在7個弱點，恐影響大量隨身碟與SD記憶卡，以及配備這些儲存裝置的各種物聯網設備](https://www.ithome.com.tw/news/177089)

以網路曝險管理見長的資安廠商runZero，7月初揭露FatFs R0.16與更早的版本存在7個資安漏洞，它們分別是CVSS嚴重程度評為高風險7.6分的CVE-2026-6682、CVE-2026-6687

- 📰 **iThome 科技**

### 21. [Linux核心又被發現新的本機權限提升漏洞Bad Epoll，Android也受到影響](https://www.ithome.com.tw/news/177088)

今年上半有資安研究人員發現Linux核心epoll子系統存在本機權限漏洞（LPE），將其命名為Bad Epoll，5月底正式以編號CVE-2026-46242浮上檯面，CVSS嚴重度評分為7.8分，屬於高風險漏洞，這個漏洞的問題在於，當中存在競態條件（race-condition）造成的記憶體釋放後再存取利用（Use-After-Free，UAF），攻擊者可藉此將無特權的處理程序提升為具有root權限的狀態，目前已知Linux桌面系統、Linux伺服器與Android均會受到影

- 📰 **iThome 科技**

### 22. [搭配強化VM隔離的Nitro引擎，AWS Graviton5執行個體上線](https://www.ithome.com.tw/review/176974)

去年12月舉行的re:Invent 2025大會，AWS發表新的自研Arm架構處理器Graviton5，並開放首批採用這款晶片的一般用途運算服務M9g的預覽版本，他們也初步揭露運算效能的表現： 相較於前代產品M8g，M9g的提升幅度達到25%，而在網站應用程式與機器學習，以及資料庫等類型的工作負載上，

- 📰 **iThome 科技**

### 23. [惡意軟體Amadey用於散布超過1萬種惡意程式](https://www.ithome.com.tw/news/177087)

跨國執法行動Operation Endgame於6月下旬發起最新一波活動，成功破壞惡意程式SocGholish（FakeUpdates）、Amadey和StealC背後的犯罪基礎設施，參與其中的民間企業組織裡，有一家是日本資安公司三井物產安全指引（Mitsui Bussan Secure Directions，MBSD），該公司透露，他們追蹤Amadey的活動長達6年，並

- 📰 **iThome 科技**

### 24. [Zero Day Clock網站示警：漏洞揭露到被利用的時間已縮短至2��時](https://www.ithome.com.tw/news/177079)

攻擊者利用漏洞的速度已達前所未有的程度，為了證明與突顯這個趨勢，近期有不少專家紛紛引用名為「Zero Day Clock」(zerodayclock.com）的網站圖表，也吸引整個資安社群的高度關注，該網站最大特色是透過即時視覺化數據，分析已知漏洞從公開揭露到首次偵測遭利用的時間變化，根據最新數據顯示，首次偵測利用的時間已經縮短至不到24小時。

- 📰 **iThome 科技**

### 25. [駭客冒充國際刑警組織寄送釣魚郵件，鎖定中小企業散布勒索軟體](https://www.ithome.com.tw/news/177080)

近期發生一起專門針對中小企業的大規模跨國釣魚攻擊行動，範圍遍布歐洲、亞洲、中東和北美，涵蓋食品、農業、法律服務、製藥、媒體、科技、金融等行業。攻擊者針對中小企業普遍缺乏專業法務資源的弱點，假冒國際執法機構恫嚇受害者配合。

- 📰 **iThome 科技**

### 26. [惡意程式SocGholish於3年內入侵逾144萬個WordPress網站](https://www.ithome.com.tw/news/177078)

6月下旬歐洲刑警組織（Europol）公布執法行動Operation Endgame最新成果，多國執法單位與民間企業組織成功破壞惡意程式SocGholish（FakeUpdates）、Amadey和StealC背後的犯罪基礎設施，其中圍剿了106個散布殭屍網路SocGholish的網域與伺服器，以及14,971遭到感染的WordPress網站。

- 📰 **iThome 科技**

### 27. [Microsoft揭露Exchange Online重大漏洞，可能導致權限提升與未授權資料存取](https://www.ithome.com.tw/news/177077)

Microsoft於7月2日揭露雲端郵件服務Exchange Online權限提升漏洞，漏洞編號為CVE-2026-54998，CVSS嚴重性評分達8.8分，已由Microsoft於雲端服務平臺完成修補。

- 📰 **iThome 科技**

### 28. [FBI警告駭客組織TeamPCP鎖定軟體開發者，���對開發工具與CI/CD發動供應鏈攻擊](https://www.ithome.com.tw/news/177075)

美國聯邦調查局（FBI）於7月2日發布資安警示（FLASH），提醒企業留意駭客組織TeamPCP發動的大規模軟體供應鏈攻擊。FBI指出，攻擊者透過竄改廣泛使用的開發工具與資安工具，在合法軟體套件植入惡意程式碼，進而竊取雲端存取權杖（Token）、SSH金鑰、Kubernetes Secrets等敏感資訊，並取得受害環境的持續存取權限。

- 📰 **iThome 科技**

### 29. [遭AI資安報告誤指涉入間諜軟體行動，視訊會議新創公司控告Palo Alto子公司](https://www.ithome.com.tw/news/177073)

Palo Alto Networks子公司Koi 安全遭網路視訊暨會議平臺新創公司MeetingTV提告。MeetingTV指控，Koi 安全的資安報告錯誤將其基礎架構與中國關聯網路間諜行動連結，並主張相關錯誤可能與AI幻覺有關。

- 📰 **iThome 科技**

### 30. [【資安日報】7月3日，駭客利用Azure CLI發動大規模密碼噴灑攻擊](https://www.ithome.com.tw/news/177072)

本日新聞焦點
● 駭客濫用Azure CLI試圖入侵Microsoft 365帳號
● 類似Citrix Bleed的重大漏洞已被用於實際攻擊

- 📰 **iThome 科技**

---

### 更多 AI 新聞 (70則)

- The Science Behind 為什麼 Soccer Players at the 2026 World Cup Are Cutting Their Socks (**Wired**)
- Bentley Torcal EV: Price, Specs, Availability (**Wired**)
- 9 最佳 Keyboards (2025), Tested and Reviewed (**Wired**)
- Sony Bravia 7 Mark II: Midrange but Priced High (2026) (**Wired**)
- Good News! Turns Out the Earth Will Never Be Swallowed by the Sun (**Wired**)
- ICE’s Internal Watchdog Is Now Investigating Online Critics (**Wired**)
- What if the Universe Isn’t as Uniform as Scientists Think? (**Wired**)
- How Palestinians Are Building a Digital Archive That Can’t Be Erased (**Wired**)
- 最佳 Wi-Fi Routers (2026): My Honest Picks After Testing 40+ (**Wired**)
- Prediction Markets Let You Bet on Whether a Wildfire Will Burn Down Your Town (**Wired**)
- Review: TCL RM9L RGB-Mini LED (2026) (**Wired**)
- Eight Sleep Pod 5 Review: The Smartest, Nosiest Bed You Can Buy (**Wired**)
- What Are Fish Oil Supplements Good For? Here’s Your Crash Course (**Wired**)
- There’s a Global 網絡 of Fungi Under Your Feet. This Is the First Complete Map (**Wired**)
- 如何 Avoid Spoilers Online and in Chats (**Wired**)
- Submit Your Questions: Inside The World of Online Romance Scams (**Wired**)
- 15 最佳 MagSafe Wireless Chargers (2026): Power Banks, Stands, Pads, and Travel Chargers (**Wired**)
- Where NASA Posts Its 最佳 Space Photos, and 如何 Find Them (**Wired**)
- This Buried Apple Feature Turns an iPhone Into the Perfect Kids’ Dumb Phone (**Wired**)
- 安全 Roundup: Apple’s Hide My Email Service Fails to Hide Your Email (**Wired**)
- Food Preservatives May Increase the Risk of High Blood Pressure and Cardiovascular Disease (**Wired**)
- The 最佳 Fourth of July Mattress Sales on Beds We Actually Sleep On (2026) (**Wired**)
- Scientists Have Identified a 新 Fossil Species of Axolotl in Mexico (**Wired**)
- 3 Nuclear Startups Hit a Big Milestone. 為什麼 It Matters—and 為什麼 It Doesn’t (**Wired**)
- Google DeepMind Unionization Talks Are Off to a Rocky Start (**Wired**)
- 最佳 Bone Conduction Headphones (2026): Shokz, Suunto, Mojawa (**Wired**)
- All Your Favorite Gadgets Are Getting Way More Expensive … Again (**Wired**)
- 7 最佳 Phones You Can’t Buy in the US (2026) (**Wired**)
- The FDA Ruled That ZYN Pouches Are Safer Than Cigarettes. That Doesn’t Mean They’re Safe (**Wired**)
- The 最佳 Ultralight Backpacking Quilts (2026): Zenbivy, REI (**Wired**)
- When the Law Kills Your Electric Car Dealership (**Wired**)
- The 11 最佳 TV Shows to Stream This Month (July 2026) (**Wired**)
- Sony Erases Digital Content From Libraries, a Reminder That You Don’t Own What You Buy (**Wired**)
- EU Politicians Investigated Pegasus Spyware. Then It Ended Up on One of Their Phones (**Wired**)
- The Onion’s ‘Infowars’ Parody Is Here. Alex Jones Is Going to Hate It (**Wired**)
- How Big Is ‘Love Island USA’? More Than 10 Million People Are Already on Its App (**Wired**)
- Spotify Confirms Streaming Fraud After Kalshi Trader Cries Foul (**Wired**)
- Can Cursor Remain a Platform for OpenAI and Anthropic’s Models Inside SpaceX? (**Wired**)
- The DEA Plans to Ban Opioid-Like Kratom Compound 7-OH (**Wired**)
- 7 Lesser-Known Google Account Settings You Should Change (**Wired**)
- 8 最佳 Travel Adapters (2026): My 熱門 Recommendations (**Wired**)
- Bublue BuVortex V5 Pool Skimmer Review: An Impractical Cleaner (**Wired**)
- How Trump Helped China Make America’s Cheapest EV (**Wired**)
- I Tried Rips, the Card-Pack App Where Users Spend Thousands Chasing Pricey Pokémon (**Wired**)
- Inside the Luddite Festival Harnessing Gen Z’s Rage Against Big Tech (**Wired**)
- Meta Is Charging a Subscription for Smart Glasses Features. Welcome to the 新 Era of Consumer Tech (**Wired**)
- Heat Domes Are Dangerous. July Fourth Activities Will Make Things Worse (**Wired**)
- Dell Coupon Codes: 20% Off for July 2026 (**Wired**)
- Paramount+ Coupon Codes and Deals for July 2026 (**Wired**)
- Booking.com Promo Codes: 20% Off | July 2026 (**Wired**)
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
