import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyyhkgfasgkxjvuxivdu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eWhrZ2Zhc2dreGp2dXhpdmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMzc0MzMsImV4cCI6MjA2MzcxMzQzM30.QxclqEwmEHeglTSal6GDqtwCMaonLh5UG3_D5he06-Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);