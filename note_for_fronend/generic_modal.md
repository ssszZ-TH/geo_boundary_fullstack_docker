ได้เลยค่ะ! 😊 เดี๋ยวจะช่วยเปลี่ยนชื่อตัวแปรและชื่อฟังก์ชันให้มีความเป็นกลาง เพื่อให้ StateModal สามารถนำไปใช้ซ้ำในหลาย ๆ เพจได้ง่ายขึ้นค่ะ ✨

---

### การเปลี่ยนแปลง:
1. เปลี่ยนชื่อ `typeOfCountryData` เป็น `ModalFormData`.
2. เปลี่ยนชื่อ `CountryModalProps` เป็น `GenericModalProps`.
3. เปลี่ยนชื่อ `StateModal` เป็น `GenericModal`.
4. เปลี่ยนชื่อ `countryList` เป็น `optionsList` (เพื่อให้เป็นกลางมากขึ้น).
5. เปลี่ยนชื่อ `fetchCountryList` เป็น `fetchOptionsList`.
6. เปลี่ยน `countryId` ใน `formData` เป็น `selectedOptionId`.

---

### โค้ดปรับปรุงใหม่:

```tsx
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

interface ModalFormData {
  id: number | null;
  code: string;
  name: string;
  abbreviation: string | null;
  selectedOptionId: number;
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

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: ModalFormData;
  onSubmit: (updatedData: ModalFormData) => void;
  fetchOptions: () => Promise<Array<{ id: number; text: string }>>;
}

function GenericModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  fetchOptions,
}: GenericModalProps) {
  const [optionsList, setOptionsList] = useState([{ id: 0, text: "Loading" }]);

  const [formData, setFormData] = useState<ModalFormData>({
    id: null,
    code: "",
    name: "",
    abbreviation: "",
    selectedOptionId: 0,
  });

  useEffect(() => {
    const loadOptions = async () => {
      const options = await fetchOptions();
      setOptionsList(options);
    };
    loadOptions();
  }, [fetchOptions]);

  useEffect(() => {
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

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <TextField
          label="Code"
          name="code"
          value={formData.code}
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
          <InputLabel id="option-select-label">Option</InputLabel>
          <Select
            labelId="option-select-label"
            name="selectedOptionId"
            value={formData.selectedOptionId || ""}
            onChange={handleChange}
          >
            {optionsList.map((item) => (
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

export default GenericModal;
```

---

### การใช้งาน:
เมื่อคุณต้องการเรียกใช้ `GenericModal` สำหรับเพจใด ๆ:
1. ส่ง `fetchOptions` ที่จะโหลดตัวเลือก (เช่น Country, Category).
2. กำหนด `initialDetail` ให้สอดคล้องกับข้อมูลของเพจ.

ตัวอย่างการใช้งาน:

```tsx
import React from "react";
import GenericModal from "./GenericModal";
import { getAllCountries } from "../services/country";

function ExamplePage() {
  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <GenericModal
      open={true}
      onClose={() => console.log("Modal Closed")}
      initialDetail={{
        id: 1,
        code: "TH",
        name: "Thailand",
        abbreviation: "THA",
        selectedOptionId: 1,
      }}
      fetchOptions={getAllCountries}
      onSubmit={handleSubmit}
    />
  );
}
```

---

💡 **ข้อดี**:
- สามารถใช้ `GenericModal` กับข้อมูลประเภทใดก็ได้ โดยแค่เปลี่ยน `fetchOptions`.
- ตัวแปรมีความเป็นกลาง และลดความเฉพาะเจาะจงของชื่อ.

😊 ถ้ามีคำถามเพิ่มเติม บอกมาได้เลยนะคะ!