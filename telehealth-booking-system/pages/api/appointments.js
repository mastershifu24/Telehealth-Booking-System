export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://your-api-gateway-endpoint.amazonaws.com/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error('Error communicating with the Lambda function:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  