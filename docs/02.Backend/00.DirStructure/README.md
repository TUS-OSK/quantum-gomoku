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
└── routes
```

1. **Dockerfile**: バックエンドイメージをビルドするためのDockerfile
2. **README.md**: このファイル
3. **controllers**: バックエンドのコントローラー
4. **go.mod**: Goモジュールファイル
5. **go.sum**: Goのサムファイル
6. **main.go**: バックエンドのエントリーポイント
7. **middleware**: バックエンドのミドルウェア
8. **models**: バックエンドのモデル
    - **database**: 
9. **routes**: バックエンドのルート
10. **tmp**: Airによって作成されたバックエンドの一時ディレクトリ


基本的にMVC(Model-View-Controller)パターンに従ってディレクトリ構造を設計している。
現状バックエンドは単にAPIサーバーとしての機能しか持たない予定のため、Viewは存在しない。
