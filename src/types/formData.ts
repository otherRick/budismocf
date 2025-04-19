export interface AddressProps {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface FormDataProps {
  id: number;
  title: string;
  date: string;
  hour: string;
  meeting_link: string;
  description: string;
  address: AddressProps;
}

export type Event = {
  title: string;
  time: string;
  location: string;
  link: string;
  date: string;
  description: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
