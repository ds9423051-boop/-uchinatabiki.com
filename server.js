const express = require('express');
const path    = require('path');

const app     = express();

// ===== スポット別リダイレクト先 =====
// 移転先URLができたらここに追記していく
const SPOT_DESTINATIONS = {
  shurijo:    'https://coral-theta.vercel.app/',
  manzamo:    'https://coral-theta.vercel.app/',
  blue_cave:  'https://coral-theta.vercel.app/',
  kourijima:  'https://coral-theta.vercel.app/',
  taketomi:   'https://coral-theta.vercel.app/',
  yambaru:    'https://coral-theta.vercel.app/',
};

// ===== 静的ファイル =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== トップページ =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== スポット別リダイレクト =====
// /spot/:id にアクセスするとローディング画面(loading.html)を返し、
// JS側が /redirect/:id を叩いてリダイレクト先URLを取得、移動する
app.get('/spot/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loading.html'));
});

// ===== リダイレクト先URLをJSONで返すAPI =====
app.get('/api/spot/:id', (req, res) => {
  const dest = SPOT_DESTINATIONS[req.params.id];
  if (!dest) {
    return res.status(404).json({ error: 'not found' });
  }
  res.json({ url: dest });
});

// ===== 直接リダイレクト(サーバーサイド版、必要なら使う) =====
app.get('/redirect/:id', (req, res) => {
  const dest = SPOT_DESTINATIONS[req.params.id];
  if (!dest) return res.status(404).send('Not found');
  res.redirect(dest);
});

// ===== 起動 =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
