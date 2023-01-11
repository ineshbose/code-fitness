<script lang="ts">
  import PluginHeader from './PluginHeader.svelte';
  import PluginChart from './PluginChart.svelte';

  export let plugin: FitPlugin;
  let open = true;
</script>

<div
  id={plugin.id}
  style="display: flex; flex-direction: column; margin-top: 1rem; padding: 0.25rem 1rem; max-height: 24rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"
>
  <PluginHeader name={plugin.name} bind:open />

  <div
    style={`/* flex-grow: 1; */ gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: auto; display: ${
      open ? 'grid' : 'none'
    };`}
  >
    {#if plugin.data && plugin.data.length > 0}
      {#each plugin.data as d}
        <PluginChart data={d} />
      {/each}
    {:else}
      No data
    {/if}
  </div>
</div>
