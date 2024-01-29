import { Region, District } from "types/locations";

export type EstateType = "houses" | "apartments" | "land";
export type DealType = "sale" | "rent";

export const houseTypes = [
  "1 room",
  "2 rooms",
  "3 rooms",
  "4 rooms",
  "5 rooms and more",
];
export type HouseType = (typeof houseTypes)[number];

export const apartmentTypes = [
  "1+kt",
  "1+1",
  "2+kt",
  "2+1",
  "3+kk",
  "3+1",
  "4+kk",
  "4+1",
  "5 and more",
];
export type ApartmentType = (typeof apartmentTypes)[number];

export const landTypes = [
  "housing",
  "commercial",
  "field",
  "forest",
  "pond",
  "garden",
];
export type LandType = (typeof landTypes)[number];

export const houseExtras = [
  "balcony",
  "parking",
  "garden",
  "basement",
  "garage",
  "wooden",
  "furnished",
];
export type HouseExtras = (typeof houseExtras)[number];

export const apartmentExtras = [
  "balcony",
  "parking",
  "garage",
  "lift",
  "furnished",
];
export type ApartmentExtras = (typeof apartmentExtras)[number];

export const buildingTypes = ["brick", "panel", "steel"];
export type BuildingType = (typeof buildingTypes)[number];

export interface SearchParams {
  type: HouseType[] | ApartmentType[] | LandType[];
  extras: HouseExtras[] | ApartmentExtras[];
  building_type: BuildingType[];
  region?: Region;
  districts: District[];
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  min_floor?: number;
  max_floor?: number;
}

export interface Estate {
  _id: number;
  __t: "House" | "Apartment" | "Land";
  updatedAt: Date;
  deal: DealType;
  type: HouseType | ApartmentType | LandType;
  extras?: HouseExtras[] | ApartmentExtras[];
  building_type?: BuildingType;
  floor?: number;
  price: number;
  area: number;
  region: Region;
  district: District;
  description: string;
  full_name: string;
  phone: string;
  email: string;
}
