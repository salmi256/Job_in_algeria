# Job in Algeria — وظائف في الجزائر

منصة للبحث عن الوظائف في الجزائر، مشابهة لتطبيق Job in Canada، مع تسجيل الدخول ونشر الوظائف والتقديم عليها.

## المميزات

- تسجيل الدخول وإنشاء حساب (باحث عن عمل / صاحب عمل)
- البحث عن الوظائف بالكلمات المفتاحية
- التصفية حسب الولاية (58 ولاية)، القطاع، ونوع الدوام
- نشر وظائف جديدة
- التقديم على الوظائف مع رسالة تحفيزية
- لوحة تحكم لمتابعة طلبات التوظيف
- واجهة عربية كاملة (RTL)

## التقنيات

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite
- JWT (httpOnly cookies) + bcrypt

## التشغيل محلياً

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npx tsx prisma/seed.ts   # بيانات تجريبية (اختياري)
npm run dev
```

ثم افتح http://localhost:3000
