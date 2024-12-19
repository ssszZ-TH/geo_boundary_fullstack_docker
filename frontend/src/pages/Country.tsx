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
} from "../services/country";

const columns: GridColDef[] = [
  { field: "geo_id", headerName: "ID", width: 50 },
  {
    field: "geo_code",
    headerName: "Geo Code",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "abbreviation",
    headerName: "Abbreviation",
    width: 100,
  },
];

function Country() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [open, setOpen] = useState(false);
  const [initialDetail, setInitialDetail] = useState({
    geo_code: "",
    name: "",
    abbreviation: "",
    type_id: 1,
  });

  // flatten object
  const transformData = (obj: any) => {
    return {
      geo_id: obj.geo_id,
      geo_code: obj.boundary.geo_code,
      name: obj.boundary.name,
      abbreviation: obj.boundary.abbreviation || "-",
      type_id: obj.boundary.type_id,
    };
  };

  // transform rows for mui table call by read all
  const transformRows = (rows: Array<any>) => {
    return rows.map((row) => transformData(row));
  };

  // handle read all
  const fetchCountries = async (id?: number) => {
    setLoading(true);
    if (id) {
      // read by id
      try {
        const data = await getCountryById(id);
        console.log("get all data =>", data);
        setRows(data); // ตั้งค่า rows ด้วยข้อมูลที่ได้รับ
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false); // เปลี่ยนสถานะการโหลดเมื่อเสร็จสิ้น
      }
    } else {
      // read all
      try {
        const data = transformRows(await getAllCountries());
        console.log("get all data =>", data);
        setRows(data); // ตั้งค่า rows ด้วยข้อมูลที่ได้รับ
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false); // เปลี่ยนสถานะการโหลดเมื่อเสร็จสิ้น
      }
    }
  };

  //initial
  useEffect(() => {
    fetchCountries();
  }, []);

  // modal ทำเพื่อให้เข้าใจง่ายยิ่งขึ้น
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  interface typeOfUpdatedCountry {
    geo_id: number;
    geo_code: string;
    name: string;
    abbreviation: string;
  }

  const handleSubmit = async (updatedCountry: typeOfUpdatedCountry) => {
    // เเสดง loading
    setLoading(true);
    try {
      if (updatedCountry.geo_id) {
        // ถ้ามี geo_id แสดงว่าต้องอัปเดต
        await updateCountry(
          updatedCountry.geo_id,
          updatedCountry.geo_code,
          updatedCountry.name,
          updatedCountry.abbreviation || "",
        );
        console.log("Updated Country:", updatedCountry);
        // setLoading(false);
      } else {
        // ถ้าไม่มี geo_id แสดงว่าต้องสร้างใหม่
        await createCountry(
          updatedCountry.geo_code,
          updatedCountry.name,
          updatedCountry.abbreviation || "",
        );
        console.log("Created Country:", updatedCountry);
        // setLoading(false);
      }
    } catch (error) {
      // จับ error print ให้ดู
      console.error("while submit catch error = ", error);
    } finally {
      //sync ค่าในตาราง กับ database
      fetchCountries();
      closeModal(); // ปิด modal
      setLoading(false);
    }
  };

  return (
    <>
      <AppBarCustom title="CRUD Country" />

      {loading ? (
        <Loading /> // แสดง loading component ถ้ากำลังโหลด
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.geo_id} // ใช้ geo_id เป็น id
        />
      )}

      <Button variant="contained" color="primary" onClick={openModal}>
        Add Country
      </Button>

      <CountryModal
        open={open}
        onClose={closeModal}
        initialDetail={initialDetail}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Country;
