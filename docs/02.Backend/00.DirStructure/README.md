# 00.DirStructure

バックエンドのディレクトリ構造は以下のようになっている。

```bash
backend/
├── Dockerfile
├── README.md
├── controllers
├── go.mod
├── go.sum
├── main.go
├── middleware
├── models
│   └── database
├── routes
└── utils
    └── testutils
```

1. **Dockerfile**: バックエンドイメージをビルドするためのDockerfile
2. **README.md**: このファイル
3. **controllers**: バックエンドのコントローラー
4. **go.mod**: Goモジュールファイル
5. **go.sum**: Goのサムファイル
6. **main.go**: バックエンドのエントリーポイント
7. **middleware**: バックエンドのミドルウェア（現状空の為、git未追跡）
8. **models**: バックエンドのモデル
    - **database**: detabase固有の処理を行うモデル
9.  **routes**: バックエンドのルート
10. **utils**: バックエンドのユーティリティ（util packageは作成しない）
    - **testutils**: テスト用のユーティリティ


基本的にMVC(Model-View-Controller)パターンに従ってディレクトリ構造を設計している。
開発者のレベルを考慮し、分かりやすいアーキテクチャを選択した。
現状バックエンドは単にAPIサーバーとしての機能しか持たない予定のため、Viewは存在しない。
