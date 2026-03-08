
# Bloom for Her 🌸

A beautiful interactive website to celebrate International Women's Day. Users can create personalized animated bouquets with greeting cards.

## Features

- 🌸 Landing page with floating flower animations
- 🌹 Flower selection (Rose, Sakura, Sunflower, Tulip)
- 💐 Beautiful petal falling animation
- 💌 Animated greeting card with personalized message
- 📱 Fully responsive design
- 🎨 Soft, feminine design with pastel colors

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (optional)

## Getting Started

### 1. Install Dependencies

```bash
cd bloom-for-her
npm install
```

### 2. Configure Supabase (Optional)

If you want to store submissions in a database:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a table called `submissions` with the following schema:

```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  flower VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON submissions
FOR INSERT TO anon
WITH CHECK (true);
```

3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Add your Supabase credentials to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Note**: The app works without Supabase - submissions will just be logged to the console.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
bloom-for-her/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── LandingPage.tsx      # Welcome screen
│   │   ├── FlowerSelection.tsx  # Flower picker & name input
│   │   ├── BouquetAnimation.tsx # Animation & greeting card
│   │   └── FloatingPetals.tsx   # Background decorations
│   └── lib/
│       └── supabase.ts      # Supabase client
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json
```

## Customization

### Colors
Edit the color palette in `tailwind.config.ts`:
- `pink` - Main accent color
- `lavender` - Secondary accent
- `cream` - Warm highlights

### Flowers
Add more flowers in `src/components/FlowerSelection.tsx`:
```typescript
const flowers = [
  { type: 'rose', emoji: '🌹', name: 'Rose', color: '...' },
  // Add more flowers here
]
```

### Greeting Message
Edit the card message in `src/components/BouquetAnimation.tsx`

## License

MIT - Feel free to use this for your own celebrations! 💜
=======
# Flower-
Simple Flower Project

