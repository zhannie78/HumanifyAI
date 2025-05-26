import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { User } from 'lucide-react';

export default function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      <Button variant="outline" size="sm">
        <User className="w-4 h-4 mr-2" />
        {user.email}
      </Button>
      <Button onClick={signOut} variant="outline" size="sm" className="mt-2">
        Sign Out
      </Button>
    </div>
  );
}