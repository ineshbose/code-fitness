<script lang="ts">
  import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";

	provideVSCodeDesignSystem().register(vsCodeButton());

  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<vscode-button on:click={increment}>
  count is {count}
</vscode-button>
