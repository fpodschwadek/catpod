import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

// https://vuepress.vuejs.org/reference/config.html
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
      '/how-to-use.md',
      '/use-cases.md',
      '/resources.md'
    ]
  }),
  title: 'CATPOD Docs',
})
