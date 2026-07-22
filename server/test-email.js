import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'shubhamchaudharik485@gmail.com',
            subject: `Test Plain Text OTP ${Date.now()}`,
            text: 'This is a test OTP: 123456. Please ignore.',
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Plain text email sent successfully: ", result.messageId);
    } catch (error) {
        console.error("Error:", error);
    }
};

test();
