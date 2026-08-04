# GitHub Pages Deployment & Custom Domain Guide

To deploy this website to **GitHub Pages** and later connect a custom domain, we need to address one important detail about your current codebase and then follow the deployment steps.

> [!WARNING]
> **Important Note about your Codebase**
> GitHub Pages is designed to host **Static Sites** (only HTML, CSS, JavaScript, and images). 
> 
> Currently, your project has a **Node.js Express Backend** (`server.ts`) which handles the Contact Form and Job Application submissions (`/api/inquiry` and `/api/job-application`), saving them locally to `data/` and forwarding them to Google Sheets. 
> 
> **If we deploy to GitHub Pages as-is, the forms will stop working** because GitHub Pages cannot run Node.js servers.

### Your Options:

1. **Modify for GitHub Pages (Recommended for Free Hosting):** I can modify your React code (`ContactSection.tsx` and `CareersPage.tsx`) to send the form data *directly* to your Google Sheets Apps Script Webhook. This completely removes the need for the Node.js server, making your site 100% static and perfectly compatible with GitHub Pages.
2. **Use a Node.js Host instead (e.g., Render.com):** If you want to keep the Node.js backend to save local JSON files, you should deploy to a platform like Render or Railway instead of GitHub Pages.

---

## Step-by-Step GitHub Pages Deployment 
*(Assuming we go with Option 1 and make the site fully static)*

### Step 1: Install the `gh-pages` package
Open your terminal in the project folder and run:
```bash
npm install gh-pages --save-dev
```

### Step 2: Update `package.json` Scripts
Add the following two scripts to your `package.json` inside the `"scripts"` section:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### Step 3: Initialize Git and Push to GitHub (If you haven't already)
Create a new empty repository on GitHub, then run these commands in your project terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```
*(Replace the URL with your actual GitHub repo URL)*

### Step 4: Deploy the Site
Run the deploy command:
```bash
npm run deploy
```
This will automatically build your Vite app and push the `dist/` folder to a special `gh-pages` branch on GitHub. 

### Step 5: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. On the left sidebar, click **Pages**.
4. Under "Build and deployment", ensure the **Source** is set to `Deploy from a branch`.
5. Under **Branch**, select the `gh-pages` branch and `/ (root)` folder, then click **Save**.

Within a minute or two, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

---

## How to Connect Your Custom Domain Later

Once the site is successfully running on the `.github.io` link, you can connect your custom domain (e.g., `www.yourdomain.com`).

### 1. Configure GitHub Pages
1. Go to your repository **Settings > Pages**.
2. Scroll down to the **Custom domain** field.
3. Enter your custom domain (e.g., `www.yourdomain.com`) and click **Save**.
4. GitHub will automatically check the DNS and eventually issue an SSL certificate (this can take up to 24 hours).

### 2. Configure your DNS Provider (GoDaddy, Namecheap, Route53, etc.)
Log into the platform where you purchased your domain and go to the DNS/Nameserver settings.

**Add the following records:**

| Type | Name / Host | Value / Target |
| :--- | :--- | :--- |
| **CNAME** | `www` | `YOUR_USERNAME.github.io` |
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

*(Note: The four 'A' records point the root domain to GitHub's servers, while the 'CNAME' handles the 'www' subdomain).*

---

### How would you like to proceed?
Would you like me to go ahead and **refactor your React components (Option 1)** so the forms submit directly to Google Sheets, making the app fully ready for GitHub Pages?
