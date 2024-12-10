นี่คือชุด `$request->validate()` สำหรับแต่ละตารางที่อ้างอิงจากโครงสร้าง SQL ที่ให้มา:

---

### **`GEOGRAPHIC_BOUNDARY_TYPE`**
```php
$request->validate([
    'type_name' => 'required|string|max:100',
]);
```

---

### **`GEOGRAPHIC_BOUNDARY`**
```php
$request->validate([
    'geo_code' => 'nullable|string|max:50',
    'name' => 'required|string|max:255',
    'abbreviation' => 'nullable|string|max:50',
    'type_id' => 'required|integer|exists:geographic_boundary_type,type_id',
]);
```

---

### **`COUNTRY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:country,geo_id',
]);
```

---

### **`PROVINCE`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:province,geo_id',
    'country_id' => 'required|integer|exists:country,geo_id',
]);
```

---

### **`POSTAL_CODE`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:postal_code,geo_id',
    'country_id' => 'required|integer|exists:country,geo_id',
]);
```

---

### **`TERRITORY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:territory,geo_id',
    'country_id' => 'required|integer|exists:country,geo_id',
]);
```

---

### **`STATE`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:state,geo_id',
    'country_id' => 'required|integer|exists:country,geo_id',
]);
```

---

### **`SALES_TERRITORY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:sales_territory,geo_id',
]);
```

---

### **`SERVICE_TERRITORY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:service_territory,geo_id',
]);
```

---

### **`REGION`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:region,geo_id',
]);
```

---

### **`CITY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:city,geo_id',
    'state_id' => 'required|integer|exists:state,geo_id',
]);
```

---

### **`COUNTY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:county,geo_id',
    'state_id' => 'required|integer|exists:state,geo_id',
]);
```

---

### **`COUNTY_CITY`**
```php
$request->validate([
    'geo_id' => 'required|integer|exists:geographic_boundary,geo_id|unique:county_city,geo_id',
    'county_id' => 'required|integer|exists:county,geo_id',
    'city_id' => 'required|integer|exists:city,geo_id',
]);
```

---

### หมายเหตุ:
1. **`exists`**: ใช้สำหรับตรวจสอบว่า foreign key ที่อ้างอิงอยู่ในตารางเป้าหมาย.
2. **`unique`**: ป้องกันการเพิ่ม primary key ที่ซ้ำในแต่ละตาราง.
3. **`nullable`**: ใช้กับฟิลด์ที่สามารถปล่อยว่างได้ เช่น `geo_code` และ `abbreviation`.