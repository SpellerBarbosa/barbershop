<script setup lang="ts">
const props = defineProps({
  input_name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type_input: {
    type: String || Number,
    default: "text",
  },
  place: {
    type: String,
    required: true,
  },
  state:{
    type: Boolean,
    default: false
  },
  modelValue:{
    type: [String, Number],
    required: true
  }
});

const inputType = props.type_input || "text";

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | undefined): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <label :for="link" class=" flex flex-col w-[90%] uppercase font-semibold tracking-wider text-sm text-[#c6a765]">
    <span>{{ input_name }}</span>
    <input
    :type="inputType"
    :placeholder="place"
    :id="link"
    :value="modelValue"
    @input="updateValue"
    :class="['w-[100%] h-[30px] text-center outline-none border-b-1 botfocus:border-b-2 focus:border-[#3eee3e] focus:bg-[#3f3f3fd2] focus:transition-all focus:duration-500 mt-3', state ? 'border-b-red-500 focus:border-b-red-500':'']"
  />
    </label>
</template>
