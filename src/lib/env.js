export const ENV = {
    appId: import.meta.env.VITE_APP_ID ?? "",
    cookieSecret: import.meta.env.VITE_JWT_SECRET ?? "",
    databaseUrl: import.meta.env.VITE_DATABASE_URL ?? "",
    oAuthServerUrl: import.meta.env.VITE_OAUTH_SERVER_URL ?? "",
    ownerId: import.meta.env.VITE_OWNER_OPEN_ID ?? "",
    isProduction: import.meta.env.PROD,
    forgeApiUrl: import.meta.env.VITE_BUILT_IN_FORGE_API_URL ?? "",
    forgeApiKey: import.meta.env.VITE_BUILT_IN_FORGE_API_KEY ?? "",
    VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
    VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
    VITE_EMAILJS_VERIFICATION_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_VERIFICATION_TEMPLATE_ID ?? "",
    VITE_EMAILJS_CUSTOM_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CUSTOM_TEMPLATE_ID ?? "",
};
