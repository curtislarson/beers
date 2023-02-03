/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISABLE_IMAGE_LOAD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
