import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default {
    async sendEmail(from, to, subject, verificationCode) {

        const html = `
            Hi there,
            <br/>
            Thank you for registering in Todo application!
            <br/><br/>
            Please verify your email:
            <br/>
            Code: <b>${verificationCode}</b>
        `;

        await transport.sendMail({from, to, subject, html})
    }
}