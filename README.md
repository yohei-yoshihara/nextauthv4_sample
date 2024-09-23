# Next.JS AppRouter + Next Auth V4 のサンプル

AppRouter と Next Auth V4 を組み合わせて、ロール（管理者と一般ユーザ）を持つログイン機能の実装をしたサンプルである。

## データベースの初期化

```bash
npx prisma generate
npx prisma db push
node prisma/seed.mjs
```

## 起動

```bash
npm run build
npm run start
```
