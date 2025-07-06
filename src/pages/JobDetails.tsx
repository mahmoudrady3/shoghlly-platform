import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  DollarSign, 
  User, 
  Star, 
  MapPin, 
  Calendar,
  Send,
  Heart,
  Share2,
  Flag
} from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import GradientButton from '../components/ui/GradientButton';
import Button from '../components/ui/Button';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposal, setProposal] = useState({
    coverLetter: '',
    budget: '',
    deliveryTime: ''
  });

  // في التطبيق الحقيقي، ستجلب البيانات من API
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">الوظيفة غير موجودة</h2>
          <p className="text-gray-600 mb-4">لم نتمكن من العثور على الوظيفة المطلوبة</p>
          <Link to="/jobs">
            <Button>العودة للوظائف</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا ستتم معالجة إرسال العرض
    console.log('Proposal submitted:', proposal);
    setShowProposalForm(false);
    setProposal({ coverLetter: '', budget: '', deliveryTime: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
          <ArrowRight className="w-4 h-4" />
          <Link to="/jobs" className="hover:text-blue-600">الوظائف</Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-900">{job.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>نُشر في {job.postedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{job.proposals} متقدم</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="small" icon={Heart}>
                      حفظ
                    </Button>
                    <Button variant="outline" size="small" icon={Share2}>
                      مشاركة
                    </Button>
                    <Button variant="outline" size="small" icon={Flag}>
                      إبلاغ
                    </Button>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <h3 className="text-xl font-semibold mb-4">وصف المشروع</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-3">المهارات المطلوبة</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg font-semibold mb-3">تفاصيل إضافية</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>يُفضل وجود خبرة سابقة في مشاريع مماثلة</li>
                    <li>التواصل باللغة العربية مطلوب</li>
                    <li>إمكانية التطوير المستقبلي للمشروع</li>
                    <li>تسليم الملفات المصدرية مطلوب</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Proposal Form */}
            {showProposalForm && profile?.role === 'freelancer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8">
                  <h3 className="text-xl font-semibold mb-6">تقديم عرض</h3>
                  <form onSubmit={handleSubmitProposal} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        خطاب التغطية
                      </label>
                      <textarea
                        value={proposal.coverLetter}
                        onChange={(e) => setProposal(prev => ({ ...prev, coverLetter: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={6}
                        placeholder="اكتب خطاب تغطية مقنع يوضح خبرتك وكيف ستنجز المشروع..."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          السعر المقترح (جنيه)
                        </label>
                        <input
                          type="number"
                          value={proposal.budget}
                          onChange={(e) => setProposal(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="5000"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          مدة التسليم
                        </label>
                        <select
                          value={proposal.deliveryTime}
                          onChange={(e) => setProposal(prev => ({ ...prev, deliveryTime: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">اختر المدة</option>
                          <option value="3 أيام">3 أيام</option>
                          <option value="أسبوع">أسبوع</option>
                          <option value="أسبوعين">أسبوعين</option>
                          <option value="شهر">شهر</option>
                          <option value="أكثر من شهر">أكثر من شهر</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-4 rtl:space-x-reverse">
                      <GradientButton type="submit" icon={Send}>
                        إرسال العرض
                      </GradientButton>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProposalForm(false)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">تفاصيل الوظيفة</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الميزانية</span>
                    <span className="font-semibold text-green-600">
                      {job.budget.min} - {job.budget.max} جنيه
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المدة</span>
                    <span className="font-semibold">{job.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المستوى</span>
                    <span className="font-semibold capitalize">
                      {job.level === 'beginner' ? 'مبتدئ' : 
                       job.level === 'intermediate' ? 'متوسط' : 'خبير'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">التخصص</span>
                    <span className="font-semibold">{job.category}</span>
                  </div>
                </div>

                {profile?.role === 'freelancer' && !showProposalForm && (
                  <div className="mt-6">
                    <GradientButton
                      className="w-full"
                      onClick={() => setShowProposalForm(true)}
                      icon={Send}
                    >
                      تقديم عرض
                    </GradientButton>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">معلومات العميل</h3>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                  <img
                    src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={job.clientName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.clientName}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{job.clientRating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المشاريع المكتملة</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">معدل التوظيف</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">عضو منذ</span>
                    <span className="font-semibold">2022</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  عرض الملف الشخصي
                </Button>
              </Card>
            </motion.div>

            {/* Similar Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">وظائف مشابهة</h3>
                <div className="space-y-4">
                  {mockJobs.slice(0, 3).map((similarJob) => (
                    <Link
                      key={similarJob.id}
                      to={`/jobs/${similarJob.id}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {similarJob.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {similarJob.budget.min} - {similarJob.budget.max} جنيه
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {similarJob.duration}
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;