//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//
// Version
// 1.0.0 2015/12/26 公開
// 1.1.0 2016/04/19 回想一覧にサムネイルを指定できるように対応
// 1.1.1 2016/05/03 セーブデータ20番目のスイッチが反映されない不具合を修正
//                  セーブデータ間のスイッチ共有オプション
//                  (share_recollection_switches)を追加
// 1.1.2 2016/05/09 回想用のCGリストのキーを数字から文字列に変更
// 1.1.3 2016/11/23 セーブデータが増えた場合にロード時間が長くなる問題を解消
// 1.1.4 2016/12/23 CG閲覧時にクリック・タップで画像送りができるよう対応
// 1.1.5 2017/01/26 CG・シーンで一部サムネイルが表示されない問題を解消
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------
    var rngd_recollection_mode_settings = {
        //---------------------------------------------------------------------
        // ★ 回想モードで再生するBGMの設定をします
        //---------------------------------------------------------------------
        "rec_mode_bgm": {
            "bgm": {
                "name"  : "03_Childhood_Memories",
                "pan"   : 0,
                "pitch" : 100,
                "volume": 90
            }
        },
        //---------------------------------------------------------------------
        // ★ 回想CG選択ウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_mode_window" : {
            "x": 260,
            "y": 198,
            "recollection_title": "回想モード",
            "str_select_recollection": "回想を見る",
	  "str_select_cg": "サムネイル拡大",
            "str_select_back_title": "タイトルに戻る"
        },
        //---------------------------------------------------------------------
        // ★ 回想リストウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_list_window": {
            // 1画面に表示する縦の数
            "item_height": 2,
            // 1画面に表示する横の数
            "item_width" : 2,
            // 1枚のCGに説明テキストを表示するかどうか
            "show_title_text": true,
            // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
            "title_text_align": "center",
            // 閲覧したことのないCGの場合に表示するピクチャファイル名
            "never_watch_picture_name": "never_watch_picture",
            // 閲覧したことのないCGのタイトルテキスト
            "never_watch_title_text": "？？？"
        },
        //---------------------------------------------------------------------
        // ★ 回想用のCGを指定します
        //---------------------------------------------------------------------
        "rec_cg_set": {
            "1": {
                "title": "くすぐりという食事法",
                "pictures": ["slime01"],
                "common_event_id": 281,
                "switch_id": 7,
	      "thumbnail": "thumb_slime01"
            },
            "2": {
                "title": "くすぐりインナー",
                "pictures": ["m_rouya01"],
                "common_event_id": 288,
                "switch_id": 24,
	      "thumbnail": "thumb_m_rouya01"
            },
            "3": {
                "title": "錬金術師の普通の末路",
                "pictures": ["lklk"],
                "common_event_id": 283,
                "switch_id": 35,
	      "thumbnail": "thumb_lklk"
            },
            "4": {
                "title": "植物の栄養源",
                "pictures": ["weah00"],
                "common_event_id":273 ,
                "switch_id": 42,
	      "thumbnail": "thumb_weah00"
            },
            "5": {
                "title": "ウィーリアに尋問",
                "pictures": ["weh00"],
                "common_event_id": 271,
                "switch_id": 42,
	      "thumbnail": "thumb_weh00"
            },
            "6": {
                "title": "ネバネバコチョコチョ",
                "pictures": ["neba00"],
                "common_event_id": 270,
                "switch_id": 161,
	      "thumbnail": "thumb_neba00"
            },
            "7": {
                "title": "箱の中身は何だろな",
                "pictures": ["box00"],
                "common_event_id": 276,
                "switch_id": 162,
	      "thumbnail": "thumb_box00"
            },
            "8": {
                "title": "お腹フェチのマーメイド",
                "pictures": ["mq00"],
                "common_event_id": 287,
                "switch_id": 60,
	      "thumbnail": "thumb_mq00"
            },
            "9": {
                "title": "マッドサイエンティスト",
                "pictures": ["seca00"],
                "common_event_id": 275,
                "switch_id": 56,
	      "thumbnail": "thumb_seca00"
            },
            "10": {
                "title": "セシリアに尋問",
                "pictures": ["sech00"],
                "common_event_id": 272,
                "switch_id": 56,
	      "thumbnail": "thumb_sech00"
            },
            "11": {
                "title": "潜入失敗！",
                "pictures": ["sen00"],
                "common_event_id": 285,
                "switch_id": 164,
	      "thumbnail": "thumb_sen00"
            },
            "12": {
                "title": "Sに満ちたクーリ",
                "pictures": ["two00"],
                "common_event_id": 280,
                "switch_id": 63,
	      "thumbnail": "thumb_two00"
            },
            "13": {
                "title": "マキナに尋問マシーン",
                "pictures": ["mkh"],
                "common_event_id": 278,
                "switch_id": 63,
	      "thumbnail": "thumb_mkh"
            },
            "14": {
                "title": "最悪の淫夢でトラウマに",
                "pictures": ["mayoko00"],
                "common_event_id": 282,
                "switch_id": 84,
	      "thumbnail": "thumb_mayoko00"
            },
            "15": {
                "title": "最低の悪夢でトラウマを",
                "pictures": ["esta01"],
                "common_event_id": 284,
                "switch_id": 84,
	      "thumbnail": "thumb_esta01"
            },
            "16": {
                "title": "異端審問",
                "pictures": ["jyuu00"],
                "common_event_id": 274,
                "switch_id": 169,
	      "thumbnail": "thumb_jyuu00"
            },
            "17": {
                "title": "億の親友と1人の悪",
                "pictures": ["x00"],
                "common_event_id": 277,
                "switch_id": 169,
	      "thumbnail": "thumb_x00"
            },
            "18": {
                "title": "アミーだけくすぐられてない？",
                "pictures": ["amio00"],
                "common_event_id": 286,
                "switch_id": 160,
	      "thumbnail": "thumb_amio00"
            },
            "19": {
                "title": "ロリコン女王の私刑",
                "pictures": ["om00"],
                "common_event_id": 279,
                "switch_id": 159,
	      "thumbnail": "thumb_om00"
            },
            "20": {
                "title": "戦闘：スライム",
                "pictures": ["slime_00"],
                "common_event_id": 290,
                "switch_id": 7,
	      "thumbnail": "thumb_slime_00"
            },
            "21": {
                "title": "戦闘：プラント",
                "pictures": ["plant"],
                "common_event_id": 291,
                "switch_id": 7,
	      "thumbnail": "thumb_plant"
            },
            "22": {
                "title": "戦闘：ゲイザー",
                "pictures": ["gazer_00"],
                "common_event_id": 292,
                "switch_id": 24,
	      "thumbnail": "thumb_gazer_00"
            },
            "23": {
                "title": "戦闘：痺れバチ",
                "pictures": ["bee2_00"],
                "common_event_id": 293,
                "switch_id": 38,
	      "thumbnail": "thumb_bee2_00"
            },
            "24": {
                "title": "戦闘：レッドスライム",
                "pictures": ["red_01"],
                "common_event_id": 294,
                "switch_id": 38,
	      "thumbnail": "thumb_red_01"
            },
            "25": {
                "title": "戦闘：ミミック",
                "pictures": ["mimic_00"],
                "common_event_id": 295,
                "switch_id": 38,
	      "thumbnail": "thumb_mimic_00"
            },
            "26": {
                "title": "戦闘：尿意キノコ",
                "pictures": ["kinoko"],
                "common_event_id": 296,
                "switch_id": 42,
	      "thumbnail": "thumb_kinoko"
            },
            "27": {
                "title": "戦闘：イビルウィード",
                "pictures": ["plant_e"],
                "common_event_id": 297,
                "switch_id": 42,
	      "thumbnail": "thumb_plant_e"
            },
            "28": {
                "title": "戦闘：ノーム",
                "pictures": ["norm00"],
                "common_event_id": 308,
                "switch_id": 163,
	      "thumbnail": "thumb_norm00"
            },
            "29": {
                "title": "戦闘：サハギン",
                "pictures": ["water"],
                "common_event_id": 298,
                "switch_id": 56,
	      "thumbnail": "thumb_water"
            },
            "30": {
                "title": "戦闘：サーペント",
                "pictures": ["snake_00"],
                "common_event_id": 300,
                "switch_id": 56,
	      "thumbnail": "thumb_snake_00"
            },
            "31": {
                "title": "戦闘：ビット",
                "pictures": ["machine2"],
                "common_event_id": 301,
                "switch_id": 63,
	      "thumbnail": "thumb_machine2"
            },
            "32": {
                "title": "戦闘：ウイルス研究員",
                "pictures": ["virus"],
                "common_event_id": 302,
                "switch_id": 63,
	      "thumbnail": "thumb_virus"
            },
            "33": {
                "title": "戦闘：変態魔術師",
                "pictures": ["henm2_00"],
                "common_event_id": 303,
                "switch_id": 63,
	      "thumbnail": "thumb_henm2_00"
            },
            "34": {
                "title": "戦闘：変態魔術師",
                "pictures": ["henk2"],
                "common_event_id": 304,
                "switch_id": 84,
	      "thumbnail": "thumb_henk2"
            },
            "35": {
                "title": "戦闘：ガーゴイル",
                "pictures": ["gar2"],
                "common_event_id": 305,
                "switch_id": 84,
	      "thumbnail": "thumb_gar2"
            },
            "36": {
                "title": "戦闘：ゴーレム",
                "pictures": ["golem"],
                "common_event_id": 306,
                "switch_id": 84,
	      "thumbnail": "thumb_golem"
            },
            "37": {
                "title": "戦闘：エッチなサキュバス",
                "pictures": ["succubus2"],
                "common_event_id": 307,
                "switch_id": 84,
	      "thumbnail": "thumb_succubus2"
            },
	    "38": {
                "title": "移動：トラップ通路",
                "pictures": ["ashi"],
                "common_event_id": 309,
                "switch_id": 63,
	      "thumbnail": "ashi"
            },
        },
        //---------------------------------------------------------------------
        // ★ 回想時に一時的に利用するマップIDを指定します
        //---------------------------------------------------------------------
        // 通常は何もないマップを指定します
        //---------------------------------------------------------------------
        "sandbox_map_id": 1,
        //---------------------------------------------------------------------
        // ★ 回想用スイッチをセーブデータ間で共有するかどうかを指定します
        //---------------------------------------------------------------------
        // パラメータの説明
        // true:
        //      回想用スイッチを共有します。
        //
        //      例1：セーブ1で回想スイッチ1, 2, 3がONとする
        //          ニューゲームで開始し、セーブ1を上書きする
        //          →セーブ1の回想スイッチ1, 2, 3はONのままとなる。
        //
        //      例2: セーブ1で回想スイッチ1, 2, 3がONとする
        //          セーブ1をロードし、セーブ2を保存する
        //          セーブ2で回想スイッチ1, 2, 3, 7がONとする
        //          セーブ1, セーブ2それぞれで、回想スイッチ1, 2, 3, 7がONとなる
        //
        // false:
        //      回想用スイッチを共有しません
        //
        // すべてのセーブデータを削除した場合にのみ、スイッチがリセットされます
        //---------------------------------------------------------------------
        "share_recollection_switches": false
    };

    function rngd_hash_size(obj) {
        var cnt = 0;
        for(var o in obj) {
            cnt++;
        }
        return cnt;
    }

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Scene_Recollection
    //=========================================================================
    // 回想用のシーン関数です
    //=========================================================================
    function Scene_Recollection() {
        this.initialize.apply(this, arguments);
    }

    Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
    Scene_Recollection.prototype.constructor = Scene_Recollection;

    Scene_Recollection.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Recollection.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createWindowLayer();
        this.createCommandWindow();
    };

    // 回想モードのカーソル
    Scene_Recollection.rec_list_index = 0;

    // 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
    Scene_Recollection.reload_rec_list = false;

    Scene_Recollection.prototype.createCommandWindow = function() {

        if(Scene_Recollection.reload_rec_list) {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));

            // リロードの場合：選択ウィンドウを非表示にする
            this._rec_window.visible = false;
            this._rec_window.deactivate();
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);

            // リロードの場合：回想リストを表示にする
            this._rec_list.visible = true;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._mode = "recollection";
            this._rec_list.activate();
            this._rec_list.select(Scene_Recollection.rec_list_index);

            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);

            Scene_Recollection.reload_rec_list = false;

        } else {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);
            this._rec_list.visible = false;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._rec_list.select(Scene_Recollection.rec_list_index);
            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.playOkSound = function(){}; // CGﾓｰﾄﾞの場合、OK音を鳴らさない
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);
        }

    };

    //-------------------------------------------------------------------------
    // ● 開始処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._rec_window.refresh();
        this._rec_list.refresh();
        AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
        Scene_Recollection._rngd_recollection_doing = false;
    };

    //-------------------------------------------------------------------------
    // ● 更新処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

    };

    //-------------------------------------------------------------------------
    // ● 「回想を見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowRecollection = function() {
        // モードウィンドウの無効化とリストウィンドウの有効化
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "recollection";
    };

    //-------------------------------------------------------------------------
    // ● 「CGを見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowCg = function() {
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "cg";
    };

    //-------------------------------------------------------------------------
    // ● 「タイトルに戻る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackTitle = function() {
        Scene_Recollection.rec_list_index = 0;
        SceneManager.goto(Scene_Title);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackSelectMode = function() {
        this.do_exchange_status_window(this._rec_list, this._rec_window);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandDoRecMode = function() {
        var target_index = this._rec_list.index() + 1;
        Scene_Recollection.rec_list_index = target_index - 1;

        if (this._rec_list.is_valid_picture(this._rec_list.index() + 1)) {
            // 回想モードの場合
            if (this._mode == "recollection") {
                Scene_Recollection._rngd_recollection_doing = true;

                DataManager.setupNewGame();
                $gamePlayer.setTransparent(255);
                this.fadeOutAll();
                // TODO: パーティを透明状態にする

                //$dataSystem.optTransparent = false;
                $gameTemp.reserveCommonEvent(rngd_recollection_mode_settings.rec_cg_set[target_index]["common_event_id"]);
                $gamePlayer.reserveTransfer(rngd_recollection_mode_settings.sandbox_map_id, 0, 0, 0);
                SceneManager.push(Scene_Map);

                // CGモードの場合
            } else if (this._mode == "cg") {
                this._cg_sprites = [];
                this._cg_sprites_index = 0;

                // シーン画像をロードする
                rngd_recollection_mode_settings.rec_cg_set[target_index].pictures.forEach(function (name) {
                    // CGクリックを可能とする
                    var sp = new Sprite_Button();
                    sp.setClickHandler(this.commandDummyOk.bind(this));
                    sp.processTouch = function() {
                        Sprite_Button.prototype.processTouch.call(this);

                    };
                    sp.bitmap = ImageManager.loadPicture(name);
                    // 最初のSprite以外は見えないようにする
                    if (this._cg_sprites.length > 0) {
                        sp.visible = false;
                    }

                    // TODO: 画面サイズにあわせて、拡大・縮小すべき
                    this._cg_sprites.push(sp);
                    this.addChild(sp);

                }, this);

                this.do_exchange_status_window(this._rec_list, this._dummy_window);
                this._dummy_window.visible = false;
            }
        } else {
            this._rec_list.activate();
        }
    };

    Scene_Recollection.prototype.commandDummyOk = function() {

        if(this._cg_sprites_index < this._cg_sprites.length - 1) {
            this._cg_sprites[this._cg_sprites_index].visible = false;
            this._cg_sprites_index++;
            this._cg_sprites[this._cg_sprites_index].visible = true;
            SoundManager.playOk();

            this._dummy_window.activate();
        } else {
            SoundManager.playOk();
            this.commandDummyCancel();
        }
    };

    Scene_Recollection.prototype.commandDummyCancel = function() {
        this._cg_sprites.forEach(function(obj) {
            obj.visible = false;
            obj = null;
        });
        this.do_exchange_status_window(this._dummy_window, this._rec_list);
    };

    // コモンイベントから呼び出す関数
    Scene_Recollection.prototype.rngd_exit_scene = function() {
        if(Scene_Recollection._rngd_recollection_doing) {
            // Window_RecListを表示する
            Scene_Recollection.reload_rec_list = true;
            SceneManager.push(Scene_Recollection);
        }
    };

    //-------------------------------------------------------------------------
    // ● ウィンドウの無効化と有効化
    //-------------------------------------------------------------------------
    // win1: 無効化するウィンドウ
    // win2: 有効化するウィンドウ
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.do_exchange_status_window = function(win1, win2) {
        win1.deactivate();
        win1.visible = false;
        win2.activate();
        win2.visible = true;
    };
    //-------------------------------------------------------------------------
    // ● セーブ・ロード・ニューゲーム時に必要なスイッチをONにする
    //-------------------------------------------------------------------------
    Scene_Recollection.setRecollectionSwitches = function() {
        // 各セーブデータを参照し、RecollectionMode用のスイッチを検索する
        // スイッチが一つでもONになっている場合は回想をONにする
        for(var i = 1; i <= DataManager.maxSavefiles(); i++) {
            var data = null;
            try {
                data = StorageManager.loadFromLocalFile(i);
            } catch(e) {
                data = StorageManager.loadFromWebStorage(i);
            }
            if(data) {
                var save_data_obj = JsonEx.parse(data);
                var rec_cg_max = rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);

                for(var j = 0; j < rec_cg_max; j++) {
                    var cg = rngd_recollection_mode_settings.rec_cg_set[j+1];
                    if(save_data_obj["switches"]._data[cg.switch_id] &&
                        save_data_obj["switches"]._data[cg.switch_id] == true) {
                        $gameSwitches.setValue(cg.switch_id, true);
                    }
                }
            }
        }
    };

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Window_RecollectionCommand
    //=========================================================================
    // 回想モードかCGモードを選択するウィンドウです
    //=========================================================================
    function Window_RecollectionCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
    Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

    Window_RecollectionCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = rngd_recollection_mode_settings.rec_mode_window.x;
        this.y = rngd_recollection_mode_settings.rec_mode_window.y;

    };

    Window_RecollectionCommand.prototype.makeCommandList = function() {
        Window_Command.prototype.makeCommandList.call(this);
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_recollection, "select_recollection");
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_cg, "select_cg");
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_back_title, "select_back_title");
    };

    //=========================================================================
    // ■ Window_RecollectionList
    //=========================================================================
    // 回想またはCGを選択するウィンドウです
    //=========================================================================
    function Window_RecList() {
        this.initialize.apply(this, arguments);
    }

    Window_RecList.prototype = Object.create(Window_Selectable.prototype);
    Window_RecList.prototype.constructor = Window_RecList;

    //-------------------------------------------------------------------------
    // ● 初期化処理
    //-------------------------------------------------------------------------
    Window_RecList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.windowWidth = width;
        this.windowHeight = height;
        this.select(0);
        this._formationMode = false;
        this.get_global_variables();
        this.refresh();

    };

    Window_RecList.prototype.maxItems = function() {
        return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
    };

    Window_RecList.prototype.itemHeight = function() {
        return (this.height - this.standardPadding()) / rngd_recollection_mode_settings.rec_list_window.item_height;
    };

    Window_RecList.prototype.maxPageItems = function() {
        return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
    };

    Window_RecList.prototype.maxCols = function() {
        return rngd_recollection_mode_settings.rec_list_window.item_width;
    };

    Window_RecList.prototype.maxPageRows = function() {
        var pageHeight = this.height;// - this.padding * 2;
        return Math.floor(pageHeight / this.itemHeight());
    };

    Window_RecList.prototype.drawItem = function(index) {
        var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index+1];
        var rect = this.itemRect(index);
        var text_height = 0;
        if(rngd_recollection_mode_settings.rec_list_window.show_title_text) {
            if(this._global_variables["switches"][rec_cg.switch_id]) {
                this.contents.drawText(rec_cg.title, rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            } else {
                this.contents.drawText(rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
                    rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            }
            text_height = 32;
        }

        // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
        if(this._global_variables["switches"][rec_cg.switch_id]) {

            var thumbnail_file_name = rec_cg.pictures[0];
            if(rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
                thumbnail_file_name = rec_cg.thumbnail;
            }

            this.drawRecollection(thumbnail_file_name, 0, 0,
                this.itemWidth() - 36, this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 +text_height);


        } else {
            this.drawRecollection(rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
                    0, 0 , this.itemWidth() - 36,
                    this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 + text_height);

        }

    };

    //-------------------------------------------------------------------------
    // ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.get_global_variables = function() {
        this._global_variables = {
            "switches": {}
        };
        var maxSaveFiles = DataManager.maxSavefiles();
        for(var i = 1; i <= maxSaveFiles; i++) {
            if(DataManager.loadGameSwitch(i)) {
                var rec_cg_max = rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);

                for(var j = 0; j < rec_cg_max; j++) {
                    var cg = rngd_recollection_mode_settings.rec_cg_set[j+1];
                    if($gameSwitches._data[cg.switch_id]) {
                        this._global_variables["switches"][cg.switch_id] = true;
                    }
                }
            }
        }
    };
    //-------------------------------------------------------------------------
    // ● index番目に表示された回想orCGが有効かどうか判断する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.is_valid_picture = function(index) {
        // CG情報の取得と対象スイッチの取得
        var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
        return ( this._global_variables["switches"][_rec_cg_obj.switch_id] == true);

    };


(function(){

//-----------------------------------------------------------------------------
// ◆ 組み込み関数Fix
//-----------------------------------------------------------------------------

    Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
        var bmp = ImageManager.loadPicture(bmp_name);

        var _width = width;
        var _height = height;
        if(_width > bmp.width) {
            _width = bmp.width - 1;
        }

        if(_height > bmp.height) {
            _height = bmp.height - 1;
        }
        this.contents.blt(bmp, x, y, _width, _height, dx, dy);
    };

    var Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function() {
        Window_TitleCommand_makeCommandList.call(this);
        this.clearCommandList();
        this.addCommand(TextManager.newGame,   'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.recollection_title, 'recollection');
        this.addCommand(TextManager.options,   'options');
    };

    Scene_Title.prototype.commandRecollection = function() {
        SceneManager.push(Scene_Recollection);
    };

    var Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('recollection', this.commandRecollection.bind(this));
    };

    // セーブデータ共有オプションが指定されている場合のみ、カスタマイズ
    if(rngd_recollection_mode_settings["share_recollection_switches"]) {
        DataManager.makeSaveContents = function() {
            // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.

            Scene_Recollection.setRecollectionSwitches();

            var contents = {};
            contents.system       = $gameSystem;
            contents.screen       = $gameScreen;
            contents.timer        = $gameTimer;
            contents.switches     = $gameSwitches;
            contents.variables    = $gameVariables;
            contents.selfSwitches = $gameSelfSwitches;
            contents.actors       = $gameActors;
            contents.party        = $gameParty;
            contents.map          = $gameMap;
            contents.player       = $gamePlayer;

            return contents;
        };

        DataManager.extractSaveContents = function(contents) {
            $gameSystem        = contents.system;
            $gameScreen        = contents.screen;
            $gameTimer         = contents.timer;
            $gameSwitches      = contents.switches;
            $gameVariables     = contents.variables;
            $gameSelfSwitches  = contents.selfSwitches;
            $gameActors        = contents.actors;
            $gameParty         = contents.party;
            $gameMap           = contents.map;
            $gamePlayer        = contents.player;

            Scene_Recollection.setRecollectionSwitches();
        };

        DataManager.setupNewGame = function() {
            this.createGameObjects();
            Scene_Recollection.setRecollectionSwitches();
            this.selectSavefileForNewGame();
            $gameParty.setupStartingMembers();
            $gamePlayer.reserveTransfer($dataSystem.startMapId,
                $dataSystem.startX, $dataSystem.startY);
            Graphics.frameCount = 0;
        };
    }

//-----------------------------------------------------------------------------
// ◆ DataManager関数
//-----------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    // ● スイッチのみロードする
    //-------------------------------------------------------------------------
    DataManager.loadGameSwitch = function(savefileId) {
        try {
            return this.loadGameSwitchWithoutRescue(savefileId);
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    DataManager.loadGameSwitchWithoutRescue = function(savefileId) {
        var globalInfo = this.loadGlobalInfo();
        if (this.isThisGameFile(savefileId)) {
            var json = StorageManager.load(savefileId);
            this.createGameObjectSwitch();
            this.extractSaveContentsSwitches(JsonEx.parse(json));
            //this._lastAccessedId = savefileId;
            return true;
        } else {
            return false;
        }
    };

    DataManager.createGameObjectSwitch = function() {
        $gameSwitches      = new Game_Switches();
    };

    DataManager.extractSaveContentsSwitches = function(contents) {
        $gameSwitches      = contents.switches;
    };

})();
