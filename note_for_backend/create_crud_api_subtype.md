# ไว้ค่อยทำ ตอนนี้ผลักภาระไปที่ frontend ได้เลย

กรณีที่คุณมี table `person` เป็น *supertype* และ table `student` กับ `teacher` เป็น *subtype* ใน Laravel สามารถออกแบบ Model และ Controller โดยใช้ **Single Table Inheritance (STI)** หรือ **Polymorphic Relationships** เพื่อรองรับความสัมพันธ์ระหว่าง supertype และ subtype ได้อย่างมีประสิทธิภาพ

### โครงสร้าง Database
1. **Table: `person`**
   ```sql
   CREATE TABLE person (
       id BIGINT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       type ENUM('student', 'teacher') NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

2. **Table: `student`**
   ```sql
   CREATE TABLE student (
       id BIGINT PRIMARY KEY,
       grade_level VARCHAR(50),
       FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
   );
   ```

3. **Table: `teacher`**
   ```sql
   CREATE TABLE teacher (
       id BIGINT PRIMARY KEY,
       subject VARCHAR(255),
       years_of_experience INT,
       FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
   );
   ```

---

### วิธีจัดการใน Laravel

#### 1. Model Design
**Person Model (Supertype)**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'type'];

    // ใช้ Inheritance กับ Subtype Models
    public function specific()
    {
        return $this->morphTo('specific', 'type', 'id');
    }
}
```

**Student Model (Subtype)**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'grade_level'];

    public function person()
    {
        return $this->belongsTo(Person::class, 'id', 'id');
    }
}
```

**Teacher Model (Subtype)**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'subject', 'years_of_experience'];

    public function person()
    {
        return $this->belongsTo(Person::class, 'id', 'id');
    }
}
```

---

#### 2. Controller Design
**PersonController**
```php
namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    // ดึงข้อมูล Person ทั้งหมด พร้อมข้อมูลเฉพาะของแต่ละประเภท
    public function index()
    {
        $people = Person::with(['specific'])->get();
        return response()->json($people);
    }

    // สร้าง Person พร้อม Subtype
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:person,email',
            'type' => 'required|in:student,teacher',
        ]);

        $person = Person::create($request->only(['name', 'email', 'type']));

        if ($request->type === 'student') {
            Student::create([
                'id' => $person->id,
                'grade_level' => $request->input('grade_level'),
            ]);
        } elseif ($request->type === 'teacher') {
            Teacher::create([
                'id' => $person->id,
                'subject' => $request->input('subject'),
                'years_of_experience' => $request->input('years_of_experience'),
            ]);
        }

        return response()->json($person, 201);
    }

    // อัปเดตข้อมูล Person
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);

        $person->update($request->only(['name', 'email']));

        if ($person->type === 'student') {
            $person->specific->update($request->only(['grade_level']));
        } elseif ($person->type === 'teacher') {
            $person->specific->update($request->only(['subject', 'years_of_experience']));
        }

        return response()->json($person);
    }

    // ลบ Person และ Subtype
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();

        return response()->json(['message' => 'Person deleted successfully']);
    }
}
```

---

### เทคนิคเพิ่มเติม
1. **ใช้ Polymorphic Relationships**: หาก subtype มีการอ้างอิงถึงข้อมูลร่วมอื่นๆ (เช่น `documents`, `files`) ควรใช้ Polymorphic Relationships เพื่อจัดการความสัมพันธ์แบบยืดหยุ่น.
2. **ใช้ Enum หรือ Constants**: สร้าง enum หรือ constants ใน Model `Person` สำหรับจัดการค่าของ `type` เพื่อความปลอดภัยและลดข้อผิดพลาด.
3. **Resource Transformation**: ใช้ `Resource` ใน Laravel เพื่อนำเสนอข้อมูลในรูปแบบที่เหมาะสม เช่น:
   ```php
   use Illuminate\Http\Resources\Json\JsonResource;

   class PersonResource extends JsonResource
   {
       public function toArray($request)
       {
           return [
               'id' => $this->id,
               'name' => $this->name,
               'email' => $this->email,
               'type' => $this->type,
               'details' => $this->specific,
           ];
       }
   }
   ```
4. **Middleware**: ตรวจสอบสิทธิ์การเข้าถึงข้อมูลใน Controller โดยใช้ Middleware เพื่อรักษาความปลอดภัย.

---

เมื่อใช้เทคนิคนี้ จะสามารถจัดการกับ supertype และ subtype ได้อย่างยืดหยุ่นและมีประสิทธิภาพใน Laravel!

# moph โดยละเอียด

การใช้งานฟังก์ชัน `morphTo` ใน Laravel ตามโค้ดของคุณ:

```php
public function specific()
{
    return $this->morphTo('specific', 'geo_id', 'geo_id');
}
```

โค้ดดังกล่าว **ไม่ถูกต้องตามหลักการใช้งาน `morphTo`** เนื่องจาก Laravel ใช้ `morphTo` สำหรับ **polymorphic relationships** ซึ่งต้องการคอลัมน์เฉพาะที่ระบุประเภท (morph type) และรหัส (morph ID) ของ model ที่สัมพันธ์กัน

---

### **1. Syntax ของ `morphTo`**

ฟังก์ชัน `morphTo` รองรับการใช้งานดังนี้:

```php
public function morphTo($name = null, $type = null, $id = null, $ownerKey = null)
```

- **`$name`**: ชื่อของความสัมพันธ์ polymorphic (ชื่อที่สัมพันธ์กับฐานข้อมูล).
- **`$type`**: ชื่อของคอลัมน์ที่ระบุประเภท (morph type).
- **`$id`**: ชื่อของคอลัมน์ที่ระบุรหัสของ subtype (morph ID).
- **`$ownerKey`** (ไม่จำเป็น): คอลัมน์ primary key ของ subtype (ค่าเริ่มต้นคือ `id`).

---

### **2. ตัวอย่างการใช้งาน**

สมมติว่าเรามี `GeographicBoundary` (supertype) และหลาย subtype (เช่น `Country`, `Province`, ฯลฯ) โดย schema มีการกำหนด **morph type** และ **morph ID**:

#### Schema:
```sql
CREATE TABLE geographic_boundary (
    geo_id SERIAL PRIMARY KEY,
    geo_code VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    geo_type VARCHAR(50) NOT NULL, -- ระบุประเภทของ subtype เช่น 'Country' หรือ 'Province'
    geo_id INT NOT NULL            -- ระบุรหัสของ subtype
);
```

#### Model:
**Supertype Model: `GeographicBoundary`**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeographicBoundary extends Model
{
    use HasFactory;

    protected $table = 'geographic_boundary';

    protected $fillable = [
        'geo_code', 
        'name', 
        'geo_type',  // morph type
        'geo_id',    // morph ID
    ];

    public function specific()
    {
        return $this->morphTo('specific', 'geo_type', 'geo_id');
    }
}
```

- **`geo_type`**: ระบุประเภทของ subtype เช่น `Country` หรือ `Province`.
- **`geo_id`**: ระบุรหัสของ subtype ที่สัมพันธ์กัน.

**Subtype Model: `Country`**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $table = 'country';

    protected $fillable = ['geo_id'];

    public function boundary()
    {
        return $this->morphOne(GeographicBoundary::class, 'specific', 'geo_type', 'geo_id');
    }
}
```

**Subtype Model: `Province`**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'province';

    protected $fillable = ['geo_id', 'country_id'];

    public function boundary()
    {
        return $this->morphOne(GeographicBoundary::class, 'specific', 'geo_type', 'geo_id');
    }
}
```

---

### **3. การทำงานของ Argument ใน `morphTo`**

ตัวอย่าง `return $this->morphTo('specific', 'geo_type', 'geo_id');`

- **`specific` (name)**: ชื่อที่ใช้สำหรับความสัมพันธ์ polymorphic.
    - ใช้ร่วมกับ `morphOne` หรือ `morphMany` ใน model ที่สัมพันธ์.
- **`geo_type` (type)**: คอลัมน์ใน `geographic_boundary` ที่ระบุชนิดของ subtype (เช่น `Country` หรือ `Province`).
- **`geo_id` (id)**: คอลัมน์ใน `geographic_boundary` ที่ระบุ ID ของ subtype.

---

### **4. การใช้งาน**

#### โหลด Subtype จาก Supertype
```php
use App\Models\GeographicBoundary;

$boundary = GeographicBoundary::with('specific')->find(1);

return response()->json($boundary);
```

ตัวอย่างผลลัพธ์:
```json
{
    "geo_id": 1,
    "geo_code": "TH",
    "name": "Thailand",
    "geo_type": "Country",
    "specific": {
        "geo_id": 1
    }
}
```

#### โหลด Supertype จาก Subtype
```php
use App\Models\Country;

$country = Country::with('boundary')->find(1);

return response()->json($country);
```

---

### **5. สรุป**
การใช้งาน `morphTo` อย่างถูกต้อง:
1. ต้องมีคอลัมน์ morph type (`geo_type`) และ morph ID (`geo_id`) ใน supertype table.
2. ในฟังก์ชัน `specific()`:
   ```php
   public function specific()
   {
       return $this->morphTo('specific', 'geo_type', 'geo_id');
   }
   ```
3. ใช้ `morphOne` หรือ `morphMany` ใน subtype models เพื่อเชื่อมโยงกลับไปที่ supertype.

วิธีนี้ช่วยจัดการ supertype และ subtype อย่างยืดหยุ่นใน Laravel และใช้ประโยชน์จาก polymorphic relationships ได้เต็มที่!