# 🔑 GitHub Token Kaise Banaye - 1 Minute

### Fast Method (Classic Token - Easy):

1. **Is link pe jao:**
   https://github.com/settings/tokens/new

2. **Form bharo:**
   - Note: `my-portfolio deploy`
   - Expiration: `7 days` (ya 1 day)
   - ✅ Tick karo: `repo` (poora repo wala checkbox)
   
3. **Generate token** pe click karo
4. **Token copy karo** - ye `ghp_xxxxxxxxxxxx` jaisa dikhega
   - ⚠️ Ye ek baar hi dikhega, isliye copy karke rakho

### Fine-Grained (More Secure):

1. Link: https://github.com/settings/personal-access-tokens/new
2. Repository access: `Only select repositories` → `akashdubeyaks-afk/my-portfolio` select karo
3. Permissions:
   - Repository permissions → `Contents`: Read and Write
   - `Metadata`: Read
   - `Pages`: Write (agar dikhe)
4. Generate

---

### Token Milne Ke Baad:

Mujhe token bhej do, main aise push karunga:

```bash
git remote set-url origin https://TOKEN@github.com/akashdubeyaks-afk/my-portfolio.git
git push -u origin main
```

Push ke baad tum **Settings → Personal Access Tokens** me jaake token ko **Delete / Revoke** kar dena - security ke liye!

### Token Paste Karne Ka Safe Tareeka:

Yahan chat me paste kar do, main use karke turant delete kar dunga system se. Ya agar dar lag raha hai to:

- Token ko base64 me daal ke bhejo (optional)
- Ya last 4 characters hide karke bhejo, main guide kar dunga kaise push karna hai

> Note: Token kabhi public repo me ya screenshot me share mat karna!
