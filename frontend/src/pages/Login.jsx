import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const naviagte = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try{
            await Login(email, password);
            Navigate('/dashbaord');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">

            {/*Ambient blobs*/}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"/>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"/>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    {/*Theme toggle*/}
                    <div className="flex justify-end mb-4"><ThemeToggle/></div>
                    {/*Glass card*/}
                    <div className="glass rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔐</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                            <p className="text-white/50 text-sm">Sign in to your private notes</p>
                            </div>
                            {error && (
                                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
              <label className="block text-white/70 text-sm mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10
                  text-white placeholder-white/30 focus:outline-none focus:border-white/30
                  focus:bg-white/12 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10
                  text-white placeholder-white/30 focus:outline-none focus:border-white/30
                  focus:bg-white/12 transition-all duration-200"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium
                border border-white/20 transition-all duration-200 hover:scale-[1.02]
                                disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            No account?{' '}
            <Link to="/register" className="text-white/70 hover:text-white underline">
                          Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
 
