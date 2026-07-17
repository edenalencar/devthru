import { Resend } from 'resend';
import React from 'react';

// Initialize Resend instance lazily to avoid issues during build/CI if env var is missing
let resendInstance: Resend | null = null;

function getResend() {
    if (!resendInstance && process.env.RESEND_API_KEY) {
        resendInstance = new Resend(process.env.RESEND_API_KEY);
    }
    return resendInstance;
}

interface SendEmailParams {
    to: string | string[];
    subject: string;
    react: React.ReactElement;
    from?: string;
}

/**
 * Core utility to send emails via Resend
 */
export async function sendEmail({ to, subject, react, from }: SendEmailParams) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn('RESEND_API_KEY is not defined. Email sending is skipped.');
        return { data: null, error: new Error('RESEND_API_KEY is missing') };
    }

    const resend = getResend();
    if (!resend) {
        return { data: null, error: new Error('Failed to initialize Resend client') };
    }

    const defaultFrom = process.env.MAIL_FROM || 'DevThru <contato@devthru.com>';

    try {
        const { data, error } = await resend.emails.send({
            from: from || defaultFrom,
            to: Array.isArray(to) ? to : [to],
            subject,
            react,
        });

        if (error) {
            console.error('Resend email sending failure:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        console.error('Unexpected exception during email sending:', err);
        return { data: null, error: err as Error };
    }
}
