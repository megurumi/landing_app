<template>
  <UDashboardPage class="w-full h-screen">
    <div class="gradient absolute pointer-none inset-0 -z-10" />
    <div
      class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    ></div>
    <slot></slot>
  </UDashboardPage>
</template>

<style scoped>
.gradient {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(var(--color-primary-500) / 0.25) 0,
    white 100%
  );
}

.dark {
  .gradient {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgb(var(--color-primary-400) / 0.1) 0,
      rgb(var(--color-gray-950)) 100%
    );
  }
}

.overlay {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px);
}
.dark {
  .overlay {
    background-image: linear-gradient(to right, rgb(var(--color-gray-900)) 0.5px, transparent 0.5px),
      linear-gradient(to bottom, rgb(var(--color-gray-900)) 0.5px, transparent 0.5px);
  }
}

.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-300)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-300)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image: linear-gradient(to right, rgb(var(--color-gray-700)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-700)) 1px, transparent 1px);
  }
}
</style>
