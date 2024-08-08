const InvitationCodeEmail = (invitationCode) => {
    return {
        subject: 'You Have Been Invited to PitchTalk',
        text: `You have been invited to PitchTalk. Your invitation code is ${invitationCode}. If you haven't registered an account yet, you can use the default password: 123123.`,
        html: InvitationCodeEmailHTML(invitationCode)
    }
}
export default InvitationCodeEmail

// Email Template
const InvitationCodeEmailHTML = (invitationCode) => {
    return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation to PitchTalk</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h2 {
                    color: #333;
                    font-size: 24px;
                    margin: 0;
                }
                .invitation-code {
                    text-align: center;
                    font-size: 18px;
                    color: #333;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 14px;
                    color: #666666;
                }
                .footer p {
                    margin: 0;
                }
                .footer strong {
                    color: #000;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Welcome to PitchTalk!</h2>
                </div>
                <div class="invitation-code">
                    <p>You have been invited to PitchTalk. Your invitation code is: <strong>${invitationCode}</strong></p>
                </div>
                <div class="footer">
                    <p>If you haven't registered an account yet, you can use the default password: <strong>123123</strong> to log in and complete your registration.</p>
                </div>
            </div>
        </body>
        </html>
    `
}
