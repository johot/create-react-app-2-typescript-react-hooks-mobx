import { useState, useEffect, memo, useMemo } from "react";
import { observable, Reaction } from "mobx";

// Souce: https://codesandbox.io/s/k2vmjpqvnv

export function observer(baseComponent) {
  // memo; we are not intested in deep updates
  // in props; we assume that if deep objects are changed,
  // this is in observables, which would have been tracked anyway
  return memo(props => {
    // forceUpdate 2.0
    const forceUpdate = useForceUpdate();

    // create a Reaction once, and memoize it
    const reaction = useMemo(
      () =>
        // If the Reaction detects a change in dependency,
        // force a new render
        new Reaction(
          `observer(${baseComponent.displayName || baseComponent.name})`,
          forceUpdate
        ),
      []
    );

    // clean up the reaction if this component is unMount
    useUnmount(() => reaction.dispose());

    // render the original component, but have the
    // reaction track the observables, so that rendering
    // can be invalidated (see above) once a dependency changes
    let rendering;
    reaction.track(() => {
      rendering = baseComponent(props);
    });
    return rendering;
  });
}

export function useObservable(initialValue) {
  return useState(observable(initialValue))[0];
}

function useForceUpdate() {
  const [tick, setTick] = useState(1);
  return () => {
    setTick(tick + 1);
  };
}

function useUnmount(fn) {
  useEffect(() => fn, []);
}
