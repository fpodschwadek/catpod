import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  server: {
    host: true,
    port: 80
  },
  title: "CATPOD Docs",
  description: "Documentation and manual for the CATPOD container.",
  base: "/catpod/"
})
