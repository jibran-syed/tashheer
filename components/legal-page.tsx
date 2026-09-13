"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";

const legalContent = {
  terms: {
    en: {
      eyebrow: "Legal",
      title: "Terms & Conditions",
      intro: "These Terms govern your access to Tashheer.pk and any related dashboard, tools, and services. By creating an account or using the service, you agree to them.",
      updated: "Effective date: 15 August 2026",
      translation: "The Urdu version is provided for convenience. If there is any difference in meaning, the English version will control to the extent permitted by law.",
      sections: [
        ["1. Who may use Tashheer", ["You must be at least 18 years old and legally able to enter a contract.", "If you use Tashheer for a business, you confirm that you are authorised to act for that business and connect its pages, accounts, content, and payment methods."]],
        ["2. Accounts and security", ["You must provide accurate information and keep your login details secure.", "You are responsible for activity performed through your account unless you promptly report unauthorised access to us.", "We may require verification or restrict access where fraud, misuse, or security risk is reasonably suspected."]],
        ["3. What Tashheer provides", ["Tashheer simplifies the preparation, publishing, and monitoring of online advertisements.", "Third-party advertising, social media, AI, and payment features may be provided by external platforms and remain subject to their own terms and approvals.", "Features labelled planned, beta, preview, or coming soon are not guaranteed to launch on a particular date."]],
        ["4. Your advertising responsibility", ["You are responsible for your products, services, offers, claims, audiences, landing pages, and all material submitted through Tashheer.", "Your advertisements must be truthful, substantiated, lawful, and must not infringe intellectual property, privacy, consumer, or other rights.", "You must not promote prohibited, unsafe, fraudulent, discriminatory, illegal, or misleading goods, services, or conduct.", "Tashheer may reject, pause, or remove content that creates legal, platform-policy, security, or reputational risk."]],
        ["5. Third-party platforms", ["You authorise Tashheer to act on your instructions when connecting to supported third-party services.", "Ad approval, delivery, reach, account restrictions, refunds, outages, and policy enforcement are controlled by the relevant third party, not Tashheer.", "You must comply with all applicable third-party terms and policies. Use of names or marks on this website does not imply endorsement or partnership."]],
        ["6. Fees, subscription, and advertising spend", ["Any Tashheer subscription fee is separate from advertising spend charged by Meta or another advertising platform.", "Prices, billing cycles, taxes, cancellation, and refund details will be shown before paid services are enabled or purchased.", "Unless required by law or expressly stated at checkout, fees already earned for a billing period are not refundable.", "You remain responsible for third-party charges authorised through your connected accounts."]],
        ["7. No guaranteed results", ["Advertising performance varies. Tashheer does not guarantee approvals, impressions, leads, sales, revenue, profitability, or any specific result.", "Dashboard figures may be delayed, estimated, rounded, or supplied by third parties and should not be treated as audited financial records."]],
        ["8. Intellectual property", ["Tashheer and its software, design, brand, and original content belong to Tashheer or its licensors.", "You keep ownership of your content and grant us a limited licence to host, process, format, and transmit it only as needed to provide, secure, and improve the service.", "You confirm that you have all permissions required for content you upload or advertise."]],
        ["9. Acceptable use", ["Do not reverse engineer, interfere with, overload, scrape, resell, or misuse the service.", "Do not upload malware, obtain unauthorised access, impersonate another person, evade restrictions, or use the service for spam or unlawful surveillance."]],
        ["10. Suspension and termination", ["You may stop using the service and cancel an enabled subscription through the available account controls.", "We may suspend or terminate access for material breach, non-payment, platform-policy violations, fraud, legal risk, or threats to users or systems.", "Where reasonable, we will provide notice and an opportunity to correct the issue."]],
        ["11. Service availability and warranties", ["The service is provided on an “as available” basis. We work to keep it reliable but cannot promise uninterrupted, error-free, or permanently available service.", "To the extent permitted by law, implied warranties are excluded. Rights that cannot lawfully be excluded remain unaffected."]],
        ["12. Liability", ["To the maximum extent permitted by law, Tashheer is not liable for indirect, incidental, special, punitive, or consequential loss, including lost profits, data, goodwill, or advertising opportunity.", "Tashheer’s total liability relating to the service will not exceed the fees paid to Tashheer for the three months before the event giving rise to the claim, except where applicable law requires otherwise.", "Nothing excludes liability that cannot legally be limited, including fraud or wilful misconduct."]],
        ["13. Indemnity", ["You will be responsible for reasonable losses, claims, and costs arising from your unlawful ads, products, content, breach of these Terms, or infringement of another person’s rights, to the extent permitted by law."]],
        ["14. Governing law and disputes", ["These Terms are governed by the applicable laws of Pakistan.", "Before filing a claim, both sides will try in good faith for 30 days to resolve it by written notice.", "Unresolved disputes may be brought before courts with lawful jurisdiction in Pakistan. Mandatory consumer rights remain available."]],
        ["15. Changes and contact", ["We may update these Terms to reflect service, legal, or security changes. Material changes will be communicated through the website, dashboard, or account email before they take effect where reasonably possible.", "Questions or legal notices may be sent to legal@tashheer.pk."]],
      ],
    },
    ur: {
      eyebrow: "قانونی معلومات",
      title: "شرائط و ضوابط",
      intro: "یہ شرائط Tashheer.pk، اس کے ڈیش بورڈ، ٹولز اور متعلقہ خدمات کے استعمال پر لاگو ہوتی ہیں۔ اکاؤنٹ بنانے یا سروس استعمال کرنے سے آپ ان شرائط سے اتفاق کرتے ہیں۔",
      updated: "موثر تاریخ: 15 اگست 2026",
      translation: "اردو ترجمہ سہولت کے لیے ہے۔ مفہوم میں فرق کی صورت میں، قانون کی اجازت کی حد تک انگریزی متن کو ترجیح حاصل ہوگی۔",
      sections: [
        ["1. کون استعمال کر سکتا ہے", ["آپ کی عمر کم از کم 18 سال اور قانونی معاہدہ کرنے کی اہلیت ہونی چاہیے۔", "کاروبار کی جانب سے استعمال کی صورت میں آپ تصدیق کرتے ہیں کہ آپ اس کاروبار کے پیجز، اکاؤنٹس، مواد اور ادائیگی کے ذرائع جوڑنے کے مجاز ہیں۔"]],
        ["2. اکاؤنٹ اور حفاظت", ["درست معلومات دیں اور اپنی لاگ اِن تفصیلات محفوظ رکھیں۔", "آپ کے اکاؤنٹ سے ہونے والی سرگرمی کی ذمہ داری آپ پر ہے، سوائے اس کے کہ غیر مجاز رسائی کی فوری اطلاع دی جائے۔", "فراڈ، غلط استعمال یا حفاظتی خطرے کی معقول صورت میں ہم تصدیق مانگ یا رسائی محدود کر سکتے ہیں۔"]],
        ["3. تشہیر کیا فراہم کرتا ہے", ["تشہیر آن لائن اشتہارات بنانے، شائع کرنے اور نگرانی کو آسان بناتا ہے۔", "اشتہاری، سوشل میڈیا، اے آئی اور ادائیگی کی خصوصیات بیرونی پلیٹ فارم فراہم کر سکتے ہیں اور ان کی اپنی شرائط و منظوری لاگو ہوگی۔", "مجوزہ، بیٹا، پری ویو یا جلد آنے والی خصوصیات کے اجرا کی مخصوص تاریخ کی ضمانت نہیں۔"]],
        ["4. آپ کے اشتہار کی ذمہ داری", ["آپ اپنی مصنوعات، خدمات، پیشکش، دعووں، ہدف، لینڈنگ پیجز اور جمع کرائے گئے تمام مواد کے ذمہ دار ہیں۔", "اشتہار سچا، قابلِ ثبوت اور قانونی ہونا چاہیے اور کسی کی دانشورانہ ملکیت، رازداری، صارف یا دیگر حقوق کی خلاف ورزی نہ کرے۔", "ممنوع، غیر محفوظ، دھوکہ دہی، امتیازی، غیر قانونی یا گمراہ کن چیزوں کی تشہیر منع ہے۔", "قانونی، پالیسی، سکیورٹی یا ساکھ کے خطرے والا مواد روکا یا ہٹایا جا سکتا ہے۔"]],
        ["5. بیرونی پلیٹ فارم", ["معاون بیرونی سروس سے منسلک ہونے پر آپ تشہیر کو اپنی ہدایات کے مطابق عمل کی اجازت دیتے ہیں۔", "اشتہار کی منظوری، ترسیل، رسائی، اکاؤنٹ پابندی، ریفنڈ، بندش اور پالیسی کا نفاذ متعلقہ بیرونی پلیٹ فارم کے اختیار میں ہے۔", "تمام بیرونی شرائط کی پابندی ضروری ہے۔ ویب سائٹ پر نام یا نشان توثیق یا شراکت داری ظاہر نہیں کرتے۔"]],
        ["6. فیس، سبسکرپشن اور اشتہاری خرچ", ["تشہیر کی سبسکرپشن فیس، میٹا یا کسی دوسرے اشتہاری پلیٹ فارم کے اشتہاری خرچ سے الگ ہے۔", "قیمت، بلنگ، ٹیکس، منسوخی اور ریفنڈ کی تفصیل ادائیگی فعال ہونے یا خریداری سے پہلے دکھائی جائے گی۔", "قانونی تقاضے یا چیک آؤٹ پر واضح وعدے کے علاوہ حاصل شدہ فیس واپس نہیں ہوگی۔", "منسلک اکاؤنٹس کے ذریعے منظور شدہ بیرونی چارجز آپ کی ذمہ داری ہیں۔"]],
        ["7. نتائج کی ضمانت نہیں", ["اشتہاری کارکردگی مختلف ہو سکتی ہے۔ منظوری، رسائی، لیڈز، فروخت، آمدنی یا منافع کی ضمانت نہیں۔", "ڈیش بورڈ کے اعداد تاخیر شدہ، تخمینی، گول یا بیرونی ذرائع سے ہو سکتے ہیں اور آڈٹ شدہ مالی ریکارڈ نہیں۔"]],
        ["8. دانشورانہ ملکیت", ["تشہیر کا سافٹ ویئر، ڈیزائن، برانڈ اور اصل مواد تشہیر یا اس کے لائسنس دہندگان کی ملکیت ہے۔", "آپ اپنے مواد کے مالک رہتے ہیں اور سروس فراہم، محفوظ اور بہتر بنانے کے لیے اسے ہوسٹ، پراسیس، فارمیٹ اور منتقل کرنے کا محدود اجازت نامہ دیتے ہیں۔", "آپ تصدیق کرتے ہیں کہ اپ لوڈ یا مشتہر کیے گئے مواد کی تمام اجازتیں آپ کے پاس ہیں۔"]],
        ["9. قابلِ قبول استعمال", ["سروس کی ریورس انجینئرنگ، مداخلت، حد سے زیادہ بوجھ، اسکریپنگ، دوبارہ فروخت یا غلط استعمال منع ہے۔", "میل ویئر، غیر مجاز رسائی، نقالی، پابندی سے بچنے، اسپیم یا غیر قانونی نگرانی کے لیے استعمال منع ہے۔"]],
        ["10. معطلی اور خاتمہ", ["آپ سروس کا استعمال روک اور دستیاب اکاؤنٹ کنٹرول کے ذریعے فعال سبسکرپشن منسوخ کر سکتے ہیں۔", "سنگین خلاف ورزی، عدم ادائیگی، پلیٹ فارم پالیسی کی خلاف ورزی، فراڈ یا قانونی و حفاظتی خطرے پر رسائی معطل یا ختم کی جا سکتی ہے۔", "جہاں مناسب ہو، مسئلہ درست کرنے کے لیے اطلاع اور موقع دیا جائے گا۔"]],
        ["11. دستیابی اور ضمانت", ["سروس دستیابی کی بنیاد پر فراہم ہوتی ہے۔ مسلسل، غلطی سے پاک یا مستقل دستیابی کی ضمانت نہیں۔", "قانون کی اجازت کی حد تک ضمنی ضمانتیں خارج ہیں؛ وہ حقوق برقرار ہیں جنہیں قانوناً خارج نہیں کیا جا سکتا۔"]],
        ["12. ذمہ داری کی حد", ["قانون کی اجازت کی زیادہ سے زیادہ حد تک، تشہیر بالواسطہ، اتفاقی، خصوصی یا نتیجتاً نقصان، منافع، ڈیٹا، ساکھ یا اشتہاری موقع کے نقصان کا ذمہ دار نہیں۔", "سروس سے متعلق کل ذمہ داری دعوے سے پہلے تین ماہ میں تشہیر کو ادا کی گئی فیس سے زیادہ نہیں ہوگی، الا یہ کہ قانون کچھ اور لازم کرے۔", "فراڈ یا دانستہ بدعملی سمیت ایسی ذمہ داری خارج نہیں جو قانوناً محدود نہ ہو سکتی ہو۔"]],
        ["13. ازالہ", ["قانون کی اجازت کی حد تک آپ اپنے غیر قانونی اشتہارات، مصنوعات، مواد، ان شرائط کی خلاف ورزی یا کسی کے حقوق کی خلاف ورزی سے پیدا معقول نقصانات، دعووں اور اخراجات کے ذمہ دار ہوں گے۔"]],
        ["14. قانون اور تنازعات", ["ان شرائط پر پاکستان کے قابلِ اطلاق قوانین لاگو ہوں گے۔", "دعویٰ دائر کرنے سے پہلے دونوں فریق تحریری اطلاع کے ذریعے 30 دن تک نیک نیتی سے حل کی کوشش کریں گے۔", "حل نہ ہونے پر پاکستان میں قانونی دائرۂ اختیار رکھنے والی عدالت سے رجوع کیا جا سکتا ہے۔ لازمی صارف حقوق برقرار رہیں گے۔"]],
        ["15. تبدیلی اور رابطہ", ["سروس، قانون یا سکیورٹی میں تبدیلی کے مطابق شرائط اپ ڈیٹ کی جا سکتی ہیں۔ اہم تبدیلی جہاں ممکن ہو نافذ ہونے سے پہلے ویب سائٹ، ڈیش بورڈ یا ای میل سے بتائی جائے گی۔", "سوال یا قانونی اطلاع legal@tashheer.pk پر بھیجیں۔"]],
      ],
    },
  },
  privacy: {
    en: {
      eyebrow: "Your data",
      title: "Privacy Policy",
      intro: "This Policy explains what information Tashheer.pk handles, why we use it, and the choices available to you.",
      updated: "Effective date: 15 August 2026",
      translation: "The Urdu version is provided for convenience. If there is any difference in meaning, the English version will control to the extent permitted by law.",
      sections: [
        ["1. Current Phase 1 website", ["The current public website does not provide live account, payment, or Meta advertising connections.", "It stores your selected language on your device using local storage. Contacting us by email provides us with the information included in your message.", "This Policy will be updated before live account, advertising, analytics, or payment processing is enabled."]],
        ["2. Information we may collect", ["Account details such as name, email, phone number, business name, and login or verification records.", "Business and advertising information such as connected page identifiers, ad content, budgets, instructions, audiences, and performance data.", "Transaction records such as subscription status, invoices, tax information, and payment confirmation. Full card or wallet credentials should be processed by approved payment providers, not stored by Tashheer unless clearly disclosed.", "Technical information such as device, browser, IP address, diagnostic logs, security events, cookies, and product usage.", "Communications, support requests, feedback, and consent or preference records."]],
        ["3. How we use information", ["To provide, personalise, secure, support, and improve Tashheer.", "To follow your instructions for creating or managing ads and connected services.", "To process subscriptions, maintain records, prevent fraud, and enforce agreements.", "To send service messages and, with required permission, product or marketing communications.", "To comply with law, lawful requests, and protect users, Tashheer, and the public."]],
        ["4. Legal and permission basis", ["Depending on the activity and applicable law, processing may be based on your consent, performance of a contract, compliance with legal duties, or legitimate interests such as security and service improvement.", "You may withdraw consent for future processing where consent is the applicable basis, without affecting earlier lawful processing."]],
        ["5. Sharing", ["We may share necessary information with hosting, security, analytics, communications, customer-support, AI, advertising, and payment service providers under appropriate contractual controls.", "When you connect Meta or another platform, information is exchanged according to your instructions and that platform’s privacy terms.", "We may disclose information where required by law, to protect rights and safety, during a corporate transaction, or with your direction.", "We do not sell personal information for money."]],
        ["6. Advertising and payment platforms", ["Connected platforms independently decide how they process information within their services. Review their privacy policies before connecting an account.", "Payment providers may collect identity, device, bank, card, or wallet information directly. Tashheer should receive only the confirmation and records needed to manage your subscription."]],
        ["7. Cookies and local storage", ["Essential storage may remember language, login state, security settings, and preferences.", "Non-essential analytics or advertising cookies will require appropriate notice or consent before use where applicable.", "You can clear storage through your browser, but some product functions may stop working."]],
        ["8. Retention", ["We keep information only as long as reasonably needed for the service, legal, accounting, dispute, fraud-prevention, and security purposes.", "Retention periods vary by data type. Data is deleted or anonymised when no longer needed, unless law requires continued retention."]],
        ["9. Security", ["We use reasonable administrative, technical, and organisational safeguards appropriate to the nature of the data.", "No online service is completely secure. Keep your credentials private and notify us promptly if you suspect unauthorised access."]],
        ["10. Your choices and rights", ["You may request access, correction, deletion, restriction, withdrawal of consent, or a copy of relevant personal information, subject to applicable law and verification.", "You may unsubscribe from marketing messages while continuing to receive essential service notices.", "Requests can be sent to privacy@tashheer.pk. We may retain information required for legal, security, or record-keeping purposes."]],
        ["11. International processing", ["Service providers or connected platforms may process information outside Pakistan. Where applicable, we will use reasonable contractual and security measures for such transfers."]],
        ["12. Children", ["Tashheer is a business advertising service and is not intended for anyone under 18. We do not knowingly collect children’s personal information."]],
        ["13. Changes and contact", ["We may update this Policy as the product, integrations, or law changes. Material changes will be communicated before they take effect where reasonably possible.", "Privacy questions or complaints may be sent to privacy@tashheer.pk. You may also use any complaint right available under applicable law."]],
      ],
    },
    ur: {
      eyebrow: "آپ کا ڈیٹا",
      title: "رازداری کی پالیسی",
      intro: "یہ پالیسی بتاتی ہے کہ Tashheer.pk کون سی معلومات استعمال کرتا ہے، کیوں کرتا ہے اور آپ کے پاس کیا اختیارات ہیں۔",
      updated: "موثر تاریخ: 15 اگست 2026",
      translation: "اردو ترجمہ سہولت کے لیے ہے۔ مفہوم میں فرق کی صورت میں، قانون کی اجازت کی حد تک انگریزی متن کو ترجیح حاصل ہوگی۔",
      sections: [
        ["1. موجودہ فیز 1 ویب سائٹ", ["موجودہ عوامی ویب سائٹ پر لائیو اکاؤنٹ، ادائیگی یا میٹا اشتہاری کنکشن فعال نہیں۔", "آپ کی منتخب زبان لوکل اسٹوریج کے ذریعے آپ کے آلے پر محفوظ ہوتی ہے۔ ای میل کرنے پر پیغام میں شامل معلومات ہمیں ملتی ہیں۔", "لائیو اکاؤنٹ، اشتہارات، اینالیٹکس یا ادائیگی فعال ہونے سے پہلے یہ پالیسی اپ ڈیٹ کی جائے گی۔"]],
        ["2. ممکنہ طور پر جمع کی جانے والی معلومات", ["نام، ای میل، فون، کاروبار کا نام اور لاگ اِن یا تصدیقی ریکارڈ۔", "کاروباری اور اشتہاری معلومات جیسے منسلک پیج شناخت، اشتہاری مواد، بجٹ، ہدایات، ہدف اور کارکردگی ڈیٹا۔", "سبسکرپشن، انوائس، ٹیکس اور ادائیگی کی تصدیق۔ مکمل کارڈ یا والٹ معلومات منظور شدہ ادائیگی فراہم کنندہ پراسیس کرے گا، جب تک واضح طور پر کچھ اور نہ بتایا جائے۔", "ڈیوائس، براؤزر، آئی پی، تشخیصی لاگز، سکیورٹی واقعات، کوکیز اور استعمال کی معلومات۔", "رابطے، سپورٹ درخواستیں، رائے اور رضامندی یا ترجیح کا ریکارڈ۔"]],
        ["3. معلومات کا استعمال", ["تشہیر فراہم، ذاتی نوعیت، محفوظ، معاون اور بہتر بنانے کے لیے۔", "اشتہارات یا منسلک خدمات سے متعلق آپ کی ہدایات پر عمل کے لیے۔", "سبسکرپشن، ریکارڈ، فراڈ سے بچاؤ اور معاہدے کے نفاذ کے لیے۔", "سروس پیغامات اور ضروری اجازت کے ساتھ پروڈکٹ یا مارکیٹنگ رابطے کے لیے۔", "قانونی تقاضے، جائز درخواست اور صارفین، تشہیر اور عوام کے تحفظ کے لیے۔"]],
        ["4. قانونی یا رضامندی کی بنیاد", ["سرگرمی اور قابلِ اطلاق قانون کے مطابق پراسیسنگ آپ کی رضامندی، معاہدے پر عمل، قانونی ذمہ داری یا سکیورٹی اور بہتری جیسے جائز مفاد پر مبنی ہو سکتی ہے۔", "جہاں رضامندی بنیاد ہو وہاں آپ مستقبل کے استعمال کے لیے رضامندی واپس لے سکتے ہیں؛ پہلے کی جائز پراسیسنگ متاثر نہیں ہوگی۔"]],
        ["5. معلومات کی شراکت", ["ضروری معلومات ہوسٹنگ، سکیورٹی، اینالیٹکس، رابطہ، سپورٹ، اے آئی، اشتہاری اور ادائیگی فراہم کنندگان سے مناسب معاہداتی حفاظت کے تحت شیئر کی جا سکتی ہیں۔", "میٹا یا دوسرے پلیٹ فارم کو جوڑنے پر معلومات آپ کی ہدایت اور اس پلیٹ فارم کی رازداری شرائط کے مطابق منتقل ہوتی ہیں۔", "قانون، حقوق و حفاظت، کاروباری لین دین یا آپ کی ہدایت پر معلومات ظاہر کی جا سکتی ہیں۔", "ہم ذاتی معلومات پیسوں کے عوض فروخت نہیں کرتے۔"]],
        ["6. اشتہاری اور ادائیگی پلیٹ فارم", ["منسلک پلیٹ فارم اپنی سروس میں معلومات کے استعمال کا خود فیصلہ کرتے ہیں۔ اکاؤنٹ جوڑنے سے پہلے ان کی پالیسی دیکھیں۔", "ادائیگی فراہم کنندہ شناخت، ڈیوائس، بینک، کارڈ یا والٹ معلومات براہِ راست لے سکتا ہے۔ تشہیر کو صرف سبسکرپشن کے لیے ضروری تصدیق اور ریکارڈ ملنا چاہیے۔"]],
        ["7. کوکیز اور لوکل اسٹوریج", ["ضروری اسٹوریج زبان، لاگ اِن حالت، سکیورٹی اور ترجیحات یاد رکھ سکتا ہے۔", "غیر ضروری اینالیٹکس یا اشتہاری کوکیز کے لیے جہاں لازم ہو، استعمال سے پہلے مناسب اطلاع یا رضامندی لی جائے گی۔", "براؤزر سے اسٹوریج صاف کیا جا سکتا ہے، مگر کچھ خصوصیات کام نہ کریں گی۔"]],
        ["8. معلومات محفوظ رکھنے کی مدت", ["معلومات صرف سروس، قانون، اکاؤنٹنگ، تنازع، فراڈ سے بچاؤ اور سکیورٹی کی معقول ضرورت تک رکھی جاتی ہے۔", "مدت ڈیٹا کی نوعیت کے مطابق مختلف ہے۔ ضرورت ختم ہونے پر معلومات حذف یا غیر شناختی کی جائے گی، الا یہ کہ قانون محفوظ رکھنا لازم کرے۔"]],
        ["9. حفاظت", ["ڈیٹا کی نوعیت کے مطابق معقول انتظامی، تکنیکی اور تنظیمی حفاظتی اقدامات کیے جاتے ہیں۔", "کوئی آن لائن سروس مکمل محفوظ نہیں۔ اپنی لاگ اِن معلومات خفیہ رکھیں اور غیر مجاز رسائی کا شبہ ہو تو فوری اطلاع دیں۔"]],
        ["10. آپ کے اختیارات اور حقوق", ["قانون اور تصدیق کے مطابق آپ رسائی، تصحیح، حذف، پابندی، رضامندی واپسی یا متعلقہ معلومات کی نقل مانگ سکتے ہیں۔", "مارکیٹنگ پیغامات بند کیے جا سکتے ہیں جبکہ ضروری سروس پیغامات جاری رہیں گے۔", "درخواست privacy@tashheer.pk پر بھیجیں۔ قانونی، حفاظتی یا ریکارڈ کی ضروری معلومات برقرار رکھی جا سکتی ہیں۔"]],
        ["11. بین الاقوامی پراسیسنگ", ["فراہم کنندہ یا منسلک پلیٹ فارم پاکستان سے باہر معلومات پراسیس کر سکتا ہے۔ جہاں لازم ہو معقول معاہداتی اور حفاظتی اقدامات کیے جائیں گے۔"]],
        ["12. بچے", ["تشہیر کاروباری اشتہاری سروس ہے اور 18 سال سے کم عمر کے لیے نہیں۔ ہم جان بوجھ کر بچوں کی ذاتی معلومات جمع نہیں کرتے۔"]],
        ["13. تبدیلی اور رابطہ", ["پروڈکٹ، انٹیگریشن یا قانون میں تبدیلی کے ساتھ پالیسی اپ ڈیٹ ہو سکتی ہے۔ اہم تبدیلی جہاں ممکن ہو نافذ ہونے سے پہلے بتائی جائے گی۔", "رازداری کے سوال یا شکایت privacy@tashheer.pk پر بھیجیں۔ قابلِ اطلاق قانون کے تحت دستیاب شکایت کا حق بھی استعمال کیا جا سکتا ہے۔"]],
      ],
    },
  },
} as const;

export function LegalPage({ type }: { type: "terms" | "privacy" }) {
  const { language } = useLanguage();
  const content = legalContent[type][language];

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="border-b border-line bg-soft py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-brand-orange">{content.eyebrow}</span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">{content.intro}</p>
            <div className="mt-6 flex flex-col gap-2 text-xs font-bold text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>{content.updated}</span>
              <span className="max-w-xl sm:text-end">{content.translation}</span>
            </div>
          </div>
        </section>
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl space-y-5 px-5 sm:px-8">
            {content.sections.map(([heading, items]) => (
              <article key={heading} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="text-xl font-black tracking-[-0.025em] sm:text-2xl">{heading}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted sm:text-base">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
