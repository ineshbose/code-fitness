<script lang="ts">
  import type { FitPlugin } from 'src/app';
  import PluginHeader from './PluginHeader.svelte';
  import PluginChart from './PluginChart.svelte';

  // need to handle ChartConfigurationInstance | native data
  export let plugin: FitPlugin | any;
  let open = true;
</script>

<div
  id={plugin.name}
  style="position: relative; background-color: #ffffff; border-radius: 0.25rem; display: flex; flex-direction: column; margin-top: 1rem; padding: 0.25rem 1rem; max-height: 24rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"
>
  <PluginHeader name={plugin.name} bind:open />

  <div
    style={`padding: 1rem; display: ${
      open ? 'flex' : 'none'
    }; /* flex-grow: 1; */ gap: 1rem; overflow: auto; flex-wrap: wrap; justify-content: space-between;`}
  >
    {#if plugin.data && plugin.data.length > 0}
      {#each plugin.data as d}
        <PluginChart data={d} />
      {/each}
    {:else}
      <span
        style="display: flex; gap: 0.5rem; padding: 1rem; text-transform: uppercase; letter-spacing: 0.05em;"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2z"
          />
          <path fill="currentColor" d="M13 16h-2v2h2zm0-6h-2v5h2z" />
        </svg>
        No data
      </span>
    {/if}
  </div>
</div>
