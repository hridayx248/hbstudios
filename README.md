# HB Studios UK - Modern React Website

This is a modern, high-performance website built with **React**, **Vite**, and **Tailwind CSS**, featuring premium interactive components from **ReactBits**.

## 🚀 How to Host on Cloudflare Pages (Recommended)

Cloudflare Pages is the best way to host this project. It's fast, secure, and free for this type of project.

### Step 1: Push to GitHub
1. Initialize a Git repository in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect your local folder to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hbstudios.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. **Build settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

---

## 🛠 Local Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## 📁 Project Highlights
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + ReactBits
- **Components**: Located in `src/components/ReactBits/`
