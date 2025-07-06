import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Clock, Users, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import { jobCategories } from '../data/mockData';
import Card from '../components/ui/Card';
import GradientButton from '../components/ui/GradientButton';
import Button from '../components/ui/Button';

const CreateJob: React.FC = () => {
  const { profile } = useAuth();
  const { createJob } = useJobs();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget_min: '',
    budget_max: '',
    duration: '',
    level: 'intermediate',
    skills_required: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || profile.role !== 'client') {
      setError('يجب أن تكون عميلاً لإنشاء وظيفة');
      return;
    }

    setLoading(true);
    setError('');

    const jobData = {
      ...formData,
      budget_min: parseInt(formData.budget_min),
      budget_max: parseInt(formData.budget_max),
      skills_required: formData.skills_required.split(',').map(s => s.trim()).filter(s => s),
      client_id: profile.id
    };

    const result = await createJob(jobData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'حدث خطأ أثناء إنشاء الوظيفة');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!profile || profile.role !== 'client') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">غير مصرح</h2>
          <p className="text-gray-600 mb-4">يجب أن تكون عميلاً لإنشاء وظيفة</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء وظيفة جديدة</h1>
            <p className="text-gray-600">أضف تفاصيل المشروع لتجد أفضل الفريلانسرز</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان الوظيفة *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: تطوير موقع إلكتروني لشركة تجارية"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التخصص *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">اختر التخصص</option>
                  {jobCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف المشروع *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="اكتب وصفاً مفصلاً للمشروع، المتطلبات، والنتائج المتوقعة..."
                  required
                />
              </div>

              {/* Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحد الأدنى للميزانية (جنيه) *
                  </label>
                  <input
                    type="number"
                    name="budget_min"
                    value={formData.budget_min}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحد الأقصى للميزانية (جنيه) *
                  </label>
                  <input
                    type="number"
                    name="budget_max"
                    value={formData.budget_max}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                    required
                  />
                </div>
              </div>

              {/* Duration and Level */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مدة المشروع *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المدة</option>
                    <option value="أقل من أسبوع">أقل من أسبوع</option>
                    <option value="1-2 أسبوع">1-2 أسبوع</option>
                    <option value="شهر">شهر</option>
                    <option value="2-3 أشهر">2-3 أشهر</option>
                    <option value="أكثر من 3 أشهر">أكثر من 3 أشهر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مستوى الخبرة المطلوب *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="beginner">مبتدئ</option>
                    <option value="intermediate">متوسط</option>
                    <option value="expert">خبير</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المهارات المطلوبة *
                </label>
                <input
                  type="text"
                  name="skills_required"
                  value={formData.skills_required}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: React, Node.js, MongoDB, تصميم واجهات"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  اكتب المهارات مفصولة بفواصل
                </p>
              </div>

              {error && (
                <div className="p-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="flex space-x-4 rtl:space-x-reverse">
                <GradientButton
                  type="submit"
                  loading={loading}
                  icon={Plus}
                  className="flex-1"
                >
                  نشر الوظيفة
                </GradientButton>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;