// import React from 'react';
// // import ThermometerPanel from './ThermometerPanel';
// // import IntentPanel from './IntentPanel';
// // import ExplainabilityPanel from './ExplainabilityPanel';
// // import SophisticationPanel from './SophisticationPanel';
// // import SimilarityPanel from './SimilarityPanel';
// // import DefenseCoachPanel from './DefenseCoachPanel';
// // import AwarenessPanel from './AwarenessPanel';

// export default function Dashboard({ result }) {
//   return (
//     <div className="space-y-6">
//       {/* ROW 1: THERMOMETER + ATTACK INTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ThermometerPanel result={result} />
//         <IntentPanel result={result} />
//       </div>

//       {/* ROW 2: EXPLAINABLE AI + SOPHISTICATION + SIMILARITY */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <ExplainabilityPanel result={result} />
//         <SophisticationPanel result={result} />
//         <SimilarityPanel result={result} />
//       </div>

//       {/* ROW 3: DEFENSE + AWARENESS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <DefenseCoachPanel result={result} />
//         <AwarenessPanel result={result} />
//       </div>

//       {/* METADATA */}
//       <div className="text-slate-400 text-xs text-center pt-4">
//         Analysis completed at {new Date(result.timestamp).toLocaleTimeString()}
//       </div>
//     </div>
//   );
// }