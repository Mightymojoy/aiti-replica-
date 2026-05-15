<template>
  <div class="page page-wide">
    <!-- 出版刊头 -->
    <header class="masthead">
      <div class="masthead-meta">
        <span class="text-mono">Vol. I</span>
        <span class="text-muted">·</span>
        <span class="text-mono">Nº 2026</span>
      </div>
      <h1 class="display-title">AI 时代段位手册</h1>
      <p class="display-subtitle">AITI · Assessment of Tier in the AI Era</p>
      <div class="masthead-desc">
        <p>十道题，测出你在 AI 使用能力光谱上的位置坐标。</p>
        <p>从 LV.00 旁观者到 LV.10 一人军团——你站在哪里？</p>
      </div>
    </header>

    <!-- 开始按钮 -->
    <div class="cta-section">
      <button class="btn btn-primary btn-lg" @click="startQuiz">
        开始 10 题测评
        <span class="arrow">→</span>
      </button>
      <p class="text-muted" style="margin-top: 12px;">
        约需 3-5 分钟 · 11 个段位 · 4 条进阶轴线
      </p>
    </div>

    <hr class="divider" />

    <!-- 段位全览 -->
    <section class="section">
      <h2 class="heading-lg">段位图鉴 Codex</h2>
      <p class="body-text" style="margin-top: 8px;">
        全部 11 个段位，从初识 AI 到一人军团——哪一级是你的？
      </p>

      <div class="tier-list">
        <div
          v-for="tier in tiers"
          :key="tier.level"
          class="tier-card"
          :class="{ expanded: expandedTier === tier.level }"
          @click="toggleTier(tier.level)"
        >
          <div class="tier-card-header">
            <span class="tier-level text-mono">{{ 'LV.' + String(tier.level).padStart(2, '0') }}</span>
            <span class="tier-name">{{ tier.name }}<span class="tier-name-en"> {{ tier.nameEn }}</span></span>
            <span class="tier-percent text-muted">{{ tier.percentage }}</span>
            <span class="tier-expand">{{ expandedTier === tier.level ? '−' : '+' }}</span>
          </div>
          <div v-if="expandedTier === tier.level" class="tier-card-body">
            <p class="tier-tag">{{ tier.tag }}</p>
            <p class="body-text">{{ tier.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- 四条进阶轴线 -->
    <section class="section">
      <h2 class="heading-lg">四条进阶轴线</h2>
      <p class="body-text" style="margin-top: 8px; margin-bottom: 24px;">
        你的 AI 段位由以下四个维度共同决定：
      </p>
      <div class="axes-grid">
        <div class="axis-card" v-for="(axis, key) in axes" :key="key">
          <div class="axis-emoji">{{ axis.emoji }}</div>
          <div>
            <h3 class="heading-md">{{ axis.label }}</h3>
            <p class="text-muted">{{ axis.en }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- 底部 CTA -->
    <div class="cta-section" style="margin-top: 0;">
      <button class="btn btn-primary btn-lg" @click="startQuiz">
        测一下我的段位
      </button>
      <p class="text-muted" style="margin-top: 16px;">
        <a href="https://aiti.team/" target="_blank" style="text-decoration: underline;">Original · aiti.team</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tiers } from '../data/tiers.js'
import { axisLabels } from '../utils/calculator.js'

const router = useRouter()
const expandedTier = ref(null)

const axes = axisLabels

function toggleTier(level) {
  expandedTier.value = expandedTier.value === level ? null : level
}

function startQuiz() {
  router.push('/quiz')
}
</script>

<style scoped>
/* Masthead */
.masthead {
  text-align: center;
  padding: var(--space-4xl) 0 var(--space-2xl);
}

.masthead-meta {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.masthead-desc {
  margin-top: var(--space-xl);
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA */
.cta-section {
  text-align: center;
  padding: var(--space-2xl) 0;
}

.arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.btn-primary:hover .arrow {
  transform: translateX(4px);
}

/* Section */
.section {
  padding: var(--space-xl) 0;
}

/* Tier List */
.tier-list {
  margin-top: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tier-card {
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background 0.2s ease;
}

.tier-card:hover {
  background: var(--color-bg-subtle);
}

.tier-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) 0;
}

.tier-level {
  width: 56px;
  font-weight: 500;
  flex-shrink: 0;
}

.tier-name {
  flex: 1;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.05rem;
}

.tier-name-en {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-left: 6px;
}

.tier-percent {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  width: 50px;
  text-align: right;
}

.tier-expand {
  width: 20px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.tier-card-body {
  padding: 0 0 var(--space-lg);
  animation: slideDown 0.25s ease;
}

.tier-tag {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Axes Grid */
.axes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.axis-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid var(--color-border-light);
  transition: border-color 0.2s ease;
}

.axis-card:hover {
  border-color: var(--color-border);
}

.axis-emoji {
  font-size: 1.8rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .axes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
