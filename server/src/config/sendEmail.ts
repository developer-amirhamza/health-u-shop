import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

interface Type {
    sendTo:string,
    subject:string,
    html:any
}


if (!process.env.RESEND_API_KEY) {
    console.log("Please provide new RESEND API KEY in the .env file");
}


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ sendTo, subject, html }:Type) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
    if(error){
        return console.error(error);
    }
    return data;
    } catch (error: any) {
        console.log(error.mgs)
    }
};