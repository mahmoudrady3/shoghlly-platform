import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Clock, User, Filter, Plus } from 'lucide-react';
import { mockCommunityPosts } from '../data/mockData';
import Button from '../components/ui/Button';

const Community: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const categories = [
    { name: 'جميع المواضيع', value: '' },
    { name: 'نصائح', value: 'نصائح' },
    { name: 'قصص نجاح', value: 'قصص نجاح' },
    { name: 'أسئلة', value: 'أسئلة' },
    { name: 'مشاكل تقنية', value: 'مشاكل تقنية' },
    { name: 'تطوير الذات', value: 'تطوير الذات' }
  ];

  const filteredPosts = mockCommunityPosts.filter(post => 
    !selectedCategory || post.category === selectedCategory
  );

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle new post submission
    console.log('New post:', newPost);
    setShowNewPostForm(false);
    setNewPost({ title: '', content: '', category: '', tags: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مجتمع الفريلانسرز</h1>
          <p className="text-lg text-gray-600">شارك خبرتك واستفد من تجارب الآخرين</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">الأقسام</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">إحصائيات المجتمع</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">الأعضاء</span>
                  <span className="font-semibold">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المواضيع</span>
                  <span className="font-semibold">3,280</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الردود</span>
                  <span className="font-semibold">18,650</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  size="small"
                  icon={Filter}
                >
                  فلترة
                </Button>
                <span className="text-sm text-gray-500">
                  {filteredPosts.length} موضوع
                </span>
              </div>
              <Button
                onClick={() => setShowNewPostForm(true)}
                icon={Plus}
              >
                موضوع جديد
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">موضوع جديد</h3>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="عنوان الموضوع"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">اختر القسم</option>
                      {categories.slice(1).map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={5}
                      placeholder="اكتب محتوى الموضوع..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العلامات (مفصولة بفواصل)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: نصائح, مبتدئ, تطوير"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      نشر الموضوع
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewPostForm(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <img
                          src={post.authorAvatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50`}
                          alt={post.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{post.postedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <button className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-500 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="large">
                عرض المزيد من المواضيع
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;