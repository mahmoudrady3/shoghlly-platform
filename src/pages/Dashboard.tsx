import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Eye,
  CheckCircle,
  Clock,
  X,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import Card from '../components/ui/Card';
import GradientButton from '../components/ui/GradientButton';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات وهمية للعروض والإحصائيات
  const [proposals, setProposals] = useState([
    {
      id: '1',
      jobTitle: 'تطوير موقع إلكتروني',
      clientName: 'شركة النجاح',
      budget: 7500,
      status: 'pending',
      submittedAt: '2024-01-15',
      coverLetter: 'أستطيع تطوير موقع احترافي باستخدام React و Node.js...'
    },
    {
      id: '2',
      jobTitle: 'تصميم هوية بصرية',
      clientName: 'مطعم الذوق',
      budget: 3000,
      status: 'accepted',
      submittedAt: '2024-01-14',
      coverLetter: 'لدي خبرة 5 سنوات في تصميم الهويات البصرية...'
    }
  ]);

  const [myJobs, setMyJobs] = useState([
    {
      id: '1',
      title: 'تطوير تطبيق موبايل',
      description: 'نحتاج تطبيق iOS و Android للتجارة الإلكترونية',
      budget: { min: 15000, max: 25000 },
      proposals: 12,
      status: 'open',
      postedAt: '2024-01-16'
    }
  ]);

  const stats = profile?.role === 'freelancer' ? {
    totalProposals: proposals.length,
    acceptedProposals: proposals.filter(p => p.status === 'accepted').length,
    pendingProposals: proposals.filter(p => p.status === 'pending').length,
    totalEarnings: 25000
  } : {
    totalJobs: myJobs.length,
    totalProposals: myJobs.reduce((sum, job) => sum + job.proposals, 0),
    activeJobs: myJobs.filter(job => job.status === 'open').length,
    totalSpent: 45000
  };

  const FreelancerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي العروض</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProposals}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">العروض المقبولة</p>
              <p className="text-2xl font-bold text-green-600">{stats.acceptedProposals}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">في الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingProposals}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الأرباح</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalEarnings.toLocaleString()} ج</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* My Proposals */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">عروضي المقدمة</h3>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{proposal.jobTitle}</h4>
                  <p className="text-sm text-gray-600">العميل: {proposal.clientName}</p>
                  <p className="text-sm text-gray-500">تم التقديم: {proposal.submittedAt}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{proposal.budget.toLocaleString()} ج</p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {proposal.status === 'accepted' ? 'مقبول' :
                     proposal.status === 'pending' ? 'في الانتظار' : 'مرفوض'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{proposal.coverLetter}</p>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button size="small" variant="outline" icon={Eye}>
                  عرض التفاصيل
                </Button>
                <Button size="small" variant="outline" icon={MessageCircle}>
                  رسالة العميل
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const ClientDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">وظائفي المنشورة</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي العروض</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalProposals}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الوظائف النشطة</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.activeJobs}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الإنفاق</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSpent.toLocaleString()} ج</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* My Jobs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">وظائفي المنشورة</h3>
          <GradientButton icon={Plus}>
            إضافة وظيفة جديدة
          </GradientButton>
        </div>
        
        <div className="space-y-4">
          {myJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                  <p className="text-sm text-gray-500">نُشر في: {job.postedAt}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {job.budget.min.toLocaleString()} - {job.budget.max.toLocaleString()} ج
                  </p>
                  <p className="text-sm text-gray-600">{job.proposals} عرض مقدم</p>
                </div>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button size="small" icon={Eye}>
                  عرض العروض ({job.proposals})
                </Button>
                <Button size="small" variant="outline">
                  تعديل الوظيفة
                </Button>
                <Button size="small" variant="outline">
                  إغلاق الوظيفة
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مرحباً، {profile?.full_name}
            </h1>
            <p className="text-gray-600">
              {profile?.role === 'freelancer' 
                ? 'إدارة عروضك ومشاريعك من هنا' 
                : 'إدارة وظائفك والعروض المقدمة عليها'}
            </p>
          </div>

          {profile?.role === 'freelancer' ? <FreelancerDashboard /> : <ClientDashboard />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;