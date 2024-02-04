<script setup>
const props = defineProps({
  quizPoints: Number,
  timerInSeconds: Number,
  questionsAreDone: Number,
});

const calculatePrecentageOfRightAnswers = (allAnswers, rightAnswers) => {
  return Math.round((rightAnswers * 100) / allAnswers);
};

const resultText = (allAnswers, rightAnswers) => {
  const result = calculatePrecentageOfRightAnswers(allAnswers, rightAnswers);

  if (result === 100) return "WOW! What a result 🔥";
  else if (result >= 70) return "Nice work! 😉";
  else if (result >= 50) return "Good enough! 🤔";
  else return "Next time will be better! 😊";
};

defineEmits(["on-restart"]);
</script>

<template>
  <div class="text-center w-full">
    <h1 class="font-semibold text-4xl">
      {{ resultText(questionsAreDone, quizPoints) }}
    </h1>
    <p class="py-3 text-base">
      You have scored <b>{{ quizPoints }}</b>
      {{ quizPoints <= 1 ? "point" : "points" }} out of
      <b>{{ questionsAreDone }}</b>
      {{ questionsAreDone <= 1 ? "question" : "questions" }} you answered. You
      did all of that in <b>{{ Math.floor(timerInSeconds / 1000) }}</b>
      {{ Math.floor(timerInSeconds / 1000) <= 1 ? "second" : "seconds" }} or
      <b>{{ timerInSeconds }}</b>
      {{ timerInSeconds <= 1 ? "milisecond" : "miliseconds" }}!
    </p>
    <button @click.prevent="$emit('on-restart')" class="answer-button">
      Restart?
    </button>
  </div>
</template>

<style lang="scss" scoped>
.answer-button {
  padding: 10px;
  margin: 5px;
  width: 100%;
  max-width: 250px;
  background-color: #2e2e2e;
  border: 2px solid black;
  border-radius: 6px;
  color: white;
  transition: all 0.1s;
}

.answer-button:hover{
    background-color: #bd811f;
    transition: all 0.1s;
}
</style>
