<script setup>
import { ref } from 'vue';

defineEmits(["start-quiz"]);

const isHovered = ref(false)

</script>

<template>
  <div class="text-center">
    <h1 class="max-sm:text-[46px] text-6xl font-bold">QuizMaster 🧠</h1>
    <p class="py-2">QuizMaster is an exciting and intellectually stimulating quiz game designed to challenge your knowledge across various topics. Whether you’re a trivia enthusiast, a history buff, or a pop culture aficionado, QuizMaster has something for everyone.</p>
    <button @click="$emit('start-quiz')" class="answer-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false">{{ isHovered ? "Let's start!" : "Are you ready to start?" }}</button>
  </div>
</template>

<style lang="scss" scoped>
.answer-button {
  padding: 8px;
  margin: 5px;
  background-color: #3a3a3a;
  border: 3px solid black;
  border-radius: 8px;
  color: white;
  width: 100%;
  transition: all 0.1s;
  font-weight: 400;
}

.answer-button:hover{
    transition: all 0.1s;
    background-color: #861e8f;
    text-transform: uppercase;
    font-weight: 600;
}
</style>
