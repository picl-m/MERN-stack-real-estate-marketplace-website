import locations from "assets/locations.json";

export const regions = Object.keys(locations);
export type Region = keyof typeof locations;

export let districts: string[] = [];
Object.keys(locations).forEach((region) => {
  locations[region as Region].forEach((district) => {
    districts.push(district);
  });
});

export type District = (typeof districts)[number];
