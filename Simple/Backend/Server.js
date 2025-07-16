require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Mode to question count mapping
const modeMap = {
  quick: 10,
  challenge: 20,
  timed: 30,
};

// GET /questions/:category/:mode
app.get('/questions/:category/:mode', async (req, res) => {
  const { category, mode } = req.params;
  const limit = modeMap[mode];

  if (!limit) {
    return res.status(400).json({ error: 'Invalid quiz mode' });
  }

  try {
    const { data, error } = await supabase
      .from(category) // table name = category
      .select('*')
      .order('id', { ascending: false }) // fallback if random not supported
      .limit(limit);

    if (error) throw error;

    // Shuffle manually if needed
    const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, limit);

    res.json(shuffled);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));