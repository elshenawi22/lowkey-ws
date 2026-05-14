# الطريقة المضمونة 100% — نفس الموقع بالظبط على Shopify

## الطريقة 1: Vercel + Shopify (الأحسن) ✅

ده اللي بتعمله البراندات الكبيرة زي Fear of God.

### الخطوات:
1. روح vercel.com واعمل حساب مجاني
2. اربط الـ GitHub repo بتاعك
3. Vercel هيعمل build تلقائي ويديك link
4. اربط الـ domain بتاعك (lowkey.co مثلاً)
5. في Shopify خلي الـ checkout بس

### النتيجة:
- الموقع اللي شايفه هنا بالظبط → على الـ domain بتاعك
- الـ checkout → Shopify
- مفيش أي فرق بين اللي هنا واللي هناك

---

## الطريقة 2: Shopify بس — إزاي تنقل الموقع

### الخطوة 1: ارفع الملفات

في Shopify Admin → Online Store → Themes → Edit Code:

1. امسح كل محتويات `layout/theme.liquid`
2. ضع محتويات الملف ده بدلها (من المشروع):
   - افتح `dist/index.html` 
   - انسخ كل حاجة من `<head>` لغاية قبل `</head>`
   - ضيف `{{ content_for_header }}` قبل `</head>`
   - في الـ `<body>` خلي `{{ content_for_layout }}` جوه `<main>`

3. الصور: روح Settings → Files → Upload
   - ارفع كل الصور من public/images/
   - واستبدل الـ paths في الكود

### الخطوة 2: أو ارفع كملف واحد

1. افتح `dist/index.html` في text editor
2. في السطر بتاع `<head>` ضيف:
   ```
   {{ content_for_header }}
   ```
3. بدل `<div id="root"></div>` حط:
   ```
   {{ content_for_layout }}
   <div id="root"></div>
   ```
4. احفظ الملف باسم `theme.liquid`
5. حطه في `layout/theme.liquid`
6. اعمل templates/index.liquid فيه سطر واحد: (فاضي)
7. ارفع الـ zip

---

## الخلاصة

الموقع اللي بتشوفه هنا هو React app كامل. 
Shopify themes بتشتغل بـ Liquid وهو نظام مختلف تماماً.
مستحيل يبقوا identical 100% إلا لو استخدمت Vercel/Netlify.

الـ Shopify theme اللي عملته (shopify-theme/) فيه نفس:
- الألوان
- الـ typography 
- الـ layout
- الـ dark/light mode
- الـ animations

بس مش هيبقى pixel-perfect نسخة من الـ React site لأن:
- React بيستخدم Framer Motion (مفيش equivalent في Liquid)
- Tailwind CSS بيتعمل compile مختلف
- الـ state management مختلف

لو عايز نسخة EXACT → استخدم Vercel.
