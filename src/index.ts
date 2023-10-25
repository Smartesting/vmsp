// import AlgoVMSP from "./AlgoVMSP/AlgoVMSP"
// import PatternVMSP from "./AlgoVMSP/PatternVMSP/PatternVMSP"
// import PrefixVMSP from "./AlgoVMSP/PrefixVMSP/PrefixVMSP"
// import * as path from 'path';
// import { createCondensedAction } from "./ndjsonExtraction/extractSequences/createCondensedAction/createCondensedAction";
// import buildSessions from "ndjsonExtraction/buildSessions/buildSessions";
// import extractSequences from "ndjsonExtraction/extractSequences/extractSequences";

// try {
//   const inputFile = path.join(process.cwd(), 'data/realworldapp_usage_100123.ndjson')
//   const algoVMSP = new AlgoVMSP(undefined, 3, 8, true)
//   const { patterns: _,
//     idToActionMap: idToAction,
//     idToActionObjectMap: idToActionObject } = algoVMSP.runFromGravityNdjsonFile(inputFile, 0.1)
//   const patterns = algoVMSP.getTop10Patterns(idToActionObject)
//   for (const pattern of patterns) {
//     console.log(pattern.name + ' | support: ' + pattern.support)
//     for (const action of pattern.actions) {
//       console.log(createCondensedAction(action))
//     }
//     console.log("\n");
//   }
// } catch (err) {
//   console.error(err)
// }

export { }
