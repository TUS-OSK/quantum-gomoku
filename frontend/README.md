# Dokcer起動方法

## コンテナ内のシェルに入る
`~/sample/$ docker compose run frontend sh`
  - localhost:3000
    - ブラウザでlocalhost:3000(但しhttps everywhereは切る必要あり)

⚠ 必要なものがある場合(goやnpm等のライブラリ以外のvim等)は自身でDockerfileのRUNを書き換える

## イメージ構築及びコンテナ作成及び開始
`~/sample/$ docker compose up backend --build`
