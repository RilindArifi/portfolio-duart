export const caseStudySections = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'research', label: 'Research' },
  { id: 'core-flows', label: 'Core Flows' },
  { id: 'solution', label: 'Solution' },
  { id: 'design-decisions', label: 'Design Decisions' },
  { id: 'testing', label: 'Testing' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
]

export const sectionCopy = {
  overview: (project) =>
    `${project.tagline} ${project.title} set out to prove that idea could hold up in a real product.`,
  challenge: (project) =>
    `${project.title} started with a clear problem: the existing way of doing things wasn't holding up, and the gap was costing people time and trust.`,
  research: () =>
    'Early conversations with users shaped the direction more than any single feature idea, and kept the scope honest.',
  'core-flows': () =>
    'A handful of core flows carried most of the weight — each one refined through several rounds of internal testing.',
  solution: () =>
    'The final design distilled the flow down to its essentials, so people could get to the outcome they cared about with as little friction as possible.',
  'design-decisions': () =>
    'Every screen went through a round of "does this need to exist" — the interface got simpler with each pass, not more complex.',
  testing: () =>
    'Interactive prototypes made it possible to test the riskiest assumptions before a single line of production code was written.',
  outcome: (project) =>
    `${project.title} shipped and went in front of real users — the response validated the bet that got it built in the first place.`,
  reflection: (project) =>
    `Looking back, the biggest lesson from ${project.title} was how much a good default can save a first-time user from ever opening a settings menu.`,
}
