import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Mock API Plugin to simulate Cloudflare Pages Functions locally
const mockCloudflareApi = () => ({
  name: 'mock-cloudflare-api',
  configureServer(server: any) {
    const DB_FILE = path.resolve(process.cwd(), 'local_d1_mock.json');
    
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url?.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json');
        
        let db: any = { tools: [], feedback: [], announcements: [], settings: { da_rate: 50 } };
        if (fs.existsSync(DB_FILE)) {
          db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        }
        const saveDb = () => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

        let body = '';
        if (req.method === 'POST') {
          await new Promise(resolve => {
            req.on('data', (chunk: any) => body += chunk);
            req.on('end', resolve);
          });
        }

        if (req.url === '/api/tools') {
          if (req.method === 'GET') return res.end(JSON.stringify(db.tools));
          if (req.method === 'POST') { db.tools = JSON.parse(body); saveDb(); return res.end(JSON.stringify({success: true})); }
        }
        if (req.url === '/api/feedback') {
          if (req.method === 'GET') return res.end(JSON.stringify(db.feedback));
          if (req.method === 'POST') { db.feedback = JSON.parse(body); saveDb(); return res.end(JSON.stringify({success: true})); }
        }
        if (req.url === '/api/announcements') {
          if (req.method === 'GET') return res.end(JSON.stringify(db.announcements));
          if (req.method === 'POST') { db.announcements = JSON.parse(body); saveDb(); return res.end(JSON.stringify({success: true})); }
        }
        if (req.url === '/api/settings') {
          if (req.method === 'GET') return res.end(JSON.stringify(db.settings));
          if (req.method === 'POST') { 
            db.settings.da_rate = JSON.parse(body).da_rate; 
            saveDb(); 
            return res.end(JSON.stringify({success: true})); 
          }
        }
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), mockCloudflareApi()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
