import { z } from "zod";

const campaignSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  keywords: z.array(z.string()).min(1),
  bidAmount: z.number().min(100),
  campaignFund: z.number(),
  town: z.string(),
  radius: z.number().optional(),
  status: z.boolean(),
});

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  campaigns: z.array(campaignSchema.optional()),
});

const campaignsSchema = z.array(campaignSchema);
const productsSchema = z.array(productSchema);

export type Campaign = z.infer<typeof campaignSchema>;

export const getAllProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products?_embed=campaigns`
  );
  if (!response.ok) throw new Error(response.statusText);
  const products = await response.json();
  return productsSchema.parse(products);
};

export const getProductById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${id}?_embed=campaigns`
  );
  const product = await response.json();
  return productSchema.parse(product);
};

export const getCampaignsByProductId = async (id: string) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/products/${id}/campaigns?_embed=activeCampaigns`
  );
  const campaigns = await response.json();
  return campaignsSchema.parse(campaigns);
};
