export const useMerge = <T extends Record<string, any>>(options: T) => {
  const merge = (attributes: Partial<T & Record<string, any>> = {}): T & Record<string, any> => ({
    ...options,
    ...attributes,
  });

  return {
    ...options,
    merge,
  };
};
