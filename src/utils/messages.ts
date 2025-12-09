export const OTPMessage = (otpCode: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Email</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .otp-code {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-top: 10px;
    }

    .note {
      color: #888;
      margin-top: 20px;
    }

    .footer {
      margin-top: 20px;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Your One-Time Password (OTP) is:</p>
    <div class="otp-code">${otpCode}</div>
    <p class="note">This code is valid for a short period of time. Do not share it with others.</p>
    <div class="footer">
      <p>If you did not request this code, no further action is required.</p>
    </div>
     <p>Thank you,<br>My Shares Team</p>
  </div>
</body>
</html>
`;
};

export const OTPVerified = (
  name: String,
  phone_number: String,
  email: String
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Successful</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px 30px;
      text-align: center;
      max-width: 500px;
      margin: 20px auto;
    }

    h1 {
      color: #007bff;
      font-size: 24px;
    }

    p {
      color: #333;
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
    }

    .info {
      font-size: 18px;
      color: #007bff;
      margin-top: 15px;
    }

    .footer {
      margin-top: 20px;
      color: #888;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Verification Successful</h1>
    <p>Dear User,</p>
    <p>We are pleased to inform you that your email and phone number have been verified successfully!</p>
    <div class="info">
    <p><strong>Fullname:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone_number}</p>
    </div>
    <p>Thank you for completing your verification. You can now enjoy full access to our services.</p>
    <div class="footer">
      <p>If you did not perform this verification, please contact our support team immediately.</p>
      <p>Thank you,<br>Unicef Nigeria</p>
    </div>
  </div>
</body>
</html>

`;
};
