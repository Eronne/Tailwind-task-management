<script setup lang="ts">
import {Listbox, ListboxButton, ListboxOption, ListboxOptions,} from '@headlessui/vue'
import type {PropType} from 'vue'
import {ref, toRefs, watch} from 'vue'
import type {SelectItem} from './types'

type ModelValue = SelectItem | SelectItem[] | null | undefined

const props = defineProps({
  modelValue: {
    type: Object as PropType<ModelValue>,
  },
  items: {
    type: Array as PropType<SelectItem[]>,
    default: () => [] as SelectItem[],
  },
  placeholder: {
    type: String,
    default: 'Choose',
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)

function getSelectedText(value: string) {
  return props.items.find(item => item.value === value)
}
const selected = ref<SelectItem | undefined>(getSelectedText(modelValue!.value))
watch(selected, (val) => {
  emit('update:modelValue', val?.value)
})
</script>

<template>
  <Listbox v-model="selected" class="w-full" :multiple="multiple">
    <div class="relative mt-1">
      <ListboxButton
        class="
          relative
          w-full
          py-2
          pl-3
          pr-10
          min-w-[130px]
          text-left
          rounded-md
          shadow-sm
          border border-gray-300
          cursor-default
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-opacity-75
          focus-visible:ring-primary-300
          focus-visible:border-primary-500
          transition
          duration-300
        " :class="[
          outlined
            ? 'bg-transparent border-icon-inverse text-inverse-subdued'
            : 'bg-white',
          {
            'text-xs': small,
            'text-sm': !small && !large,
            'text-lg': large,
          },
        ]"
      >
        <span class="block truncate">
          {{ multiple && selected ? `${(selected as SelectItem[])?.length} selected` : selected?.text
            || placeholder
          }}
        </span>

        <div class="absolute inset-y-0 right-3 flex gap-2 items-center">
          <span
            class="
            flex
            items-center
            pointer-events-none
          "
          >
            <Icon name="heroicons:chevron-up-down" class="w-5 h-5" aria-hidden="true" />
          </span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            w-full
            py-1
            mt-1
            overflow-auto
            text-base
            bg-white
            rounded-md
            shadow-lg
            max-h-60
            ring-1 ring-black ring-opacity-5
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            v-for="item in items" v-slot="{ active, selected: selectedOption }" :key="item.text"
            :value="item" as="template"
          >
            <div class="px-1">
              <li v-if="item.divider" class="border-b -mx-1 my-1" />
              <li
                v-else class="cursor-default select-none relative py-2 px-4 rounded" :class="[
                  active ? 'bg-gray-100' : 'text-gray-900',
                ]"
              >
                <span
                  class="block truncate" :class="[
                    selectedOption ? 'font-medium text-primary-500' : 'font-normal',
                  ]"
                >
                  {{ item.text }}
                </span>
              </li>
            </div>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
