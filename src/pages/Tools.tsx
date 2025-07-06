import React, { useState } from 'react';
import { FileText, Calculator, Clock, Mail, Download, Star, Crown } from 'lucide-react';
import { mockTools } from '../data/mockData';
import Button from '../components/ui/Button';

const Tools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [cvData, setCvData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    education: ''
  });
  const [priceData, setPriceData] = useState({
    projectType: '',
    complexity: '',
    timeframe: '',
    revision: ''
  });

  const IconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Calculator': return Calculator;
      case 'Clock': return Clock;
      case 'Mail': return Mail;
      default: return FileText;
    }
  };

  const CVBuilder = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-6">منشئ السيرة الذاتية</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
            <input
              type="text"
              value={cvData.name}
              onChange={(e) => setCvData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل اسمك الكامل"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={cvData.email}
              onChange={(e) => setCvData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              value={cvData.phone}
              onChange={(e) => setCvData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+20 123 456 7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الخبرة المهنية</label>
            <textarea
              value={cvData.experience}
              onChange={(e) => setCvData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="اكتب خبرتك المهنية..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">المهارات</label>
            <input
              type="text"
              value={cvData.skills}
              onChange={(e) => setCvData(prev => ({ ...prev, skills: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="JavaScript, React, التصميم..."
            />
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-4">معاينة السيرة الذاتية</h4>
          <div className="bg-white p-4 rounded border min-h-[400px]">
            <div className="text-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{cvData.name || 'اسمك'}</h2>
              <p className="text-gray-600">{cvData.email || 'your@email.com'}</p>
              <p className="text-gray-600">{cvData.phone || '+20 123 456 7890'}</p>
            </div>
            
            {cvData.experience && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">الخبرة المهنية</h3>
                <p className="text-sm text-gray-700">{cvData.experience}</p>
              </div>
            )}
            
            {cvData.skills && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">المهارات</h3>
                <p className="text-sm text-gray-700">{cvData.skills}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button size="small" icon={Download}>
              تحميل PDF
            </Button>
            <Button variant="outline" size="small">
              مشاركة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const PriceCalculator = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-6">حاسبة الأسعار</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المشروع</label>
            <select
              value={priceData.projectType}
              onChange={(e) => setPriceData(prev => ({ ...prev, projectType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر نوع المشروع</option>
              <option value="website">موقع إلكتروني</option>
              <option value="mobile">تطبيق موبايل</option>
              <option value="design">تصميم</option>
              <option value="content">كتابة محتوى</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التعقيد</label>
            <select
              value={priceData.complexity}
              onChange={(e) => setPriceData(prev => ({ ...prev, complexity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر مستوى التعقيد</option>
              <option value="simple">بسيط</option>
              <option value="medium">متوسط</option>
              <option value="complex">معقد</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الإطار الزمني</label>
            <select
              value={priceData.timeframe}
              onChange={(e) => setPriceData(prev => ({ ...prev, timeframe: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر الإطار الزمني</option>
              <option value="week">أسبوع</option>
              <option value="month">شهر</option>
              <option value="quarter">3 أشهر</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عدد التعديلات</label>
            <select
              value={priceData.revision}
              onChange={(e) => setPriceData(prev => ({ ...prev, revision: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر عدد التعديلات</option>
              <option value="2">تعديلين</option>
              <option value="5">5 تعديلات</option>
              <option value="unlimited">غير محدود</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-4">السعر المقترح</h4>
          <div className="bg-white p-4 rounded border">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {priceData.projectType && priceData.complexity && priceData.timeframe ? 
                  `${Math.floor(Math.random() * 5000) + 2000} - ${Math.floor(Math.random() * 8000) + 5000}` : 
                  '0 - 0'
                } جنيه
              </div>
              <p className="text-sm text-gray-600 mb-4">هذا السعر تقديري بناءً على معايير السوق</p>
              
              {priceData.projectType && priceData.complexity && priceData.timeframe && (
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>نوع المشروع:</span>
                    <span className="font-medium">{priceData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التعقيد:</span>
                    <span className="font-medium">{priceData.complexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الإطار الزمني:</span>
                    <span className="font-medium">{priceData.timeframe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التعديلات:</span>
                    <span className="font-medium">{priceData.revision}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Button size="small" className="w-full">
              إنشاء عرض سعر مفصل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const TimeTracker = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-6">متتبع الوقت</h3>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <Crown className="w-8 h-8 text-blue-600" />
        </div>
        <h4 className="text-lg font-medium mb-2">أداة مميزة</h4>
        <p className="text-gray-600 mb-4">هذه الأداة متاحة للمشتركين المميزين فقط</p>
        <Button variant="outline">
          اشترك الآن
        </Button>
      </div>
    </div>
  );

  const renderTool = () => {
    switch (selectedTool) {
      case '1': return <CVBuilder />;
      case '2': return <PriceCalculator />;
      case '3': return <TimeTracker />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">أدوات الفريلانسر</h1>
          <p className="text-lg text-gray-600">أدوات مجانية تساعدك في العمل الحر</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">الأدوات المتاحة</h3>
              <div className="space-y-2">
                {mockTools.map((tool) => {
                  const Icon = IconComponent(tool.icon);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedTool === tool.id
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'hover:bg-gray-50 border-transparent'
                      } border`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{tool.name}</h4>
                            {tool.isPremium && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-3">
            {selectedTool ? (
              renderTool()
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Calculator className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">اختر أداة للبدء</h3>
                <p className="text-gray-600">اختر أداة من القائمة الجانبية لتبدأ استخدامها</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;