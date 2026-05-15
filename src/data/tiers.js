/**
 * 段位数据 — 11级 AI 能力段位定义
 */
export const tiers = [
  {
    level: 0,
    name: '旁观者',
    nameEn: 'Spectator',
    percentage: '≈80%',
    tag: '从未与 AI 对话',
    description: 'AI 对你而言还是一个遥远的新闻词汇。你听说过 ChatGPT、Midjourney，但从未真正打开过任何一个 AI 工具。这不是你的错——但你正在错过一个时代。',
    color: '#e0e0e0',
    minScore: 0,
  },
  {
    level: 1,
    name: '尝鲜者',
    nameEn: 'Explorer',
    percentage: '≈20%',
    tag: 'AI = 高级搜索引擎',
    description: '你用过 AI 聊天，问过一些简单的问题，比如"帮我写一封邮件"或"解释什么是量子计算"。在别人问起时你也能聊上两句——但仅此而已。',
    color: '#bdbdbd',
    minScore: 10,
  },
  {
    level: 2,
    name: '对话者',
    nameEn: 'Conversationalist',
    percentage: '≈30%',
    tag: '怎么问比问什么重要',
    description: '你开始意识到 Prompt 的质量直接影响输出。你会给 AI 设定角色、提供背景信息、用"请用表格形式"来约束输出格式。你已经超过了 70% 的用户。',
    color: '#9e9e9e',
    minScore: 20,
  },
  {
    level: 3,
    name: '驯化师',
    nameEn: 'Tamer',
    percentage: '≈70%',
    tag: '主动给 AI 立规矩',
    description: '你不会让 AI 自由发挥。你给它设 ground rules，告诉它什么能做、什么不能做、用什么样的语气回答问题。你已经开始"驯化"而不是"使用"AI。',
    color: '#757575',
    minScore: 30,
  },
  {
    level: 4,
    name: '越境者',
    nameEn: 'Boundary-Breaker',
    percentage: '≈90%',
    tag: '卧槽，这我也能干了？',
    description: '你第一次让 AI 帮你做了一件你原本以为自己永远做不了的事——写一个 Python 脚本、设计一个 Logo、分析一份数据。你开始意识到：边界在消失。',
    color: '#616161',
    minScore: 40,
  },
  {
    level: 5,
    name: '织网者',
    nameEn: 'Weaver',
    percentage: '≈95%',
    tag: 'AI 嵌入日常工作流',
    description: 'AI 不再是一个偶尔打开的工具，而是你日常 workflow 的一环。你用 AI 做会议纪要、写周报、辅助决策、生成初稿。你的工作方式已经不可逆地改变了。',
    color: '#424242',
    minScore: 50,
  },
  {
    level: 6,
    name: '召唤师',
    nameEn: 'Summoner',
    percentage: '≈97%',
    tag: '从 ChatBot 跨到 Agent',
    description: '你不满足于对话窗口。你开始探索 AutoGPT、Claude Artifacts、GPTs、Workflow 自动化——你召唤的不是回答，而是行动。AI 替你干活，你只负责指挥。',
    color: '#212121',
    minScore: 60,
  },
  {
    level: 7,
    name: '铸造师',
    nameEn: 'Smith',
    percentage: '≈99%',
    tag: '这个我封装成 Skill 了',
    description: '你把重复的 AI 使用模式封装成了可复用的东西——Prompt 模板、自定义 GPTs、API 集成脚本。你不只是用 AI，你在铸造 AI 时代的工具。',
    color: '#1a1a1a',
    minScore: 70,
  },
  {
    level: 8,
    name: '造物主',
    nameEn: 'Creator',
    percentage: '≈99.5%',
    tag: '工作即创造',
    description: '你和 AI 的关系已经不是"使用"而是"共创"。你让 AI 参与从构思到落地的全过程。你的工作流高度 AI-native，甚至很难说清哪个部分是你写的、哪个部分是 AI 写的。',
    color: '#0d0d0d',
    minScore: 80,
  },
  {
    level: 9,
    name: '觉醒者',
    nameEn: 'Awakened',
    percentage: '≈99.9%',
    tag: '人与 AI 已是一体',
    description: '你不再区分"我的能力"和"AI 的能力"。它们已经融合成了一体。你的思考方式本身就被 AI 重塑了——你同时使用多个 AI 模型协作、互为校验、构建复杂系统。',
    color: '#050505',
    minScore: 90,
  },
  {
    level: 10,
    name: '一人军团',
    nameEn: 'One-Person Army',
    percentage: '≈99.99%',
    tag: '一人即一支军队',
    description: '你一个人，依靠 AI 的力量，完成了一个团队才能完成的事。你是产品经理、设计师、工程师、运营、市场——同时是。你正在重新定义"一个人能做到什么"。',
    color: '#000000',
    minScore: 100,
  },
]

/**
 * 根据总得分匹配段位
 */
export function getTierByScore(score) {
  let matched = tiers[0]
  for (const tier of tiers) {
    if (score >= tier.minScore) {
      matched = tier
    }
  }
  return matched
}
