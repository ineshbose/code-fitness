<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { ChartConfigurationInstance, ChartItem } from 'chart.js';
  import { ghData, wtData } from './sample';

  type Plugin = {
    id: string;
    name: string;
    data?: Array<ChartConfigurationInstance>;
    open?: boolean;
  };

  type ChartMap = {
    [k: Plugin['id']]: Array<ChartItem>; // { charts: Array<ChartItem>; binds: Array<HTMLElement> };
  };

  let charts: ChartMap = {};

  let plugins: Plugin[] = [
    { id: 'github', name: 'GitHub', data: ghData },
    { id: 'wakatime', name: 'WakaTime', data: wtData },
  ];

  onMount(async () => {
    const {
      provideVSCodeDesignSystem,
      vsCodeButton,
      vsCodeDropdown,
      vsCodeOption,
    } = await import('@vscode/webview-ui-toolkit').then((m) => m.default || m);

    provideVSCodeDesignSystem().register(
      vsCodeButton(),
      vsCodeDropdown(),
      vsCodeOption()
    );

    Chart.register(...registerables);

    plugins = plugins.map((i) => ({
      ...i,
      data: (i.data || []).map((d, idx) => {
        const c = new Chart(`${i.id}-${d.type}-${idx}`, d);

        if (charts[i.id]) {
          charts[i.id].push(c);
        } else {
          charts[i.id] = [c];
        }

        charts = { ...charts }; // for svelte reactivity
        return d;
      }),
      open: true,
    }));
  });

  const scrollToViewPlugin = (p: Plugin) => {
    // eslint-disable-next-line no-undef
    const el = document.querySelector(`#${p.id}`);

    return el
      ? el.scrollIntoView({
          behavior: 'smooth',
        })
      : null;
  };

  const togglePluginVisibility = (p: Plugin) => {
    plugins = plugins.map(
      (
        i // for svelte reactivity
      ) =>
        i.id === p.id
          ? { ...i, open: p.open === undefined ? false : !p.open }
          : i
    );
  };
</script>

<div style="padding: 1rem;">
  <div
    style="display: flex; justify-content: space-between; align-items: center;"
  >
    <h1>Code Fitness</h1>

    <vscode-dropdown>
      <vscode-option>Jump to..</vscode-option>
      {#each plugins as p}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <vscode-option on:click={() => scrollToViewPlugin(p)}>
          {p.name}
        </vscode-option>
      {/each}
    </vscode-dropdown>
  </div>

  {#each plugins as p}
    <div
      id={p.id}
      style="display: flex; flex-direction: column; margin-top: 1rem; padding: 0.25rem 1rem; max-height: 24rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"
    >
      <div style="display: flex; gap: 0.5rem;">
        <vscode-button
          appearance="icon"
          aria-label={p.open ? 'Collapse' : 'Expand'}
          on:click={() => togglePluginVisibility(p)}
          on:keydown={() => togglePluginVisibility(p)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24">
            {#if p.open}
              <path
                fill="currentColor"
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
              />
            {:else}
              <path
                fill="currentColor"
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
              />
            {/if}
          </svg>
        </vscode-button>

        <h2>{p.name}</h2>
      </div>

      <div
        style={`/* flex-grow: 1; */ gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: auto; display: ${
          p.open ? 'grid' : 'none'
        };`}
      >
        {#if p.data && p.data.length > 0}
          {#each p.data as d, idx}
            <canvas
              id={`${p.id}-${d.type}-${idx}`}
              height="300px"
              width="300px"
            >
              <!-- bind:this={chartElements[`${p.id}-${idx}`]} -->
            </canvas>
          {/each}
        {:else}
          No data
        {/if}
      </div>
    </div>
  {/each}
</div>
