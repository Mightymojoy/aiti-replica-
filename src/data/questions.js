/**
 * 题目数据 — 10 道 AI 段位测评题
 *
 * 4 条评估维度（每条最高 100 分）：
 *   ⚙️ 工具掌控 (tool)   — 使用 AI 工具的熟练度
 *   🧠 认知深度 (depth)   — 对 AI 原理和局限的理解
 *   🎨 创造力 (creativity) — 用 AI 创造新事物的能力
 *   🚀 自主性 (auto)      — 独立驱动 AI 工作的能力
 */
export const questions = [
  {
    id: 1,
    text: '你第一次接触 AI 工具时的第一反应是？',
    options: [
      { key: 'A', text: '打开网页聊了几句，问它"你是谁"就关了',
        scores: { tool: 15, depth: 5, creativity: 10, auto: 5 } },
      { key: 'B', text: '用它写完了一份工作文档，觉得挺方便',
        scores: { tool: 15, depth: 10, creativity: 20, auto: 15 } },
      { key: 'C', text: '立马想到可以用它来替代哪些日常工作',
        scores: { tool: 30, depth: 20, creativity: 25, auto: 25 } },
      { key: 'D', text: '开始拆解它的能力边界，规划一个自动化系统',
        scores: { tool: 40, depth: 40, creativity: 35, auto: 50 } },
    ],
  },
  {
    id: 2,
    text: '写 Prompt 时，你通常会做到什么程度？',
    options: [
      { key: 'A', text: '直接打字问，想到什么问什么',
        scores: { tool: 10, depth: 5, creativity: 10, auto: 5 } },
      { key: 'B', text: '稍微组织一下语言，明确想要什么格式',
        scores: { tool: 20, depth: 15, creativity: 20, auto: 10 } },
      { key: 'C', text: '设定角色、背景、输出格式、语气风格',
        scores: { tool: 35, depth: 30, creativity: 35, auto: 30 } },
      { key: 'D', text: '有一套自己的 Prompt 模板系统，根据场景调用',
        scores: { tool: 50, depth: 45, creativity: 50, auto: 45 } },
    ],
  },
  {
    id: 3,
    text: 'AI 给出的结果不符合预期时，你怎么办？',
    options: [
      { key: 'A', text: '算了，再试一次或者换别的方式做',
        scores: { tool: 10, depth: 15, creativity: 10, auto: 10 } },
      { key: 'B', text: '重新描述一遍，加一些限定词',
        scores: { tool: 20, depth: 20, creativity: 15, auto: 15 } },
      { key: 'C', text: '分析输出哪里不对，针对性修改 Prompt',
        scores: { tool: 35, depth: 35, creativity: 30, auto: 30 } },
      { key: 'D', text: '给 AI 喂示例（Few-shot），甚至设计纠错循环',
        scores: { tool: 50, depth: 50, creativity: 45, auto: 50 } },
    ],
  },
  {
    id: 4,
    text: 'AI 在你的工作/学习中扮演什么角色？',
    options: [
      { key: 'A', text: '偶尔用一下的搜索引擎替代品',
        scores: { tool: 10, depth: 5, creativity: 10, auto: 5 } },
      { key: 'B', text: '辅助工具——写邮件、翻译、查资料',
        scores: { tool: 20, depth: 15, creativity: 20, auto: 15 } },
      { key: 'C', text: '协作伙伴——一起完成复杂任务',
        scores: { tool: 35, depth: 30, creativity: 35, auto: 30 } },
      { key: 'D', text: '延伸体——没有 AI 我无法以现在的方式工作',
        scores: { tool: 50, depth: 40, creativity: 50, auto: 50 } },
    ],
  },
  {
    id: 5,
    text: '你用过以下哪种"非聊天"式的 AI 用法？',
    options: [
      { key: 'A', text: '没用过，我主要聊天',
        scores: { tool: 5, depth: 5, creativity: 5, auto: 5 } },
      { key: 'B', text: '用 AI 生成了图片或音乐',
        scores: { tool: 20, depth: 15, creativity: 35, auto: 15 } },
      { key: 'C', text: '调 API、写脚本、对接自动化流程',
        scores: { tool: 40, depth: 40, creativity: 40, auto: 45 } },
      { key: 'D', text: '构建了多 Agent 协作系统，让 AI 互相配合',
        scores: { tool: 50, depth: 50, creativity: 50, auto: 60 } },
    ],
  },
  {
    id: 6,
    text: '你怎么看待 AI 给出的答案中的错误？',
    options: [
      { key: 'A', text: '觉得 AI 不太靠谱，还是相信自己',
        scores: { tool: 10, depth: 20, creativity: 5, auto: 10 } },
      { key: 'B', text: '能看出来哪里错了，手动改掉',
        scores: { tool: 20, depth: 30, creativity: 20, auto: 20 } },
      { key: 'C', text: '理解幻觉的原理，用 Prompt 技巧尽量避免',
        scores: { tool: 35, depth: 45, creativity: 30, auto: 30 } },
      { key: 'D', text: '设计校验流程，让 AI 自己检查 AI',
        scores: { tool: 50, depth: 60, creativity: 45, auto: 50 } },
    ],
  },
  {
    id: 7,
    text: '当你想做一个没做过的东西时，你会？',
    options: [
      { key: 'A', text: '先自己研究，实在不行再问 AI',
        scores: { tool: 15, depth: 20, creativity: 15, auto: 15 } },
      { key: 'B', text: '直接问 AI 怎么做，照着步骤来',
        scores: { tool: 20, depth: 15, creativity: 25, auto: 20 } },
      { key: 'C', text: '让 AI 先出方案，迭代优化直到满意',
        scores: { tool: 35, depth: 30, creativity: 40, auto: 35 } },
      { key: 'D', text: '拆解目标 → 分配子任务给不同 AI → 组装结果',
        scores: { tool: 50, depth: 45, creativity: 50, auto: 55 } },
    ],
  },
  {
    id: 8,
    text: '你是否有过"把 AI 能力封装成可复用东西"的经历？',
    options: [
      { key: 'A', text: '没有——每次都是从头开始聊',
        scores: { tool: 10, depth: 10, creativity: 10, auto: 5 } },
      { key: 'B', text: '保存了一些好用的 Prompt，下次直接复制',
        scores: { tool: 25, depth: 20, creativity: 20, auto: 20 } },
      { key: 'C', text: '创建了自定义 GPTs 或配置了 AI 工具链',
        scores: { tool: 40, depth: 35, creativity: 40, auto: 40 } },
      { key: 'D', text: '开发了完整的 Skill/插件/自动化脚本',
        scores: { tool: 55, depth: 50, creativity: 55, auto: 55 } },
    ],
  },
  {
    id: 9,
    text: '你同时使用多少个 AI 模型/工具？',
    options: [
      { key: 'A', text: '1 个——固定的一个',
        scores: { tool: 10, depth: 5, creativity: 10, auto: 5 } },
      { key: 'B', text: '2-3 个——根据任务换着用',
        scores: { tool: 25, depth: 20, creativity: 20, auto: 15 } },
      { key: 'C', text: '4-6 个——不同模型各有所长，搭配使用',
        scores: { tool: 40, depth: 35, creativity: 35, auto: 30 } },
      { key: 'D', text: '7 个以上——我有自己的模型选择矩阵',
        scores: { tool: 55, depth: 50, creativity: 45, auto: 50 } },
    ],
  },
  {
    id: 10,
    text: '对于"AI 时代"，你内心真实的感受是？',
    options: [
      { key: 'A', text: '有点焦虑，感觉自己跟不上变化',
        scores: { tool: 10, depth: 15, creativity: 10, auto: 10 } },
      { key: 'B', text: '积极学习，希望能用好这个工具',
        scores: { tool: 20, depth: 25, creativity: 20, auto: 20 } },
      { key: 'C', text: '充满兴奋——这是人类能力放大器',
        scores: { tool: 30, depth: 35, creativity: 40, auto: 30 } },
      { key: 'D', text: '已经在用 AI 做别人还没想到的事了',
        scores: { tool: 45, depth: 50, creativity: 55, auto: 55 } },
    ],
  },
]
