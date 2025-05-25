import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { ArrowLeft, Save, Copy, FileDown, Trash2 } from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { projects, fetchProjects, updateProject, deleteProject } = useProjectStore();
  
  const [project, setProject] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const loadProject = async () => {
      if (projects.length === 0) {
        await fetchProjects();
      }
      
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        setTitle(foundProject.title);
        setOriginalText(foundProject.originalText);
        setHumanizedText(foundProject.humanizedText);
      } else {
        navigate('/dashboard');
      }
    };
    
    loadProject();
  }, [user, id, projects, fetchProjects, navigate]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      setIsSaved(false);
    };
  
  const handleSave = async () => {
    if (!id) return;
    
    setIsLoading(true);
    
    try {
      await updateProject(id, {
        title,
        originalText,
        humanizedText
      });
      
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (confirmDelete && id) {
      await deleteProject(id);
      navigate('/dashboard');
    } else {
      setConfirmDelete(true);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Dashboard
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="flex-1">
                <Input
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  placeholder="Project Title"
                  className="text-lg font-medium border-0 bg-transparent focus:ring-0 px-0"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={confirmDelete ? "danger" : "ghost"}
                  onClick={handleDelete}
                  leftIcon={<Trash2 size={16} />}
                >
                  {confirmDelete ? 'Confirm Delete' : 'Delete'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={isLoading}
                  disabled={isSaved}
                  leftIcon={<Save size={16} />}
                >
                  {isSaved ? 'Saved' : 'Save Changes'}
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Original Text</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(originalText)}
                      leftIcon={<Copy size={14} />}
                    >
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={originalText}
                    onChange={handleInputChange(setOriginalText)}
                    rows={12}
                    className="resize-none"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Humanized Text</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(humanizedText)}
                        leftIcon={<Copy size={14} />}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<FileDown size={14} />}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={humanizedText}
                    onChange={handleInputChange(setHumanizedText)}
                    rows={12}
                    className="resize-none"
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;