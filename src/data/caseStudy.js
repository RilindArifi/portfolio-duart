export const caseStudySections = [
  { id: 'overview', label: 'Overview' },
  { id: 'solution', label: 'Solution' },
  { id: 'core-flows', label: 'Core Flows' },
  { id: 'research', label: 'Research' },
  { id: 'prototyping', label: 'Prototyping & Testing' },
  { id: 'design-decisions', label: 'Design Decisions' },
  { id: 'reflection', label: 'Reflection' },
]

export const sectionCopy = {
  overview: (project) =>
    `${project.tagline} ${project.title} set out to prove that idea could hold up in a real product.`,
  solution: () =>
    'The final design distilled the flow down to its essentials, so people could get to the outcome they cared about with as little friction as possible.',
  'core-flows': () =>
    'A handful of core flows carried most of the weight — each one refined through several rounds of internal testing.',
  research: () =>
    'Early conversations with users shaped the direction more than any single feature idea, and kept the scope honest.',
  prototyping: () =>
    'Interactive prototypes made it possible to test the riskiest assumptions before a single line of production code was written.',
  'design-decisions': () =>
    'Every screen went through a round of "does this need to exist" — the interface got simpler with each pass, not more complex.',
  reflection: (project) =>
    `Looking back, the biggest lesson from ${project.title} was how much a good default can save a first-time user from ever opening a settings menu.`,
}
