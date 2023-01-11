<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { ChartConfigurationInstance } from 'chart.js';

  // export let id: string; // `${plugin.id}-${d.type}-${idx}`
  export let data: ChartConfigurationInstance;

  let canvas: HTMLCanvasElement;
  let chart;

  onMount(() => {
    Chart.register(...registerables);
    chart = new Chart(canvas, data);

    chart.render();
  });
</script>

<canvas height="300px" width="300px" bind:this={canvas}>
  <!-- bind:this={chartElements[`${p.id}-${idx}`]} -->
</canvas>
