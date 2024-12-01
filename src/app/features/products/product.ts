import { Categorie } from "../categories/categorie";


export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: Categorie;
  }