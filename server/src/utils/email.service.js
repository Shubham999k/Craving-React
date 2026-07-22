import nodemailer from 'nodemailer';

export const sendOTP = async (email, otpCode) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const messageHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                <h2 style="color: #c74a09; text-align: center;">Reset Your Password</h2>
                <p style="color: #334155; font-size: 16px;">Hello,</p>
                <p style="color: #334155; font-size: 16px;">We received a request to reset your password for your Cravings account. Here is your 6-digit OTP code:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="background-color: #f8fafc; padding: 15px 30px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 8px;">
                        ${otpCode}
                    </span>
                </div>
                <p style="color: #334155; font-size: 16px;">This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                <p style="color: #94a3b8; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} Cravings Food Delivery. All rights reserved.</p>
            </div>
        `;

        const mailOptions = {
            from: \`Cravings <\${process.env.SMTP_USER}>\`,
            to: email,
            subject: 'Cravings - Password Reset OTP',
            html: messageHTML,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", result.messageId);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email. Please check your email configuration.");
    }
};
