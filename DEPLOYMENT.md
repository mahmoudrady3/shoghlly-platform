# 🚀 دليل النشر - منصة شُغلي

## 📋 المتطلبات قبل النشر

### 1. إعداد Supabase
```bash
# 1. اذهب إلى https://supabase.com
# 2. أنشئ مشروع جديد
# 3. انسخ URL و ANON_KEY من Settings > API
# 4. شغّل SQL من ملف supabase/migrations/20250705150005_patient_desert.sql
```

### 2. إعداد متغيرات البيئة
```bash
# انسخ .env.example إلى .env
cp .env.example .env

# أضف بيانات Supabase الحقيقية
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🌐 خيارات النشر

### 1. Vercel (مُوصى به) ⭐
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر المشروع
vercel

# أو ربط GitHub وسيتم النشر تلقائياً
```

**المميزات:**
- نشر تلقائي من GitHub
- SSL مجاني
- CDN عالمي
- دعم متغيرات البيئة

### 2. Netlify
```bash
# بناء المشروع
npm run build

# ارفع مجلد dist إلى Netlify
# أو اربط GitHub للنشر التلقائي
```

### 3. Railway
```bash
# ربط GitHub مع Railway
# إضافة متغيرات البيئة في Dashboard
# النشر التلقائي
```

### 4. Firebase Hosting
```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# إعداد المشروع
firebase init hosting

# بناء ونشر
npm run build
firebase deploy
```

## ⚙️ إعدادات الإنتاج

### 1. تحسين الأداء
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
});
```

### 2. متغيرات البيئة للإنتاج
```bash
# في منصة النشر، أضف:
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 3. إعدادات Supabase للإنتاج
```sql
-- في Supabase Dashboard > Authentication > Settings
-- فعّل Email confirmations إذا كنت تريد تأكيد البريد الإلكتروني
-- أضف Site URL: https://your-domain.com
-- أضف Redirect URLs: https://your-domain.com/**
```

## 🔒 الأمان

### 1. Row Level Security
```sql
-- تأكد من تفعيل RLS على جميع الجداول
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
```

### 2. إعدادات CORS
```javascript
// في Supabase Dashboard > Settings > API
// أضف domain الإنتاج في CORS origins
```

## 📊 مراقبة الأداء

### 1. Google Analytics
```html
<!-- أضف في index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Sentry للأخطاء
```bash
npm install @sentry/react
```

## 🚀 خطوات النشر السريع

```bash
# 1. استنساخ المشروع
git clone [repository-url]
cd shoghlly

# 2. تثبيت التبعيات
npm install

# 3. إعداد البيئة
cp .env.example .env
# أضف بيانات Supabase

# 4. بناء المشروع
npm run build

# 5. نشر على Vercel
npx vercel --prod
```

## 🔧 استكشاف الأخطاء

### مشاكل شائعة:
1. **خطأ Supabase Connection**: تأكد من صحة URL و ANON_KEY
2. **خطأ CORS**: أضف domain في إعدادات Supabase
3. **خطأ Build**: تأكد من عدم وجود أخطاء TypeScript

### حلول:
```bash
# فحص الأخطاء
npm run type-check
npm run lint

# تنظيف cache
rm -rf node_modules package-lock.json
npm install
```

## 📈 تحسينات مستقبلية

1. **PWA**: تحويل لتطبيق ويب تقدمي
2. **SSR**: استخدام Next.js للتحسين
3. **CDN**: استخدام Cloudflare
4. **Database**: تحسين استعلامات Supabase
5. **Caching**: إضافة Redis للتخزين المؤقت

---

**🎉 مبروك! منصة شُغلي جاهزة للإطلاق!**