import React from 'react';
import { Target, Heart, Users, Award, CheckCircle, Star } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'الهدف',
      description: 'نسعى لتمكين الفريلانسرز العرب من تحقيق أهدافهم المهنية'
    },
    {
      icon: Heart,
      title: 'الشغف',
      description: 'نؤمن بقوة العمل الحر في تغيير حياة الناس'
    },
    {
      icon: Users,
      title: 'المجتمع',
      description: 'نبني مجتمعاً داعماً للفريلانسرز'
    },
    {
      icon: Award,
      title: 'الجودة',
      description: 'نلتزم بتقديم أفضل الخدمات والأدوات'
    }
  ];

  const team = [
    {
      name: 'أحمد محمد',
      role: 'المؤسس والمدير التنفيذي',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'خبير في مجال التكنولوجيا والعمل الحر لأكثر من 10 سنوات'
    },
    {
      name: 'فاطمة أحمد',
      role: 'مديرة المنتجات',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'متخصصة في تطوير المنتجات الرقمية وتجربة المستخدم'
    },
    {
      name: 'محمد علي',
      role: 'مدير التطوير',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'مطور full-stack مع خبرة واسعة في تطوير المنصات الرقمية'
    }
  ];

  const achievements = [
    { number: '10,000+', label: 'فريلانسر نشط' },
    { number: '50,000+', label: 'مشروع مكتمل' },
    { number: '25,000+', label: 'عميل راضي' },
    { number: '95%', label: 'معدل الرضا' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              نحن فريق من المتخصصين الذين يؤمنون بقوة العمل الحر في تغيير حياة الناس
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  بدأت فكرة شُغلي عام 2023 عندما لاحظنا الحاجة الماسة لمنصة عربية متخصصة في العمل الحر. 
                  كان الهدف هو خلق مساحة آمنة ومفيدة للفريلانسرز العرب لعرض مهاراتهم وإيجاد فرص عمل حقيقية.
                </p>
                <p>
                  اليوم، نحن فخورون بأن نكون جزءاً من رحلة آلاف الفريلانسرز نحو تحقيق الاستقلالية المالية 
                  والمهنية. منصتنا لا تقدم فقط الوظائف، بل تقدم أيضاً الأدوات والمعرفة اللازمة للنجاح.
                </p>
                <p>
                  نؤمن أن العمل الحر هو مستقبل العمل، ونحن ملتزمون بدعم هذا التحول في العالم العربي.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="فريق العمل"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-lg text-gray-600">المبادئ التي نؤمن بها ونعمل من خلالها</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">فريق العمل</h2>
            <p className="text-lg text-gray-600">الأشخاص الذين يقفون خلف نجاح شُغلي</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">إنجازاتنا</h2>
            <p className="text-xl text-blue-100">أرقام تعكس ثقة المجتمع فينا</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-blue-100">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا ورسالتنا</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">رؤيتنا</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                أن نكون المنصة الرائدة في العالم العربي للعمل الحر، ونساهم في بناء اقتصاد رقمي قوي 
                يمكن الأفراد من تحقيق أهدافهم المهنية والمالية من خلال مهاراتهم الفريدة.
              </p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">رسالتنا</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                توفير منصة آمنة وموثوقة تربط بين الفريلانسرز الموهوبين والعملاء الباحثين عن الجودة، 
                مع تقديم الأدوات والموارد اللازمة لضمان النجاح لجميع الأطراف.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;