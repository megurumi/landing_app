<template>
  <Popover class="relative inline-block">
    <PopoverButton
      as="div"
      class="inline-block"
      @mouseenter="show = true"
      @mouseleave="show = false"
      @focus="show = true"
      @blur="show = false"
    >
      <slot />
    </PopoverButton>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <PopoverPanel
        v-show="show"
        static
        :class="tooltipClasses"
      >
        {{ text }}
        <slot name="content" />
        <!-- Arrow -->
        <div :class="arrowClasses"></div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

interface Props {
  text?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  position: 'top'
})

const show = ref(false)

const tooltipClasses = computed(() => {
  const base = 'absolute px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap z-50'
  
  switch (props.position) {
    case 'top':
      return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`
    case 'bottom':
      return `${base} top-full left-1/2 transform -translate-x-1/2 mt-2`
    case 'left':
      return `${base} right-full top-1/2 transform -translate-y-1/2 mr-2`
    case 'right':
      return `${base} left-full top-1/2 transform -translate-y-1/2 ml-2`
    default:
      return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`
  }
})

const arrowClasses = computed(() => {
  const base = 'absolute border-4 border-transparent'
  
  switch (props.position) {
    case 'top':
      return `${base} top-full left-1/2 transform -translate-x-1/2 border-t-gray-900`
    case 'bottom':
      return `${base} bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900`
    case 'left':
      return `${base} left-full top-1/2 transform -translate-y-1/2 border-l-gray-900`
    case 'right':
      return `${base} right-full top-1/2 transform -translate-y-1/2 border-r-gray-900`
    default:
      return `${base} top-full left-1/2 transform -translate-x-1/2 border-t-gray-900`
  }
})
</script>
