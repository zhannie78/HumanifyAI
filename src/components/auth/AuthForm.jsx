import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@radix-ui/react-slot';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from '@radix-ui/react-toast';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isSignUp ? signUp : signIn;
    const { error } = await action(email, password);

    if (error) {
      toast({ title: 'Error', description: error.message });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
      <Toaster />
    </div>
  );
}