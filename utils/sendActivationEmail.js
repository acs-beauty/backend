const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const sendActivationEmail = async (to, link) => {
  const accessToken = OAuth2_client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken,
    },
  })

  transporter.sendMail(
    {
      from: 'acsbeauty@proton.net',
      to,
      subject: 'Активациа аккаунта на ACS Beauty',
      text: '',
      html: `
          <h2>Для активации перейдите по ссылке</h2>
          <h4>${link}</h4>
        `,
    },
    (error, result) => {
      if (error) {
        console.log('Error: ', error)
      } else {
        console.log('Success: ', result)
      }
      transporter.close()
    }
  )
}

// const sgMail = require('@sendgrid/mail')

// const sendActivationEmail = async (to, link) => {
//   sgMail.setApiKey('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')
//   const message = {
//     from: 'acsbeauty@proton.net',
//     to,
//     subject: 'Активациа аккаунта на ACS Beauty',
//     text: '',
//     html: `
//           <div>
//               <h1>Для активации перейдите по ссылке</h1>
//               <a href="${link}>${link}</a>
//         `,
//   }

//   sgMail
//     .send(message)
//     .then(_ => console.log('Email.sent...'))
//     .catch(error => console.log(error.message))
// }
module.exports = sendActivationEmail
