# สร้าง API แบบ CRUD
### มีอยู่ 3 file ส่วนหลักๆ ที่เราทำงานด้วย

### 1. `routes/api.php`
ส่วนนี้เราจะสร้าง เส้นทางการเชื่อมต่อ ไปหา api

```php
Route::apiResource('products', ProductController::class);
```

จาก code ส่วนนี้คือมีความหมายว่า ถ้ามีคนเข้ามาที่ url.../api/products ไม่ว่าจะด้วย method อะไร ก็ให้ไปเรียก product controller class ที่มีอยู่มาจัดการ

### 2. `app/Http/Controllers/Api/ProductController.php`
ส่วนนี้ใช้งาน function ที่ถูก implement เเล้วใน model
มี function หลักๆ ดังนี้

ถ้าไม่เจอ bash ก็ใช้ sh เเทน
```bash
docker compose exec backend bash
php artisan make:controller Api/ProductController --api
```
คำสั่งนี้ มีไว้ใช้ในการ เชื่อมต่อ bash เข้าไปใน container backend laravel เเล้วขั้นตอนต่อมาก็คือ สั่งให้ artisan สร้าง controller ใหม่ โดยจะสร้างใน app/Http/Controllers/Api/ProductController.php
file จะถูกสร้างไว้ใน folder app/Http/Controllers/Api/ เป็น file skeleton มีเเต่เคร้าโครง เราต้องมาเติม function ดังที่จะกล่าวต่อไปนี้ลงไปเอง

- `index()`: ดึงข้อมูลทั้งหมด
- `store()`: สร้าง product ใหม่
- `show($id)`: ดึงข้อมูล product ตาม ID
- `update(Request $request, $id)`: อัปเดตข้อมูล product ตาม ID
- `destroy($id)`: ลบ product ตาม ID

function ทั้งหมดนี้ ไม่ตอง implement เอง เพราะ laravel สร้างไว้ใหเราหมดเเล้ว เเบบ auto

### การ validate body input
```php

// เรียกใช้ method validate เพื่อทำการตรวจสอบข้อมูลจาก request ตามกฎที่กำหนด
$request->validate([
    // กำหนดให้ฟิลด์ 'code' เป็นข้อมูลที่จำเป็น (required)
    // ต้องไม่ซ้ำกัน (unique) ในตาราง 'products'
    // และมีความยาวสูงสุด 20 ตัวอักษร (max:20)
    'code' => 'required|unique:products|max:20',

    // กำหนดให้ฟิลด์ 'name' เป็นข้อมูลที่จำเป็น (required)
    // ต้องไม่ซ้ำกัน (unique) ในตาราง 'products'
    // และมีความยาวสูงสุด 255 ตัวอักษร (max:255)
    'name' => 'required|unique:products|max:255',

    // กำหนดให้ฟิลด์ 'introductiondate' เป็นข้อมูลประเภทวันที่ (date)
    'introductiondate' => 'date',

    // กำหนดให้ฟิลด์ 'salesdiscontinuationdate' เป็นข้อมูลประเภทวันที่ (date)
    // และสามารถเว้นว่างได้ (nullable)
    'salesdiscontinuationdate' => 'date|nullable',

    // กำหนดให้ฟิลด์ 'comment' เป็นข้อมูลประเภทข้อความ (string)
    // สามารถเว้นว่างได้ (nullable) และมีความยาวสูงสุด 255 ตัวอักษร (max:255)
    'comment' => 'string|nullable|max:255',

    // กำหนดให้ฟิลด์ 'producttype' เป็นข้อมูลประเภทข้อความ (string)
    // สามารถเว้นว่างได้ (nullable) และมีความยาวสูงสุด 20 ตัวอักษร (max:20)
    'producttype' => 'string|nullable|max:20',
]);

// เวอร์ชันที่ใช้ในการอัปเดต ซึ่งแตกต่างจากเวอร์ชันแรกตรงที่:
// การตรวจสอบ unique จะยกเว้นค่าสำหรับรายการที่มี ID ตรงกับ $id (เพื่อไม่ให้มีปัญหาซ้ำกับตัวเองในระหว่างอัปเดต)
$request->validate([
    // กำหนดให้ฟิลด์ 'code' เป็นข้อมูลที่จำเป็น (required)
    // มีความยาวสูงสุด 20 ตัวอักษร (max:20)
    // ต้องไม่ซ้ำกันในตาราง 'products' ยกเว้นรายการที่มี id ตรงกับตัวแปร $id
    'code' => 'required|max:20|unique:products,code,' . $id,

    // กำหนดให้ฟิลด์ 'name' เป็นข้อมูลที่จำเป็น (required)
    // มีความยาวสูงสุด 255 ตัวอักษร (max:255)
    // ต้องไม่ซ้ำกันในตาราง 'products' ยกเว้นรายการที่มี id ตรงกับตัวแปร $id
    'name' => 'required|max:255|unique:products,name,' . $id,

    // กำหนดให้ฟิลด์ 'introductiondate' เป็นข้อมูลประเภทวันที่ (date)
    'introductiondate' => 'date',

    // กำหนดให้ฟิลด์ 'salesdiscontinuationdate' เป็นข้อมูลประเภทวันที่ (date)
    // และสามารถเว้นว่างได้ (nullable)
    'salesdiscontinuationdate' => 'date|nullable',

    // กำหนดให้ฟิลด์ 'comment' เป็นข้อมูลประเภทข้อความ (string)
    // สามารถเว้นว่างได้ (nullable) และมีความยาวสูงสุด 255 ตัวอักษร (max:255)
    'comment' => 'string|nullable|max:255',

    // กำหนดให้ฟิลด์ 'producttype' เป็นข้อมูลประเภทข้อความ (string)
    // สามารถเว้นว่างได้ (nullable) และมีความยาวสูงสุด 20 ตัวอักษร (max:20)
    'producttype' => 'string|nullable|max:20',
]);

```

json body จะต้องถูกตรวจสอบตั้งเเต่ชั้น controller ไปเลย ไม่ต้องไปให้ถึงมือ database ถ้ามีอะไรที่ผิด มันจะฟ้อง error ตั้งเเต่ขั้นนี้เลย


### 3. `app/Models/ProductModel.php`
```bash
php artisan make:model ProductModel
```
เพื่อสร้าง model ของ product โดยที่ model ไม่ต้องมีการเขียน native query อะไรทั้งสิ้น เราเพียงเเค่กำหนด schema เกี่ยวกับ table ใน database

```php
// use HasFactory เอาไว้สร้าง dummy data
    use HasFactory;

    // อ้างถึง table ที่ต้องการ
    protected $table = 'products';

    // อ้างถึง primarykey ใน table นั้นๆ
    protected $primaryKey = 'id';

    // อ้างถึง column ที่ต้องการ
    protected $fillable = [
        'code',
        'name',
        'introductiondate',
        'salesdiscontinuationdate',
        'comment',
        'producttype',
    ];
    
    // เอาไว้เผื่ออ้างถึง column ที่เก็บ timestamp
    // public const CREATED_AT = 'created_timestamp';
    // public const UPDATED_AT = 'updated_timestamp';
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
```

จาก code ก็คือการ ใส่รายละเอียดต่างๆ ของ database table นั้นๆ ลงไปในตัวเเปรที่ laravel framework เขาได้จัดทำไว้ให้เราเเล้ว 

- $table คือชื่อตารางใน database
- $fillable คือ column ที่เก็บข้อมูลในตาราง
- $primaryKey คือ primarykey ในตาราง
- $timestamps คือ column ที่เก็บ timestamp ในตาราง

# ทดสอบ API
   - ใช้เครื่องมืออย่าง [Postman](https://www.postman.com/) หรือ [Insomnia](https://insomnia.rest/) เพื่อทดสอบ API แต่ละฟังก์ชัน
   - ตัวอย่างการทดสอบ:
     - **GET** `http://your-app-url/api/products` - ดึงข้อมูล product ทั้งหมด
     - **POST** `http://your-app-url/api/products` - สร้าง product ใหม่ พร้อมข้อมูลใน JSON body
     - **GET** `http://your-app-url/api/products/{id}` - ดึงข้อมูล product ตาม ID
     - **PUT** `http://your-app-url/api/products/{id}` - อัปเดตข้อมูล product ตาม ID
     - **DELETE** `http://your-app-url/api/products/{id}` - ลบ product ตาม ID

# อนาคตอาจจะมีการทำ authentication เพื่อกันคนนอกไม่ให้ใช้ API
   - หากต้องการป้องกันไม่ให้ทุกคนเข้าถึง API ควรใช้ Middleware เช่น `auth:sanctum` สำหรับการป้องกันการเข้าถึง API

# ทำเสร็จ ต้องมีการ validate ในกรณีที่ req เเย่

ทำตามเอกสาร [./api_error_handle.md](./api_error_handle.md) ใน file นี้จะสอนวิธีการ

ทำให้ เวลา req เเย่

จากเดิม จะ redirect กลับไปหน้า default page ของ laravel

จะตอบเป็น erorr ประมานนี้เเทน 

```json
{
    "error": "Validation failed",
    "messages": {
        "fromdate": [
            "The fromdate field is required."
        ],
        "quantityuse": [
            "The quantityuse field is required."
        ],
        "parentproductid": [
            "The parentproductid field is required."
        ],
        "componentproductid": [
            "The componentproductid field is required."
        ]
    }
}
```