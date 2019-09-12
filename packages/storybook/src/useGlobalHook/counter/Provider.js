/* eslint-disable react/react-in-jsx-scope */
import useCounter from '.';

export const CounterProvider = () => {
  const [state, actions] = useCounter();

  return (
    <div>
      <p>
        counter:
        {state.counter}
      </p>
      <button type="button" onClick={() => actions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};
