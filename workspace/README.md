# Gomoku

## コンテナ内のシェルに入る

- back
  - `~/sample/$ docker compose run backend sh`
  - localhost:8080
    - `$curl -i localhost:8080`
    - ブラウザでlocalhost:8080(但しhttps everywhereは切る必要あり)

- front
  -  `~/sample/$ docker compose run frontend sh`
  - localhost:3000
    - ブラウザでlocalhost:3000(但しhttps everywhereは切る必要あり)

⚠WIP backendの人はデーターベース設定及びvolume設定
⚠WIP backendの人はgoのホットリロード用(air等)ライブラリを自身で書き換える
  しない場合は毎度コンテナの起動停止が必要
⚠ 必要なものがある場合(goやnpm等のライブラリ以外のvim等)は自身でDockerfileのRUNを書き換える

## イメージ構築及びコンテナ作成及び開始

- back

  - `~/sample/$ docker compose up backend --build`

- front

  - `~/sample/$ docker compose up backend --build`
