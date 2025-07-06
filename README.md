# شُغلي - Shoghlly | منصة العمل الحر الرائدة

منصة احترافية للعمل الحر مخصصة للسوق العربي، تربط بين الفريلانسرز والعملاء بطريقة آمنة وفعالة.

## 🌟 المميزات الرئيسية

### 🔐 نظام المصادقة المتكامل
- تسجيل دخول وإنشاء حساب آمن
- دعم نوعين من المستخدمين (فريلانسر/عميل)
- حماية كاملة للبيانات الشخصية

### 💼 إدارة الوظائف
- عرض الوظائف مع فلترة متقدمة
- البحث حسب التخصص والمستوى
- تفاصيل شاملة لكل وظيفة

### 🛠️ أدوات الفريلانسر
- منشئ السيرة الذاتية
- حاسبة الأسعار الذكية
- متتبع الوقت (مميز)
- منشئ خطاب التغطية

### 👥 المجتمع التفاعلي
- منتدى للنقاش وتبادل الخبرات
- قصص نجاح ملهمة
- نصائح من الخبراء

### 🎨 تصميم عصري
- واجهة مستخدم حديثة ومتجاوبة
- دعم كامل للغة العربية (RTL)
- أنيميشن سلس وتفاعلي
- تصميم متوافق مع جميع الأجهزة

## 🚀 التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - للكتابة الآمنة
- **Tailwind CSS** - للتصميم السريع
- **Framer Motion** - للأنيميشن
- **React Router** - للتنقل بين الصفحات
- **Lucide React** - للأيقونات

### Backend & Database
- **Supabase** - قاعدة البيانات والمصادقة
- **PostgreSQL** - قاعدة البيانات الرئيسية
- **Row Level Security** - للحماية المتقدمة

### Tools & Deployment
- **Vite** - أداة البناء السريعة
- **ESLint** - لجودة الكود
- **PostCSS** - لمعالجة CSS

## 📦 التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone https://github.com/your-username/shoghlly.git
cd shoghlly
```

### 2. تثبيت التبعيات
```bash
npm install
```

### 3. إعداد متغيرات البيئة
```bash
cp .env.example .env
```

قم بتحديث ملف `.env` بمعلومات Supabase الخاصة بك:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. إعداد قاعدة البيانات
قم بتشغيل SQL التالي في Supabase:

```sql
-- إنشاء جدول الملفات الشخصية
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('client', 'freelancer')) NOT NULL,
  avatar_url TEXT,
  skills TEXT[],
  bio TEXT,
  phone TEXT,
  location TEXT,
  rating DECIMAL(3,2) DEFAULT 5.0,
  completed_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الوظائف
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  duration TEXT NOT NULL,
  skills_required TEXT[] NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'expert')) NOT NULL,
  proposals_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول العروض
CREATE TABLE proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  freelancer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT NOT NULL,
  proposed_budget INTEGER NOT NULL,
  delivery_time TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول منشورات المجتمع
CREATE TABLE community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للملفات الشخصية
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- سياسات الأمان للوظائف
CREATE POLICY "Anyone can view open jobs" ON jobs FOR SELECT USING (status = 'open');
CREATE POLICY "Clients can create jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = client_id);

-- سياسات الأمان للعروض
CREATE POLICY "Users can view proposals for their jobs/proposals" ON proposals FOR SELECT USING (
  auth.uid() IN (
    SELECT client_id FROM jobs WHERE id = job_id
    UNION
    SELECT freelancer_id
  )
);
CREATE POLICY "Freelancers can create proposals" ON proposals FOR INSERT WITH CHECK (auth.uid() = freelancer_id);

-- سياسات الأمان لمنشورات المجتمع
CREATE POLICY "Anyone can view community posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON community_posts FOR UPDATE USING (auth.uid() = author_id);

-- دالة لإنشاء ملف شخصي تلقائياً عند التسجيل
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'مستخدم جديد'),
    COALESCE(new.raw_user_meta_data->>'role', 'freelancer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ربط الدالة بحدث إنشاء مستخدم جديد
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 5. تشغيل المشروع
```bash
npm run dev
```

المشروع سيعمل على: `http://localhost:5173`

## 🏗️ البناء للإنتاج

```bash
npm run build
```

## 📁 هيكل المشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── Layout/         # مكونات التخطيط (Header, Footer)
│   └── ui/             # مكونات واجهة المستخدم
├── hooks/              # React Hooks المخصصة
├── lib/                # المكتبات والإعدادات
├── pages/              # صفحات التطبيق
│   ├── Auth/           # صفحات المصادقة
│   └── ...
├── types/              # تعريفات TypeScript
└── data/               # البيانات الوهمية والثوابت
```

## 🔧 الإعدادات المتقدمة

### إعداد Supabase
1. أنشئ مشروع جديد على [Supabase](https://supabase.com)
2. انسخ URL المشروع و Anon Key
3. قم بتشغيل SQL المطلوب لإنشاء الجداول
4. حدث ملف `.env` بالمعلومات الصحيحة

### تخصيص التصميم
- ألوان المشروع في `tailwind.config.js`
- خطوط عربية في `src/index.css`
- مكونات UI في `src/components/ui/`

## 🚀 النشر

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# ارفع مجلد dist إلى Netlify
```

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- الموقع: [shoghlly.com](https://shoghlly.com)
- البريد الإلكتروني: info@shoghlly.com
- تويتر: [@shoghlly](https://twitter.com/shoghlly)

## 🙏 شكر خاص

- [React](https://reactjs.org/) - مكتبة واجهة المستخدم
- [Tailwind CSS](https://tailwindcss.com/) - إطار عمل CSS
- [Supabase](https://supabase.com/) - Backend as a Service
- [Lucide](https://lucide.dev/) - مكتبة الأيقونات
- [Framer Motion](https://www.framer.com/motion/) - مكتبة الأنيميشن

---

**شُغلي** - حيث يبدأ شغلك 🚀