<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let open = true;
  export let name = '';

  const dispatch = createEventDispatcher();

  onMount(async () => {
    const { provideVSCodeDesignSystem, vsCodeButton } = await import(
      '@vscode/webview-ui-toolkit'
    ).then((m) => m.default || m);

    provideVSCodeDesignSystem().register(vsCodeButton());
  });

  const togglePluginVisibility = () => {
    open = !open;
    dispatch(open ? 'open' : 'closed');
  };
</script>

<div style="display: flex; gap: 0.5rem;">
  <vscode-button
    appearance="icon"
    aria-label={open ? 'Collapse' : 'Expand'}
    on:click={togglePluginVisibility}
    on:keydown={togglePluginVisibility}
  >
    <svg width="32" height="32" viewBox="0 0 24 24">
      {#if open}
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

  <h2 style="text-transform: uppercase; letter-spacing: 0.05em;">{name}</h2>
</div>
