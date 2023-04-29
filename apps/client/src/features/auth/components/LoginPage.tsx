import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../hooks';
import { GoogleButton } from '../../../components';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(false);
    const { login } = useAuth();
    if (isLogin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <ClipLoader color="dodgerblue" size="100px" />
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to bookmarks!</h2>
                <GoogleButton
                    handleClick={() => {
                        setIsLogin(true);
                        login();
                    }}
                />
            </div>
        </div>
    );
}
