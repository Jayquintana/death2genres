import { supabase } from './supabase';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
let sessionTimer: NodeJS.Timeout;

const resetSessionTimer = (onTimeout: () => void) => {
  if (sessionTimer) {
    clearTimeout(sessionTimer);
  }
  sessionTimer = setTimeout(onTimeout, SESSION_TIMEOUT);
};

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return { data, error: null };
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    // Handle cases where session is already invalid/missing
    if (error) {
      // These errors indicate the session is already gone, which is fine for sign out
      const sessionAlreadyGone = error.message?.includes('session_not_found') || 
                                error.message?.includes('refresh_token_not_found') ||
                                error.message?.includes('Auth session missing');
      
      if (!sessionAlreadyGone) {
        throw error;
      }
    }
    
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
    return { error: null };
  } catch (error) {
    // Only log actual errors, not session-already-gone cases
    const errorMessage = error instanceof Error ? error.message : String(error);
    const sessionAlreadyGone = errorMessage.includes('session_not_found') || 
                              errorMessage.includes('refresh_token_not_found') ||
                              errorMessage.includes('Auth session missing');
    
    if (!sessionAlreadyGone) {
      console.error('Error signing out:', error);
      return { error };
    }
    
    // Session was already gone, treat as successful sign out
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
    return { error: null };
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null, error };
  }
}

export function initSessionTimeout(onTimeout: () => void) {
  // Set up activity listeners
  const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  
  const resetTimer = () => {
    resetSessionTimer(onTimeout);
  };

  // Add event listeners
  events.forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  // Initial timer setup
  resetTimer();

  // Return cleanup function
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
  };
}