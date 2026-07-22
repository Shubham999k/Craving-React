import nodemailer from 'nodemailer';

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

export const sendOTP = async (email, otpCode) => {
    try {

        const messageHTML = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                <!-- Banner with Dishes -->
                <div style="background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'); background-size: cover; background-position: center; height: 220px; position: relative;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.65); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 20px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 48px; font-weight: 900; letter-spacing: 2px; text-transform: lowercase;">crav<span style="color: #ea580c;">i</span>ngs</h1>
                        <p style="color: #fed7aa; font-style: italic; font-size: 18px; margin-top: 10px; font-weight: 500;">"Where every bite is a celebration of taste."</p>
                    </div>
                </div>
                
                <div style="padding: 40px 30px;">
                    <h2 style="color: #1e293b; text-align: center; margin-top: 0; font-size: 24px;">Reset Your Password</h2>
                    <p style="color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
                        Hello food lover,<br>
                        We received a request to reset the password for your Cravings account. Here is your secret ingredient (OTP) to get back in:
                    </p>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <span style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: #ffffff; padding: 18px 40px; font-size: 32px; font-weight: 900; letter-spacing: 10px; border-radius: 12px; display: inline-block; box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3);">
                            ${otpCode}
                        </span>
                    </div>
                    
                    <p style="color: #64748b; font-size: 14px; text-align: center;">
                        This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.
                    </p>
                    
                    <div style="margin-top: 40px; text-align: center; border-top: 2px dashed #e2e8f0; padding-top: 30px;">
                        <p style="font-size: 32px; margin: 0;">🙏</p>
                        <h3 style="color: #0f172a; font-weight: 700; font-size: 20px; margin-top: 15px; margin-bottom: 5px;">We welcome you to our Cravings platform!</h3>
                        <p style="color: #64748b; font-size: 15px; margin-top: 0;">Get ready to explore delicious meals.</p>
                        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">&copy; ${new Date().getFullYear()} Cravings Food Delivery. All rights reserved.</p>
                    </div>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `Cravings <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Cravings - Password Reset OTP (${new Date().toLocaleTimeString()})`,
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
