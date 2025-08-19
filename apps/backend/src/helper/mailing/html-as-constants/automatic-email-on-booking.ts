export const emailOnBookingTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Booking Skywell Motors</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #2596be, #1a6b8a);
      color: white;
      padding: 30px 20px;
      text-align: center;
      position: relative;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 15px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    .greeting {
      font-size: 22px;
      color: #1a6b8a;
      margin-bottom: 20px;
      text-align: center;
    }
    .message {
      font-size: 15px;
      margin-bottom: 25px;
      text-align: center;
      color: #555;
    }
    .info-box {
      background: #fff;
      border: 2px solid #2596be;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
      text-align: center;
    }
    .info-title {
      font-size: 18px;
      font-weight: bold;
      color: #1a6b8a;
      margin-bottom: 15px;
    }
    .contact-info {
      margin: 10px 0;
    }
    .contact-info strong {
      color: #2596be;
      display: inline-block;
      min-width: 80px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #2596be, #1a6b8a);
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      margin: 15px 0;
      transition: transform 0.3s ease;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
    .footer {
      background: #1a6b8a;
      color: white;
      padding: 25px;
      text-align: center;
      font-size: 14px;
    }
    .footer-note {
      opacity: 0.8;
      margin-top: 10px;
      font-style: italic;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-links a {
      color: #fff;
      text-decoration: none;
      margin: 0 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">SKYWELL</div>
      <div class="tagline">Drive Home Real SUV</div>
    </div>
    
    <div class="content">
      <div class="greeting">Thank You for Booking Skywell!</div>
      
      <div class="message">
        We appreciate your valued booking and You are eligible now for our scheme Europe Tour for Family and Diamond Necklace during NADA booking and chance to win a ROLEX watch from LUCKY DRAW. 
      </div>
      
      <div class="info-box">
        <div class="info-title">📩 Contact Information</div>
        <div class="contact-info">
          <strong>Phone:</strong> 9701010105, 9701010127
        </div>
        <div class="contact-info">
          <strong>Website:</strong> <a href="https://gmotors.com.np" target="_blank">www.gmotors.com.np</a>
        </div>
        <div class="contact-info">
          <strong>Showrooms:</strong> Naxal-Kathmandu, RadheRadhe-Bhaktapur, Itahari-Sunsari, Birtamode-Jhapa, Chitwan, Pokhara
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p>Meanwhile, explore our latest car models online!</p>
        <a href="https://gmotors.com.np" class="btn" target="_blank">Visit Our Website</a>
      </div>
    </div>
    
    <div class="footer">
      <div>
        <strong>G. MOTORS PVT. LTD.</strong><br>
        Authorized Importer & Distributer for Nepal
      </div>
      <div class="social-links">
        <a href="https://gmotors.com.np" target="_blank">Website</a>
      </div>
      <div class="footer-note">
        This is an automated message. Please do not reply directly.<br>
        For urgent support, call our helpline.
      </div>
    </div>
  </div>
</body>
</html>`;
