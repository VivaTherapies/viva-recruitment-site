/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ID: string;
  readonly VITE_JWT_SECRET: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_OAUTH_SERVER_URL: string;
  readonly VITE_OWNER_OPEN_ID: string;

  readonly VITE_BUILT_IN_FORGE_API_URL: string;
  readonly VITE_BUILT_IN_FORGE_API_KEY: string;

  // EmailJS variables
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_VERIFICATION_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_CUSTOM_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

