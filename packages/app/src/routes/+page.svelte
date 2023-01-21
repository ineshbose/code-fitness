<script>
  import { onMount } from 'svelte';
  import CodeFitness from 'core';
  import GitHubPlugin from 'code-fitness-plugin-github';
  import WakaTimePlugin from 'code-fitness-plugin-wakatime';
  import Navbar from '../components/Navbar.svelte';
  import Plugins from '../components/Plugins.svelte';

  onMount(async () => {
    const tracker = new CodeFitness({
      plugins: [GitHubPlugin, WakaTimePlugin],
    });

    await tracker.init();
  });
</script>

<Navbar />
<Plugins />
