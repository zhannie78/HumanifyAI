import React, { useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { useAuthStore } from '../../store/authStore';
import { useProjectStore } from '../../store/projectStore';
import { useNavigate } from 'react-router-dom';
import { Copy, FileDown, RefreshCw } from 'lucide-react';

const RewriterTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [title, setTitle] = useState('');
  
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { createProject } = useProjectStore();
  
  const handleRewrite = () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    // In a real application, you would call an API here
    // For this demo, we'll simulate an API call
    setTimeout(() => {
      const humanizedText = humanizeText(inputText);
      setOutputText(humanizedText);
      setIsLoading(false);
      setIsSaved(false);
      
      // Generate a title based on the first few words
      const generatedTitle = inputText.split(' ').slice(0, 3).join(' ') + '...';
      setTitle(generatedTitle);
    }, 1500);
  };
  
  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!profile || profile.credits <= 0) {
      navigate('/payment');
      return;
    }
    
    if (!inputText || !outputText) return;
    
    const savedProject = await createProject(title, inputText, outputText);
    if (savedProject) {
      setIsSaved(true);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };
  
  // Simple text humanization for demo purposes
  const humanizeText = (text: string) => {
    // Simplify complex words and structure
    let humanized = text
      .replace(/utilize/g, 'use')
      .replace(/implementation/g, 'use')
      .replace(/functionality/g, 'features')
      .replace(/additionally/g, 'also')
      .replace(/nevertheless/g, 'however')
      .replace(/subsequently/g, 'then')
      .replace(/regarding/g, 'about')
      .replace(/demonstrate/g, 'show')
      .replace(/considerable/g, 'significant')
      .replace(/sufficient/g, 'enough')
      .replace(/prior to/g, 'before')
      .replace(/due to the fact that/g, 'because')
      .replace(/in the event that/g, 'if')
      .replace(/in order to/g, 'to');
    
    // Break up long sentences
    humanized = humanized.replace(/(\. )([A-Z])/g, '.\n$2');
    
    // Replace passive with active voice (very simplified)
    humanized = humanized
      .replace(/is being/g, 'is')
      .replace(/was being/g, 'was')
      .replace(/are being/g, 'are')
      .replace(/were being/g, 'were');
    
    return humanized;
  };
  
  return (
    <section id="rewriter-tool" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Try the AI Humanizer
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Paste your AI-generated text below and watch it transform into natural-sounding content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Textarea
              label="Paste AI-generated text here:"
              placeholder="Enter or paste your AI-generated text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
              className="resize-none"
            />
            <Button
              variant="primary"
              className="mt-4"
              fullWidth
              isLoading={isLoading}
              onClick={handleRewrite}
              leftIcon={<RefreshCw size={16} />}
              disabled={!inputText.trim()}
            >
              Humanize Text
            </Button>
            
            {!user && (
              <p className="mt-2 text-sm text-gray-500 text-center">
                <a href="/signup" className="text-primary-600 hover:underline">
                  Sign up
                </a>{' '}
                for unlimited access and save your work!
              </p>
            )}
          </div>
          
          <div>
            <div className="bg-white border rounded-md p-4 h-[268px] overflow-y-auto">
              {outputText ? (
                <div className="text-gray-800 whitespace-pre-line">
                  {outputText}
                </div>
              ) : (
                <div className="text-gray-400 italic h-full flex items-center justify-center">
                  Humanized text will appear here...
                </div>
              )}
            </div>
            
            {outputText && (
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  leftIcon={<Copy size={16} />}
                >
                  Copy Text
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<FileDown size={16} />}
                  disabled={!user}
                >
                  Download
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleSave}
                  disabled={!outputText || isSaved || !user || (profile && profile.credits <= 0)}
                  className="sm:ml-auto"
                >
                  {isSaved ? 'Saved!' : 'Save to Dashboard'}
                </Button>
              </div>
            )}
            
            {user && profile && outputText && (
              <p className="mt-2 text-sm text-gray-500">
                {profile.credits > 0 ? 
                  `You have ${profile.credits} credit${profile.credits !== 1 ? 's' : ''} remaining.` : 
                  'You have no credits left. Please purchase more.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewriterTool;