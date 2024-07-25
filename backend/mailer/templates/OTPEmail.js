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
                .otp-code {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Invitation Code</h2>
                </div>
                <div class="otp-code">
                    <p>Your code is: <strong>${otpCode}</strong></p>
                </div>
            </div>
        </body>
        </html>
    `
}