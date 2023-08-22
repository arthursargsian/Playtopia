import nodemailer from "nodemailer";
import mailTemplate from "../htmltemp/mailTemplate"
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ryann.littel@ethereal.email',
        pass: 'zDuqKTfCVAq5JfPCbv'
    }
});

let info = async(mail, html) => await transporter.sendMail({
    from: "Maxine Robel",
    to: mail,
    subject: "Unknown-Games e-mail autosender",
    text: "Please verify your mail",
    html: html
})

export default info;
