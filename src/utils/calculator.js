/**
 * 结果计算工具
 * 从 10 题答案汇总 4 轴总分 → 匹配段位
 */
import { tiers, getTierByScore } from '../data/tiers.js'

export function calculateResult(answers) {
  // 汇总 4 轴得分
  const axes = { tool: 0, depth: 0, creativity: 0, auto: 0 }

  answers.forEach((answer) => {
    if (answer && answer.scores) {
      axes.tool += answer.scores.tool || 0
      axes.depth += answer.scores.depth || 0
      axes.creativity += answer.scores.creativity || 0
      axes.auto += answer.scores.auto || 0
    }
  })

  // 4 轴分转换到 0-100 区间（每题最高 50，10 题最高 500，按比例缩放到 100）
  const normalize = (val) => Math.min(100, Math.round((val / 500) * 100))

  const normalized = {
    tool: normalize(axes.tool),
    depth: normalize(axes.depth),
    creativity: normalize(axes.creativity),
    auto: normalize(axes.auto),
  }

  // 综合分 = 4 轴平均
  const totalScore = Math.round(
    (normalized.tool + normalized.depth + normalized.creativity + normalized.auto) / 4
  )

  // 匹配段位
  const tier = getTierByScore(totalScore)

  return {
    totalScore,
    tier,
    axes: normalized,
    answeredCount: answers.filter((a) => a !== null).length,
  }
}

/**
 * 轴名称映射（用于展示）
 */
export const axisLabels = {
  tool: { label: '工具掌控', en: 'Tool Mastery', emoji: '⚙️' },
  depth: { label: '认知深度', en: 'Depth', emoji: '🧠' },
  creativity: { label: '创造力', en: 'Creativity', emoji: '🎨' },
  auto: { label: '自主性', en: 'Autonomy', emoji: '🚀' },
}
