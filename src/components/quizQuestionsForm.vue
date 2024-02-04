<script setup>
import { ref } from "vue";
import { decode } from "html-entities";
import { getQuizQuestion, getQuizLength } from "../javascript/quizQuestions.js";

const props = defineProps({
  timerInSeconds: Number,
  questionsDone: Number,
  quizPoints: Number
});

const emit = defineEmits(["start-countdown", "stop-countdown", "finish-quiz", "add-question", "add-point"]);

var quizQuestion = ref({});
var quizAnswers = [];
var showAnswers = ref(false);
var answering = ref(false);

const shuffleAnswers = (quizAnswers) => {
  quizAnswers.sort((a, b) => 0.5 - Math.random());
};

const getQuizQuestionAndAssignIt = () => {
  const quizQuestionData = getQuizQuestion();

  if (!quizQuestionData) {
    answering.value = false;
    return;
  }

  quizQuestion.value = quizQuestionData;
  quizAnswers.push(
    ...quizQuestion.value.incorrect_answers,
    quizQuestion.value.correct_answer
  );
  shuffleAnswers(quizAnswers);
};

const checkIfAnswerIsCorrect = (answer) => {
  return quizQuestion.value.correct_answer === answer;
};

getQuizQuestionAndAssignIt();

const onAnswerButtonClick = (answer) => {
  const isCorrect = checkIfAnswerIsCorrect(answer);
  if (!showAnswers.value) {
    showAnswers.value = !showAnswers.value;
    emit("stop-countdown");
    if (isCorrect) {
      emit("add-point")
    }
  }
};

const onNextButtonClick = () => {
  showAnswers.value = false;
  quizAnswers = [];
  getQuizQuestionAndAssignIt();
  emit("start-countdown");
  emit("add-question")
};

const isThereAnyQuestionsLeft = () => {
  return getQuizLength() !== 1;
};

const onFinishButtonClick = () => {
  emit("stop-countdown");
  emit("finish-quiz");
  showAnswers.value = false;
  quizAnswers = [];
  quizQuestion = {};
};
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="w-full text-center border-2 border-solid border-black p-3 max-sm:max-w-[95%] max-w-[70%] rounded-md mb-2 bg-[#eeeeee]">
    <h2 class="text-4xl font-bold pb-2">Scoreboard</h2>
    <div class="flex justify-evenly w-full gap-2">
      <div class="flex justify-center items-center flex-col p-1 border-black border-solid border-2 rounded-md w-full bg-white">
        <span class="text-xl font-medium">{{ Math.floor(timerInSeconds / 1000) }}</span>
        <span class="text-xs font-light">{{ Math.floor(timerInSeconds / 1000) <= 1 ? "Second" : "Seconds"}}</span>
      </div>
      <div class="flex justify-center items-center flex-col p-1 border-black border-solid border-2 rounded-md w-full bg-white">
        <span class="text-xl font-medium">{{ quizPoints }}</span>
        <span class="text-xs font-light">{{ quizPoints <= 1 ? "Point" : "Points"}}</span>
      </div>
      <div class="flex justify-center items-center flex-col p-1 border-black border-solid border-2 rounded-md w-full bg-white">
        <span class="text-xl font-medium">{{ questionsDone }}</span>
        <span class="text-xs font-light">{{ questionsDone <= 1 ? "Question" : "Questions"}}</span>
      </div>
    </div>
    </div>
    <div class="text-center w-full">
      <div class="border-2 border-black border-solid rounded-md p-3 my-2 w-full bg-[#eeeeee]">
        <h3 class="text-base">{{ decode(quizQuestion.question, { level: "html5" }) }}</h3>
      </div>
      <ul class="answers-list my-4 gap-2 flex flex-col">
        <li v-for="answer in quizAnswers" class="answer">
          <button
            :disabled="showAnswers"
            @click.prevent="onAnswerButtonClick(answer)"
            class="answer-button"
            :class="
              showAnswers
                ? checkIfAnswerIsCorrect(answer)
                  ? 'correct'
                  : 'incorrect'
                : ''
            "
          >
            {{ decode(answer, { level: "html5" }) }}
          </button>
        </li>
      </ul>
    </div>
    <div class="flex gap-2 w-full justify-center">
      <button
        @click.prevent="onFinishButtonClick"
        class="answer-button max-w-52" :disabled="!showAnswers" :class="showAnswers ? '' : 'inaccessible'"
      >
        Finish
      </button>
      <button
        @click.prevent="onNextButtonClick"
        class="answer-button max-w-52" v-if="isThereAnyQuestionsLeft()" :disabled="!showAnswers" :class="showAnswers ? '' : 'inaccessible'"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.correct {
  background-color: green !important;
}

.incorrect {
  background-color: red !important;
}

.answer-button {
  padding: 12px;
  margin: 0;
  width: 100%;
  background-color: #585858;
  border: 2px solid black;
  border-radius: 6px;
  color: white;
}

.inaccessible{
  background-color: #eeeeee !important;
  color: black !important;
}

@media screen and (max-height: 500px) {
  .answers-list{
    display: flex !important;
    flex-wrap: wrap !important;
    flex-direction: row !important;
    align-content: space-between !important;
    justify-content: space-around !important;
  }

  .answer{
    width: 48% !important;
  }
}

</style>
