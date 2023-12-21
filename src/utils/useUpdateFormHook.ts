import { useState } from "react";

export type initialState = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  text?: string;
  username?: string;
  slug?: string;
  token?: string;
  _id?: string;
  rating?: number;
  fullName?: string;
  address?: string;
  phone?: string;
  description?: string;
  image?: string;
  brand?: string;
  price?: number;
  previousPrice?: number;
  category?: string;
  shippingPrice?: number;
  countInStock?: number;
};

export const useUpdateFormHook = (initialState: initialState) => {
  const [formValues, setFormValues] = useState(initialState);

  const onUpdate = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const setFirstValue = () => {
    setFormValues({
      ...initialState,
    });
  };

  return { formValues, onUpdate, setFirstValue, setFormValues };
};
