import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Briefcase, 
  CheckCircle, 
  TrendingUp,
  Code,
  Palette,
  PenTool,
  MessageCircle,
  Database,
  Camera,
  Mic,
  PlayCircle,
  Sparkles,
  Award,
  Clock,
  Shield
} from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const stats = [
    { label: 'فريلانسر نشط', value: '15,000+', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'مشروع مكتمل', value: '75,000+', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'عميل راضي', value: '35,000+', icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { label: 'وظيفة جديدة يوميًا', value: '800+', icon: Briefcase, color: 'from-purple-500 to-purple-600' }
  ];

  const features = [
    {
      title: 'وظائف حقيقية ومضمونة',
      description: 'جميع الوظائف محققة ومدفوعة الأجر مع ضمان الحماية',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      delay: 0.1
    },
    {
      title: 'أدوات احترافية مجانية',
      description: 'مجموعة شاملة من الأدوات لتطوير مهاراتك المهنية',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      title: 'مجتمع داعم ومتفاعل',
      description: 'تواصل مع آلاف الفريلانسرز وتبادل الخبرات',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      title: 'تعلم مستمر ومتطور',
      description: 'موارد تعليمية متجددة ودورات تدريبية متخصصة',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    }
  ];

  const jobCategories = [
    { name: 'برمجة وتطوير', icon: Code, count: 2450, color: 'from-blue-500 to-blue-600' },
    { name: 'تصميم جرافيك', icon: Palette, count: 1890, color: 'from-pink-500 to-rose-500' },
    { name: 'كتابة وترجمة', icon: PenTool, count: 1560, color: 'from-green-500 to-emerald-500' },
    { name: 'التسويق الرقمي', icon: TrendingUp, count: 1230, color: 'from-purple-500 to-violet-500' },
    { name: 'إدخال البيانات', icon: Database, count: 980, color: 'from-gray-500 to-gray-600' },
    { name: 'التصوير والمونتاج', icon: Camera, count: 870, color: 'from-orange-500 to-amber-500' },
    { name: 'الصوتيات', icon: Mic, count: 650, color: 'from-red-500 to-pink-500' },
    { name: 'الاستشارات', icon: MessageCircle, count: 540, color: 'from-cyan-500 to-blue-500' }
  ];

  const successStories = [
    {
      name: 'أحمد محمد علي',
      role: 'مطور ويب متخصص',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote: 'حققت 25,000 جنيه في أول 3 أشهر من العمل على شُغلي، والآن أعمل مع عملاء من جميع أنحاء العالم العربي',
      projects: 45,
      rating: 4.9,
      earnings: '25,000'
    },
    {
      name: 'فاطمة أحمد حسن',
      role: 'مصممة جرافيك إبداعية',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote: 'وجدت عملاء رائعين وبنيت علاقات طويلة الأمد، شُغلي غيّر حياتي المهنية تماماً',
      projects: 67,
      rating: 4.8,
      earnings: '18,500'
    },
    {
      name: 'محمد علي حسين',
      role: 'كاتب محتوى متميز',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote: 'شُغلي ساعدني أتحول من وظيفة تقليدية للعمل الحر وأحقق دخل أفضل بكثير',
      projects: 89,
      rating: 4.7,
      earnings: '22,000'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
          <motion.div 
            className="text-center w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-4xl">ش</span>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              شُغلك يبدأ من{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                شُغلي
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              منصة الفريلانسر الرائدة في مصر والوطن العربي
              <br />
              <span className="text-yellow-300 font-semibold">ابدأ رحلتك في العمل الحر اليوم واحقق أحلامك المهنية</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <GradientButton 
                variant="accent" 
                size="large" 
                className="text-xl px-12 py-5 shadow-2xl"
                icon={ArrowRight}
                iconPosition="right"
              >
                <Link to="/jobs">ابدأ العمل الآن</Link>
              </GradientButton>
              
              <GradientButton 
                variant="secondary" 
                size="large" 
                className="text-xl px-12 py-5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                icon={PlayCircle}
              >
                <Link to="/about">شاهد كيف نعمل</Link>
              </GradientButton>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              اكتشف مجال <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">خبرتك</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              آلاف الوظائف المتنوعة في انتظارك عبر جميع التخصصات والمجالات
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {jobCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card hover className="p-6 h-full">
                  <Link
                    to={`/jobs?category=${encodeURIComponent(category.name)}`}
                    className="block text-center group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{category.count.toLocaleString()} وظيفة</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min((category.count / 2500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              لماذا تختار <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">شُغلي؟</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن لا نقدم فقط الوظائف، بل نقدم تجربة متكاملة لنجاحك المهني
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 h-full text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              قصص <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">نجاح</span> ملهمة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف كيف غيّر شُغلي حياة آلاف الفريلانسرز في العالم العربي
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 h-full">
                  <div className="flex items-center mb-6">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-lg ml-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                      <p className="text-blue-600 font-medium">{story.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{story.projects}</div>
                      <div className="text-xs text-gray-500">مشروع</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-2xl font-bold text-yellow-600">{story.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">تقييم</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{story.earnings}</div>
                      <div className="text-xs text-gray-500">جنيه</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              جاهز لبدء <span className="text-yellow-300">رحلتك؟</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto">
              انضم إلى أكثر من 15,000 فريلانسر ناجح على منصة شُغلي
              <br />
              <span className="text-yellow-300 font-semibold">وابدأ في تحقيق أحلامك المهنية اليوم</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <GradientButton 
                variant="accent" 
                size="large" 
                className="text-xl px-12 py-5 shadow-2xl"
                icon={Users}
              >
                <Link to="/register">انضم كفريلانسر</Link>
              </GradientButton>
              
              <GradientButton 
                size="large" 
                className="text-xl px-12 py-5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                icon={Briefcase}
              >
                <Link to="/register">انضم كعميل</Link>
              </GradientButton>
            </div>

            <motion.div
              className="mt-16 flex justify-center items-center space-x-8 rtl:space-x-reverse"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center text-blue-100">
                <Shield className="w-6 h-6 mr-2" />
                <span>حماية كاملة للمدفوعات</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Award className="w-6 h-6 mr-2" />
                <span>ضمان الجودة</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Clock className="w-6 h-6 mr-2" />
                <span>دعم فني 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;