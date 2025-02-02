import { useState } from "react";
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
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
    countyId: 0,
    cityId: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [countryList, setCountryList] = useState([{ id: 0, text: "Loading country" }]);
  const [stateList, setStateList] = useState([{ id: 0, text: "Loading state" }]);
  const [countyList, setCountyList] = useState([{ id: 0, text: "Loading county" }]);
  const [countyCityList, setCountyCityList] = useState([{ id: 0, text: "Loading countycity" }]);

  return (
    <>
      <AppBarCustom />
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Dynamic Dropdown
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="county-select-label">county</InputLabel>
          <Select
            labelId="county-select-label"
            name="countyId"
            value={formData.countyId || ""}
            onChange={handleChange}
          >
            {countryList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="county-select-label">county</InputLabel>
          <Select
            labelId="county-select-label"
            name="countyId"
            value={formData.countyId || ""}
            onChange={handleChange}
          >
            {stateList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            {countyCityList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button> */}
      </Box>
    </>
  );
}
