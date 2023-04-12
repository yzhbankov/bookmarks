import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

export function LoginPage() {
    console.log(Cookies.get());

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const tokens = await axios.post('http://localhost:3000/api/v1/auth/login/', {
                code: codeResponse.code,
            });
        },
        flow: 'auth-code',
    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full    space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <button
                    type="button"
                    data-test-id="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => login()}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
}
