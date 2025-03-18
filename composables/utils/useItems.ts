import { v4 as uuidv4 } from 'uuid';
import { useMerge } from '~/composables/utils/useMerge.js';

interface Item {
  [key: string]: any;
  selected?: boolean;
}

interface Options {
  items?: Item[];
  selectedItems?: Item[];
}

export const useItems = (name: string = uuidv4(), options: Options = {}) => {
  const items = useState<Item[]>(`${name}.items`, () => options.items || []);
  const selectedItems = useState<Item[]>(`${name}.selectedItems`, () => options.selectedItems || []);
  const item = ref<Item>({});

  const defineDefaultItem = (item: Item): Item => ({ ...item, selected: false });

  const defineItems = (cb: (item: Item) => Item): void => {
    item.value = cb(defineDefaultItem(item.value));
  };

  const makeItem = (attribute: Partial<Item>): Item => ({ ...item.value, ...attribute });

  const setItems = (attributes: Partial<Item>[] | null): void => {
    items.value = (attributes || []).map(attr => makeItem(attr));
  };

  const addItem = (newItem: Item): void => {
    items.value.push(newItem);
  };

  const removeItem = (index: number): void => {
    items.value.splice(index, 1);
  };

  const selectItem = (item: Item): void => {
    item.selected = true;
  };

  const unselectItem = (item: Item): void => {
    item.selected = false;
  };

  return useMerge({
    name,
    defineItems,

    items,
    selectedItems,

    makeItem,
    setItems,
    addItem,
    removeItem,
    selectItem,
    unselectItem,
  });
};
