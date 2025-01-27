import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../middleware/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // This is a protected endpoint example
    // Only authenticated users with valid tokens can access this
    const data = {
      message: 'This is a protected API endpoint',
      timestamp: new Date().toISOString(),
      requestMethod: req.method,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error('Protected API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Wrap the handler with authentication middleware
export default withAuth(handler);