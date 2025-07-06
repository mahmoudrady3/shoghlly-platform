import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Star, Users, Briefcase, Eye } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { jobCategories } from '../data/mockData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { jobs, loading, error, fetchJobs } = useJobs();

  useEffect(() => {
    fetchJobs({
      category: selectedCategory,
      level: experienceLevel,
      search: searchTerm
    });
  }, [selectedCategory, experienceLevel, searchTerm]);

  const JobCard: React.FC<{ job: any }> = ({ job }) => (
    <Card hover className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`} className="group">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mb-3">
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.category}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {job.duration}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {job.proposals_count} متقدم
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {job.budget_min} - {job.budget_max} جنيه
          </div>
          <div className="text-sm text-gray-500">
            {job.level === 'beginner' ? 'مبتدئ' : job.level === 'intermediate' ? 'متوسط' : 'خبير'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm text-gray-600">{job.profiles?.rating || 5.0}</span>
          </div>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-600">{job.profiles?.full_name || 'عميل'}</span>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Link to={`/jobs/${job.id}`}>
            <Button variant="outline" size="small" icon={Eye}>
              عرض التفاصيل
            </Button>
          </Link>
          <Link to={`/jobs/${job.id}`}>
            <Button size="small">
              تقدم الآن
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          {job.skills_required?.slice(0, 3).map((skill: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {skill}
            </span>
          ))}
          {job.skills_required?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{job.skills_required.length - 3} المزيد
            </span>
          )}
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">جاري تحميل الوظائف...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">اكتشف الوظائف المتاحة</h1>
            <p className="text-lg text-gray-600">آلاف الوظائف الحقيقية في انتظارك</p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن وظيفة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع التخصصات</option>
                {jobCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع المستويات</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="expert">خبير</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={Filter}
              >
                فلترة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {jobs.length} وظيفة متاحة
          </h2>
          <div className="text-sm text-gray-500">
            مرتبة حسب الأحدث
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد وظائف مطابقة</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Load More */}
        {jobs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="large">
              عرض المزيد من الوظائف
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;