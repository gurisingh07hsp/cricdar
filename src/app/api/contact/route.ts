import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Configure the transporter for your email service
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email provider
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender address
            to: process.env.EMAIL_TO, // Your receiving email address
            subject: `New Contact Form Submission from ${name}`,
            text: `You have received a new message from your website contact form.\n\n` +
                `Here are the details:\n\n` +
                `Name: ${name}\n\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}\n`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}