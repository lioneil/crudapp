import { v4 as uuidv4 } from 'uuid';
import { useMerge } from '~/composables/utils/useMerge.js';

interface MetadataOptions {
  metadata?: Record<string, any>;
}

interface UseMetadataReturn {
  name: string;
  defineMetadata: (cb: (currentMetadata: Record<string, any>) => Record<string, any>) => void;
  metadata: Ref<Record<string, any>>;
  setMetadata: (attributes: Record<string, any>) => void;
  unsetMetadata: () => void;
}

/**
 * @param {string} name - A unique name/identifier for the metadata state. Defaults to a UUID.
 * @param {MetadataOptions} options - Options to initialize the metadata list and selected metadata list.
 * @returns {UseMetadataReturn} - The composable's return object.
 */
export const useMetadata = (name: string = uuidv4(), options: MetadataOptions = {}): UseMetadataReturn => {
  const metadata = useState<Record<string, any>>(`${name}.metadata`, () => options?.metadata || {});
  const defineMetadata = (cb: (currentMetadata: Record<string, any>) => Record<string, any>) => {
    metadata.value = cb(metadata.value);
  };
  const setMetadata = (attributes: Record<string, any>) => {
    metadata.value = { ...metadata.value, ...attributes };
  };
  const unsetMetadata = () => {
    metadata.value = {};
  };

  return useMerge({
    name,
    defineMetadata,
    metadata,
    setMetadata,
    unsetMetadata,
  });
};
