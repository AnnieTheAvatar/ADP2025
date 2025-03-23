import express from 'express';
import next from 'next';
import payload from 'payload';
import config from '@/payload.config';

// Detect environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const start = async () => {
  try {
    await app.prepare();

    const server = express();

    // Initialize Payload before adding routes
    await payload.init({
      config,
    });

    // Attach Next.js request handler
    server.all('*', (req, res) => handle(req, res));

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server error:', err);
  }
};

start();
