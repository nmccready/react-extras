import { OuterBaseActions } from '@znemz/use-global-hook/lib/actions';
import { useGlobalHook } from '@znemz/react-extras-hooks';

export type UseXHRHook = [boolean, OuterBaseActions<boolean>];

export const useXHRFactory = (isDebug = false) =>
  useGlobalHook({
    initialState: false,
    storeId: 'usingXHR',
    inspect: isDebug,
  });
