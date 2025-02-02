import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if(emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
        })
    }
    else if(emailType === "RESET") {
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpire: Date.now() + 3600000,
        })
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "65aaeaac9e8537",
        pass: "0f80944dda695a"
      }
    });
    

    const mailOptions = {
      from: "sonusrivastava448@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<>Click <a href="${process.env.DOMAIN}/verifyemail?token${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the below link in your browser,
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} 
      </p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
