import { v4 as uuidv4 } from 'uuid';
import { useEventBus } from '~/composables/utils/useEventBus.js';
import { useItems } from '~/composables/utils/useItems.js';
import { useLoadingState } from '~/composables/utils/useLoadingState.js';
import { useMerge } from '~/composables/utils/useMerge.js';
import { useMetadata } from '~/composables/utils/useMetadata.js';

export type ListOptions = {
  _sort?: string;
  _order?: 'asc' | 'desc';
  _start?: number;
  _limit?: number;
};

export type MetadataOptions = {
  total: number;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const useBaseService = (name: string = uuidv4()) => {
  const loading = useLoadingState(name);
  const items = useItems(name);
  const metadata = useMetadata(name);
  const event = useEventBus(name);

  const route = useRoute();
  const query = useState(`${name}.query`, () => route.query);

  const api = async (url: string, options: Record<string, any>) => await $fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
  });

  return useMerge({
    ...loading,
    ...items,
    ...metadata,
    ...event,

    query,
    api,
  });
}
