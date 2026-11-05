# 🪔 DiwaliGlow – Transform Your Home This Diwali

> **Tagline:** *"Bring the Magic of Diwali Into Your Home."*

**DiwaliGlow** is a premium, modern, visually stunning and interactive full-stack web platform that allows users to upload photographs of their rooms and digitally decorate them with authentic Indian festive elements, AI-assisted interior inspiration, and high-definition before-and-after comparisons.

Built with luxurious Indian festive aesthetics, modern SaaS dashboard architecture, real-time canvas manipulation, and ambient animations.

---

## 🌟 Key Features

### 1. 🪔 Cinematic Diwali Atmosphere & Dynamic Themes
* **Revamped Royal Theme System:**
  * **Royal Velvet Crimson & 24K Gold (Default):** Deep imperial velvet crimson (`#120516`, `#1f0724`), radiant 24K gold (`#FFD700`, `#FFB800`), and ruby festive glows (`#FF1E56`).
  * **Celestial Midnight & Starlight:** Deep sapphire midnight (`#080c1b`) with starlight gold.
  * **Auspicious Emerald & Sandalwood:** Royal emerald jade (`#051610`) with sandalwood amber.
  * Real-time theme switcher on the navigation bar.
* **Diwali Sparkler Cursor Animation:**
  * Emits a trailing cascade of golden, ruby, and saffron sparkling embers as the cursor moves across the screen.
  * Mini firecracker spark burst explodes on mouse click with realistic gunpowder crackles.
  * Custom glowing Diya flame cursor pointer with hover scaling on buttons and links.
* **Diwali Firecrackers Audio Synthesizer:**
  * **100% Procedural & Offline:** Built using the Web Audio API without relying on flaky external audio assets.
  * **Authentic Sound Effects:** Sky Rocket whistle & aerial explosion, 10,000-shot Ladi string (rapid Indian firecracker chain), Handheld Phuljhadi sparkler crackle, Anar fountain whoosh, and classic Patakha bombs.
  * **Interactive Crackers Dock & Navbar Toggle:** Instant sound mute/unmute control and floating interactive cracker launcher.
* **Cinematic Loading Screen:** Glowing diya appearing in the center with a flickering flame, gradual logo reveal, and smooth transition.
* **Ambient Canvas Particles:** Floating golden & ruby embers, shimmering stars, and ambient gradient glows running at 60fps.

### 2. 🎨 Interactive Decoration Studio (Canvas Editor)
* **Real-time Fabric.js Canvas:** Uploaded room photographs scaled proportionally as background canvas.
* **50+ Authentic Festive Elements:**
  * **Diyas:** Handcrafted clay diyas, royal tall brass samai lamps, floating urli bowls with lit wicks.
  * **Fairy Lights:** Warm LED curtain strings, scalloped draping lights, warm ambient bulbs.
  * **Rangolis:** Auspicious sacred mandala rangolis, floral roundels in saffron and crimson.
  * **Flowers:** Vibrant marigold garlands, hanging bells, draped flower swags.
  * **Torans:** Traditional doorway fresh mango leaf torans, royal Rajasthani gold torans.
  * **Lanterns:** Traditional Diwali Akash Kandils, filigree brass hanging Moroccan lanterns.
  * **Candles:** Pillar candle trios, mercury glass votives, floating tea lights.
  * **Pooja Decor:** Auspicious decorated brass puja thalis with kumkum, haldi, and diya.
* **Full Object Manipulation:**
  * Drag, scale, rotate, duplicate, delete.
  * Luminosity & opacity sliders.
  * Horizontal and vertical mirroring (Flip X / Flip Y).
  * Layer stacking (Bring Forward, Send Backward, Bring to Front, Send to Back).
* **Studio Toolbar:**
  * Unlimited Undo / Redo history stack (`Ctrl+Z` / `Ctrl+Y`).
  * Canvas Zoom In / Zoom Out / Reset (`50% - 250%`).
  * Reset decorations with confirmation.
  * High-Definition 2x JPEG export.
  * Direct cloud save to MongoDB.

### 3. 🖼️ Draggable Before-and-After Comparison
* Interactive split-screen slider comparing original room with the decorated festive version.
* Full-screen immersion mode.
* Instant 1-click HD download.
* Web Share API & clipboard link sharing.
* Save directly to My Designs portfolio.

### 4. 🤖 AI Festive Vision Engine
* **Clean AI Service Abstraction (`aiTransformationService.js`):**
  * Ready for external Generative Image APIs: Stability AI (SDXL / SD3), OpenAI (DALL-E 3 / Edits), Replicate, or Gemini Vision.
  * Transparent provider status check (`/api/ai/status`).
  * Intelligent theme synthesis preview mode if external API keys are not set, with clear diagnostic banners.
  * Atmospheric prompts with adjustable festive intensity (`20% - 100%`).
  * Animated generation screen with flickering diya and festive loading messages.

### 5. 🏛️ Curated Themes & Instant Sample Rooms
* **5 Distinct Themes:**
  1. *Traditional Diwali* (Clay diyas, marigold flowers, sacred rangoli, mango leaf toran)
  2. *Royal Diwali* (Tall brass samai lamps, filigree hanging lanterns, golden velvet accents)
  3. *Modern Minimalist* (Curtain LED fairy lights, architectural minimalism, floating tea lights)
  4. *Eco-Friendly Diwali* (Natural terracotta clay, fresh organic floral swags, zero plastic)
  5. *Luxury Celebration* (Cascading multi-tier light displays, floating rose petal urlis, grand kandils)
* **6 Preloaded Architectural Sample Rooms:** Living Room, Pooja Room, Balcony, Main Entrance Foyer, Master Bedroom, Courtyard & Veranda.

### 6. 🔐 Authentication & Personalized Dashboard
* Secure JWT Authentication with bcrypt password hashing.
* User registration, login, and token verification.
* Guest Mode: Users can decorate immediately without forced registration roadblocks.
* Personalized Dashboard with design statistics, recently edited projects gallery, resume edit, delete, and comparison.

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React.js 18, Vite
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Typography:** Playfair Display (Headings), Poppins (Body)
* **Animations:** Framer Motion, Motion, HTML5 Canvas
* **Canvas Engine:** Fabric.js 5.3.0
* **Icons:** Lucide React
* **Routing:** React Router DOM (v7)
* **Notifications & FX:** React Hot Toast, Canvas Confetti

### Backend
* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js 4.x
* **Database:** MongoDB & Mongoose 8.x
* **Authentication:** JSON Web Tokens (JWT), BcryptJS
* **File Uploads:** Multer with file type validation & disk storage
* **AI Service Layer:** Provider abstraction with fallback diagnostic simulation

---

## 📂 Project Architecture

```
diwali-glow/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile
│   │   ├── projectController.js  # CRUD operations for designs
│   │   ├── transformationController.js # Before/after transformation logs
│   │   └── aiController.js       # AI status & transformation calls
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification middleware
│   │   └── uploadMiddleware.js   # Multer image upload & validation
│   ├── models/
│   │   ├── User.js               # User model with bcrypt hashing
│   │   ├── Project.js            # Saved project & canvas state
│   │   └── Transformation.js     # Transformation history
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── projectRoutes.js      # /api/projects
│   │   ├── transformationRoutes.js # /api/transformations
│   │   └── aiRoutes.js           # /api/ai
│   ├── services/
│   │   └── aiTransformationService.js # AI engine abstraction
│   ├── uploads/                  # Uploaded room photographs
│   ├── .env                      # Environment config
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server bootstrap
│
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── decorations/      # Authentic SVG/PNG festive elements
│   │   │   └── rooms/            # 6 Curated sample room photographs
│   │   └── diya-icon.svg         # Radiant Diya SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── CinematicLoader.jsx
│   │   │   │   ├── ParticleBackground.jsx
│   │   │   │   ├── FireworksEffect.jsx
│   │   │   │   └── DiyaFlame.jsx
│   │   │   ├── editor/
│   │   │   │   ├── CanvasStudio.jsx       # Fabric.js interactive studio
│   │   │   │   ├── DecorationSidebar.jsx  # Left catalog panel
│   │   │   │   ├── PropertyInspector.jsx  # Right properties panel
│   │   │   │   └── StudioToolbar.jsx      # Top action bar
│   │   │   ├── comparison/
│   │   │   │   └── BeforeAfterSlider.jsx  # Draggable comparison slider
│   │   │   └── auth/
│   │   │       └── AuthModal.jsx          # Glassmorphic auth modal
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProjectContext.jsx
│   │   ├── data/
│   │   │   ├── decorationItems.js         # Catalog definitions
│   │   │   ├── sampleRooms.js             # Sample rooms
│   │   │   └── themesData.js              # 5 Festive themes
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExploreThemesPage.jsx
│   │   │   ├── UploadRoomPage.jsx
│   │   │   ├── DecorationStudioPage.jsx
│   │   │   ├── AITransformationPage.jsx
│   │   │   ├── BeforeAfterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── api.js                     # REST API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Running

### Prerequisites
* **Node.js:** v18+ (tested on v22.14.0)
* **MongoDB:** Local MongoDB daemon running on port 27017, or MongoDB Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev   # Or: node server.js
```
*Backend runs on `http://localhost:5000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

### 3. Production Build
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔑 Environment Variables

### `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/diwali_glow
JWT_SECRET=diwali_glow_luxurious_festive_secret_key_2025
NODE_ENV=development

# Optional AI Providers (Leave blank for high-fidelity built-in festive preview)
STABILITY_API_KEY=
OPENAI_API_KEY=
REPLICATE_API_TOKEN=
GEMINI_API_KEY=
```

---

## 📡 REST API Documentation

### 1. Authentication
* **`POST /api/auth/register`**
  * Body: `{ "name": "Aarav Sharma", "email": "aarav@example.com", "password": "password123" }`
  * Response: `{ "success": true, "user": { ... }, "token": "..." }`
* **`POST /api/auth/login`**
  * Body: `{ "email": "aarav@example.com", "password": "password123" }`
  * Response: `{ "success": true, "user": { ... }, "token": "..." }`
* **`GET /api/auth/me`** (Requires `Bearer <token>`)
  * Returns authenticated user profile.

### 2. Projects
* **`GET /api/projects`** (Requires `Bearer <token>`)
  * Returns all saved designs for the logged-in user.
* **`POST /api/projects`** (Requires `Bearer <token>`)
  * Body: `{ "projectName": "Living Room Glow", "roomType": "Living Room", "originalImage": "...", "selectedTheme": "Traditional Diwali", "previewImage": "...", "decorationsCount": 4 }`
* **`GET /api/projects/:id`**
  * Returns specific project details.
* **`PUT /api/projects/:id`**
  * Update project canvas state and metadata.
* **`DELETE /api/projects/:id`**
  * Delete project.

### 3. Transformations
* **`POST /api/transformations`**
  * Record transformation logs (original vs decorated image, decoration array, theme).
* **`GET /api/transformations/:projectId`**
  * Retrieve transformation history.

### 4. AI Engine
* **`GET /api/ai/status`**
  * Check active provider status (`Stability AI`, `OpenAI`, `Replicate`, `Gemini`, or `simulated`).
* **`POST /api/ai/transform`**
  * Body: `{ "imagePath": "...", "theme": "Royal Diwali", "intensity": 85, "prompt": "..." }`

---

## 🎆 Cultural Note

> *"As the divine diyas illuminate our doorways and dispel all darkness, may DiwaliGlow bring light, warmth, joy, and boundless creativity to every corner of your home. Shubh Deepavali!"*
