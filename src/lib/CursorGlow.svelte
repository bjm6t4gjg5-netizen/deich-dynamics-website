<script lang="ts">
  import { pointer } from './stores';

  // Reactive: bewegt sich mit dem Mauszeiger und verblasst auf Touch-Geräten.
  $: x = $pointer.x * 100;
  $: y = $pointer.y * 100;
</script>

<div class="glow" style="--x: {x}%; --y: {y}%;" aria-hidden="true"></div>

<style>
  .glow {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(
        500px circle at var(--x) var(--y),
        rgba(29, 63, 54, 0.10),
        rgba(29, 63, 54, 0.03) 30%,
        transparent 60%
      ),
      radial-gradient(
        900px circle at calc(100% - var(--x)) calc(100% - var(--y)),
        rgba(184, 133, 54, 0.08),
        transparent 55%
      );
    transition: background 60ms linear;
    mix-blend-mode: multiply;
  }

  @media (hover: none) {
    .glow {
      display: none;
    }
  }
</style>
