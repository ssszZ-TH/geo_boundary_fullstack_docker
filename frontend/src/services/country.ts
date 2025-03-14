// country.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const defultTypeId = 1;

// Function to create a new country
export const createCountry = async (
  geoCode: string,
  name_en: string,
  name_th: string,
  abbreviation: string,
  type_id: number = defultTypeId
) => {
  // Step 1: Insert data into supertype
  const supertypeResponse = await axios.post(`${BASE_URL}/geographic_boundary`, {
    geo_code: geoCode,
    name_en: name_en,
    name_th: name_th,
    abbreviation: abbreviation,
    type_id: type_id,
  });

  // Extract geo_id from the supertype response
  const geoId = supertypeResponse.data.geo_id;

  // Step 2: Insert data into subtype
  const subtypeResponse = await axios.post(`${BASE_URL}/country`, {
    geo_id: geoId,
  });

  return subtypeResponse.data;
};

// Function to get all countries
export const getAllCountries = async () => {
  // Fetch all countries from the subtype
  const response = await axios.get(`${BASE_URL}/country`);
  return response.data;
};

// Function to get a single country by ID
export const getCountryById = async (geoId: number) => {
  // Fetch a single country from the subtype
  const response = await axios.get(`${BASE_URL}/country/${geoId}`);
  return response.data;
};

// Function to update a country
export const updateCountry = async (
  geoId: number,
  geoCode: string,
  name_en: string,
  name_th: string,
  abbreviation: string,
  type_id: number = defultTypeId
) => {
  // Step 1: Update data in the supertype
  const supertypeResponse = await axios.put(`${BASE_URL}/geographic_boundary/${geoId}`, {
    geo_code: geoCode,
    name_en: name_en,
    name_th: name_th,
    abbreviation: abbreviation,
    type_id: type_id,
  });

  // Step 2: Update data in the subtype
  const subtypeResponse = await axios.put(`${BASE_URL}/country/${geoId}`, {
    geo_id: geoId,
  });

  return {
    supertype: supertypeResponse.data,
    subtype: subtypeResponse.data,
  };
};

// Function to delete a country
export const deleteCountry = async (geoId: number) => {
  // Delete the country directly in the supertype
  const response = await axios.delete(`${BASE_URL}/geographic_boundary/${geoId}`);
  return response.data;
};

// Example usage comments:
// createCountry('countrydemo1', 'testname1', 'TESTAB1', 1);
// getAllCountries();
// getCountryById(20);
// updateCountry(20, 'newTH-001', 'newtestname', 'newTESTABB', 1);
// deleteCountry(20);
