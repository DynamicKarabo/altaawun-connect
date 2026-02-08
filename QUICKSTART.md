# Quick Start Guide - Altaawun-Impact Connect

## 🚀 Get Started in 3 Steps

### Step 1: Set Up Supabase (5 minutes)

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Click "New Project" and fill in:
   - **Project Name**: altaawun-connect
   - **Database Password**: (create a strong password)
   - **Region**: (choose closest to you)
3. Wait for project to initialize (~2 minutes)
4. Once ready, go to **Project Settings** → **API**
5. Copy your:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 2: Configure Environment

1. In your project folder, copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open `supabase/schema.sql` from your project
4. Copy the entire SQL content
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. You should see "Success. No rows returned" ✅

## ✨ Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## 🎯 What You'll See

- **Dashboard**: Animated global impact metrics
- **Featured Projects**: 6 sample projects with images
- **Click any project**: View details and donation form
- **Submit a donation**: Test the full donation flow

## 🧪 Test the Donation Feature

1. Click on any project card
2. Click "Donate Now" button
3. Select an amount or enter custom
4. Enter your name
5. Click "Donate $XX"
6. Check Supabase dashboard → **Table Editor** → **donations** to see your test donation!

## 📱 Test Responsive Design

- Resize browser window
- Open DevTools (F12) → Toggle device toolbar
- Test on mobile, tablet, and desktop views

## 🎨 Customization Ideas

- Update project images in `supabase/schema.sql`
- Modify color scheme in `tailwind.config.js`
- Add more sample projects via Supabase dashboard
- Customize hero text in `src/components/Dashboard.tsx`

## 🐛 Troubleshooting

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Supabase connection issues?**
- Check `.env.local` has correct URL and key
- Verify no extra spaces in environment variables
- Restart dev server after changing `.env.local`

**No projects showing?**
- Verify SQL schema ran successfully in Supabase
- Check browser console for errors (F12)
- Ensure Supabase project is not paused (free tier auto-pauses after inactivity)

## 📚 Next Steps

- Deploy to Vercel/Netlify
- Add authentication for campaign creators
- Implement payment gateway integration
- Add email notifications for donations
- Create admin dashboard for project management

---

**Need Help?** Check the full [README.md](file:///home/karabooliphant/Projects/altaawun-connect/README.md) or [walkthrough.md](file:///home/karabooliphant/.gemini/antigravity/brain/68d40ae0-d550-4a9f-b726-60593547bb89/walkthrough.md) for detailed documentation.
