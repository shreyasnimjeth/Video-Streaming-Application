
<p align="left">
  <img src="" alt="Video Streaming App Banner" width="400px" height= "100px" />
</p>

# 🎥 Video Streaming Application (Spring Boot + React + MySQL)

This is a full-stack video streaming platform where users upload videos, and the backend automatically converts them into **HTTP Live Streaming (HLS)** format using **FFmpeg**.  
The video is split into multiple small **`.ts` segments** and a **`.m3u8` playlist**, and these segments are streamed to the browser in chunks for **faster start time, smoother playback, and better performance on different network speeds**.

---

## ✨ Key Features

- 📤 Upload videos with title & description from a modern React UI  
- 🧩 Converts uploaded videos into **HLS segments (`.ts`) + playlist (`.m3u8`)** using FFmpeg  
- 📡 Streams videos in **segments/chunks** using HLS + HTTP Range requests  
- 🎬 Plays videos in the browser using **Video.js + HLS.js**  
- 💾 Stores video metadata (title, description, content type, file path) in **MySQL**  
- 🗄 Keeps both the **original uploaded file** and the **processed HLS output** on disk  

---

## 🛠 Tech Stack & Technologies Used

| Layer        | Technologies                                                                 |
|-------------|-------------------------------------------------------------------------------|
| **Frontend**| React, Vite, Video.js, HLS.js, Axios, Tailwind CSS, Flowbite React           |
| **Backend** | Spring Boot (Web, JPA), Java 21                                              |
| **Database**| MySQL                                                                         |
| **Streaming**| FFmpeg (for HLS conversion), HLS (HTTP Live Streaming)                      |
| **Others**  | Multipart file upload, HTTP Range requests, Maven                            |

- **FFmpeg**: A powerful command-line tool used here to convert normal video files into **HLS format** (creates `.m3u8` + `.ts` segments).  
- **HLS (HTTP Live Streaming)**: A streaming protocol that splits videos into many **small segments**, allowing the browser to load them piece by piece instead of downloading the whole file at once.

---

## 🏗️ How the Application Works (Short Flow)

1. User uploads a video file with title & description from the React frontend.  
2. Spring Boot backend receives the file, stores it on disk and saves metadata in MySQL.  
3. Backend triggers **FFmpeg** to process the file into HLS (`master.m3u8` + segment_000.ts, segment_001.ts, …).  
4. The frontend uses **Video.js + HLS.js** to request the `.m3u8` playlist and then streams the `.ts` segments in order.  
5. The video is **played in chunks/segments**, giving smooth streaming and better handling of slow networks.

---

## 📥 Download & Open the Project

```bash
git clone https://github.com/shreyasnimjeth/Video-Streaming-Application.git
cd Video-Streaming-Application
```

You should have something like:

```text
Video-Streaming-Application/
├── backend/
└── frontend/
```

---

## ▶️ Backend Setup (Spring Boot + MySQL + FFmpeg)

### ✅ Prerequisites

- Java **21**
- Maven
- MySQL installed and running
- FFmpeg installed and added to the system **PATH**

### ⚙️ Configure Database

Open: `backend/src/main/resources/application.properties` and set:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> You can change DB name, username, and password as per your local setup.

### ▶️ Run Backend

From the project root:

```bash
cd backend
mvn spring-boot:run
```

The backend will start on:  
👉 `http://localhost:8080`

---

## 💻 Frontend Setup (React + Vite)

From the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on (by default):  
👉 `http://localhost:5173`

Make sure the backend (`http://localhost:8080`) is also running, since the frontend calls APIs like:

- `POST http://localhost:8080/api/v1/videos` – for upload  
- `GET  http://localhost:8080/api/v1/videos/{videoId}/master.m3u8` – for playback  

---

## 📡 Core REST APIs (Backend)

### Upload Video

```http
POST /api/v1/videos
Content-Type: multipart/form-data

Form Data:
- file: <video file>
- title: <string>
- description: <string>
```

### Other Important Endpoints

| Method | Endpoint                                      | Description                          |
|--------|-----------------------------------------------|--------------------------------------|
| GET    | `/api/v1/videos`                              | Get all uploaded videos              |
| GET    | `/api/v1/videos/stream/{videoId}`             | Stream full video file               |
| GET    | `/api/v1/videos/stream/range/{videoId}`       | Stream video in chunks via Range     |
| GET    | `/api/v1/videos/{videoId}/master.m3u8`        | Get HLS playlist for given video     |
| GET    | `/api/v1/videos/{videoId}/{segment}.ts`       | Get specific HLS segment for video   |

---

## 💡 Why HLS & Segmented Streaming?

- ✅ Only small chunks of the video are loaded at a time  
- ✅ Faster initial playback (no need to download full file)  
- ✅ Better experience on slow or unstable networks  
- ✅ Works well with modern HTML5 video players like **Video.js + HLS.js**

---

## 👨‍💻 Developer

**Shreyas Nimje**  

🔗 Repository: https://github.com/shreyasnimjeth/Video-Streaming-Application

---

