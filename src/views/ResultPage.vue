<template>
  <!-- 错误兜底 -->
  <div class="page" v-if="resultError">
    <div class="result-header">
      <h1 class="heading-lg">哎呀，计算结果遇到了问题</h1>
      <p class="body-text" style="margin-top: var(--space-md);">请重新测评试试</p>
    </div>
    <div class="result-actions">
      <button class="btn btn-primary" @click="retakeQuiz">重新测评 →</button>
    </div>
  </div>

  <div class="page" v-else-if="result">
    <!-- 结果头部 -->
    <div class="result-header">
      <div class="result-badge">
        <span class="text-mono">LV.{{ String(result.tier.level).padStart(2, '0') }}</span>
        <span class="text-muted">/10</span>
      </div>
      <h1 class="display-title result-tier-name">
        {{ result.tier.name }}
        <span class="result-tier-en">{{ result.tier.nameEn }}</span>
      </h1>
      <p class="result-percent">{{ result.tier.percentage }} 的用户在此之下</p>
    </div>

    <!-- 段位标签 -->
    <div class="result-tag">{{ result.tier.tag }}</div>

    <hr class="divider" />

    <!-- 能力图谱 -->
    <section class="section">
      <h2 class="heading-md">能力图谱</h2>
      <div class="radar-container">
        <canvas ref="radarCanvas" width="400" height="400"></canvas>
      </div>
    </section>

    <!-- 综合评分 -->
    <div class="score-section">
      <div class="score-item" v-for="(value, key) in result.axes" :key="key">
        <span class="score-label">{{ axisLabels[key].emoji }} {{ axisLabels[key].label }}</span>
        <div class="score-bar-bg">
          <div class="score-bar-fill" :style="{ width: value + '%' }"></div>
        </div>
        <span class="score-value text-mono">{{ value }}</span>
      </div>
    </div>

    <hr class="divider" />

    <!-- 描述 -->
    <p class="body-text result-description">{{ result.tier.description }}</p>

    <hr class="divider" />

    <!-- 操作按钮 -->
    <div class="result-actions">
      <button class="btn btn-primary" @click="shareAsImage">
        保存标本卡 ↓
      </button>
      <button class="btn btn-ghost" @click="copyLink">
        复制链接
      </button>
      <button class="btn btn-ghost" @click="retakeQuiz">
        重新测评
      </button>
    </div>

    <!-- 版权脚注 -->
    <div class="result-footer text-muted">
      <p>Inspired by <a href="https://aiti.team/" target="_blank" style="text-decoration: underline;">aiti.team</a></p>
      <p class="text-mono" style="margin-top: 4px;">Nº {{ shareId }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '../composables/useQuiz.js'
import { calculateResult, axisLabels } from '../utils/calculator.js'

const router = useRouter()
const { state, resetQuiz } = useQuiz()
const radarCanvas = ref(null)
const shareId = ref('#' + Math.random().toString(36).slice(2, 8).toUpperCase())

// 错误状态，防止异常白屏
const resultError = ref(false)

// 计算测评结果（纯函数，无副作用）
const result = computed(() => {
  if (!state.answers || state.answers.every((a) => a === null)) {
    return null
  }
  try {
    resultError.value = false
    return calculateResult(state.answers)
  } catch (e) {
    console.error('结果计算失败:', e)
    resultError.value = true
    return null
  }
})

// 用 watch 处理空数据重定向（与 computed 分离）
watch(
  () => state.answers,
  (answers) => {
    if (!answers || answers.every((a) => a === null)) {
      router.replace('/')
    }
  },
  { immediate: true }
)

// 绘制雷达图
function drawRadar(axes) {
  if (!radarCanvas.value) return
  const canvas = radarCanvas.value
  const ctx = canvas.getContext('2d')
  const cx = 200
  const cy = 200
  const radius = 150

  ctx.clearRect(0, 0, 400, 400)

  const keys = Object.keys(axes)
  const count = keys.length
  const angleStep = (Math.PI * 2) / count

  // 背景网格 (5层)
  for (let level = 1; level <= 5; level++) {
    const r = (radius / 5) * level
    ctx.beginPath()
    for (let i = 0; i <= count; i++) {
      const angle = -Math.PI / 2 + i * angleStep
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // 轴线
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + i * angleStep
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
    ctx.strokeStyle = '#e5e5e5'
    ctx.stroke()
  }

  // 数据区域
  ctx.beginPath()
  for (let i = 0; i <= count; i++) {
    const idx = i % count
    const key = keys[idx]
    const value = axes[key] / 100
    const angle = -Math.PI / 2 + idx * angleStep
    const r = radius * value
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'
  ctx.fill()
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 2
  ctx.stroke()

  // 数据点
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    const value = axes[key] / 100
    const angle = -Math.PI / 2 + i * angleStep
    const r = radius * value
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#1a1a1a'
    ctx.fill()
  }

  // 标签
  ctx.font = '12px "Inter Tight", sans-serif'
  ctx.fillStyle = '#666'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    const label = axisLabels[key].emoji + ' ' + axisLabels[key].label
    const angle = -Math.PI / 2 + i * angleStep
    const labelR = radius + 25
    const x = cx + labelR * Math.cos(angle)
    const y = cy + labelR * Math.sin(angle)
    ctx.fillText(label, x, y)
  }
}

// 用 watch + nextTick 确保 canvas 渲染后再绘制雷达图
watch(result, (val) => {
  if (val && val.axes) {
    nextTick(() => drawRadar(val.axes))
  }
}, { immediate: true })

// 保存为图片
async function shareAsImage() {
  // 简单 fallback：直接截图当前页或提示用户
  // 真实的 html2canvas 集成会在此处
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(document.querySelector('.page'))
    const link = document.createElement('a')
    link.download = `AITI-${result.value?.tier.nameEn || 'Result'}.png`
    link.href = canvas.toDataURL()
    link.click()
  } catch {
    alert('截图功能需要交互权限，请手动截图保存 😊')
  }
}

// 复制链接
function copyLink() {
  const url = window.location.origin + '/result'
  navigator.clipboard.writeText(url).then(() => {
    alert('链接已复制')
  }).catch(() => {
    alert('复制失败，请手动复制地址栏链接')
  })
}

// 重新测评
function retakeQuiz() {
  resetQuiz()
  router.push('/quiz')
}
</script>

<style scoped>
.result-header {
  text-align: center;
  padding: var(--space-2xl) 0;
}

.result-badge {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: var(--space-lg);
  font-size: 1.2rem;
}

.result-tier-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.result-tier-en {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 0.6em;
  color: var(--color-text-secondary);
  display: block;
  margin-top: 4px;
}

.result-percent {
  margin-top: var(--space-md);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.result-tag {
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-bg-subtle);
  display: inline-block;
  width: 100%;
}

/* Radar */
.radar-container {
  display: flex;
  justify-content: center;
  padding: var(--space-lg) 0;
}

.radar-container canvas {
  max-width: 100%;
  height: auto;
}

/* Score bars */
.score-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
}

.score-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.score-label {
  width: 140px;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.score-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--color-border-light);
  border-radius: 0;
}

.score-bar-fill {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.8s ease;
}

.score-value {
  width: 36px;
  text-align: right;
  font-weight: 500;
}

/* Description */
.result-description {
  padding: var(--space-lg) 0;
  line-height: 1.8;
  font-size: 1rem;
}

/* Actions */
.result-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
  padding: var(--space-xl) 0;
}

/* Footer */
.result-footer {
  text-align: center;
  padding: var(--space-xl) 0;
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .score-label {
    width: 100px;
    font-size: 0.8rem;
  }
  .result-actions {
    flex-direction: column;
  }
  .result-actions .btn {
    width: 100%;
  }
}
</style>
