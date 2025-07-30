"use client";

import { useState } from 'react';
import { RiSendPlaneFill, RiLoader4Line, RiCheckboxCircleFill, RiErrorWarningFill, RiMailSendLine } from 'react-icons/ri';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setStatus('success');
                // Clear form
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-app-primary">Contact Us</h1>
                <p className="mt-4 text-lg text-app-text-muted">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you.
                </p>
                {/* FIX: Added the contact email address */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-app-text-muted">
                    <RiMailSendLine className="w-5 h-5" />
                    <span>Or email us directly at:</span>
                    <a href="mailto:contact@cricdar.com" className="font-semibold text-app-primary hover:underline">
                        contact@cricdar.com
                    </a>
                </div>
            </div>

            <div className="mt-12 max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6 bg-app-card-bg p-8 rounded-lg shadow-lg">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-app-text-base mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-4 py-2 bg-app-surface border border-app-border rounded-md focus:ring-app-primary focus:border-app-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-app-text-base mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 bg-app-surface border border-app-border rounded-md focus:ring-app-primary focus:border-app-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-app-text-base mb-1">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="block w-full px-4 py-2 bg-app-surface border border-app-border rounded-md focus:ring-app-primary focus:border-app-primary"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-app-primary hover:bg-app-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-primary disabled:bg-app-primary/50"
                        >
                            {status === 'loading' && <RiLoader4Line className="animate-spin w-5 h-5 mr-3" />}
                            {status !== 'loading' && <RiSendPlaneFill className="w-5 h-5 mr-3" />}
                            Send Message
                        </button>
                    </div>

                    {status === 'success' && (
                        <div className="flex items-center text-green-500 bg-green-500/10 p-4 rounded-md">
                            <RiCheckboxCircleFill className="w-5 h-5 mr-3" />
                            <p>Thank you! Your message has been sent successfully.</p>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex items-center text-red-500 bg-red-500/10 p-4 rounded-md">
                            <RiErrorWarningFill className="w-5 h-5 mr-3" />
                            <p>Something went wrong. Please try again later.</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}