### /frontend/package.json

```json
  "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

จากเดิม react run ใน container มันเอง พอมี ``--host`` เข้ามา react จะ run บน host 0.0.0.0 เเทน ซึ่งหมายความว่า มันจะ run ใน localnetwork 

ซึ่ง localnetwork ในที่นี้ ก็คือ docker compose นั้นเอง

### /nginx/nginx.conf

```nginx
    # Frontend (React)
    server {
        listen 5173;
        server_name localhost;

        location / {
            proxy_pass http://frontend:5173; 
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
```

listen 5173 คือ port ที่ nginx จะรับฟัง http

server_name localhost คือ ชื่อ server ที่ nginx จะรัน (localhost ใน container มันเอง)

proxy_pass คือ เมื่อมี request เข้ามา port 5173 จะ proxy ไปยัง port 5173 ใน container frontend 

ต้องส่งไปที่ host fronend เพราะว่า ใน docker compose มันจะมีการทำ domain name server โดยอัตโนมัติ ทำให้ container frontend ได้รับ domain name จาก domain name server ชื่อว่า ``frontend``

### สรุปหลักการ
1. react run ใน container มันเอง
2. --host ที่ script เพื่อ run บน local network (docker compose)
3. nginx config ให้ forward จาก http://frontend:5173 ไปยัง hostmachine ที่ run docker port 5173

