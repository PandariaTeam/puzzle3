import { createContext, useContext } from 'react';
import { RootStore } from '../stores';

export interface Store {
  rootStore: InstanceType<typeof RootStore>;
}

const rootStore = new RootStore();

export const store: Store = {
  rootStore
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
