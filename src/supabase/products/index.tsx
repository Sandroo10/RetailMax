import { supabase } from "../supabase";

export type Product = {
  id: number;
  name: string;
  name_ge: string;
  description: string;
  description_ge: string;
  price: number;
  image_url: string;
  created_at: string;
  in_stock: boolean;
  category: string;
};

type ProductRow = {
  id: number;
  name: string | null;
  name_ge: string | null;
  description: string | null;
  description_ge: string | null;
  price: number | null;
  image_url: string | null;
  created_at: string | null;
  in_stock: boolean | null;
  category: string | null;
};

const mapProductRow = (data: ProductRow): Product => {
  return {
    id: data.id,
    name: data.name ?? "",
    name_ge: data.name_ge ?? "",
    description: data.description ?? "",
    description_ge: data.description_ge ?? "",
    price: data.price ?? 0,
    image_url: data.image_url ?? "",
    created_at: data.created_at ?? "",
    in_stock: data.in_stock ?? false,
    category: data.category ?? "",
  };
};

export const getProductList = async () => {
  const { data, error } = await supabase.from("product").select("*");
  if (error) {
    console.error("Error fetching products list:", error.message);
    throw new Error(error.message); // Handle or propagate the error
  }

  return (data as ProductRow[]).map(mapProductRow);
};

export const mapProductTableData = (datalist: Product[]) => {
  return datalist.map((data) => mapProductRow(data));
};

export const getSingleProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*") // Specify the fields to retrieve
    .eq("id", Number(id))
    .single(); // Expect a single record

  if (error) {
    console.error("Error fetching single product:", error.message);
    throw new Error(error.message); // Handle or propagate the error
  }

  return mapProductRow(data as ProductRow);
};

export const mapSingleProductTableData = (data: Product) => mapProductRow(data);
