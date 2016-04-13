import * as api from './client.ts';

export interface Entry {
  id?: string;
  message: string;
}

export function add(entry: Entry): Promise<Entry> {
  return api.post('entries', entry);
}

export function list(): Promise<Entry[]> {
  return api.get('entries');
}

export function get(id: string): Promise<Entry> {
  return api.get('entries/' + id);
}

export function destroy(id: string): Promise<void> {
  return api.destroy<void>('entries/' + id);
}

export function destroyAll(): Promise<void> {
  return api.destroy<void>('entries');
}
