# ts-backend-template

TypeScript で Web アプリケーションのバックエンドを作るためのプロジェクトテンプレート。

## 技術スタック

- npm
- TypeScript
- ESM
- Prettier
- ESLint
- Vitest
- renovate
- GitHub Actions
- vscode 向けの各種設定ファイル (`extensions.json`, `launch.json`, `settings.json`)

## Usage

```bash
$ npm i
$ docker compose up -d
$ npm run generate
$ npm run migrate:dev
$ npx prisma db seed
$ npm run dev
```

## GraphiQL

- http://localhost:3000/graphql

## License

CC0-1.0
