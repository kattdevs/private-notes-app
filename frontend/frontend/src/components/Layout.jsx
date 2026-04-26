import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen transition-colors duration-300
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        light:from-gray-100 light:via-white light:to-gray-100">

            {/*Background ambient orbs*/}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-600 rounded-full opacity-10 blur-3xl"/>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-500 rounded-full opacity-10 blur-3xl"/>
                </div>

                {/*Navigation*/}
                <nav className="relative z-10 px-6 py-4 flex items-center justify-between glass border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <span className="text-white font-semibold tracking-wide">Private Notes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {user && (
                            <button onClick={handleLogout}
                            className="px-4 py-1.5 rounded-full glass text-white/80 text-sm hover:text-white hover:bg-white/10 transition-all duration-200">
                                Logout
                            </button>    
                      )}
                    </div>
                </nav>

                {/*Main content*/}
                <main className="relative z-10 px-6 py-8">
                    {children}
                </main>
            </div>
    );
};

export default Layout;