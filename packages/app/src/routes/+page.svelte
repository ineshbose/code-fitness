<script>
  import {
    provideVSCodeDesignSystem,
    vsCodeButton,
  } from '@vscode/webview-ui-toolkit';

  provideVSCodeDesignSystem().register(vsCodeButton());

  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<vscode-button on:click={increment} on:keydown={increment}>
  count is {count}
</vscode-button>
