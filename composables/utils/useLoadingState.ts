import { v4 as uuidv4 } from 'uuid';

export const useLoadingState = (name: string = uuidv4()) => {
  const loading = useState(`${name}.loading`, () => false);

  const startLoading = () => (loading.value = true);
  const stopLoading = () => (loading.value = false);

  return { loading, startLoading, stopLoading };
}
