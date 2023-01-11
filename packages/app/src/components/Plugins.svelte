<script>
  import { plugins } from '../stores';
  import PluginBox from './PluginBox.svelte';
</script>

{#each $plugins as p}
  <PluginBox plugin={p} />
{/each}
