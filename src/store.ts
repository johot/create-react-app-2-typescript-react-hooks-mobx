import { decorate, observable } from "mobx";

// MobX demo
export class Store {
  count = 0;
}

decorate(Store, {
  count: observable
});
