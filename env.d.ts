declare module "bun" {
  interface Env {
    // Add your environment variables here
    X_USER_AGENT: string;
    X_MODELS_JSON: string;
    X_EMIT_REASONING: string;
    PORT: number;
    HOST: string;
    NODE_ENV: "development" | "production";
  }
  1;
}

// This allows the types to apply to process.env as well
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Bun.Env {}
  }
}
