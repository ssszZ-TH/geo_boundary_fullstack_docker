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
import { getAllCountries } from "../services/country";

interface typeOfCountryData {
  geo_id: number | null;
  geo_code: string;
  name_en: string;
  name_th: string;
  abbreviation: string | null;
  countryId: number;
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

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfCountryData;
  onSubmit: (updatedCountry: typeOfCountryData) => void;
  openModalFor: string;
}

function StateModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: CountryModalProps) {
  const [countryList, setCountryList] = useState([{ id: 0, text: "Loading" }]);

  interface optionCountry {
    id: number;
    text: string;
  }

  interface country {
    geo_id: number;
    boundary: {
      geo_code: string;
      name_en: string;
      name_th: string;
      abbreviation: string;
    };
  }

  const transformCountries = (
    countries: Array<country>
  ): Array<optionCountry> => {
    const transformedCountries = countries.map((country: any) => ({
      id: country.geo_id,
      text: country.boundary.name_en +' - '+ country.boundary.name_th,
    }));
    return transformedCountries;
  };

  const fetchCountryList = async () => {
    const countries = await getAllCountries();
    console.log("country list api = ", countries);
    console.log("country list = ", transformCountries(countries));
    setCountryList(transformCountries(countries));
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  const [formData, setFormData] = useState<typeOfCountryData>({
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
    countryId: 0,
  });

  // useEffect(() => {
  //   console.log("form data =", formData);
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
          name="name_en"
          value={formData.name_en}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ชื่อ"
          name="name_th"
          value={formData.name_th}
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
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default StateModal;
