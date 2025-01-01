import React, { useState, useEffect } from "react";
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
import { getAllCountries as getAllCounties } from "../services/county";
import { getAllCountries as getAllCities } from "../services/city";

interface typeOfStateData {
  geo_id: number | null;
  geo_code: string;
  name: string;
  abbreviation: string | null;
  countyId: number;
  cityId: number;
}

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

interface typeOfCountyCityModal {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfStateData;
  onSubmit: (updatedCountry: typeOfStateData) => void;
  openModalFor: string;
}

export default function CountyCityModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: typeOfCountyCityModal) {
  // state handle dropdown list
  const [countyList, setCountyList] = useState([{ id: 0, text: "Loading" }]);
  const [cityList, setCityList] = useState([{ id: 0, text: "Loading" }]);

  interface typeOfoption {
    id: number;
    text: string;
  }

  // minimum check of raw data
  interface typeOfRawCity {
    geo_id: number;
    boundary: {
      name: string;
    };
  }
  interface typeOfRawCounty {
    geo_id: number;
    boundary: {
      name: string;
    };
  }

  const fetchCountyList = async () => {
    const response = await getAllCounties();
    // console.log("county list api = ", response);
    const stateList = response.map((item: typeOfRawCounty): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.boundary.name,
      };
    });
    setCountyList(stateList);
  };

  const fetchCityList = async () => {
    const response = await getAllCities();
    // console.log("city list api = ", response);
    const stateList = response.map((item: typeOfRawCity): typeOfoption => {
      return {
        id: item.geo_id,
        text: item.boundary.name,
      };
    });
    setCityList(stateList);
  };

  // do when page load
  useEffect(() => {
    fetchCountyList();
    fetchCityList();
  }, []);

  const [formData, setFormData] = useState<typeOfStateData>({
    geo_id: null,
    geo_code: "",
    name: "",
    abbreviation: "",
    countyId: 0,
    cityId: 0,
  });

  // useEffect(() => {
  //   console.log("form data payload =", formData);
  // }, [formData]);

  useEffect(() => {
    console.log("set form initialDetail = ", initialDetail);
    setFormData(initialDetail);
  }, [initialDetail]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    console.log("openModalFor = ", openModalFor);
  }, [openModalFor]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <TextField
          label="Geo Code"
          name="geo_code"
          value={formData.geo_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Abbreviation"
          name="abbreviation"
          value={formData.abbreviation || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
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
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="city-select-label">city</InputLabel>
          <Select
            labelId="city-select-label"
            name="cityId"
            value={formData.cityId || ""}
            onChange={handleChange}
          >
            {cityList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
