<script lang="ts">
  import './app.css';
  import Counter from '~/components/Counter.svelte';
</script>

<main>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="https://picsum.photos/400/225" alt="" /></figure>
    <div class="card-body">
      <h2 class="card-title">Code Fitness</h2>
      <p>Trying to expose your development habits!</p>
      <div class="card-actions justify-end">
        <Counter />
      </div>
    </div>
  </div>
</main>
