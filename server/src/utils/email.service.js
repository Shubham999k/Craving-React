import nodemailer from 'nodemailer';

export const sendOTP = async (email, otpCode) => {
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

        const messageHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Cravings</h2>
                
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 16px;">We received a request to reset the password for your Cravings account. Here is your OTP:</p>
                
                <div style="margin: 30px 0;">
                    <span style="font-size: 24px; font-weight: bold; background-color: #f3f4f6; padding: 10px 20px; border: 1px solid #d1d5db; border-radius: 5px;">
                        ${otpCode}
                    </span>
                </div>
                
                <p style="font-size: 14px; color: #555;">
                    This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.
                    <br><br>
                    <small>Requested at: ${new Date().toLocaleString()}</small>
                </p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="font-size: 12px; color: #999;">
                    We welcome you to our Cravings platform!<br>
                    &copy; ${new Date().getFullYear()} Cravings Food Delivery. All rights reserved.
                </p>
            </div>
        `;

        const mailOptions = {
            from: `Cravings <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Cravings OTP: ${otpCode} - Reset your password`,
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
