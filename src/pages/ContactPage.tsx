import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="mt-4 text-xl text-gray-600">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 animate-fadeIn">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="mb-4 flex justify-center">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                    
                    <div className="space-y-4">
                      <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      
                      <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                      
                      <Textarea
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-6"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-sm p-8 text-white mb-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="flex-shrink-0 h-6 w-6 mr-3 text-primary-200" />
                      <div>
                        <p className="text-primary-100">Email</p>
                        <p className="font-medium">support@humanify.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="flex-shrink-0 h-6 w-6 mr-3 text-primary-200" />
                      <div>
                        <p className="text-primary-100">Phone</p>
                        <p className="font-medium">+1 (786) 726-3801</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="flex-shrink-0 h-6 w-6 mr-3 text-primary-200" />
                      <div>
                        <p className="text-primary-100">Address</p>
                        <p className="font-medium">
                          123 AI Boulevard<br />
                          Miami, FL 33156<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        How quickly will I receive a response?
                      </h3>
                      <p className="text-gray-600">
                        We typically respond to all inquiries within 24-48 hours during business days.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Do you offer custom enterprise solutions?
                      </h3>
                      <p className="text-gray-600">
                        Yes! For custom enterprise needs, please contact our sales team directly at sales@humanify.com.
                      </p>
                    </div>
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

export default ContactPage;