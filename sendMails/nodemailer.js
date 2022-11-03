const nodemailer = require('nodemailer');
require('dotenv/config')

const sendEmail = async (email, lastName, name, patronymic, message) => {
    try {
        const subject = name + ' ' + lastName + ' ' + patronymic
        const text = message
        const transporter = nodemailer.createTransport({
            host: process.env.ND_HOST,
            port: 587,
            service: process.env.ND_SERVICE,
            secure: false,
            auth: {
                user: process.env.ND_MAIL,
                pass: process.env.ND_PASS
            },
            tls: {
            rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.ND_MAIL,
            to: email,
            subject: subject,
            text: text,
        });
    } catch (error) {
        console.log("Some problems with email:");
        console.log(error);
    }
};

module.exports = sendEmail;