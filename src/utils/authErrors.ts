export function getAuthErrorMessage(error: any): string {
  const code = error?.code || '';
  
  switch (code) {
    // Login Errors
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later or reset your password.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
      
    // Registration Errors
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Your password is too weak. It must be at least 6 characters long.';
      
    // Common/Network Errors
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your internet connection and try again.';
    case 'auth/internal-error':
      return 'An internal error occurred. Please try again later.';
      
    // Fallback
    default:
      if (error?.message && !error.message.includes('Firebase')) {
        return error.message;
      }
      return 'An unexpected error occurred. Please try again.';
  }
}
