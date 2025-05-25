import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, UserProfile, SubscriptionPlan } from '../types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  
  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        return { error };
      }
      
      if (data.user) {
        // Create initial profile with free plan and 3 credits
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            email: data.user.email,
            credits: 3,
            plan: 'free' 
          }]);
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error during sign up:', error);
      return { error };
    }
  },
  
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        return { error };
      }
      
      if (data.user) {
        set({ user: data.user });
        await get().fetchUserProfile();
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    }
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
  
  updateProfile: async (updates: Partial<UserProfile>) => {
    const { user } = get();
    
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
      
    if (error) {
      console.error('Error updating profile:', error);
      return;
    }
    
    await get().fetchUserProfile();
  },
  
  fetchUserProfile: async () => {
    const { user } = get();
    
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        set({ 
          profile: {
            ...user,
            credits: data.credits,
            plan: data.plan as SubscriptionPlan,
          } 
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  },
}));

// Initialize auth state
export const initAuth = async () => {
  const authStore = useAuthStore.getState();
  
  try {
    const { data } = await supabase.auth.getSession();
    
    if (data.session?.user) {
      useAuthStore.setState({ user: data.session.user });
      await authStore.fetchUserProfile();
    }
  } catch (error) {
    console.error('Error checking auth state:', error);
  } finally {
    useAuthStore.setState({ isLoading: false });
  }
  
  // Set up auth state change listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      useAuthStore.setState({ user: session.user });
      await authStore.fetchUserProfile();
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.setState({ user: null, profile: null });
    }
  });
};