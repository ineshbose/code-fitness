<script>
  import { onMount } from 'svelte';
  import CodeFitness from 'core';
  import GitHubPlugin from 'code-fitness-plugin-github';
  import WakaTimePlugin from 'code-fitness-plugin-wakatime';
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';
  import Navbar from '../components/Navbar.svelte';
  import Plugins from '../components/Plugins.svelte';

  onMount(async () => {
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

    const tracker = new CodeFitness({
      plugins: [GitHubPlugin, WakaTimePlugin],
    });

    await tracker.init();
  });
</script>

<Navbar />
<Plugins />
