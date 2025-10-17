// = Jest config for ESM
export default {
  testEnvironment: 'node',
  transform: {},                 // -> no Babel; run native ESM
  extensionsToTreatAsEsm: ['.js']
};
