import { testHook } from '@znemz/react-extras-jest';
import { useStateChange } from '.';

describe(useStateChange.name, () => {
  it('should have correct defaultState', () => {
    const defaultState = { one: 1 };
    testHook(() => {
      const [state] = useStateChange(defaultState);
      expect(state).toEqual(defaultState);
    });
  });
});
