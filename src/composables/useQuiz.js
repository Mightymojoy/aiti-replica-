import { reactive, computed } from 'vue'
import { questions } from '../data/questions.js'

/**
 * 测评状态管理
 */
const state = reactive({
  currentIndex: 0,          // 当前题号（0-based）
  answers: Array(questions.length).fill(null), // 每题的选中选项对象
  isFinished: false,
})

export function useQuiz() {
  const currentQuestion = computed(() => questions[state.currentIndex])
  const totalQuestions = computed(() => questions.length)
  const progress = computed(() => state.currentIndex + 1)
  const hasAnswer = computed(() => state.answers[state.currentIndex] !== null)
  const currentAnswer = computed(() => state.answers[state.currentIndex])

  const allAnswered = computed(() => state.answers.every((a) => a !== null))

  function selectOption(option) {
    state.answers[state.currentIndex] = option
  }

  function nextQuestion() {
    if (state.currentIndex < questions.length - 1) {
      state.currentIndex++
    }
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--
    }
  }

  function goToQuestion(index) {
    if (index >= 0 && index < questions.length) {
      state.currentIndex = index
    }
  }

  function skipCurrent() {
    state.answers[state.currentIndex] = null
    nextQuestion()
  }

  function finishQuiz() {
    state.isFinished = true
  }

  function resetQuiz() {
    state.currentIndex = 0
    state.answers = Array(questions.length).fill(null)
    state.isFinished = false
  }

  return {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    hasAnswer,
    currentAnswer,
    allAnswered,
    selectOption,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    skipCurrent,
    finishQuiz,
    resetQuiz,
    questions,
  }
}

export { questions }
