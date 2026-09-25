fetch('https://capstone501.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'prasanth', email: 'prasanth@gmail.com', password: 'password123' })
}).then(async r => {
  console.log('Status:', r.status);
  console.log('Body:', await r.text());
}).catch(console.error);
