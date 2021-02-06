<template>
  <div class="container">
    <Navigation />
    <router-view class="container" />
  </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  components: {
    Navigation,
  },
  created() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      console.log(deferredPrompt);
    });
  },
};
</script>
