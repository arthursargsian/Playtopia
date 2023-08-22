const HTML_TEMPLATE = (text) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Verification</title>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        h1 {
          font-size: 48px;
          color: #4CAF50;
          margin-top: 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        p {
          font-size: 24px;
          line-height: 1.5;
          margin: 20px 0;
          color: #333;
        }
        
        @media screen and (max-width: 600px) {
          h1 {
            font-size: 36px;
          }
        
          p {
            font-size: 18px;
          }
        }
        
        </style>
      </head>
      <head>
<meta charset="UTF-8">
<title>Verification page</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
  <h1><a href=http://localhost:5000/users/verify/${text}>Your verification link</a> </h1>
</div>
</body> 
</html>
  `;
}

export default HTML_TEMPLATE;
