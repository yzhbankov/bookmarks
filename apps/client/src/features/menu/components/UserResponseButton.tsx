import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from '../../../hooks';
import { UserFeedbackDialog } from './UserFeedbackDialog';

export function UserResponseButton() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const openDialog = useCallback(() => setDialogOpen(true), []);
    const closeDialog = useCallback(() => setDialogOpen(false), []);

    return (
        <>
            <button
                type="button"
                onClick={openDialog}
                className={classNames(
                    'fixed bottom-4 z-40 group',
                    'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
                    'text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25',
                    'transition-all duration-300 hover:scale-105 active:scale-95',
                    'flex items-center gap-2 overflow-hidden',
                    isDesktop ? 'right-6 py-3 px-5' : 'right-4 py-2.5 px-4'
                )}
                aria-label="Give feedback"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                </svg>
                <span className={classNames(
                    'font-medium whitespace-nowrap',
                    isDesktop ? 'block' : 'hidden'
                )}>
                    Feedback
                </span>
            </button>

            <UserFeedbackDialog isOpen={isDialogOpen} onClose={closeDialog} />
        </>
    );
}
