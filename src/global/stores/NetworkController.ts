import { makeAutoObservable } from 'mobx';

import { NETWORK_GATEWAY_URL } from 'config';

import { NetworkClient } from './NetworkClient';

const GW_LS_KEY = 'gw';

const normalizeGatewayUrl = (rawUrl: string | null): string => {
  if (!rawUrl || rawUrl.trim() === '') return NETWORK_GATEWAY_URL;

  const url = rawUrl.trim();

  // Убираем лишний слэш на конце
  return url.replace(/\/+$/, '');
};

export class NetworkController {
  constructor() {
    makeAutoObservable(this);
  }

  network = normalizeGatewayUrl(localStorage.getItem(GW_LS_KEY));
  client = new NetworkClient(this.network);

  get isDefaultNetwork(): boolean {
    return this.network === NETWORK_GATEWAY_URL;
  }

  setNetwork = (network: string): void => {
    this.network = network;
    this.client = new NetworkClient(normalizeGatewayUrl(network));
    localStorage.setItem(GW_LS_KEY, network);
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ [GW_LS_KEY]: network });
    }
  };

  resetNetwork = (): void => {
    this.network = NETWORK_GATEWAY_URL;
    this.client = new NetworkClient(NETWORK_GATEWAY_URL);
    localStorage.removeItem(GW_LS_KEY);
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.remove(GW_LS_KEY);
    }
  };
}
