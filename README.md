# api-sample
@makollによるAPI実装のサンプル

## Build
1. Docker(Compose)  
`docker compose up -d`

2. DB Migration  
`npm run migration:run`

## StartUp
`docker compose up -d`  

## DB Migration
`npm run migration:run`  
最新のDB定義に更新されます

## Directories
```
src/
├── constants/ [ステータスコード定義や固定値などの共通して使用される値を扱う部品を配置]
├── entities/ [ビジネスデータやビジネスロジックを持つエンティティを配置]
├── errors/ [例外オブジェクトを配置]
├── infrastructures/ [ルーティング、DB操作、外部API Callなどの外部接続部品を配置]
│   └── router/ [apiのルーティングを配置]
├── interfaces/
│   ├── controllers/ [リクエストからレスポンスまでの一連処理をする部品を配置]
│   ├── databases/
│   │   ├── migrations/ [DB Migrationファイルを配置]
│   │   ├── models/ [DBテーブルのモデルを配置]
│   │   ├── repositories/ [モデルのデータ永続化を抽象している部品を配置]
│   │   └── repositoryImples/ [DBへの処理実行をする部品を配置]
│   ├── requests/ [リクエストデータのバリデーションや整形をする部品を配置]
│   └── response/ [レスポンスデータを整形する部品を配置]
├── middlewares/ [Expressのmiddlewareを配置]
└── usecases/ [アプリケーションサービスのユースケースを配置]
```

## Test
各モジュールと同階層に`__tests__`ディレクトリを作成して配置する

## Commands
`test`: テスト実行  
`test:watch`: 常時変更チェックによるテストの起動  
`lint`: lint実施  
`lint:format`: lint結果によるformatの実施  
`migration:generate`: DB Migrationファイルの作成  
`migration:run`: DBのバージョンを最新に更新 (一つだ上げるコマンドはTypeORMの仕様上ありません)  
`migration:revert`: DBのバージョンを一つ戻す (複数バージョン下げるコマンドはTypeORMの仕様上ありません)  

## Commit
`husky`による自動`lint:format`の実施により、lintエラーの場合はコミットに失敗します
