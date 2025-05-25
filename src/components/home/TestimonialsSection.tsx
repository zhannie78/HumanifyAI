import React from 'react';

const testimonials = [
  {
    quote: "TextEase completely transformed my workflow. The AI content I used to spend hours editing now takes seconds to humanize!",
    author: "Alex Johnson",
    title: "Content Creator",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    quote: "As a marketer, I need content that connects with people. TextEase helps me turn AI drafts into copy that actually resonates with our audience.",
    author: "Samantha Miller",
    title: "Marketing Director",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    quote: "My students were using AI to write essays, and I could always tell. Now with TextEase, I focus on their ideas rather than spotting AI patterns.",
    author: "David Chen",
    title: "University Professor",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Thousands of users love how TextEase helps them create more authentic content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex-1">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;