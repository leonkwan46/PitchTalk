const OTPEmail = (otpCode) => {
    return {
        subject: 'Your Invitation Code',
        text: `Your Invitation Code is ${otpCode}`,
        html: OTPEmailHTML(otpCode)
    }
}
export default OTPEmail

// Email Template
const OTPEmailHTML = (otpCode) => {
    return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation Code</title>
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
                .otp-code {
                    text-align: center;
                    font-size: 24px;
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
                    <h2>Your Invitation Code</h2>
                </div>
                <div class="otp-code">
                    <p>Your code is: <strong>${otpCode}</strong></p>
                </div>
                <div class="footer">
                    <p>If you haven't registered an account yet, you can log in with this email and use the default password: <strong>123123</strong></p>
                </div>
            </div>
        </body>
        </html>
    `
}
