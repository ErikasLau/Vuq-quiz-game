<script setup>
//Stats
//Finish screen

import { ref } from "vue";
import { loadAllQuizQuestions } from "../javascript/quizQuestions.js";

import quizQuestionsForm from "@/components/quizQuestionsForm.vue";
import quizStartScreen from "@/components/quizStartScreen.vue";
import quizFinal from "@/components/quizFinal.vue";

var quizPoints = ref(0);
var questionsDone = ref(1);
var timerInSeconds = ref(0);

var answering = ref(false);
var finishScreen = ref(false);

var timerId;
var elapsedTime = 0;

const onStartButtonClick = async () => {
  await loadAllQuizQuestions();
  startCountdown();
  answering.value = true;
};

const onRestartButtonClick = () => {
  quizPoints.value = 0;
  questionsDone.value = 1;

  timerInSeconds.value = 0;
  elapsedTime = 0;

  answering.value = false;
  finishScreen.value = false;
};

const startCountdown = () => {
  var start = Date.now();
  var interval = 100;

  timerId = setInterval(function () {
    var delta = Date.now() - start;
    var time = elapsedTime + delta;

    timerInSeconds.value = time;
  }, interval);
};

const stopCountdown = () => {
  clearInterval(timerId);
  elapsedTime = timerInSeconds.value;
};

const onNextButtonClick = () => {
  questionsDone.value++;
};

const onFinishButtonClick = () => {
  answering.value = false;
  finishScreen.value = true;
};

const addPoint = () => {
  quizPoints.value++;
};
</script>

<template>
  <main
    class="bg-white text-black p-4 flex items-center justify-center h-full m-auto shadow-md shadow-[#d39df7b0]"
  >
    <div class="max-w-5xl w-full">
      <div v-if="!answering && !finishScreen">
        <quizStartScreen @start-quiz="onStartButtonClick" />
      </div>
      <div v-else-if="answering && !finishScreen" class="w-full">
        <quizQuestionsForm
          :timerInSeconds="timerInSeconds"
          :questionsDone="questionsDone"
          :quizPoints="quizPoints"
          @add-question="onNextButtonClick"
          @start-countdown="startCountdown"
          @stop-countdown="stopCountdown"
          @finish-quiz="onFinishButtonClick"
          @add-point="addPoint"
        />
      </div>
      <div v-else>
        <quizFinal
          :quizPoints="quizPoints"
          :timerInSeconds="timerInSeconds"
          :questionsAreDone="questionsDone"
          @on-restart="onRestartButtonClick"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.correct {
  background-color: green !important;
}

.incorrect {
  background-color: red !important;
}

.answer-button {
  padding: 6px;
  margin: 5px;
  min-width: 200px;
  background-color: #585858;
  border: 2px solid black;
  border-radius: 6px;
  color: white;
}
</style>
