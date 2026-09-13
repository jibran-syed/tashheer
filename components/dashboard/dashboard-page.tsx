"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

type DashboardPageName = "overview" | "ads" | "create" | "billing" | "settings";

const dashboardCopy = {
  en: {
    common: { create: "Create New Ad", planned: "Planned", notConnected: "Not connected", save: "Save changes", preview: "Preview only" },
    overview: {
      eyebrow: "Saturday, 15 August",
      title: "Assalam-o-Alaikum, Ahmed 👋",
      description: "Here’s a simple view of how your advertising is doing.",
      metrics: [["Amount Spent", "PKR 4,850", "of PKR 7,000"], ["Leads", "21", "+6 this week"], ["Cost per Lead", "PKR 231", "12% lower"], ["Active Ads", "2", "of 3 allowed"]],
      performance: "Leads this week",
      performanceDetail: "People who contacted your business",
      recent: "Recent ads",
      viewAll: "View all ads",
      ad: "Ad",
      status: "Status",
      results: "Results",
      spent: "Spent",
      live: "Performing well",
      review: "Needs review",
      quick: "Quick actions",
      connect: "Connect Facebook Page",
      connectDetail: "Required before publishing your first ad.",
      billing: "Review billing",
      billingDetail: "Payments will be enabled in a future phase.",
    },
    ads: {
      eyebrow: "My advertising",
      title: "My Ads",
      description: "See every ad in one simple list and understand what is happening.",
      search: "Search ads",
      all: "All ads",
      active: "Active",
      drafts: "Drafts",
      columns: ["Ad", "Status", "Budget", "Leads", "Cost per lead", "Last updated"],
      rows: [["Eid Collection — Lahore", "Performing well", "PKR 1,000/day", "14", "PKR 226", "Today"], ["Fresh Cakes — Messages", "Active", "PKR 700/day", "7", "PKR 241", "Today"], ["Weekend Offer", "Draft", "PKR 500/day", "—", "—", "Yesterday"]],
      note: "Live editing, pausing, and publishing will become available after Meta integration is connected.",
    },
    create: {
      eyebrow: "New advertisement",
      title: "Create Your Ad",
      description: "Four simple steps. Your work is saved here only as a visual preview for now.",
      steps: ["Connect Page", "Add Content", "Set Budget", "Review"],
      business: "1. Choose your business page",
      page: "Facebook Page",
      pagePlaceholder: "Paste your Facebook Page link",
      connection: "Real page connection will be added with the Meta integration.",
      content: "2. What do you want to promote?",
      upload: "Drop a photo or video here",
      uploadDetail: "PNG, JPG or MP4 — up to 20MB",
      headline: "Short message",
      headlinePlaceholder: "Tell customers what makes your offer special",
      budget: "3. Set your daily budget",
      perDay: "per day",
      estimate: "Estimated weekly spend: PKR 7,000",
      review: "4. Review and continue",
      reviewDetail: "Publishing remains disabled until account and Meta integration phases are completed.",
      button: "Save Preview Ad",
    },
    billing: {
      eyebrow: "Plan and payments",
      title: "Billing",
      description: "A clear view of your Tashheer plan and separate advertising spend.",
      plan: "Current plan",
      starter: "Starter",
      monthly: "PKR 1,499 / month",
      activeAds: "Up to 3 active ads",
      status: "Preview — subscription not activated",
      manage: "Manage subscription",
      adSpend: "Meta advertising spend",
      spendValue: "PKR 4,850",
      spendNote: "Advertising spend is paid separately to Meta when the integration is live.",
      methods: "Planned payment options",
      methodsNote: "No payment method is currently stored or charged.",
      invoices: "Invoices",
      invoiceEmpty: "Invoices will appear here after paid subscriptions are enabled.",
    },
    settings: {
      eyebrow: "Your account",
      title: "Settings",
      description: "Manage your business details, preferences, and future connections.",
      business: "Business profile",
      businessName: "Business name",
      contactName: "Contact person",
      email: "Email address",
      phone: "Phone number",
      preferences: "Language and notifications",
      language: "Preferred language",
      languageValue: "Use the language toggle above",
      notifications: "Performance summary emails",
      connections: "Connections",
      meta: "Meta / Facebook Page",
      payments: "Payment provider",
      danger: "Account controls",
      signOut: "Sign out",
      delete: "Request account deletion",
    },
  },
  ur: {
    common: { create: "نیا اشتہار بنائیں", planned: "مجوزہ", notConnected: "منسلک نہیں", save: "تبدیلی محفوظ کریں", preview: "صرف نمونہ" },
    overview: {
      eyebrow: "ہفتہ، 15 اگست",
      title: "السلام علیکم، احمد 👋",
      description: "آپ کے اشتہارات کی کارکردگی کا آسان خلاصہ۔",
      metrics: [["خرچ شدہ رقم", "PKR 4,850", "PKR 7,000 میں سے"], ["لیڈز", "21", "اس ہفتے +6"], ["فی لیڈ لاگت", "PKR 231", "12% کم"], ["فعال اشتہارات", "2", "3 میں سے"]],
      performance: "اس ہفتے کی لیڈز",
      performanceDetail: "وہ لوگ جنہوں نے آپ کے کاروبار سے رابطہ کیا",
      recent: "حالیہ اشتہارات",
      viewAll: "تمام اشتہارات دیکھیں",
      ad: "اشتہار",
      status: "حالت",
      results: "نتائج",
      spent: "خرچ",
      live: "اچھی کارکردگی",
      review: "جائزہ درکار",
      quick: "فوری کام",
      connect: "فیس بک پیج جوڑیں",
      connectDetail: "پہلا اشتہار شائع کرنے سے پہلے ضروری ہے۔",
      billing: "بلنگ دیکھیں",
      billingDetail: "ادائیگی آئندہ مرحلے میں فعال ہوگی۔",
    },
    ads: {
      eyebrow: "میرے اشتہارات",
      title: "تمام اشتہارات",
      description: "تمام اشتہارات ایک آسان فہرست میں دیکھیں اور ان کی حالت سمجھیں۔",
      search: "اشتہار تلاش کریں",
      all: "سب",
      active: "فعال",
      drafts: "ڈرافٹ",
      columns: ["اشتہار", "حالت", "بجٹ", "لیڈز", "فی لیڈ لاگت", "آخری اپ ڈیٹ"],
      rows: [["عید کلیکشن — لاہور", "اچھی کارکردگی", "PKR 1,000 روزانہ", "14", "PKR 226", "آج"], ["تازہ کیک — پیغامات", "فعال", "PKR 700 روزانہ", "7", "PKR 241", "آج"], ["ویک اینڈ آفر", "ڈرافٹ", "PKR 500 روزانہ", "—", "—", "کل"]],
      note: "لائیو ترمیم، روکنے اور شائع کرنے کی سہولت میٹا انٹیگریشن کے بعد دستیاب ہوگی۔",
    },
    create: {
      eyebrow: "نیا اشتہار",
      title: "اپنا اشتہار بنائیں",
      description: "چار آسان مراحل۔ فی الحال آپ کا کام صرف بصری نمونے کے طور پر دکھایا جاتا ہے۔",
      steps: ["پیج جوڑیں", "مواد شامل کریں", "بجٹ مقرر کریں", "جائزہ"],
      business: "1. اپنا کاروباری پیج منتخب کریں",
      page: "فیس بک پیج",
      pagePlaceholder: "اپنے فیس بک پیج کا لنک دیں",
      connection: "حقیقی پیج کنکشن میٹا انٹیگریشن کے ساتھ شامل ہوگا۔",
      content: "2. آپ کس چیز کی تشہیر کرنا چاہتے ہیں؟",
      upload: "تصویر یا ویڈیو یہاں رکھیں",
      uploadDetail: "PNG، JPG یا MP4 — زیادہ سے زیادہ 20MB",
      headline: "مختصر پیغام",
      headlinePlaceholder: "گاہکوں کو اپنی پیشکش کی خاص بات بتائیں",
      budget: "3. روزانہ بجٹ مقرر کریں",
      perDay: "روزانہ",
      estimate: "تخمینی ہفتہ وار خرچ: PKR 7,000",
      review: "4. جائزہ اور آگے بڑھیں",
      reviewDetail: "اکاؤنٹ اور میٹا انٹیگریشن مکمل ہونے تک اشاعت غیر فعال ہے۔",
      button: "نمونہ اشتہار محفوظ کریں",
    },
    billing: {
      eyebrow: "پلان اور ادائیگی",
      title: "بلنگ",
      description: "تشہیر پلان اور الگ اشتہاری خرچ کا واضح خلاصہ۔",
      plan: "موجودہ پلان",
      starter: "اسٹارٹر",
      monthly: "PKR 1,499 ماہانہ",
      activeAds: "3 فعال اشتہارات تک",
      status: "نمونہ — سبسکرپشن فعال نہیں",
      manage: "سبسکرپشن سنبھالیں",
      adSpend: "میٹا اشتہاری خرچ",
      spendValue: "PKR 4,850",
      spendNote: "انٹیگریشن فعال ہونے پر اشتہاری خرچ الگ سے میٹا کو ادا ہوگا۔",
      methods: "مجوزہ ادائیگی کے ذرائع",
      methodsNote: "فی الحال کوئی ادائیگی ذریعہ محفوظ یا چارج نہیں کیا گیا۔",
      invoices: "انوائسز",
      invoiceEmpty: "ادائیگی والی سبسکرپشن فعال ہونے کے بعد انوائس یہاں نظر آئیں گے۔",
    },
    settings: {
      eyebrow: "آپ کا اکاؤنٹ",
      title: "ترتیبات",
      description: "کاروباری تفصیلات، ترجیحات اور آئندہ کنکشن سنبھالیں۔",
      business: "کاروباری پروفائل",
      businessName: "کاروبار کا نام",
      contactName: "رابطہ شخص",
      email: "ای میل",
      phone: "فون نمبر",
      preferences: "زبان اور اطلاعات",
      language: "پسندیدہ زبان",
      languageValue: "اوپر موجود زبان ٹوگل استعمال کریں",
      notifications: "کارکردگی خلاصہ ای میل",
      connections: "کنکشن",
      meta: "میٹا / فیس بک پیج",
      payments: "ادائیگی فراہم کنندہ",
      danger: "اکاؤنٹ کنٹرول",
      signOut: "سائن آؤٹ",
      delete: "اکاؤنٹ حذف کرنے کی درخواست",
    },
  },
} as const;

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-orange">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

function OverviewPage() {
  const { language, isUrdu } = useLanguage();
  const t = dashboardCopy[language];
  const o = t.overview;
  const recent = isUrdu
    ? [["عید کلیکشن — لاہور", o.live, "14", "PKR 3,160"], ["تازہ کیک — پیغامات", o.review, "7", "PKR 1,690"]]
    : [["Eid Collection — Lahore", o.live, "14", "PKR 3,160"], ["Fresh Cakes — Messages", o.review, "7", "PKR 1,690"]];

  return (
    <div className="mx-auto max-w-[1250px]">
      <PageHeading eyebrow={o.eyebrow} title={o.title} description={o.description} action={<Link href="/dashboard/create" className="brand-button-shadow inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-orange px-5 py-3 text-sm font-extrabold text-white">+ {t.common.create}</Link>} />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {o.metrics.map(([label, value, detail], index) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-xs font-bold text-muted">{label}</p>
            <p className={`mt-2 text-2xl font-black tracking-[-0.04em] ${index === 1 ? "text-brand-purple" : index === 2 ? "text-brand-orange" : ""}`}>{value}</p>
            <p className="mt-1 text-[10px] font-semibold text-muted">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-base font-black">{o.performance}</h2><p className="mt-1 text-xs text-muted">{o.performanceDetail}</p>
          <div className="bar-pattern mt-6 flex h-48 items-end justify-between gap-3 border-b border-line px-2 sm:px-5">
            {[36, 52, 44, 70, 59, 84, 96].map((height, index) => <div key={index} className={`w-full max-w-10 rounded-t-lg ${index === 6 ? "brand-gradient" : "bg-brand-orange/25"}`} style={{ height: `${height}%` }} />)}
          </div>
        </section>
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-base font-black">{o.quick}</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-brand-purple/10 p-4"><p className="text-sm font-extrabold text-brand-purple">{o.connect}</p><p className="mt-1 text-xs leading-5 text-muted">{o.connectDetail}</p></div>
            <Link href="/dashboard/billing" className="block rounded-xl bg-brand-orange/10 p-4"><p className="text-sm font-extrabold text-brand-orange">{o.billing}</p><p className="mt-1 text-xs leading-5 text-muted">{o.billingDetail}</p></Link>
          </div>
        </section>
      </div>
      <section className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line p-5 sm:px-6"><h2 className="font-black">{o.recent}</h2><Link href="/dashboard/ads" className="text-xs font-extrabold text-brand-purple">{o.viewAll}</Link></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-start text-sm"><thead className="bg-soft text-xs text-muted"><tr><th className="px-6 py-3 text-start">{o.ad}</th><th className="px-6 py-3 text-start">{o.status}</th><th className="px-6 py-3 text-start">{o.results}</th><th className="px-6 py-3 text-start">{o.spent}</th></tr></thead><tbody>{recent.map(([ad, status, results, spent], index) => <tr key={ad} className={index === 0 ? "border-b border-line" : ""}><td className="px-6 py-4 font-extrabold">{ad}</td><td className="px-6 py-4"><span className="rounded-full bg-brand-purple/10 px-2.5 py-1 text-xs font-bold text-brand-purple">{status}</span></td><td className="px-6 py-4 font-bold">{results}</td><td className="px-6 py-4 font-bold">{spent}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}

function AdsPage() {
  const { language } = useLanguage(); const t = dashboardCopy[language]; const a = t.ads;
  return <div className="mx-auto max-w-[1250px]"><PageHeading eyebrow={a.eyebrow} title={a.title} description={a.description} action={<Link href="/dashboard/create" className="brand-button-shadow rounded-xl bg-brand-orange px-5 py-3 text-sm font-extrabold text-white">+ {t.common.create}</Link>} /><div className="mt-7 rounded-2xl border border-line bg-white"><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-2">{[a.all,a.active,a.drafts].map((filter,index)=><button type="button" key={filter} className={`rounded-full px-3 py-2 text-xs font-extrabold ${index===0?"bg-foreground text-white":"bg-soft text-muted"}`}>{filter}</button>)}</div><label className="rounded-xl border border-line bg-soft px-4 py-2.5 text-xs text-muted">⌕ <input aria-label={a.search} placeholder={a.search} className="ms-2 bg-transparent outline-none" /></label></div><div className="overflow-x-auto"><table className="w-full min-w-[860px] text-sm"><thead className="bg-soft text-xs text-muted"><tr>{a.columns.map(column=><th key={column} className="px-5 py-3 text-start">{column}</th>)}</tr></thead><tbody>{a.rows.map((row,index)=><tr key={row[0]} className={index<a.rows.length-1?"border-b border-line":""}>{row.map((cell,cellIndex)=><td key={cellIndex} className={`px-5 py-4 ${cellIndex===0?"font-extrabold":"font-semibold"}`}>{cellIndex===1?<span className="rounded-full bg-brand-purple/10 px-2.5 py-1 text-xs text-brand-purple">{cell}</span>:cell}</td>)}</tr>)}</tbody></table></div></div><p className="mt-4 rounded-xl bg-brand-orange/10 p-4 text-xs leading-5 text-brand-orange">{a.note}</p></div>;
}

function CreatePage() {
  const { language } = useLanguage(); const t = dashboardCopy[language]; const c = t.create;
  return <div className="mx-auto max-w-5xl"><PageHeading eyebrow={c.eyebrow} title={c.title} description={c.description} /><div className="mt-7 grid grid-cols-4 gap-2">{c.steps.map((step,index)=><div key={step} className="text-center"><div className={`mx-auto grid size-9 place-items-center rounded-full text-xs font-black ${index===0?"bg-brand-orange text-white":"bg-white text-muted"}`}>{index+1}</div><p className="mt-2 text-[10px] font-bold text-muted sm:text-xs">{step}</p></div>)}</div><div className="mt-7 space-y-4"><section className="rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 className="text-lg font-black">{c.business}</h2><label className="mt-5 block text-xs font-extrabold text-muted">{c.page}<input placeholder={c.pagePlaceholder} className="mt-2 w-full rounded-xl border border-line bg-soft px-4 py-3.5 text-sm outline-none focus:border-brand-purple" /></label><p className="mt-3 text-xs text-brand-purple">{c.connection}</p></section><section className="rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 className="text-lg font-black">{c.content}</h2><button type="button" className="mt-5 flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-purple/30 bg-brand-purple/5 p-6"><span className="text-2xl text-brand-purple">＋</span><span className="mt-2 text-sm font-extrabold">{c.upload}</span><span className="mt-1 text-xs text-muted">{c.uploadDetail}</span></button><label className="mt-5 block text-xs font-extrabold text-muted">{c.headline}<textarea placeholder={c.headlinePlaceholder} rows={3} className="mt-2 w-full resize-none rounded-xl border border-line bg-soft px-4 py-3.5 text-sm outline-none focus:border-brand-purple" /></label></section><section className="rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 className="text-lg font-black">{c.budget}</h2><div className="mt-5 flex items-center rounded-xl border border-line bg-soft px-4"><span className="text-sm font-black">PKR</span><input defaultValue="1,000" aria-label={c.budget} className="w-full bg-transparent px-3 py-4 text-xl font-black outline-none" /><span className="text-xs font-bold text-muted">{c.perDay}</span></div><p className="mt-3 text-xs font-bold text-brand-orange">{c.estimate}</p></section><section className="rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 className="text-lg font-black">{c.review}</h2><p className="mt-2 text-sm leading-6 text-muted">{c.reviewDetail}</p><button type="button" className="mt-5 w-full rounded-xl bg-foreground px-6 py-4 text-sm font-extrabold text-white">{c.button} · {t.common.preview}</button></section></div></div>;
}

function BillingPage() {
  const { language } = useLanguage(); const t = dashboardCopy[language]; const b = t.billing;
  return <div className="mx-auto max-w-[1100px]"><PageHeading eyebrow={b.eyebrow} title={b.title} description={b.description} /><div className="mt-7 grid gap-4 md:grid-cols-2"><section className="rounded-2xl border border-line bg-white p-6"><p className="text-xs font-bold text-muted">{b.plan}</p><div className="mt-3 flex items-end justify-between"><div><h2 className="text-2xl font-black">{b.starter}</h2><p className="mt-1 text-sm font-bold text-brand-orange">{b.monthly}</p></div><span className="rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-bold text-brand-purple">{b.activeAds}</span></div><p className="mt-5 rounded-xl bg-soft p-3 text-xs text-muted">{b.status}</p><button type="button" className="mt-4 w-full rounded-xl border border-line px-4 py-3 text-sm font-extrabold text-muted">{b.manage} · {t.common.planned}</button></section><section className="rounded-2xl border border-line bg-white p-6"><p className="text-xs font-bold text-muted">{b.adSpend}</p><p className="mt-3 text-3xl font-black text-brand-purple">{b.spendValue}</p><p className="mt-3 text-xs leading-5 text-muted">{b.spendNote}</p></section></div><section className="mt-4 rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-black">{b.methods}</h2><p className="mt-1 text-xs text-muted">{b.methodsNote}</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{["JazzCash","easypaisa","VISA","Mastercard"].map(method=><div key={method} className="relative grid min-h-20 place-items-center rounded-xl border border-line bg-soft font-black"><span>{method}</span><span className="absolute end-2 top-2 text-[7px] font-black text-brand-purple">{t.common.planned}</span></div>)}</div></section><section className="mt-4 rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-black">{b.invoices}</h2><div className="mt-4 rounded-xl bg-soft p-8 text-center text-sm text-muted">{b.invoiceEmpty}</div></section></div>;
}

function SettingsPage() {
  const { language } = useLanguage(); const t = dashboardCopy[language]; const s = t.settings;
  return <div className="mx-auto max-w-[1000px]"><PageHeading eyebrow={s.eyebrow} title={s.title} description={s.description} /><div className="mt-7 space-y-4"><section className="rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-black">{s.business}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[[s.businessName,"Lahore Bakes"],[s.contactName,"Ahmed Khan"],[s.email,"ahmed@example.com"],[s.phone,"+92 300 1234567"]].map(([label,value])=><label key={label} className="text-xs font-extrabold text-muted">{label}<input defaultValue={value} className="mt-2 w-full rounded-xl border border-line bg-soft px-4 py-3 text-sm font-semibold text-foreground outline-none focus:border-brand-purple" /></label>)}</div><button type="button" className="mt-5 rounded-xl bg-foreground px-5 py-3 text-sm font-extrabold text-white">{t.common.save} · {t.common.preview}</button></section><section className="rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-black">{s.preferences}</h2><div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-extrabold">{s.language}</p><p className="mt-1 text-xs text-muted">{s.languageValue}</p></div><label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" defaultChecked className="accent-[var(--tashheer-orange)]" /> {s.notifications}</label></div></section><section className="rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-black">{s.connections}</h2><div className="mt-4 divide-y divide-line">{[s.meta,s.payments].map(item=><div key={item} className="flex items-center justify-between py-4"><span className="text-sm font-extrabold">{item}</span><span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">{t.common.notConnected}</span></div>)}</div></section><section className="rounded-2xl border border-brand-magenta/20 bg-brand-magenta/5 p-6"><h2 className="text-lg font-black">{s.danger}</h2><div className="mt-4 flex flex-wrap gap-3"><button type="button" className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-extrabold">{s.signOut}</button><button type="button" className="rounded-xl bg-brand-magenta px-4 py-2.5 text-sm font-extrabold text-white">{s.delete}</button></div></section></div></div>;
}

export function DashboardPage({ page }: { page: DashboardPageName }) {
  if (page === "ads") return <AdsPage />;
  if (page === "create") return <CreatePage />;
  if (page === "billing") return <BillingPage />;
  if (page === "settings") return <SettingsPage />;
  return <OverviewPage />;
}
