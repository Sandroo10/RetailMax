import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  getProductList,
  getSingleProduct,
  type Product,
} from "@/supabase/products";

export const useProductList = <T = Product[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
} = {}): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["products"],
    queryFn: getProductList,
    staleTime: 60 * 1000,
    ...queryOptions,
  });
};

export const useSingleProduct = <T = Product>(
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

      return getSingleProduct(id);
    },
    enabled: Boolean(id),
    ...queryOptions,
  });
};
