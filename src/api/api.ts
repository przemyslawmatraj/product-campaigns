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

const keywordSchema = z.string();
const townSchema = z.string();

const emeraldsSchema = z.object({
  amount: z.number(),
});

const townsSchema = z.array(townSchema);
const keywordsSchema = z.array(keywordSchema);
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
  if (!response.ok) throw new Error(response.statusText);
  const product = await response.json();
  return productSchema.parse(product);
};

export const getAllCampaigns = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/campaigns`);
  if (!response.ok) throw new Error(response.statusText);
  const campaigns = await response.json();
  return campaignsSchema.parse(campaigns);
};

export const getCampaignsByProductId = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${id}/campaigns`
  );
  if (!response.ok) throw new Error(response.statusText);
  const campaigns = await response.json();
  return campaignsSchema.parse(campaigns);
};

export const getCampaignById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/campaigns/${id}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const campaign = await response.json();
  return campaignSchema.parse(campaign);
};

export const getEmeralds = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/emeralds`);
  if (!response.ok) throw new Error(response.statusText);
  const emeralds = await response.json();
  return emeraldsSchema.parse(emeralds);
};

export const createCampaign = async (campaign: Campaign) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });
  if (!response.ok) throw new Error(response.statusText);
  const createdCampaign = await response.json();
  return campaignSchema.parse(createdCampaign);
};

export const updateCampaign = async (campaign: Campaign) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/campaigns/${campaign.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    }
  );
  if (!response.ok) throw new Error(response.statusText);
  const updatedCampaign = await response.json();
  return campaignSchema.parse(updatedCampaign);
};

export const getKeywords = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/keywords`);
  if (!response.ok) throw new Error(response.statusText);
  const keywords = await response.json();
  return keywordsSchema.parse(keywords);
};

export const getTowns = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/towns`);
  if (!response.ok) throw new Error(response.statusText);
  const towns = await response.json();
  return townsSchema.parse(towns);
};

export const changeStatus = async (campaign: Campaign, status: boolean) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/campaigns/${campaign.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...campaign,
        status,
      }),
    }
  );
  if (!response.ok) throw new Error(response.statusText);
  const updatedCampaign = await response.json();
  return campaignSchema.parse(updatedCampaign);
};

export const deleteCampaign = async (campaign: Campaign) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/campaigns/${campaign.id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error(response.statusText);
  return true;
};

export const deductEmeralds = async (amount: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/emeralds`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  const updatedEmeralds = await response.json();
  return emeraldsSchema.parse(updatedEmeralds);
};
