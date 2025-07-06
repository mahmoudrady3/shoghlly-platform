import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Star, Briefcase, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import GradientButton from '../components/ui/GradientButton';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    skills: profile?.skills?.join(', ') || '',
  });

  const handleSave = async () => {
    const result = await updateProfile({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
    });

    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      skills: profile?.skills?.join(', ') || '',
    });
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الملف الشخصي...</p>
        </div>
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
          <Card className="p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <img
                  src={profile.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt={profile.full_name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.full_name}</h1>
                  <p className="text-blue-600 font-medium capitalize mb-2">{profile.role}</p>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{profile.rating || 5.0}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{profile.completed_jobs || 0} مشروع مكتمل</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} icon={Save} size="small">
                      حفظ
                    </Button>
                    <Button onClick={handleCancel} variant="outline" icon={X} size="small">
                      إلغاء
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} icon={Edit} size="small">
                    تعديل
                  </Button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <User className="w-4 h-4 mr-2" />
                        {profile.full_name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <div className="flex items-center text-gray-900">
                      <Mail className="w-4 h-4 mr-2" />
                      {profile.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+20 123 456 7890"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Phone className="w-4 h-4 mr-2" />
                        {profile.phone || 'غير محدد'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="القاهرة، مصر"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <MapPin className="w-4 h-4 mr-2" />
                        {profile.location || 'غير محدد'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">المعلومات المهنية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نبذة مختصرة</label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="اكتب نبذة مختصرة عنك..."
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {profile.bio || 'لم يتم إضافة نبذة بعد'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المهارات</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="JavaScript, React, التصميم..."
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills && profile.skills.length > 0 ? (
                          profile.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">لم يتم إضافة مهارات بعد</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Portfolio Section */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6">أعمالي السابقة</h3>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">لا توجد أعمال سابقة</h4>
              <p className="text-gray-500 mb-4">ابدأ بإضافة أعمالك لتعرضها للعملاء</p>
              <GradientButton>
                إضافة عمل جديد
              </GradientButton>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;