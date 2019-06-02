import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
const sendmail = async (mailto, mailsubject, mailtext, mailhtml) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: '1und1',
    auth: {
      user: 'matcha@beinfinitymore.com', // generated ethereal user
      pass: process.env.PASSWORDMAIL, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"MATCHA" <matcha@beinfinitymore.com>', // sender address
    to: mailto, // list of receivers
    subject: mailsubject, // Subject line
    text: mailtext, // plain text body
    html: mailhtml, // html body
  });

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

};

export default sendmail;
