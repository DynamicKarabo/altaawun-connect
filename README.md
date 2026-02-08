# Altaawun-Impact Connect 🌍

A high-fidelity MVP for a non-profit fundraising platform connecting donors with impactful projects in villages and slums worldwide.

## ⚡ Quick Start (No Setup Required!)

```bash
# Install dependencies
npm install

# Start the app
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) - **That's it!** 🎉

The app works immediately with **mock data** - no database setup needed for the MVP.

## ✨ Features

- 🌟 **Live Global Impact Dashboard** - Animated metrics (12+ countries, 524+ projects, 1342+ villages)
- 📊 **Featured Projects** - Beautiful cards with progress tracking
- 💰 **Donation System** - Interactive forms with preset/custom amounts
- 🔄 **Recurring Donations** - Monthly contribution support
- 🎨 **Premium UI/UX** - Gradients, glassmorphism, smooth animations
- 📱 **Fully Responsive** - Mobile-first design

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- Lucide Icons
- Mock Data (Supabase-ready)

## 🎯 Try It Out

1. **Browse Projects** - View 6 sample projects with real-looking data
2. **Click Any Project** - See detailed view with donation form
3. **Make a Test Donation** - Enter name, select amount, submit
4. **See It Update** - Donation appears in "Recent Supporters" list

## 🔧 Optional: Connect to Supabase

Want to use a real database? Easy!

1. Set `USE_SUPABASE = true` in:
   - `src/hooks/useProjects.ts`
   - `src/hooks/useGlobalMetrics.ts`
   - `src/components/ProjectDetail.tsx`
   - `src/components/DonationForm.tsx`

2. Follow [QUICKSTART.md](QUICKSTART.md) for Supabase setup

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` folder - ready to deploy to Vercel, Netlify, etc.

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Supabase setup guide
- **[walkthrough.md](.gemini/antigravity/brain/.../walkthrough.md)** - Full implementation details

## 🎨 What Makes This Special

- **Zero Setup MVP** - Works out of the box
- **Production-Ready Code** - TypeScript, proper architecture
- **Beautiful Design** - Modern, premium aesthetics
- **Real Functionality** - Donations persist in memory during session
- **Easy Database Migration** - Just flip a flag to use Supabase

---

**Built with ❤️ for social impact**
