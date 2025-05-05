<script setup lang="ts">
import { watchEffect, onMounted } from "vue";
import axios from "axios";

const inputRef = <HTMLInputElement | null>null;
const imagePreview = ref<string>("");
const user = ref<string>("");

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const render = new FileReader();

    render.onload = () => {
      imagePreview.value = render.result as string;
    };

    render.readAsDataURL(file);
  }
};

onMounted(() => {
  watchEffect(async () => {
    if(!user.value){
      try {
      const response = await axios.get("/api/profile");

      const data = response.data;

      user.value = data.userName;
      console.log(data);
    } catch (error) {}
    }
  });
});
</script>

<template>
  <section :class="[user ? 'block' : 'hidden']">
    <figure class="w-[100px] h-[100px] rounded-full overflow-hidden">
      <img
        :src="imagePreview || '/img/unknow.png'"
        alt="clique para escolher a imagem"
        @click="inputRef?.click()"
        class="w-[100%] cursor-pointer"
      />
      <input type="file" class="hidden" ref="inputRef" @change="handleChange" />
    </figure>
    <span>{{ user }}</span>
  </section>
</template>
