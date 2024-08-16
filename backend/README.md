# Docker起動方法

## コンテナ内のシェルに入る
`~/sample/$ docker compose run backend sh`
  - localhost:8080
    - `$curl -i localhost:8080`
    - ブラウザでlocalhost:8080(但しhttps everywhereは切る必要あり)

⚠WIP backendの人はgoのホットリロード用(air等)ライブラリを自身で書き換える。しない場合は毎度コンテナの起動停止が必要
⚠WIP backendの人は繋ぐところ
⚠ 必要なものがある場合(goやnpm等のライブラリ以外のvim等)は自身でDockerfileのRUNを書き換える

## イメージ構築及びコンテナ作成及び開始
`~/sample/$ docker compose up backend --build`

