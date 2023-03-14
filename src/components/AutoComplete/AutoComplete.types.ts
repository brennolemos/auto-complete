export type ListItem = {
  title: string;
  imageUrl?: string;
};

export type AutoCompleteProps = {
  list: ListItem[];
  placeholder: string;
};
