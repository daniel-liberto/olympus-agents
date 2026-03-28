import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function pipelineStatusPlugin() {
  return {
    name: 'pipeline-status',
    configureServer(server: any) {
      server.middlewares.use('/api/pipeline-status', (_req: any, res: any) => {
        const filePath = path.resolve(__dirname, 'cursor/agents/pipeline-status.json');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(content);
        } catch {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ currentAgent: null, phase: 'idle', queue: [], completed: {}, startedAt: null }));
        }
      });

      server.middlewares.use('/api/final-report', (_req: any, res: any) => {
        const filePath = path.resolve(__dirname, 'cursor/agents/zeus/output/final-delivery.md');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.end(content);
        } catch {
          res.statusCode = 404;
          res.end('');
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    server: {
      host: "::",
      port: 5173,
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          format: 'es',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: isProduction ? 'esbuild' : false,
      sourcemap: !isProduction,
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
    plugins: [pipelineStatusPlugin(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
