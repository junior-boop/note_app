import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  "theme_color": "#ffffff",
  "background_color": "#fff",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "name": "NoteApp",
  "short_name": "Note",
  "description": "Application de note pour les lecture biblique",
  "id": "/",
  "icons": [
      {
          "src": "/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
      },
      {
          "src": "/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
      },
      {
          "src": "/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
      },
      {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
      }
  ],
  "screenshots": [
      {
        "src": "/noteapp-capture.png",
        "type": "image/png",
        "sizes": "378x849",
        "form_factor": "narrow"
      }
    ]
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn)
  ],
<<<<<<< HEAD
=======
  build : {
    target: 'esnext'
  }
>>>>>>> 9bb58ba (build esnext)
})


