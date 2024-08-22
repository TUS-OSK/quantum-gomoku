# 01.Screen State Transition

# ゲームプレイ画面

```mermaid
graph TD;
    subgraph 手番のルーチン
        TEBAN["手番の処理"]
        AITEBAN["相手番（ゲーム続行）"]
        MY_WIN["勝利"]
        MY_LOSE["敗北"]
        MY_DRAW["引き分け"]
        TEBAN --> stone["石を打つ"]
        stone --> stone_cnt{"石の個数の確認"}
        stone_cnt --> |Ok| obs{"観測を行う"}
        obs --> |Yes| check{"勝敗判定を行う"}
        check --> |Unresolved| obs_cnt{"観測回数の確認"}
        obs_cnt --> |Ok| AITEBAN
        obs --> |No| AITEBAN
        obs_cnt --> |両者ともに観測回数消費済み| MY_DRAW
        stone_cnt --> |盤面が埋まった| MY_DRAW
        check --> |自色が5連| MY_WIN
        check --> |自色が4連以下 ∧ 相手色が5連| MY_LOSE
    end
    subgraph ゲームの流れ
        A("訪れる") --> B["ゲーム開始ボタンを押す"]
        B --> C["先手と後手を決める"]
        C --> SENTE
        SENTE["先手番"]
        GOTE["後手番"]
        SENTE --> sente_process{"先手番の処理"}
        sente_process --> |ゲーム続行| GOTE
        GOTE --> gote_process{"後手番の処理"}
        gote_process --> |ゲーム続行| SENTE
        DRAW["引き分け"]
        FIN["結果の表示"]
        END("ゲーム終了")
        sente_process & gote_process --> |観測回数消費済み or 盤面が埋まった| DRAW
        gote_process & sente_process --> |勝敗確定| Win_or_Lose["勝敗決定"]
        DRAW & Win_or_Lose --> FIN
        FIN --> END
    end