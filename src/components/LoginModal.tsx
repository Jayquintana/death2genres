import React, { useState } from 'react';
import { X } from 'lucide-react';
import { signIn } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      onClose();
      navigate('/admin/shows');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-grunge-dark/90 backdrop-blur-md p-8 rounded-lg border border-grunge-red/20 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-metal text-grunge-red mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20 focus:border-grunge-red transition-colors duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20 focus:border-grunge-red transition-colors duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-grunge-red text-white py-2 px-4 rounded hover:bg-grunge-yellow transition-colors duration-300 font-metal disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;