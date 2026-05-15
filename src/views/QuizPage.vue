<template>
  <div class="page">
    <!-- 顶部导航信息 -->
    <div class="quiz-header">
      <div class="quiz-meta">
        <span class="text-mono">Q.{{ String(progress).padStart(2, '0') }}/{{ String(totalQuestions).padStart(2, '0') }}</span>
        <span class="text-muted">·</span>
        <span class="text-muted">{{ currentQuestion.text.slice(0, 20) }}...</span>
      </div>
      <div class="progress-bar" style="margin-top: 16px;">
        <div
          v-for="(_, idx) in totalQuestions"
          :key="idx"
          class="step"
          :class="{
            active: state.answers[idx] !== null,
            current: idx === state.currentIndex,
          }"
        ></div>
      </div>
    </div>

    <!-- 题目卡片 -->
    <div class="question-card">
      <transition name="fade" mode="out-in">
        <div :key="state.currentIndex" class="question-inner">
          <h2 class="heading-lg question-text">{{ currentQuestion.text }}</h2>

          <div class="options-list">
            <button
              v-for="option in currentQuestion.options"
              :key="option.key"
              class="option-btn"
              :class="{ selected: currentAnswer?.key === option.key }"
              @click="selectOption(option)"
            >
              <span class="option-key">{{ option.key }}</span>
              <span class="option-text">{{ option.text }}</span>
              <span class="option-check" v-if="currentAnswer?.key === option.key">✓</span>
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- 底部操作栏 -->
    <div class="quiz-footer">
      <div class="footer-left">
        <button
          class="btn btn-ghost"
          :disabled="state.currentIndex === 0"
          @click="prevQuestion"
        >
          ← 上一题
        </button>
      </div>
      <div class="footer-center">
        <button class="btn btn-ghost" @click="skipCurrent">
          跳过
        </button>
      </div>
      <div class="footer-right">
        <button
          v-if="isLastQuestion"
          class="btn btn-primary"
          :disabled="!allAnswered"
          @click="goToResult"
        >
          查看结果 →
        </button>
        <button
          v-else
          class="btn btn-primary"
          :disabled="!hasAnswer"
          @click="nextQuestion"
        >
          下一题 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '../composables/useQuiz.js'

const router = useRouter()
const {
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
  skipCurrent,
} = useQuiz()

const isLastQuestion = computed(() => state.currentIndex === totalQuestions.value - 1)

function goToResult() {
  router.push('/result')
}
</script>

<style scoped>
.quiz-header {
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.quiz-meta {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

/* Question */
.question-card {
  padding: var(--space-3xl) 0;
  min-height: 360px;
}

.question-text {
  margin-bottom: var(--space-2xl);
  line-height: 1.3;
}

/* Options */
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.option-btn {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid var(--color-border-light);
  background: var(--color-bg);
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.option-btn:hover {
  border-color: var(--color-text-muted);
  background: var(--color-bg-subtle);
}

.option-btn.selected {
  border-color: var(--color-accent);
  background: var(--color-bg-subtle);
}

.option-key {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.option-btn.selected .option-key {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.option-text {
  flex: 1;
  line-height: 1.4;
}

.option-check {
  font-size: 1.1rem;
  color: var(--color-accent);
  flex-shrink: 0;
}

/* Footer */
.quiz-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border-light);
}

.footer-left,
.footer-center,
.footer-right {
  flex: 1;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: right;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .quiz-footer {
    flex-wrap: wrap;
    gap: var(--space-sm);
  }
  .footer-left,
  .footer-right {
    flex: 0 0 auto;
  }
  .footer-center {
    display: none;
  }
}
</style>
