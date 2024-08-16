# 03.TechSelection

## Front
- [TypeScript](https://www.typescriptlang.org/)
  - JSの型がある版と思って貰えばよい
  - [サバイバルTypeScript](https://typescriptbook.jp/)
- [Vite](https://ja.vitejs.dev/)
  - フロントエンドツール
  - Next.jsなどもあるがオーバーパワー過ぎないということで採用
- [React](https://ja.react.dev/)
  - UIライブラリ
  - 他にも候補として、vueやsvelteなども選択肢にあったが、Web開発において主要且つ慣れているメンバーがいるため採用
- [Tailwind CSS](https://tailwindcss.com/)
  - CSS framework
  - 素のcssはレスポンシブデザイン等々色々大変だがそのあたりをよしなにやってくれる
  - React同様他にもあるが慣れていてpopularなため採用
- [Vitest](https://vitest.dev/)
  - Testライブラリ
  - jestに慣れてればそこそこらしいがここらへんは臨機応変に
- [ESlint](https://eslint.org/)/[prettier](https://prettier.io/)
  - linter/formatter
  - 文法ミスやコードスタイルに準拠して整形するツール
  - biomeという上記2つをセットにしたようなものもあるが、日本語ドキュメントの豊富さから上記2つで

## Back
- [Go](https://go.dev/)
  - Googleが作ったシンプル且つ汎用性のある言語
  - 他にもphp,ruby等あるが、Goを触れてみたいという理由での採用　明確な理由はない
- [Gin](https://gin-gonic.com/ja/)
  - Web framework
  - goライブラリの中ではシェア率が一番高くドキュメントや記事も充実しているため採用

## DateBase
- [PostgreSQL](https://www.postgresql.org/)
  - 暫定候補としてのDBのため変更可(他にもMySQLやSQLiteなどあり)
- ORM候補として下記記事参考に
    - https://zenn.dev/ryoneko/articles/4c1267d7d0e0ca
