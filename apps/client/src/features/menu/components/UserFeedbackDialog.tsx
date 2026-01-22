import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useSubmitFeedback } from '../hooks';

type UserFeedbackDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

type Rating = 'great' | 'good' | 'okay' | 'bad' | null;

const ratingOptions: { value: Rating; emoji: string; label: string; color: string }[] = [
    { value: 'great', emoji: '😍', label: 'Love it!', color: 'from-green-400 to-emerald-500' },
    { value: 'good', emoji: '😊', label: 'Good', color: 'from-blue-400 to-cyan-500' },
    { value: 'okay', emoji: '😐', label: 'Okay', color: 'from-amber-400 to-orange-500' },
    { value: 'bad', emoji: '😞', label: 'Not great', color: 'from-rose-400 to-red-500' },
];

export function UserFeedbackDialog({ isOpen, onClose }: UserFeedbackDialogProps) {
    const [rating, setRating] = useState<Rating>(null);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading: isSubmitting, submitFeedback, reset } = useSubmitFeedback();

    const handleSubmit = useCallback(async () => {
        if (!rating) return;

        try {
            await submitFeedback({ rating, comment: comment || undefined });
            setIsSubmitted(true);

            // Auto-close after showing success message
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    }, [rating, comment, submitFeedback]);

    const handleClose = useCallback(() => {
        setRating(null);
        setComment('');
        setIsSubmitted(false);
        reset();
        onClose();
    }, [onClose, reset]);

    // Reset state when dialog opens
    useEffect(() => {
        if (isOpen) {
            setRating(null);
            setComment('');
            setIsSubmitted(false);
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={handleClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Share Your Feedback</h2>
                        <button
                            onClick={handleClose}
                            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-white/80 text-sm mt-1">Help us improve your experience</p>
                </div>

                {isSubmitted ? (
                    // Success State
                    <div className="p-8 text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-500">Your feedback helps us make Bookmarks better for everyone.</p>
                    </div>
                ) : (
                    // Feedback Form
                    <div className="p-6">
                        {/* Rating Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                How's your experience with Bookmarks?
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {ratingOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setRating(option.value)}
                                        className={classNames(
                                            'flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200',
                                            rating === option.value
                                                ? `border-transparent bg-gradient-to-br ${option.color} text-white shadow-lg scale-105`
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        )}
                                    >
                                        <span className="text-2xl mb-1">{option.emoji}</span>
                                        <span className={classNames(
                                            'text-xs font-medium',
                                            rating === option.value ? 'text-white' : 'text-gray-600'
                                        )}>
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Comment Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Any additional thoughts? <span className="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us what you like or what we can improve..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!rating || isSubmitting}
                                className={classNames(
                                    'flex-1 px-4 py-3 font-medium rounded-xl transition-all flex items-center justify-center gap-2',
                                    rating && !isSubmitting
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
