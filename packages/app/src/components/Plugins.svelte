<script>
  import { onMount } from 'svelte';

  import CodeFitness from 'core';
  import GitHubPlugin from 'code-fitness-plugin-github';
  import WakaTimePlugin from 'code-fitness-plugin-wakatime';

  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';

  import { plugins, addPlugin } from '../stores';
  import PluginBox from './PluginBox.svelte';

  let loading = true;

  onMount(async () => {
    const { provideVSCodeDesignSystem, vsCodeProgressRing } = await import(
      '@vscode/webview-ui-toolkit'
    ).then((m) => m.default || m);

    provideVSCodeDesignSystem().register(vsCodeProgressRing());

    if (dev) {
      document.body.setAttribute(
        `data-${'dev'}`,
        import.meta.env.DEV.toString()
      );
      Object.entries(env || {}).forEach(([k, v]) =>
        document.body.setAttribute(
          k.replace('PUBLIC_', 'data-').replaceAll('_', '-'),
          v || ''
        )
      );
    }

    document.body.setAttribute(
      'data-wakatime-api-base',
      `${
        dev ? 'http://localhost:3000' : 'https://code-fitness.vercel.app'
      }/wakaproxy`
    );

    if ($plugins.length === 0) {
      const tracker = new CodeFitness({
        charts: true,
        plugins: [GitHubPlugin, WakaTimePlugin],
      });

      await tracker.init();
      (await tracker.export()).forEach(addPlugin);
    }

    loading = false;
  });
</script>

<vscode-progress-ring hidden={!loading} />

{#each $plugins as p}
  <PluginBox plugin={p} />
{/each}
