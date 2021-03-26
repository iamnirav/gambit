export default [
  { attribute: 'insight', actions: ['doctor', 'hack', 'study', 'rig'] },
  { attribute: 'prowess', actions: ['helm', 'scrap', 'scramble', 'skulk'] },
  { attribute: 'resolve', actions: ['attune', 'command', 'consort', 'sway'] },
];

export const STARTING_RATINGS = {
  mystic: { scramble: 1, attune: 2 },
  pilot: { rig: 1, helm: 2 },
  stitch: { doctor: 2, study: 1 },
};
