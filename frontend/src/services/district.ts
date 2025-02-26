import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const SUBTYPE_URL = `${BASE_URL}/district`;
const SUPERTYPE_URL = `${BASE_URL}/geographic_boundary`;
const defultTypeId = 13;

// create
export const createItem = async (
    geoCode: string,
    name_en: string,
    name_th: string,
    abbreviation: string,
    province_id: number,
    typeId: number = defultTypeId
) => {
    // Step 1: Insert data into supertype
    const supertypeResponse = await axios.post(SUPERTYPE_URL, {
        geo_code: geoCode,
        name_en: name_en,
        name_th: name_th,
        abbreviation: abbreviation,
        type_id: typeId,
    });

    // Extract geo_id from the supertype response
    const geoId = supertypeResponse.data.geo_id;

    // Step 2: Insert data into subtype
    const subtypeResponse = await axios.post(SUBTYPE_URL, {
        geo_id: geoId,
        province_id: province_id,
    });

    return subtypeResponse.data;
};

// get all 
export const getAll = async () => {
    // Fetch all countries from the subtype
    const response = await axios.get(SUBTYPE_URL);
    return response.data;
};

// get ID
export const getById = async (geoId: number) => {
    // Fetch a single country from the subtype
    const response = await axios.get(`${SUBTYPE_URL}/${geoId}`);
    return response.data;
};

// update
export const updateItem = async (
    geoId: number,
    geoCode: string,
    name_en: string,
    name_th: string,
    abbreviation: string,
    province_id: number,
    typeId: number = defultTypeId,
  ) => {
    // Step 1: Update data in the supertype
    const supertypeResponse = await axios.put(`${SUPERTYPE_URL}/${geoId}`, {
      geo_code: geoCode,
      name_en: name_en,
      name_th: name_th,
      abbreviation: abbreviation,
      type_id: typeId,
    });
  
    // Step 2: Update data in the subtype
    const subtypeResponse = await axios.put(`${SUBTYPE_URL}/${geoId}`, {
      geo_id: geoId,
      province_id: province_id,
    });
  
    return {
      supertype: supertypeResponse.data,
      subtype: subtypeResponse.data,
    };
  };
  
  // delete
  export const deleteItem = async (geoId: number) => {
    // Delete the country directly in the supertype
    const response = await axios.delete(`${SUPERTYPE_URL}/${geoId}`);
    return response.data;
  };

  export const getDistrictDD = async (provinceId: number) => {
    const response = await axios.get(`${SUBTYPE_URL}/dd/${provinceId}`);
    return response.data;
  };