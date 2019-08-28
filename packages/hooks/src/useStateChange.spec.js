import { renderHook } from '@testing-library/react-hooks';

import { useStateChange } from '.';

describe(useStateChange.name, () => {
  it('should have correct defaultState', () => {
    const defaultState = { one: 1 };
    const { result } = renderHook(() => useStateChange(defaultState));

    expect(result.current[0]).toEqual(defaultState);
  });
});
