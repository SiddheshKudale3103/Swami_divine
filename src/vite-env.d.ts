/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string
  // add other VITE_ vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
