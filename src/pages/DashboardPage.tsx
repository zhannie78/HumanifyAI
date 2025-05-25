import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { Edit, Trash2, Plus, FileText, CreditCard, Clock, Search } from 'lucide-react';
import Input from '../components/ui/Input';

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuthStore();
  const { projects, isLoading, fetchProjects, deleteProject } = useProjectStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchProjects();
    }
  }, [user, fetchProjects, navigate]);
  
  const handleCreateNew = () => {
    navigate('/');
    
    // Scroll to the rewriter tool section
    setTimeout(() => {
      const element = document.getElementById('rewriter-tool');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };
  
  const handleViewProject = (id: string) => {
    navigate(`/dashboard/projects/${id}`);
  };
  
  const handleDeleteProject = async (id: string) => {
    if (confirmDelete === id) {
      await deleteProject(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.humanizedText.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your projects and subscription
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-white rounded-md shadow-sm px-4 py-2 border border-gray-200 mr-4">
                <p className="text-sm text-gray-600">Available Credits</p>
                <p className="text-xl font-bold text-primary-600">{profile?.credits || 0}</p>
              </div>
              <Button 
                variant="primary"
                onClick={() => navigate('/payment')}
                leftIcon={<CreditCard size={16} />}
              >
                Buy Credits
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FileText size={20} className="mr-2 text-gray-500" />
                  Your Projects
                </h2>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <Button
                    onClick={handleCreateNew}
                    leftIcon={<Plus size={16} />}
                  >
                    Create New
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Preview
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {project.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="text-sm text-gray-500 truncate max-w-[300px]">
                              {project.humanizedText.substring(0, 60)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={14} className="mr-1" />
                              {formatDate(project.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewProject(project.id)}
                                leftIcon={<Edit size={16} />}
                              >
                                <span className="hidden sm:inline">View</span>
                              </Button>
                              <Button
                                variant={confirmDelete === project.id ? 'danger' : 'ghost'}
                                size="sm"
                                onClick={() => handleDeleteProject(project.id)}
                                leftIcon={<Trash2 size={16} />}
                              >
                                <span className="hidden sm:inline">
                                  {confirmDelete === project.id ? 'Confirm' : 'Delete'}
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <FileText size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No projects found</p>
                  <Button
                    variant="primary"
                    onClick={handleCreateNew}
                    leftIcon={<Plus size={16} />}
                  >
                    Create Your First Project
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;