import { useState, useEffect } from "react";
import AppBarCustom from "../components/AppBarCustom";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import CountryModal from "../components/CountryModal";
import { Button } from "@mui/material";
import Loading from "../components/Loading"; // สมมุติว่ามีคอมโพเนนต์สำหรับแสดงสถานะการโหลด
import {
  createCountry,
  updateCountry,
  deleteCountry,
  getAllCountries,
  getCountryById,
} from "../services/province";

function Province() {
  return (
    <>
      <AppBarCustom />
      <div>Province</div>
    </>
  );
}

export default Province;
