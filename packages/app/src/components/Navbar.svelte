<script lang="ts">
  import type { FitPlugin } from 'src/app';
  import { onMount } from 'svelte';
  import { plugins } from '../stores';

  onMount(async () => {
    const { provideVSCodeDesignSystem, vsCodeDropdown, vsCodeOption } =
      await import('@vscode/webview-ui-toolkit').then((m) => m.default || m);

    provideVSCodeDesignSystem().register(vsCodeDropdown(), vsCodeOption());
  });

  const scrollToViewPlugin = (p: FitPlugin) => {
    const el = document.querySelector(`#${p.name}`);

    return el
      ? el.scrollIntoView({
          behavior: 'smooth',
        })
      : null;
  };
</script>

<div
  style="display: flex; justify-content: space-between; align-items: center;"
>
  <h1>Code Fitness</h1>

  <vscode-dropdown disabled={$plugins.length === 0}>
    <vscode-option>Jump to..</vscode-option>
    {#each $plugins as p}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <vscode-option on:click={() => scrollToViewPlugin(p)}>
        {p.name}
      </vscode-option>
    {/each}
  </vscode-dropdown>
</div>
