/**
 * TypeScript declaration stubs for external modules and types
 * This file provides minimal type definitions to prevent TypeScript errors during build
 */

// Supabase
declare module '@supabase/supabase-js' {
  export function createClient(url: string, key: string): any;
  export interface SupabaseClient {
    from: (table: string) => any;
    auth: any;
  }
}

// OpenAI
declare module 'openai' {
  export default class OpenAI {
    constructor(options: { apiKey?: string });
    chat: {
      completions: {
        create: (options: any) => Promise<any>;
      };
    };
  }
}

// Stripe
declare module 'stripe' {
  export default class Stripe {
    constructor(apiKey: string, options?: { apiVersion?: string });
    webhooks: {
      constructEvent: (body: string, signature: string, secret: string) => any;
    };
  }
}

// Lucide React Icons
declare module 'lucide-react' {
  import { ComponentType } from 'react';
  export const HomeIcon: ComponentType<any>;
  export const SparklesIcon: ComponentType<any>;
  export const UserIcon: ComponentType<any>;
  export const BookIcon: ComponentType<any>;
  export const HeartIcon: ComponentType<any>;
  export const MoonIcon: ComponentType<any>;
}

// Custom application types
interface Profile {
  id?: string;
  user_id?: string;
  name?: string;
  birth_date?: string;
  birth_time?: string;
  birth_location?: string;
  profile_data?: any;
  created_at?: string;
}

interface CheckupData {
  id?: string;
  user_id?: string;
  emotional: number;
  mental: number;
  physical: number;
  spiritual: number;
  reflection: string;
  feedback?: string;
  created_at?: string;
}

interface ClarityPath {
  id?: string;
  user_id?: string;
  spark: string;
  sense: string;
  mirror: string;
  shape: string;
  anchor: string;
  created_at?: string;
}
