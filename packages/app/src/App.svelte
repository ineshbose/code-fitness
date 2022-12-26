<script lang="ts">
  import Counter from './lib/Counter.svelte';
</script>

<main>
  <h1>Vite + Svelte</h1>
  <Counter />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
  }

  main > * {
    margin: 1rem 0;
  }
</style>
