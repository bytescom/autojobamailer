# Autojobmailer 🚀 `v3.3.0`

> **AI-Powered Job Application Tool, Cold Email Generator & Outreach Automation Platform**

Autojobmailer streamlines the entire job hunting and outreach process. Connect your Gmail account, curate target recruiter leads, craft highly personalized email sequences with dynamic variables, automate smart follow-ups, and track your job application pipeline from first touchpoint to offer letter.

---

## ✨ Key Features

### 📨 Cold Email Outreach & Campaign Builder
* **Multi-Step Campaign Builder**: Set up targeted campaigns with customized sender addresses, email templates, and attachments (PDF/DOCX).
* **Dynamic Variable Personalization**: Inject candidate and lead tokens like `{{name}}`, `{{company}}`, `{{job_role}}`, `{{location}}`, and `{{industry}}`.
* **Lead Segmentation & Filtering**: Filter contacts by role, tags, and previous contact status before launching.
* **Batch Sending Engine**: Resilient email dispatcher with rate-limiting, progress tracking, and batch retry logic via Gmail API.
* **Open & Reply Tracking**: Track recipient engagement and automatically halt campaigns upon reply.

### 🔄 Intelligent Follow-Up Automation
* **Sequence Timeline**: Build linear follow-up cadences with visual drag-and-drop step reordering.
* **Smart Sending**: Restrict deliveries to business hours (9 AM – 6 PM) and automatically adapt to recipient timezones.
* **Automated Stop Rules**: Terminate sequences immediately on response, calendar meeting booking, or email bounce.
* **AI Optimizer**: Data-driven recommendations to adjust wait times and improve reply rates.

### 👥 Recruiter & HR Lead CRM
* **Lead Directory**: Organize recruiter contacts with company, HR name, job role, and custom tags.
* **Quick Add & Bulk Import**: Add contacts individually via modal or import batches seamlessly.
* **Status Tracking**: Keep tabs on lead engagement (`contacted`, `pending`, `replied`).

### 📊 Application Tracker & Analytics
* **Visual Kanban Pipeline**: Track applications across stages: *Applied*, *Screening*, *Interviewing*, *Offered*, and *Rejected*.
* **Dashboard Overview**: Real-time analytics on campaigns sent, open rates, reply rates, and recent activity logs.
* **Notification Center**: In-app notifications for campaign deliveries and application status updates.

### 🌐 High-Performance Marketing & Landing Page
* **Interactive 3D Visuals**: Built with Three.js and `@react-three/fiber`.
* **Responsive Marketing Sections**: Feature showcases, interactive workflow guides, and FAQs.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Route Handlers) |
| **Frontend** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css` |
| **3D & Graphics** | [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei` |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/), `react-redux` |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/), [Mongoose 9](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (Google OAuth + Credentials / JWT) |
| **Email Integration**| [Google APIs (Gmail API)](https://developers.google.com/gmail/api) |
| **Icons & Feedback** | `react-icons`, `react-hot-toast` |

---

## 📁 Project Structure

```
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login & Signup routes
│   │   ├── login/
│   │   └── signup/
│   ├── (marketing)/            # Public pages (contact, privacy, terms)
│   ├── api/                    # Backend API routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── leads/              # Lead CRUD & bulk upload
│   │   ├── outreach/           # Campaigns, templates, and batch sending
│   │   ├── tracking/           # Application pipeline tracking
│   │   └── user/               # Profile, stats, and Gmail integration
│   ├── dashboard/              # Protected dashboard pages
│   │   ├── follow-up/          # Follow-up automation sequence builder
│   │   ├── leads/              # Contact & recruiter CRM
│   │   ├── outreach/           # Campaigns and template management
│   │   ├── settings/           # User & workspace configuration
│   │   └── tracking/           # Job application pipeline
│   ├── globals.css             # Tailwind CSS & theme tokens
│   ├── layout.js               # Root HTML layout & font definitions
│   └── page.js                 # Marketing landing page
├── components/                 # Global shared components
│   └── layout/                 # App Sidebar & NotificationPanel
├── features/                   # Domain-driven modular architecture
│   ├── auth/                   # Login & Signup presentation components
│   ├── followup/               # Sequence logic & automation panels
│   ├── home/                   # Dashboard analytics & metrics
│   ├── landing/                # Landing page sections & 3D canvas
│   ├── leads/                  # Lead table, search, and import modals
│   ├── marketing/              # Legal & contact forms
│   ├── outreach/               # Outreach page & modular components
│   │   ├── components/         # Extracted reusable widgets & modals
│   │   └── OutreachPage.jsx    # Primary outreach view
│   ├── settings/               # Profile & integration forms
│   └── tracking/               # Application tracker board & modals
├── lib/                        # Shared utility libraries (MongoDB, auth, helpers)
├── models/                     # Mongoose schemas (User, Campaign, Application, Lead, etc.)
└── public/                     # Static assets, logos, and icons
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.18.0 or newer recommended)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
* [MongoDB](https://www.mongodb.com/) (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* Google Cloud Console account (for Gmail API & Google OAuth)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/autojobmailer.git
cd autojobmailer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` (or `.env.local`) file in the root directory and supply the following variables:

```env
# ── Database ────────────────────────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/autojobmailer?retryWrites=true&w=majority

# ── Authentication & Security ──────────────────────────────────────────────
JWT_SECRET_KEY=your-super-secret-jwt-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# ── Google OAuth & Gmail API ────────────────────────────────────────────────
# Requires scopes: 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.email'
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ── Optional Storage ────────────────────────────────────────────────────────
BLOB_READ_WRITE_TOKEN=your-blob-storage-token
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on `localhost:3000` |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code issues |

---

## 📡 Core API Reference

### Outreach & Campaigns
* `GET /api/outreach/campaigns` — Fetch all user campaigns
* `POST /api/outreach/campaigns` — Create a new campaign (draft or active)
* `PATCH /api/outreach/campaigns/[id]` — Update campaign details and settings
* `DELETE /api/outreach/campaigns/[id]` — Delete a campaign
* `POST /api/outreach/campaigns/[id]/send` — Trigger or resume batch email dispatching via Gmail API

### Templates
* `GET /api/outreach/templates` — List email templates
* `POST /api/outreach/templates` — Save a reusable template with variables
* `PATCH /api/outreach/templates/[id]` — Update template content/subject
* `DELETE /api/outreach/templates/[id]` — Delete a template

### Leads & Contacts
* `GET /api/leads` — Query recruiter contacts (supports filters and search)
* `POST /api/leads` — Create a single lead
* `POST /api/leads/bulk` — Upload multiple leads simultaneously
* `DELETE /api/leads/[id]` — Remove lead

### Application Tracker
* `GET /api/tracking/applications` — Get job applications across all stages
* `POST /api/tracking/applications` — Log a new application
* `PATCH /api/tracking/applications/[id]` — Move application stage or update notes
* `DELETE /api/tracking/applications/[id]` — Remove an application record

---

## 🔒 Security & Privacy

* Credentials and tokens are securely managed via environment variables and JWT encryption.
* Gmail API permissions follow the principle of least privilege, requiring explicit user authorization for sending cold outreach on their behalf.
* Attachments are checked against client and server size thresholds to prevent buffer overruns.

---

## 📄 License

This project is proprietary and private. All rights reserved.
