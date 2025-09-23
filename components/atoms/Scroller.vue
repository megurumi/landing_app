<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();

const scrollY = ref(0);

defineProps({
  target: String
})

function onScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
    <UIcon
        name="i-heroicons-chevron-down"
        class="h-6 w-6 relative -bottom-20 transition-opacity duration-1000 cursor-pointer"
        :class="{ 'opacity-0': scrollY > 80 }"
        @click="router.push(localePath('/') + `#${target}`)"
    />
</template>
