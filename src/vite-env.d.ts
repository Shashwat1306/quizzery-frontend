/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  // add any other VITE_ variables you're using
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}