export const addToCounter = (store, amount) => {
  const newCounterValue = store.state.counter + amount;
  store.setState({ counter: newCounterValue });
};
