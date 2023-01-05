<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const { provideVSCodeDesignSystem, vsCodeButton } = await import(
      '@vscode/webview-ui-toolkit'
    ).then((m) => m.default || m);

    provideVSCodeDesignSystem().register(vsCodeButton());
  });

  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<vscode-button on:click={increment} on:keydown={increment}>
  count is {count}
</vscode-button>
