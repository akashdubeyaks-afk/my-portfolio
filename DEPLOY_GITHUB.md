# 🚀 GitHub Pe Host Kaise Kare - 2 Minute Mein

## Option 1: Automatic (Main sab ready kar chuka hu)

Tumhara repo already git commit ho chuka hai. Bas ye karo:

### Step 1: GitHub pe naya repo banao
Jaao → https://github.com/new
- Repo name: `my-portfolio` (ya jo chahiye)
- Public rakho
- **README, .gitignore kuch mat add karo** - empty repo chahiye
- Create Repository pe click karo

### Step 2: Push karo (Terminal me)

Maine ye commands tumhare `portfolio` folder ke liye ready kiye hain:

```bash
cd /home/user/portfolio

# GitHub repo ko remote banao - USERNAME ko apne username se replace karo
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git

# Branch ko main karo
git branch -M main

# Sab push karo
git push -u origin main
```

### Step 3: GitHub Pages Enable Hoga Automatically! 🎉

Maine `.github/workflows/deploy.yml` already bana diya hai.

Jaise hi tum push karoge:
1. GitHub Actions automatically build karega
2. 1-2 minute me site live ho jayegi
3. Link hoga:

**https://YOUR_USERNAME.github.io/my-portfolio/**

---

## Option 2: Manual gh-pages (Quick)

```bash
cd /home/user/portfolio
npm run deploy:build
```

Ye direct `gh-pages` branch pe dist folder push karega.

Fir GitHub pe:
- Repo Settings → Pages
- Source: Deploy from branch → gh-pages / root
- Save

Link same: https://YOUR_USERNAME.github.io/my-portfolio/

---

## 🔗 Tumhara Final Link Kaise Banega?

Agar username = `rahuldev` aur repo = `my-portfolio` to:

```
https://rahuldev.github.io/my-portfolio/
```

Bas `rahuldev` ko apne actual GitHub username se replace kar do!

---

## 📦 Current Status

✅ Git repo initialized
✅ 2 commits done
✅ GitHub Actions workflow ready (.github/workflows/deploy.yml)
✅ vite.config.js base set for Pages
✅ dist folder built (ready to deploy)
✅ gh-pages package installed

Abhi tumhe bas `git remote add` + `git push` karna hai!

---

## Help Chahiye?

Agar GitHub username batao to main exact commands aur final live link generate karke de dunga:

Example:
```
git remote add origin https://github.com/nashikdev/my-portfolio.git
Live Link: https://nashikdev.github.io/my-portfolio/
```
