export type ProductTypes = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
  categoryId?: number;
  supplierId?: number;
};
export type OrderTypes = {
  id?: number;
  productId: number;
  amount: number;
  totalPrice: number;
  shippingAddressId?: number;
  expectedDate: string | number | Date;
  deliveryDate: string | number | Date | null;
  status: string;
};
export type SupplierTypes = {
  id?: number;
  name: string;
  addressId: number;
  email: string;
  phone: string;
};
export type AddressTypes = {
  id?: number;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};
export type CategoryTypes = {
  id?: number;
  category: string;
};
