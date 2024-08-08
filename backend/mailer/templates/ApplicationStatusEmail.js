const ApplicationStatusEmail = (status) => {
    return {
        subject: 'Application Status Update',
        text: `Your application has been ${status}.`,
        html: ApplicationStatusEmailHTML(status)
    }
}
export default ApplicationStatusEmail

// Email Template
const ApplicationStatusEmailHTML = (status) => {
    return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Status</title>
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
                .status-message {
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
                    <h2>Application Status Update</h2>
                </div>
                <div class="status-message">
                    <p>Your application has been <strong>${status}</strong>.</p>
                </div>
                <div class="footer">
                    <p>If you have any questions or need further assistance, please email lk370.chatapp@gmail.com.</p>
                </div>
            </div>
        </body>
        </html>
    `
}
