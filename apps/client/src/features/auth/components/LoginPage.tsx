import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../hooks';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(false);
    const { login, error } = useAuth();

    useEffect(() => {
        if (error) {
            setIsLogin(false);
        }
    }, [error]);

    if (isLogin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-soft" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 animate-scale-in relative z-10">
                    <ClipLoader color="#ffffff" size={50} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 relative overflow-hidden">
            {/* Animated background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

                {/* Floating bookmark icons */}
                <div className="absolute top-[15%] left-[15%] text-white/5 animate-float" style={{ animationDelay: '0s' }}>
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <div className="absolute top-[25%] right-[20%] text-white/5 animate-float" style={{ animationDelay: '0.5s' }}>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <div className="absolute bottom-[30%] left-[10%] text-white/5 animate-float" style={{ animationDelay: '1s' }}>
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <div className="absolute bottom-[20%] right-[15%] text-white/5 animate-float" style={{ animationDelay: '1.5s' }}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            </div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl animate-fade-in-up">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-50 animate-pulse-soft" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-3">
                            Welcome to <span className="text-gradient from-blue-400 to-cyan-400">Bookmarks</span>
                        </h1>
                        <p className="text-white/60 text-sm sm:text-base">
                            Save, organize, and access your bookmarks from anywhere
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl animate-fade-in">
                            <p className="text-sm text-red-200 text-center">
                                Login failed. Please try again.
                            </p>
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        onClick={() => {
                            setIsLogin(true);
                            login();
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] btn-press group"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>Continue with Google</span>
                        <svg className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Features */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                        <p className="text-white/40 text-xs text-center mb-4 uppercase tracking-wider">Why choose us</p>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="text-center group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-blue-600/30">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Organize</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:from-cyan-500/30 group-hover:to-cyan-600/30">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Search</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:from-teal-500/30 group-hover:to-teal-600/30">
                                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Sync</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-white/30 text-xs text-center mt-6">
                    Secure login powered by Google
                </p>
            </div>
        </div>
    );
}
