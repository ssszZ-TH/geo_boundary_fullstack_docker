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
import { getStateDD } from "../services/state";
import { getCountyDD } from "../services/county";
import { getCountyCityDD } from "../services/county_city";

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

export default function DynamicDropdown() {
  const [formData, setFormData] = useState<typeOfStateData>({
    countryId: 0,
    stateId: 0,
    countyId: 0,
    countyCityId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: number|string }>
  ) => {
    const { name, value } = e.target;
    // console.log('handle change recive', name, value);

    setFormData({ ...formData, [name]: value });

    if (name === "countryId") {
      // dropdown country change
      fetchStatesList(value);
    }
    if (name === "stateId") {
      // dropdown state change
      fetchCountyList(value);
    }
    if (name === "countyId") {
      // dropdown county change
      fetchCountyCityList(value);
    }
  };

  // print check formdata
  useEffect(() => {
    console.log("form data = ", formData);
  }, [formData]);

  const [countryList, setCountryList] = useState([{ id: 0, text: "" }]);
  const [stateList, setStateList] = useState([{ id: 0, text: "" }]);
  const [countyList, setCountyList] = useState([{ id: 0, text: "" }]);
  const [countyCityList, setCountyCityList] = useState([{ id: 0, text: "" }]);

  const [countryLoading, setCountryLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [countyLoading, setCountyLoading] = useState(false);
  const [countyCityLoading, setCountyCityLoading] = useState(false);

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

  // dropdown อื่นๆ ก็ response เหมือนๆ กัน ก็เลยใช้ร่วมกันได้
  interface typeOfStateDDResponse {
    geo_id: number;
    name_en:string;
    name_th:string;
    abbreviation:string;
  }

  const fetchStatesList = async (value:number) => {
    setStateLoading(true);
    const response = await getStateDD(value);
    // console.log("state list api = ", response);
    const data = response.data
    const stateList = data.map((item: typeOfStateDDResponse): typeOfoption  => {
      return {
        id: item.geo_id,
        text: item.name_en+" - "+item.name_th,
      };
    })
    setStateList(stateList);
    setStateLoading(false);
  };

  const fetchCountyList = async (value: number) => {
    setCountyLoading(true);
    const response = await getCountyDD(value);
    // console.log("state list api = ", response);
    const data = response.data
    const countyList = data.map((item: typeOfStateDDResponse): typeOfoption  => {
      return {
        id: item.geo_id,
        text: item.name_en+" - "+item.name_th,
      };
    })
    setCountyList(countyList);
    setCountyLoading(false);
  }

  const fetchCountyCityList = async (value: number) => {
    setCountyCityLoading(true);
    const response = await getCountyCityDD(value);
    // console.log("state list api = ", response);
    const data = response.data
    const countyCityList = data.map((item: typeOfStateDDResponse): typeOfoption  => {
      return {
        id: item.geo_id,
        text: item.name_en+" - "+item.name_th,
      };
    })
    setCountyCityList(countyCityList);
    setCountyCityLoading(false);
  }

  useEffect(() => {
    fetchCountriesList();
  }, []);

  return (
    <>
      <AppBarCustom title={"dynamic dropdown"} />
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
              name="countryId"
              value={formData.countryId || ""}
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

        {stateLoading?<Loading/>:(<FormControl fullWidth margin="normal">
          <InputLabel id="state-select-label">state</InputLabel>
          <Select
            labelId="county-select-label"
            name="stateId"
            value={formData.stateId || ""}
            onChange={handleChange}
          >
            {stateList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>)}

        {countyLoading?<Loading/>:(<FormControl fullWidth margin="normal">
          <InputLabel id="county-select-label">county</InputLabel>
          <Select
            labelId="county-select-label"
            name="countyId"
            value={formData.countyId || ""}
            onChange={handleChange}
          >
            {countyList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>)}

        {countyCityLoading?<Loading/>:(<FormControl fullWidth margin="normal">
          <InputLabel id="county-city-select-label">county city</InputLabel>
          <Select
            labelId="county-city-select-label"
            name="countyCityId"
            value={formData.countyCityId || ""}
            onChange={handleChange}
          >
            {countyCityList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>)}
        {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button> */}
      </Box>
    </>
  );
}
