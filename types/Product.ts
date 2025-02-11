import uuid from "react-native-uuid";
export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  image?: any;
  inCart: boolean;
};
