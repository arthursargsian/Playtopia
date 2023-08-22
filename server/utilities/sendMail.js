import nodemailer from "nodemailer"
import HttpErrors  from "http-errors";



    // export default async function verifyMail (email) {
    //     try{
    //         const transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'jereffsry@gmail.com',
    //                 pass: 'xlynxaezffwevxhb'
    //             }
    //         })
    //         await transporter.sendMail({
    //             from: "jereffsry@gmail.com",
    //             to: email,
    //             subject: "Email verification.", 
    //             text: "Verify your mail. NOW", 
    //             html: "<b>Hello world?</b>"
    //         });
    //         console.log("Everything good! Email has been sent.")
    //     }catch(e){
    //         throw HttpErrors(400, `Something went wrong. ${e}`)
    //     }
    // }


    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "jereffsry@gmail.com",
          pass: "xlynxaezffwevxhb",
        },
      });

      const SENDMAIL = async (mailDetails, callback) => {
        try {
          const info = await transporter.sendMail(mailDetails)
          callback(info);
        } catch (error) {
          console.log(error);
        } 
      };

      export default SENDMAIL;