import { useEffect, useState } from "react";
import AppBarCustom from "../components/AppBarCustom";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { getAllCountries } from "../services/country";
import Loading from "../components/Loading";

import { getProvinceDD } from "../services/province";
import { getDistrictDD } from "../services/district";
import { getSubDistrictDD } from "../services/sub_district";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DynamicDDdistrict() {
  const [formData, setFormData] = useState<typeOfStateData>({
    country_id: 0,
    province_id: 0,
    district_id: 0,
    subdistrict_id: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: number | string }
    >
  ) => {
    const { name, value } = e.target;
    // console.log('handle change recive', name, value);

    setFormData({ ...formData, [name]: value });

    if (name === "country_id") {
      // dropdown country change
      fetchProvinceDD(value);
    }
    if (name === "province_id") {
      // dropdown province change
      fetchDistrictDD(value);
    }
    if (name === "district_id") {
      // dropdown district change
      fetchSubdistrictDD(value);
    }
  };

  // print check formdata
  useEffect(() => {
    console.log("form data = ", formData);
  }, [formData]);

  const [countryList, setCountryList] = useState([{ id: 0, text: "" }]);
  const [provinceList, setProvinceList] = useState([{ id: 0, text: "" }]);
  const [districtList, setDistrictList] = useState([{ id: 0, text: "" }]);
  const [subdistrictList, setSubdistrictList] = useState([{ id: 0, text: "" }]);

  const [countryLoading, setCountryLoading] = useState(false);
  const [provinceLoading, setProvinceLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [subdistrictLoading, setSubdistrictLoading] = useState(false);

  interface typeOfRawCountry {
    geo_id: number;
    boundary: {
      geo_code: string;
      name_en: string;
      name_th: string;
      abbreviation: string;
    };
  }

  interface typeOfoption {
    id: number;
    text: string;
  }

  const fetchCountriesList = async () => {
    setCountryLoading(true);
    const response = await getAllCountries();
    // console.log("country list api = ", response);
    const countryList = response.map((item: typeOfRawCountry): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.boundary.name_en + " - " + item.boundary.name_th,
      };
    });
    setCountryList(countryList);
    setCountryLoading(false);
  };

  interface typeOfDDResponse {
    geo_id: number;
    name_en: string;
    name_th: string;
    abbreviation: string;
  }

  const fetchProvinceDD = async (value: number) => {
    setProvinceLoading(true);
    const response = await getProvinceDD(value);
    // console.log("state list api = ", response);
    const data = response.data;
    const provinceList = data.map((item: typeOfDDResponse): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.name_en + " - " + item.name_th,
      };
    });
    setProvinceList(provinceList);
    setProvinceLoading(false);
  };

  const fetchDistrictDD = async (value: number) => {
    setDistrictLoading(true);
    const response = await getDistrictDD(value);
    // console.log("state list api = ", response);
    const data = response.data;
    const districtList = data.map((item: typeOfDDResponse): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.name_en + " - " + item.name_th,
      };
    });
    setDistrictList(districtList);
    setDistrictLoading(false);
  };

  const fetchSubdistrictDD = async (value: number) => {
    setSubdistrictLoading(true);
    const response = await getSubDistrictDD(value);
    // console.log("state list api = ", response);
    const data = response.data;
    const subdistrictList = data.map((item: typeOfDDResponse): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.name_en + " - " + item.name_th,
      };
    });
    setSubdistrictList(subdistrictList);
    setSubdistrictLoading(false);
  };  

  useEffect(() => {
    fetchCountriesList();
  }, []);

  return (
    <>
      <AppBarCustom title={"district base dynamic dropdown"} />
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Dynamic Dropdown
        </Typography>

        {countryLoading ? (
          <Loading />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel id="county-select-label">country</InputLabel>
            <Select
              labelId="county-select-label"
              name="country_id"
              value={formData.country_id || ""}
              onChange={handleChange}
            >
              {countryList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {provinceLoading ? (
          <Loading />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel id="state-select-label">province</InputLabel>
            <Select
              labelId="county-select-label"
              name="province_id"
              value={formData.province_id || ""}
              onChange={handleChange}
            >
              {provinceList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {districtLoading ? (
          <Loading />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel id="county-select-label">district</InputLabel>
            <Select
              labelId="county-select-label"
              name="district_id"
              value={formData.district_id || ""}
              onChange={handleChange}
            >
              {districtList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {subdistrictLoading ? (
          <Loading />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel id="county-city-select-label">sub district</InputLabel>
            <Select
              labelId="county-city-select-label"
              name="subdistrict_id"
              value={formData.subdistrict_id || ""}
              onChange={handleChange}
            >
              {subdistrictList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button> */}
      </Box>
    </>
  );
}
