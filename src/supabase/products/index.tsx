import { supabase } from "../supabase";


export const getProductList = async () => {
    const { data, error } = await supabase.from("product").select("*"); // Replace "*" with specific columns if needed
    console.log(data);
    if (error) {
      console.error("Error fetching products list:", error.message);
      throw new Error(error.message); // Handle or propagate the error
    }
  
    return data as Product[];
  };

  export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    created_at: string;
    in_stock: boolean;
    category: string; 
};


  export const mapProductTableData = (datalist: Product[]) => {
    return datalist.map(data => ({
      in_stock: data.in_stock || "",
      created_at: data.created_at || "",
      description: data.description || "",
      image_url: data.image_url || "",
      name: data.name || "",
      price: data.price || "",
      id: data.id
    }));
  };

  export const getSingleProduct = async (id: string) => {
    const { data, error } = await supabase
      .from("product")
      .select("*") // Specify the fields to retrieve
      .eq("id", Number(id)) // Match the `id` column
      .single(); // Expect a single record
  
    if (error) {
      console.error("Error fetching single product:", error.message);
      throw new Error(error.message); // Handle or propagate the error
    }
  
    return data as Product;
  };
  

  export const mapSingleProductTableData = (data: Product) => (
    {
      in_stock: data.in_stock || "",
      created_at: data.created_at || "",
      description: data.description || "",
      image_url: data.image_url || "",
      name: data.name || "",
      price: data.price || "",
      id: data.id
    }
  );
