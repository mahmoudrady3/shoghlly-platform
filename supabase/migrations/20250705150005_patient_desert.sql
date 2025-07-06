-- إعداد قاعدة البيانات لمنصة شُغلي
-- يجب تشغيل هذا الكود في Supabase SQL Editor

-- إنشاء جدول الملفات الشخصية
CREATE TABLE IF NOT EXISTS profiles (
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
CREATE TABLE IF NOT EXISTS jobs (
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
CREATE TABLE IF NOT EXISTS proposals (
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
CREATE TABLE IF NOT EXISTS community_posts (
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

-- إنشاء جدول ردود المجتمع
CREATE TABLE IF NOT EXISTS community_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;

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

-- سياسات الأمان لردود المجتمع
CREATE POLICY "Anyone can view community replies" ON community_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON community_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own replies" ON community_replies FOR UPDATE USING (auth.uid() = author_id);

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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ربط دالة التحديث بالجداول
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- إدراج بيانات تجريبية للوظائف
INSERT INTO jobs (title, description, category, budget_min, budget_max, duration, skills_required, client_id, level) VALUES
('تطوير موقع إلكتروني متكامل', 'نحتاج إلى تطوير موقع إلكتروني احترافي لشركة تجارية بتقنيات حديثة', 'برمجة وتطوير', 5000, 10000, '30 يوم', ARRAY['React', 'Node.js', 'MongoDB'], (SELECT id FROM profiles WHERE role = 'client' LIMIT 1), 'expert'),
('تصميم هوية بصرية كاملة', 'تصميم شعار وهوية بصرية متكاملة لمطعم جديد', 'تصميم جرافيك', 2000, 4000, '14 يوم', ARRAY['Photoshop', 'Illustrator'], (SELECT id FROM profiles WHERE role = 'client' LIMIT 1), 'intermediate'),
('كتابة محتوى تسويقي', 'نحتاج كاتب محتوى محترف لإنشاء محتوى تسويقي جذاب', 'كتابة وترجمة', 1500, 3000, '90 يوم', ARRAY['كتابة المحتوى', 'التسويق الرقمي'], (SELECT id FROM profiles WHERE role = 'client' LIMIT 1), 'intermediate');

-- إدراج بيانات تجريبية لمنشورات المجتمع
INSERT INTO community_posts (title, content, author_id, category, tags) VALUES
('كيف أبدأ كفريلانسر مبتدئ؟', 'أريد نصائح للبدء في العمل الحر، ما هي أفضل الطرق لبناء ملف شخصي قوي؟', (SELECT id FROM profiles WHERE role = 'freelancer' LIMIT 1), 'نصائح', ARRAY['مبتدئ', 'نصائح']),
('تجربتي في تحقيق 10,000 جنيه في أول شهر', 'أشارككم تجربتي في العمل الحر وكيف تمكنت من تحقيق دخل ممتاز', (SELECT id FROM profiles WHERE role = 'freelancer' LIMIT 1), 'قصص نجاح', ARRAY['قصة نجاح', 'تحفيز']);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_level ON jobs(level);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_job_id ON proposals(job_id);
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer_id ON proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);