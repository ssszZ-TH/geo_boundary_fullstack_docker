// country.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const SUBTYPE_URL = `${BASE_URL}/county_city`;
const SUPERTYPE_URL = `${BASE_URL}/geographic_boundary`;
const defultTypeId = 5;

// Function to create a new country
export const createCountry = async (geoCode: string, name: string, abbreviation: string, typeId: number = defultTypeId, countyId: number, cityId: number) => {
    // Step 1: Insert data into supertype
    const supertypeResponse = await axios.post(SUPERTYPE_URL, {
        geo_code: geoCode,
        name: name,
        abbreviation: abbreviation,
        type_id: typeId,
    });

    // Extract geo_id from the supertype response
    const geoId = supertypeResponse.data.geo_id;

    // Step 2: Insert data into subtype
    const subtypeResponse = await axios.post(SUBTYPE_URL, {
        geo_id: geoId,
        county_id: countyId,
        city_id: cityId
    });

    return subtypeResponse.data;
};

// Function to get all countries
export const getAllCountries = async () => {
    // Fetch all countries from the subtype
    const response = await axios.get(SUBTYPE_URL);
    return response.data;
};

// Function to get a single country by ID
export const getCountryById = async (geoId: number) => {
    // Fetch a single country from the subtype
    const response = await axios.get(`${SUBTYPE_URL}/${geoId}`);
    return response.data;
};

// Function to update a country
export const updateCountry = async (
    geoId: number,
    geoCode: string,
    name: string,
    abbreviation: string,
    typeId: number = defultTypeId,
    countyId: number,
    cityId: number,
) => {
    // Step 1: Update data in the supertype
    const supertypeResponse = await axios.put(`${SUPERTYPE_URL}/${geoId}`, {
        geo_code: geoCode,
        name: name,
        abbreviation: abbreviation,
        type_id: typeId,
    });

    // Step 2: Update data in the subtype
    const subtypeResponse = await axios.put(`${SUBTYPE_URL}/${geoId}`, {
        geo_id: geoId,
        county_id: countyId,
        city_id: cityId
    });

    return {
        supertype: supertypeResponse.data,
        subtype: subtypeResponse.data,
    };
};

// Function to delete a country
export const deleteCountry = async (geoId: number) => {
    // Delete the country directly in the supertype
    const response = await axios.delete(`${SUPERTYPE_URL}/${geoId}`);
    return response.data;
};

// Example usage comments:
// createCountry('countrydemo1', 'testname1', 'TESTAB1', 1);
// getAllCountries();
// getCountryById(20);
// updateCountry(20, 'newTH-001', 'newtestname', 'newTESTABB', 1);
// deleteCountry(20);
