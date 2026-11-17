import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.brapex.portal',
  appName: 'BRAPEX',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
