<script setup lang="ts">
definePageMeta({
  name: "landing",
  layout: "transition",
});

const router = useRouter();
const viewport = useViewport();
const localePath = useLocalePath();

onMounted(() => {
  const brandAnimation = document.getElementById("brand-animation");
  return brandAnimation
    ? brandAnimation.addEventListener("animationend", () =>
        redirect("/dashboard")
      )
    : redirect("/dashboard");
});

function redirect(to: string) {
  return router.replace(localePath(to));
}
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center">
    <svg v-if="viewport.isGreaterOrEquals('tablet')" width="750" height="100">
      <defs>
        <mask id="text-mask" x="0" y="0" width="100%" height="100%">
          <rect
            class="fill-rect"
            id="brand-animation"
            x="0"
            y="0"
            height="100%"
            fill="white"
          />
        </mask>
      </defs>
      <text x="20" y="70" class="text" mask="url(#text-mask)">Megurumi Creative</text>
    </svg>
    <NuxtImg
      v-else
      src="/img/brand/outlined.png"
      format="webp"
      class="w-[60px] lg:w-[80px]"
      alt="Megurumi Creative Brand Outlined Icon"
    />
  </div>
</template>

<style scoped>
.fill-rect {
  animation: fillRect 1.5s forwards;
}

.text {
  font-size: 6rem;
  font-weight: bold;
  fill: rgb(var(--color-primary-500));
}

@keyframes fillRect {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.gradient {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(var(--color-primary-500) / 0.25) 0,
    white 100%
  );
}
</style>

<i18n lang="json">
{
  "en": {},
  "fr": {}
}
</i18n>
