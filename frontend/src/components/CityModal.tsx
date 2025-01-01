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
import { getAllCountries as getAllStates } from "../services/state";

interface typeOfStateData {
  geo_id: number | null;
  geo_code: string;
  name: string;
  abbreviation: string | null;
  stateId: number;
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
  initialDetail: typeOfStateData;
  onSubmit: (updatedCountry: typeOfStateData) => void;
  openModalFor: string;
}

export default function CityModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: CountryModalProps) {
  const [stateList, setStateList] = useState([{ id: 0, text: "Loading" }]);

  interface optionState {
    id: number;
    text: string;
  }

  interface typeOfRawState {
    geo_id: number;
    boundary: {
      geo_code: string;
      name: string;
      abbreviation: string;
    };
    geo_code: string;
    name: string;
    abbreviation: string;
    get_state: {
      geo_id: number;
      country_id: number;
    };
  }

  const transformStates = (
    states: Array<typeOfRawState>
  ): Array<optionState> => {
    return states.map((state: any) => ({
      id: state.geo_id,
      text: state.boundary.name,
    }));
  };

  const fetchStateList = async () => {
    const states = await getAllStates();
    setStateList(transformStates(states));
  };

  useEffect(() => {
    fetchStateList();
  }, []);

  const [formData, setFormData] = useState<typeOfStateData>({
    geo_id: null,
    geo_code: "",
    name: "",
    abbreviation: "",
    stateId: 0,
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
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
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
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
