const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'miteshvasita0701@gmail.com', 
    pass: 'nivl zjrk kpmw hhnj',  
  },
});

// Send email
const sendEmail = async (to , event) => {
  try {
    const info = await transporter.sendMail({
      from: 'miteshvasita0701@gmail.com', // Sender address
      to, // List of receivers
      subject:"Event Enrollment Confirmation - Evento", // Subject line
      text :  `
      Dear Participant,
      
      Congratulations! Your enrollment for the upcoming event has been successfully confirmed.
      
      We are thrilled to have you join us for this exciting event, and we look forward to your participation. Below are the event details:
      
      - Event Name: ${event.title}
      - Date: ${event.date}
      - Location: ${event.location}
      
      Please make sure to arrive on time, and feel free to reach out to us if you have any questions.
      
      We are excited to make this event memorable for you!
      
      Best regards,
      Evento Team
            `
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {sendEmail} 
