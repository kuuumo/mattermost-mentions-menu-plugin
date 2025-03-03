# Mattermost Mentions Menu Plugin

Mattermostの「メンション」（@マーク）ボタンを右上から左側メニューのスレッドの下に移動させるためのプラグインです。これにより、最近のメンションを見るためのボタンへのアクセスが容易になります。

## 機能

- メンションボタンを左側のサイドバーメニューに追加
- スレッドの下に配置
- メンション数のカウンターバッジを表示
- クリックすると右側のパネルにメンション一覧を表示

## スクリーンショット

（※実装後にスクリーンショットを追加してください）

## インストール方法

### プリビルドバージョン

1. [リリースページ](https://github.com/kuuumo/mattermost-mentions-menu-plugin/releases)から最新のリリースをダウンロードします
2. Mattermostの管理コンソールにアクセスします
3. **プラグイン管理 > プラグインのアップロード**に移動します
4. ダウンロードした `.tar.gz` ファイルをアップロードします
5. **有効化**ボタンをクリックして、プラグインを有効にします

### ソースからビルド

プラグインを自分でビルドするには、以下の手順に従ってください：

1. リポジトリをクローンします
```bash
git clone https://github.com/kuuumo/mattermost-mentions-menu-plugin.git
cd mattermost-mentions-menu-plugin
```

2. 依存関係をインストールし、ビルドします
```bash
# フロントエンド（Webapp）をビルド
cd webapp
npm install
npm run build
cd ..

# Goのサーバー部分をビルド
# Make sure you have Go installed (version 1.16+)
cd server
go build -o dist/plugin-linux-amd64 # Linux用
# Macの場合は: go build -o dist/plugin-darwin-amd64
# Windowsの場合は: go build -o dist/plugin-windows-amd64.exe
cd ..

# プラグインバンドルを作成
mkdir -p dist
tar -czf dist/mattermost-mentions-menu-plugin.tar.gz plugin.json webapp/dist/main.js server/dist/
```

3. 生成された `dist/mattermost-mentions-menu-plugin.tar.gz` ファイルをMattermostにアップロードします

## 開発環境のセットアップ

### 必要条件

- Go 1.16以上
- Node.js 14以上
- npm 7以上
- Mattermost Server 5.12.0以上

### 開発用ビルド

```bash
# Webアプリを開発モードでビルド（ファイル変更を監視）
cd webapp
npm install
npm run dev
```

## トラブルシューティング

一般的な問題と解決方法：

1. **プラグインが表示されない場合**
   - Mattermostを再起動してください
   - ブラウザのキャッシュをクリアしてください
   - プラグインがシステムコンソールで有効になっていることを確認してください

2. **メンションボタンが左サイドバーに表示されない場合**
   - ブラウザのコンソールでエラーを確認してください
   - Mattermostのバージョンが5.12.0以上であることを確認してください

3. **サイドバーのメンションボタンがクリックできない場合**
   - ブラウザを更新してみてください
   - 別のブラウザで試してみてください

## よくある質問（FAQ）

**Q: このプラグインはMattermostのどのバージョンと互換性がありますか？**

A: このプラグインはMattermost v5.12.0以上と互換性があります。

**Q: プラグインを有効にすると、右上のメンションボタンは非表示になりますか？**

A: いいえ、現在の実装では右上のボタンは非表示にならず、左側メニューに追加のボタンが表示されます。将来のアップデートで右上のボタンを非表示にするオプションを追加する予定です。

**Q: このプラグインはモバイルアプリでも機能しますか？**

A: いいえ、このプラグインはウェブアプリケーション専用です。Mattermostのモバイルアプリには影響しません。

## ライセンス

このプラグインはMITライセンスの下で配布されています。詳細については、同梱のLICENSEファイルを参照してください。

## コントリビューション

コントリビュートは歓迎します！プルリクエストを送る前に、以下のことをお願いします：

1. 作業する問題について、issueを作成してください
2. 単体テストを追加してください
3. コードスタイルを確認してください
4. プルリクエストでは変更内容を詳細に説明してください

---
