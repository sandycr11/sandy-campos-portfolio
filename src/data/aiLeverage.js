export const aiLeverage = {
  headline: 'AI-assisted development to accelerate delivery and improve code quality.',
  philosophy: 'AI is an engineering multiplier, not a replacement for judgment.',
  tools: ['GitHub Copilot', 'Claude', 'OpenAI Codex', 'Cursor', 'OpenAI API', 'n8n', 'Make'],
  useCases: [
    'Delivery acceleration',
    'Refactoring',
    'Documentation',
    'Prompt engineering',
    'Structured data extraction',
    'Workflow automation',
    'Legacy modernization support',
  ],
  impact: [
    'Faster delivery',
    'Improved code quality',
    'Cleaner refactors',
    'Better documentation',
    'Automated manual workflows',
  ],
  note:
    'I use AI to explore options faster, reduce repetitive work, and validate ideas, while still reviewing, testing, and owning the final implementation.',
}

// Impact metrics — real numbers from production work (see Experience section).
// `value`/`max` drive the animated bar fill; `display` is the text shown.
export const aiMetrics = [
  {
    label: 'API response times — legacy .NET modernization',
    display: 'up to −90%',
    value: 90,
    max: 100,
  },
  {
    label: 'Manual tasks — bots & API integrations',
    display: '10 min → seconds',
    value: 96,
    max: 100,
  },
]
