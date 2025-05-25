import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import { useAuthStore } from './authStore';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  createProject: (title: string, originalText: string, humanizedText: string) => Promise<Project | null>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  
  fetchProjects: async () => {
    const user = useAuthStore.getState().user;
    
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }
      
      // Convert from snake_case to camelCase
      const formattedProjects = data.map((project: any): Project => ({
        id: project.id,
        userId: project.user_id,
        title: project.title,
        originalText: project.original_text,
        humanizedText: project.humanized_text,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      }));
      
      set({ projects: formattedProjects });
    } catch (error) {
      console.error('Error in fetchProjects:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  createProject: async (title: string, originalText: string, humanizedText: string) => {
    const user = useAuthStore.getState().user;
    const authStore = useAuthStore.getState();
    
    if (!user) return null;
    
    // Check if user has credits
    if (authStore.profile && authStore.profile.credits <= 0) {
      console.error('No credits available');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          user_id: user.id,
          title,
          original_text: originalText,
          humanized_text: humanizedText
        }])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating project:', error);
        return null;
      }
      
      // Deduct 1 credit
      if (authStore.profile) {
        await authStore.updateProfile({
          credits: authStore.profile.credits - 1
        });
      }
      
      // Format the returned project
      const newProject: Project = {
        id: data.id,
        userId: data.user_id,
        title: data.title,
        originalText: data.original_text,
        humanizedText: data.humanized_text,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      set(state => ({ 
        projects: [newProject, ...state.projects],
        currentProject: newProject
      }));
      
      return newProject;
    } catch (error) {
      console.error('Error in createProject:', error);
      return null;
    }
  },
  
  updateProject: async (id: string, updates: Partial<Project>) => {
    try {
      // Convert camelCase to snake_case for DB
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.originalText) dbUpdates.original_text = updates.originalText;
      if (updates.humanizedText) dbUpdates.humanized_text = updates.humanizedText;
      
      const { error } = await supabase
        .from('projects')
        .update(dbUpdates)
        .eq('id', id);
        
      if (error) {
        console.error('Error updating project:', error);
        return;
      }
      
      set(state => ({
        projects: state.projects.map(project => 
          project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...updates, updatedAt: new Date().toISOString() } 
          : state.currentProject
      }));
    } catch (error) {
      console.error('Error in updateProject:', error);
    }
  },
  
  deleteProject: async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting project:', error);
        return;
      }
      
      set(state => ({
        projects: state.projects.filter(project => project.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      }));
    } catch (error) {
      console.error('Error in deleteProject:', error);
    }
  },
  
  setCurrentProject: (project: Project | null) => {
    set({ currentProject: project });
  }
}));