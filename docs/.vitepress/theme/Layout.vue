<script setup>
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <main>
    <div class="sidebar">
      <img class="logo" src="https://github.com/fpodschwadek/catpod/raw/main/CATPOD_logo.png">
      <nav>
        <ul>
          <li><a :href="`${site.base}`">Home</a></li>
          <li><a :href="`${site.base}motivation.html`">Motivation</a></li>
        </ul>
        <ul>
          <li><a class="resource" href="https://github.com/fpodschwadek/catpod" target="_blank">GitHub</a></li>
          <li><a class="resource" href="https://hub.docker.com/r/fpod/catpod" target="_blank">Docker Hub</a></li>
        </ul>
      </nav>
    </div>
    <section class="content">
      <Content />
    </section>
  </main>
  <footer>
  </footer>
</template>
