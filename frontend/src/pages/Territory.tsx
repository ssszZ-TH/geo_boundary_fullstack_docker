import { useState, useEffect } from "react";
import AppBarCustom from "../components/AppBarCustom";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import StateModal from "../components/stateModal";
import { Button } from "@mui/material";
import Loading from "../components/Loading"; // สมมุติว่ามีคอมโพเนนต์สำหรับแสดงสถานะการโหลด
import {
  createCountry,
  updateCountry,
  deleteCountry,
  getAllCountries,
  getCountryById,
} from "../services/territory";

function Territory() {
  const columns: GridColDef[] = [
    { field: "geo_id", headerName: "ID", width: 50 },
    {
      field: "geo_code",
      headerName: "Geo Code",
      width: 150,
    },
    {
      field: "name_en",
      headerName: "Name",
      width: 300,
    },
    {
      field: "name_th",
      headerName: "Name",
      width: 300,
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      width: 100,
    },
    {
      field: "countryId",
      headerName: "Part of Country",
      width: 100,
    },
    {
      field: "update", // คอลัมน์ใหม่สำหรับปุ่ม Update
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateButton(params.row)} // เรียกใช้ฟังก์ชัน handleEdit เมื่อคลิก
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete", // คอลัมน์ใหม่สำหรับปุ่ม Update
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteButton(params.row.geo_id)} // เรียกใช้ฟังก์ชัน handleEdit เมื่อคลิก
        >
          Delete
        </Button>
      ),
    },
  ];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [open, setOpen] = useState(false);
  const [initialDetail, setInitialDetail] = useState({
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
    countryId: 0,
  });

  // เหตุผลในการเปิด modal มีเปิดเพื่อ อ่าน เปิด แก้ไข เปิดเพื่อสร้างข้อมูลใหม่
  const [openModalFor, setOpenModalFor] = useState("");

  interface typeOfMuiRow {
    geo_id: number | null;
    geo_code: string;
    name_en: string;
    name_th: string;
    abbreviation: string;
    countryId: number;
  }

  const handleUpdateButton = async (row: typeOfMuiRow) => {
    console.log("edit button receive value = ", row);

    // ตั้งค่า initialDetail ด้วยข้อมูลที่ถูกต้อง
    setInitialDetail(row);
    openModal("update");
  };

  const handleDeleteButton = async (geo_id: number) => {
    console.log("delete button receive value = ", geo_id);
    setLoading(true);
    await deleteCountry(geo_id);
    await fetchCountries();
    setLoading(false);
  };

  interface typeOfRawRow {
    geo_id: number;
    country_id: number;
    boundary: {
      geo_code: string;
      name_en: string;
      name_th: string;
      abbreviation: string;
    };
    get_country: {
      geo_id: number;
    }
  }

  // prepair obj to mui table
  const transformData = (obj: typeOfRawRow): typeOfMuiRow => {
    if (!obj || !obj.boundary || !obj.get_country) {
      console.warn("Invalid object structure:", obj);
      return {
        geo_id: obj.geo_id || null,
        geo_code: "",
        name_en: "",
        name_th: "",
        abbreviation: "",
        countryId: 0,
      };
    }

    return {
      geo_id: obj.geo_id,
      geo_code: obj.boundary.geo_code || "",
      name_en: obj.boundary.name || "",
      name_th: obj.boundary.name || "",
      abbreviation: obj.boundary.abbreviation || "-",
      countryId: obj.get_country.geo_id,
    };
  };

  // transform rows for mui table call by read all
  const transformRows = (rows: Array<typeOfRawRow>): Array<typeOfMuiRow> => {
    return rows.map((row) => transformData(row));
  };

  // handle read all
  const fetchCountries = async (id?: number) => {
    setLoading(true);
    if (id) {
      // read by id
      try {
        const data = await getCountryById(id);
        console.log("get one data =>", data);
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
        // console.log("get all data =>", data);
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
  const openModal = (reson?: string) => {
    setOpenModalFor(reson || "");
    setOpen(true);
  };
  const closeModal = () => {
    // ปิด modal
    setOpen(false);
    // ล้างค่า modal
    setInitialDetail({
      geo_id: null,
      geo_code: "",
      name_en: "",
      name_th: "",
      abbreviation: "",
      countryId: 0,
    });
    setOpenModalFor("");
  };

  interface typeOfUpdatedCountry {
    geo_id: number;
    geo_code: string;
    name_en: string;
    name_th: string;
    abbreviation: string;
    countryId: number;
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
          updatedCountry.name_en,
          updatedCountry.name_th,
          updatedCountry.abbreviation || "",
          updatedCountry.countryId,
        );
        console.log("Updated Country:", updatedCountry);
        // setLoading(false);
      } else {
        // ถ้าไม่มี geo_id แสดงว่าต้องสร้างใหม่
        await createCountry(
          updatedCountry.geo_code,
          updatedCountry.name_en,
          updatedCountry.name_th,
          updatedCountry.abbreviation || "",
          updatedCountry.countryId,
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
      <AppBarCustom title="CRUD territory" />

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
        Add
      </Button>

      <StateModal
        open={open}
        onClose={closeModal}
        initialDetail={initialDetail}
        onSubmit={handleSubmit}
        openModalFor={openModalFor}
      />
    </>
  );
}

export default Territory;
