import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

// https://vitepress.dev/reference/site-config
export default defineUserConfig({
  base: '/catpod/',
  bundler: viteBundler(),
  debug: true,
  description: 'Documentation and manual for the CATPOD container.',
  lang: 'en-GB',
  logo: 'https://raw.githubusercontent.com/fpodschwadek/catpod/main/CATPOD_logo.png',
  theme: defaultTheme({
    sidebar: [
      '/',
      '/resources.md'
    ]
  }),
  title: 'CATPOD Docs',
})
