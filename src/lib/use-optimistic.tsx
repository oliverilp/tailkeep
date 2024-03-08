import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useOptimistic<T>(state: T): [T, Dispatch<SetStateAction<T>>] {
  const [optimisticState, setOptimisticState] = useState(state);

  useEffect(() => {
    setOptimisticState(state);
  }, [state]);

  return [optimisticState, setOptimisticState];
}
