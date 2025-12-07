// Implement a useCycle hook that cycles through a sequence of values each time its function is called.

// export default function Component() {
//   const [mode, cycle] = useCycle('low', 'medium', 'high');

//   return (
//     <div>
//       <p>State: {mode}</p>
//       <button onClick={cycle}>Cycle</button>
//     </div>
//   );
// }

import {useState, useCallback} from 'react';

export default function useCycle(...args) {
  const options = [...args];
  const [index, setIndex] = useState(0);

  const cycle = useCallback(() => {
    setIndex((prev) => {
      if (prev + 1 === options.length) {
        return 0;
      }
      return prev + 1;
    });
  });

  return [
    options[index],
    cycle,
  ]
}
