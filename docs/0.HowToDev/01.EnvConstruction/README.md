# 01.EnvConstruction

## `Windows` のみ必要なもの

基本的にはwsl上での開発を推奨しています。

### `WSL2`のインストール
旧wslは設定をいじる必要がありましたが、現在は以下のコマンド一つでinstallすることが出来ます。

PoerShellを管理者権限で起動し、以下のコマンドを実行してください。
```powershell
wsl -l -v   # 既にインストールされていないか確認
wsl --install
```

詳細については[公式サイト](https://learn.microsoft.com/ja-jp/windows/wsl/install)を確認してください。またOSやそのversionについては、`Ubuntu LTS`であれば問題ないと思います。
何かトラブルが生じた際には、再installをまずは試すと良いです。
以降の手順は`wsl2: ubuntu`上で行うことを前提としています。
`Ubuntu`アプリを直接起動するか、`PowerShell`や`command prompt`、`git bash`などで`ubuntu`といったコマンドでも起動することが出来ます。

以下のセクションでは`Mac`及び`Windows(wsl2: ubuntu)`どちらでも同じ操作で問題ありません。ただターミナルの違い（`Mac`のデフォルトは`zsh`、`Ubuntu`のデフォルトは`bash`）などから若干の違いがあります。括弧付けで (`Mac`)  (`Win`) と表記するので、自身の環境に合ったものを実行してください。

## 1. 各種ツールのインストール

### Homebrew

#### install

```shell
brew -v # 既にインストールされていないか確認
```

[公式サイト](https://brew.sh/)トップに記載のコマンドを実行してください。

上のコマンドを実行後、最後の方の出力で以下のような`Next steps`が表示される場合があります。

```shell
    ==> Next steps:
    - Run these two commands in your terminal to add Homebrew to your PATH:
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/user/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
```

指示通り表示された2行のコマンド（`PATH`を通すコマンド）を実行してください。
なお、環境により若干の差異があるため、上で記載したものではなく**必ず出力からコピーして**ください。
上の出力に対してはでは、
```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/user/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

```
を実行することになります。

version確認で実行できるか確認
```shell
brew -v
```

### git

#### install

`Mac`の場合はデフォルトで`git`がインストールされていることがあります。ただversionがかなり古いものな場合が多いため、`homebrew`版を使うことを推奨とします。

`Mac`で古いバージョンが存在するときに`homebrew`板をインストールした場合、インストール後ターミナルの再起動が必要です。
```shell
git --version # 既にインストールされていないか確認
brew install git
git --version   # 確認
```

#### SSH

```shell
mkdir ~/.ssh
cd ~/.ssh
ssh-keygen -t ed25519 -f ed25519_github
cat ed25519_github.pub
> # 出力を https://github.com/settings/ssh/new のkeyに張り付ける
echo -e "Host github.com\n\tHostName github.com\n\tIdentityFile ~/.ssh/ed25519_github\n\tUser git" >> ~/.ssh/config
ssh -T git@github.com   # 疎通確認
> # githubのユーザー名が表示されれば成功
```

#### config

```shell
git config --global user.name <githubアカウントのユーザー名>
git config --global user.email <githubアカウントのemail>
```

リポジトリ毎に設定したい場合は、`clone`後リポジトリ内で上記コマンドの`--global`オプションを`--local`に変えて実行してください。

### Docker

#### install（`Mac`）

`Mac`の場合は`Docker Desktop`を使います。
`windows`でも使えますが、`WSL` + `Docker Desktop`を動かそうとするとメモリ消費が激しく、16GBでも足りない場合があります。

[公式サイト](https://www.docker.com/products/docker-desktop/)よりインストールしてください。
なお`WSL`の場合もインストールするのは`windows`版です。ここで、自分のPCに合ったCPUのものを選択するように注意してください。


```shell
docker version # 確認
```

#### install（`win`, `Linux`）

[公式ドキュメント](https://docs.docker.com/engine/install/ubuntu/)よりコピペ

```shell

for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

```


```shell
docker version # 確認
```
アプリケーションを起動し、Accept,Skipを選択します。ターミナルの再起動を行うと、`docker` コマンド（`docker version`など）が動かせるようになります。
#### Tips（`win`）

WSLのメモリ消費が激しい場合、以下のような対策があります。
[WSL2によるホストのメモリ枯渇を防ぐための暫定対処](https://qiita.com/yoichiwo7/items/e3e13b6fe2f32c4c6120)

### VScode

#### install

[公式サイト](https://code.visualstudio.com/download)より自身の環境に合ったものをインストールしてください。
なお`WSL`の場合もインストールするのは`windows`版です。

#### Settings (`Win`)

`VScode`で`WSL`のターミナルを開くと、`.profile`が読み込まれないことがあります。

1. `Ctrl + ,` で設定画面を開く
2. `terminal integrated profile linux`と検索し、`setting.jsonで編集`をクリック
3. 以下のように変更
```settings.json
"terminal.integrated.profiles.linux": {
    "bash": {
        "path": "bash",
        "icon": "terminal-bash",
        "args": ["-l"]
    },
```

#### Tips   

`VScode`には拡張機能が豊富にあります。以下の拡張機能をインストールしておくと便利です。

- `WSL`：`WSL`上で`VScode`を開く機能で、`win`ユーザーは必須です。
- `Japanese Language Pack for Visual Studio Code`：日本語化
- `GitLens`：`git`の情報を表示
- `GitHub Copilot`：AIによるコード補完
- `Draw.io Integration`：Draw.ioを`VScode`上で使える
- `Markdown All in One`：`markdown`のプレビュー機能

### Go（backend開発者のみ）

実行自体は`docker`で行いますが、editorでの補完などを効かせるために`Go`をインストールします。

> [!TIP] 
>`devcontainer`内で開発を行うことにより、実行環境と開発環境を一致させることができます。
> しかしながら、backendの`docker`のrootディレクトリは`backend`となっており、`.git`が含まれないため別windowで`git`操作を行う必要があります。
> `repository`をfrontendとbackendで分けることで解消できますが、そのような大きな変更を実施するほどのインセンティブはないと考えているため、localに`Go`をインストールすることを推奨します。
> (`devcontainer`の設定で回避できるのかもしれませんが、知識不足で調査が追いついていません)
 
#### install

```shell
go version # 既にインストールされていないか確認
brew install go@1.23
go version   # 確認
```
vscodeの拡張機能で`Go`をインストールしてください。

## 3. Project Initialization

#### リポジトリのクローン

```shell
git clone git@github.com:TUS-OSK/quantum-gomoku.git
cd quantum-gomoku
```

`Docker`の起動方法については、`backend/README.md` `frontend/README.md`にそれぞれ記載があります。
