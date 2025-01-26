import {
  getProductList,
  getSingleProduct,
  Product,
} from "../../supabase/products";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetProductList = <T = Product[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
} = {}): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["products"],
    queryFn: getProductList,
    staleTime: 60 * 1000, // Cache for 6 mins
    ...queryOptions,
  });
};

export const useGetSingleProduct = <T = Product>(
  id: string | undefined,
  {
    queryOptions,
  }: {
    queryOptions?: Omit<
      UseQueryOptions<Product, Error, T>,
      "queryKey" | "queryFn"
    >;
  } = {},
): UseQueryResult<T, Error> => {
  return useQuery<Product, Error, T>({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Product ID is undefined");
      }

      // Replace `-` with `/` in the `id`
      const formattedId = id.replace("-", "/");

      return await getSingleProduct(formattedId);
    },
    enabled: !!id, // Ensures the query runs only if `id` is defined
    ...queryOptions,
  });
};
