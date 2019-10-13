//
//  入手インフォメーション ver1.13
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['GetInformation'] = 1.13;

if (!Imported.CommonPopupCore) {
	console.error('CommonPopupCoreを導入してください。')
}
/*:
 * @plugindesc ver1.13/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。
 * @author Yana
 * 
 * @param Info Disable Switch Id
 * @desc 入手インフォメーションを無効化するためのスイッチのIDです。
 * このスイッチがONの時、インフォメーションが無効化されます。
 * @default 10
 * 
 * @param Use Battle Info
 * @desc 入手インフォメーションを戦闘中に使用するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Use Rewards Info
 * @desc 戦利品を入手インフォメーションで表示するかの設定です。
 * true/falseで設定してください。
 * @default true
 *
 * @param Info Pattern
 * @desc 入手インフォメーションの動作パターンです。
 * Normal:普通 GrowUp:にょき Stretch:うにょーん
 * @default GrowUp
 *
 * @param Info Font Size
 * @desc 入手インフォメーションの文字サイズです。
 * @default 20
 * 
 * @param Info Count
 * @desc 入手インフォメーションの表示時間です。
 * @default 120
 * 
 * @param Info Delay
 * @desc 入手インフォメーションのディレイです。
 * 連続で設定された時、この数値の表示ディレイがかかります。
 * @default 20
 * 
 * @param Info MoveWait
 * @desc 入手インフォメーションが完全に表示された状態の時間です。
 * @default 100
 * 
 * @param Info MoveFade
 * @desc 入手インフォメーションのフェードの時間です。
 * @default 10
 * 
 * @param Info Position
 * @desc 入手インフォメーションの表示位置です。
 * Upを指定すると、画面上部になります。
 * @default 
 * 
 * @param Info Slide Action
 * @desc 入手インフォメーションのスライド方向です。
 * Downを指定すると、上から下になります。
 * @default
 * 
 * @param Info Sup X
 * @desc 入手インフォメーションの表示位置補正X座標です。
 * @default 0
 * 
 * @param Info Sup Y
 * @desc 入手インフォメーションの表示位置補正Y座標です。
 * @default 0
 *
 * @param Info Width
 * @desc 入手インフォメーションの横幅です。
 * @default 816
 *
 * @param Gold Icon Index
 * @desc 所持金のアイコンとして使用するアイコンのインデックスです。
 * @default 314
 *
 * @param Actor Icon Start Index
 * @desc アクターのアイコンとして使用するアイコンの最初のインデックスです。
 * @default 320
 *
 * @param Reward Popup Delay
 * @desc 戦利品表示時に表示開始までにかけるディレイの数値です。
 * @default 0
 * 
 * @param Battle Show List
 * @desc 戦闘中に表示するインフォメーションのリストです。item,gold,
 * exp,skill,params,level,abp,classLevelで指定してください。
 * @default item,gold,exp,skill,params,level,abp,classLevel
 * 
 * @param Get Gold Text
 * @desc 所持金の増加で表示されるテキストです。。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[24]手に入れた！
 * 
 * @param Lost Gold Text
 * @desc 所持金の減少で表示されるテキストです。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[2]失った・・・
 * 
 * @param Get Item Text
 * @desc アイテムの増加で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text
 * @desc アイテムの減少で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[2]失った・・・\n\C[6]_desc1
 * 
 * @param Get Item Text Num
 * @desc アイテム増加。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[14]_num個\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text Num
 * @desc アイテム減少。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」を\C[14]_num個\C[2]失った・・・\n\C[6]_desc1
 * 
 * @param Get Skill Text
 * @desc スキルの習得で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」 を\C[24]覚えた！\n\C[6]_desc1
 * 
 * @param Lost Skill Text
 * @desc スキルの忘却で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」を \C[2]忘れてしまった・・・\n\C[6]_desc1
 * 
 * @param Exp Up Text
 * @desc 経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Exp Down Text
 * @desc 経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Lv Up Text
 * @desc レベルの増加で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Lv Down Text
 * @desc レベルの減少で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * 
 * @param Param Up Text
 * @desc 能力値の増加で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Param Down Text
 * @desc 能力値の減少で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 *
 * @param Abp Up Text
 * @desc クラス経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Abp Down Text
 * @desc クラス経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Class Lv Up Text
 * @desc クラスレベルの増加で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Class Lv Down Text
 * @desc クラスレベルの減少で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 *
 * @param Formation Lv Up Text
 * @desc 陣形レベルの増加で表示されるテキストです。
 * _name:陣形の名前　_num:上がったレベル
 * @default \C[4]_nameの熟練度\C[0]が\C[14]_numポイント\C[24]上がった！
 *
 * @param Formation Lv Max Text
 * @desc 陣形をマスターした時に表示されるテキストです。
 * _name:陣形の名前
 * @default \C[4]_name\C[0]を\C[14]マスターした！
 *
 * @help------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * ShowInfo 表示したいテキスト
 * インフォ表示 表示したいテキスト
 *
 * ※スペースは必ず半角で入力してください。
 * ------------------------------------------------------
 * このプラグインには「汎用ポップアップベース」のプラグインが必要です。
 * 汎用ポップアップベースより下に配置してください。
 * また、それぞれの表示テキストに何も記載しない場合、そのインフォメーションを無効化できます。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * 導入するだけで動作します。
 * 詳細な設定は、プラグインパラメータを参照してください。
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.13:
 * 戦闘中のポップアップ位置を調整しました。
 * 戦闘終了時の戦利品表示にディレイをかける設定を追加しました。
 * 陣形レベルが上がった時にポップアップを表示する機能を追加しました。
 * ver1.12:
 * 利用規約をMITライセンスに変更しました。
 * 一度も仲間になっていないアクターに対してポップアップを表示すると、無限ループに陥るバグを修正しました。
 * ver1.11:
 * 動作パターンの設定を追加しました。
 * プラグインパラメータを追加しました。
 * ver1.10:
 * 処理内容を少し変更しました。
 * ヘルプを追加・修正しました。
 * 任意のテキストを表示するプラグインコマンドを追加しました。
 * ver1.09:
 * スキルを忘れさせた際のポップアップが表示されないバグを修正しました。
 * レベルアップ時やクラスレベルアップ時のスキル習得の表示位置を調整しました。
 * ver1.08:
 * 戦闘中の表示をexpとabpを無効化すると、経験値やABPが入らないバグを修正しました。
 * ver1.07:
 * インフォメーションを無効化する機能が正常に機能していなかったバグを修正しました。
 * 戦闘時に表示するインフォメーションを設定するBattle Show Listの設定項目を追加しました。
 * ver1.06:
 * 戦闘中のポップアップの位置が正常でなかったバグを修正しました。
 * var1.05:
 * 表示位置を補正するためのプラグインパラメータを追加しました。
 * 上から下へ動作する設定を追加しました。
 * var1.04:
 * 任意のテキストを渡せるように修正しました。
 * ver1.03:
 * ABPとクラスレベルのポップアップ処理を追加しました。
 * ver1.02:
 * レベルアップ処理でポップアップ表示が逆になっていたバグを修正しました。
 * ver1.01:
 * valueが0の状態でもポップアップしていたバグを修正しました。
 * YEP_CoreEngineとの競合回避処理を追加しました。
 * ver1.00:
 * 公開
 */

(function() {
	var parameters = PluginManager.parameters('GetInformation');
	var infoDisableSwitchId = Number(parameters['Info Disable Switch Id'] || 10);
	var getGoldText = String(parameters['Get Gold Text']);
	var lostGoldText = String(parameters['Lost Gold Text']);
	var getInfoText = String(parameters['Get Item Text']);
	var lostInfoText = String(parameters['Lost Item Text']);
	var getInfoTextNum = String(parameters['Get Item Text Num']);
	var lostInfoTextNum = String(parameters['Lost Item Text Num']);
	var getInfoSkillText = String(parameters['Get Skill Text']);
	var lostInfoSkillText = String(parameters['Lost Skill Text']);
	var ExpUpText = String(parameters['Exp Up Text']);
	var ExpDownText = String(parameters['Exp Down Text']);
	var lvUpText = String(parameters['Lv Up Text']);
	var lvDownText = String(parameters['Lv Down Text']);
	var ParamUpText = String(parameters['Param Up Text']);
	var ParamDownText = String(parameters['Param Down Text']);
	var infoFontSize = Number(parameters['Info Font Size'] || 20);
	var infoCount = Number(parameters['Info Count'] || 120);
	var infoDelay = Number(parameters['Info Delay'] || 20);
	var infoMoveWait = Number(parameters['Info MoveWait'] || 100);
	var infoMoveFade = Number(parameters['Info MoveFade'] || 20);
	var goldIconIndex = Number(parameters['Gold Icon Index'] || 314);
	var actorIconStartIndex = Number(parameters['Actor Icon Start Index']);
	var useBattleInfo = String(parameters['Use Battle Info'] || 'true') === 'true';
	var useRewardsInfo = String(parameters['Use Rewards Info'] || 'true') === 'true';
	var infoSlideCount = 60;
	var infoPosition = String(parameters['Info Position'] || '');
	var infoSlideAction = String(parameters['Info Slide Action'] || '');
	var infoSupX = Number(parameters['Info Sup X'] || 0);
	var infoSupY = Number(parameters['Info Sup Y'] || 0);
    var infoPattern = parameters['Info Pattern'] || 'Normal';
	var infoWidth = parameters['Info Width'] || 816;
	var rewardPopupDelay = Number(parameters['Reward Popup Delay']);

	var abpUpText = String(parameters['Abp Up Text']);
	var abpDownText = String(parameters['Abp Down Text']);
	var clvUpText = String(parameters['Class Lv Up Text']);
	var clvDownText = String(parameters['Class Lv Down Text']);

    var fLvUpText = String(parameters['Formation Lv Up Text']);
    var fLvMaxText = String(parameters['Formation Lv Max Text']);
	
	var battleShowList = String(parameters['Battle Show List']).split(',');

	var _gInfo_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_gInfo_GInterpreter_pluginCommand.call(this, command, args);
		if (command === 'ShowInfo' || command === 'インフォ表示') {
			CommonPopupManager.showInfo({},args[0],null);
		}
	};

	CommonPopupManager.popEnable = function() {
		var useBattle = $gameParty.inBattle() ? useBattleInfo : true;
		return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
	};

	// Change Gold
	var _gInfo_GInterpreter_command125 = Game_Interpreter.prototype.command125;
	Game_Interpreter.prototype.command125 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command125.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Item
	var _gInfo_GInterpreter_command126 = Game_Interpreter.prototype.command126;
	Game_Interpreter.prototype.command126 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command126.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Weapon
	var _gInfo_GInterpreter_command127 = Game_Interpreter.prototype.command127;
	Game_Interpreter.prototype.command127 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command127.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Armor
	var _gInfo_GInterpreter_command128 = Game_Interpreter.prototype.command128;
	Game_Interpreter.prototype.command128 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command128.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change EXP
	var _gInfo_GInterpreter_command315 = Game_Interpreter.prototype.command315;
	Game_Interpreter.prototype.command315 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command315.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Level
	var _gInfo_GInterpreter_command316 = Game_Interpreter.prototype.command316;
	Game_Interpreter.prototype.command316 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command316.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Parameter
	var _gInfo_GInterpreter_command317 = Game_Interpreter.prototype.command317;
	Game_Interpreter.prototype.command317 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command317.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Skill
	var _gInfo_GInterpreter_command318 = Game_Interpreter.prototype.command318;
	Game_Interpreter.prototype.command318 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command318.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};

	Game_Actor.prototype.addParam = function(paramId, value) {
		Game_BattlerBase.prototype.addParam.call(this, paramId, value);
		if (CommonPopupManager._popEnable) {
			if ($gameParty.inBattle() && !battleShowList.contains('params')){ return }
			CommonPopupManager.showInfo({
				'name' : TextManager.param(paramId),
				'value' : value > 0
			}, value, 'param',this.actorId());
		}
	};
	var _gInfo_GParty_gainGold = Game_Party.prototype.gainGold;
	Game_Party.prototype.gainGold = function(amount) {
		_gInfo_GParty_gainGold.call(this, amount);
		if (CommonPopupManager._popEnable) {
			if ($gameParty.inBattle() && !battleShowList.contains('gold')){ return }
			var hash = {
				'name' : '',
				'iconIndex' : goldIconIndex,
				'description' : '',
				'value' : Math.abs(amount)
			};
			CommonPopupManager.showInfo(hash, amount, 'gold');
		}
	};
	var _gInfo_GParty_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		var result = _gInfo_GParty_gainItem.call(this, item, amount, includeEquip);
		if (CommonPopupManager._popEnable) {
			if (this.inBattle() && !battleShowList.contains('item')){ return }
			CommonPopupManager.showInfo(item, amount, 'item');
		}
		if (Imported.YEP_CoreEngine) return result;
	};
	
	var _gInfo_GActor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		var isLearn = this.isLearnedSkill(skillId);
		_gInfo_GActor_learnSkill.call(this, skillId);
		if (CommonPopupManager._popEnable && !isLearn) {
			if ($gameParty.inBattle() && !battleShowList.contains('skill')){ return }
			CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
		}
	};
	var _gInfo_GActor_forgetSkill = Game_Actor.prototype.forgetSkill;
	Game_Actor.prototype.forgetSkill = function(skillId) {
		var isLearn = this.isLearnedSkill(skillId);
		_gInfo_GActor_forgetSkill.call(this, skillId);
		if (CommonPopupManager._popEnable && isLearn) {
			if ($gameParty.inBattle() && !battleShowList.contains('skill')){ return }
			CommonPopupManager.showInfo($dataSkills[skillId], 2, 'skill', this.actorId());
		}
	};
	var _gInfo_GActor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function(exp, show) {
		var tExp = exp - this.currentExp();
		var plevel = this.level;
		var pSkills = this._skills.clone();
		if (CommonPopupManager._popEnable) {
			if (!$gameParty.inBattle() || battleShowList.contains('exp')){
				CommonPopupManager.showInfo({
					'name' : TextManager.exp,
					'value' : tExp > 0
				}, tExp, 'exp', this.actorId());
			}
		}
		var tempEnable = CommonPopupManager._popEnable;
		CommonPopupManager._popEnable = false;
		_gInfo_GActor_changeExp.call(this, exp, show);
		CommonPopupManager._popEnable = tempEnable;
		if ((this.level - plevel) !== 0){
			var upLevel = this.level - plevel;
			if (CommonPopupManager._popEnable) {
				if ($gameParty.inBattle() && !battleShowList.contains('level')){ return }
				CommonPopupManager.showInfo({
					'name' : TextManager.level,
					'value' : upLevel > 0
				}, upLevel, 'level', this.actorId());
			}	
		}
		if (CommonPopupManager._popEnable) {
			this._skills.forEach(function(skillId){
				if (!pSkills.contains(skillId)){
					CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
				}
			}.bind(this));
		}
	};
	
	var _gInfo_GActor_changeLevel = Game_Actor.prototype.changeLevel;
	Game_Actor.prototype.changeLevel = function(level, show) {
		var upLevel = level - this.level;
		var tempEnable = CommonPopupManager._popEnable;
		var pSkills = this._skills.clone();
		CommonPopupManager._popEnable = false;
		_gInfo_GActor_changeLevel.call(this, level, show);
		CommonPopupManager._popEnable = tempEnable;
		if (CommonPopupManager._popEnable) {
			if ($gameParty.inBattle() && !battleShowList.contains('level')){ return }
			CommonPopupManager.showInfo({
				'name' : TextManager.level,
				'value' : upLevel > 0
			}, upLevel, 'level', this.actorId());
			
			this._skills.forEach(function(skillId){
				if (!pSkills.contains(skillId)){
					CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
				}
			}.bind(this));
		}
	};
	
	if (Imported['VXandAceHybridClass']){
		
		// Change Class Level
		var _gInfo_GInterpreter_changeClassLevel = Game_Interpreter.prototype.changeClassLevel;
		Game_Interpreter.prototype.changeClassLevel = function(actorId,level,show) {
			CommonPopupManager._popEnable = CommonPopupManager.popEnable();
			_gInfo_GInterpreter_changeClassLevel.call(this,actorId,level,show);
			CommonPopupManager._popEnable = false;
		};
		
		// Change Abp
		var _gInfo_GInterpreter_changeAbp = Game_Interpreter.prototype.changeAbp;
		Game_Interpreter.prototype.changeAbp = function(actorId,abp,show) {
			CommonPopupManager._popEnable = CommonPopupManager.popEnable();
			var result = _gInfo_GInterpreter_changeAbp.call(this,actorId,abp,show);
			CommonPopupManager._popEnable = false;
			return result;
		};
		
		var _gInfo_GActor_changeAbp = Game_Actor.prototype.changeAbp;
		Game_Actor.prototype.changeAbp = function(abp, show) {
			var tAbp = abp - this.currentAbp();
			var plevel = this.currentClassLevel();
			var pSkills = this._skills.clone();
			if (CommonPopupManager._popEnable) {
				if (!$gameParty.inBattle() || battleShowList.contains('abp')){
					CommonPopupManager.showInfo({
						'name' : TextManager.abp,
						'value' : tAbp > 0
					}, tAbp, 'abp', this.actorId());
				}
			}
			
			var tempEnable = CommonPopupManager._popEnable;
			CommonPopupManager._popEnable = false;
			
			_gInfo_GActor_changeAbp.call(this, abp, show);
			
			CommonPopupManager._popEnable = tempEnable;
			
			if ((this.currentClassLevel() - plevel) !== 0){
				var upLevel = this.currentClassLevel() - plevel;
				if (CommonPopupManager._popEnable) {
					if ($gameParty.inBattle() && !battleShowList.contains('classLevel')){ return }
					CommonPopupManager.showInfo({
						'name' : TextManager.classLevel,
						'value' : upLevel > 0
					}, upLevel, 'classLevel', this.actorId(), this.currentClass().name);
				}	
			}
			if (CommonPopupManager._popEnable) {
				this._skills.forEach(function(skillId){
					if (!pSkills.contains(skillId)){
						CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
					}
				}.bind(this));
			}
		};
		
		var _gInfo_GActor_changeClassLevel = Game_Actor.prototype.changeClassLevel;
		Game_Actor.prototype.changeClassLevel = function(level, show) {
			var upLevel = level - this.currentClassLevel();
			var tempEnable = CommonPopupManager._popEnable;
            var pSkills = this._skills.clone();
			CommonPopupManager._popEnable = false;
			_gInfo_GActor_changeClassLevel.call(this, level, show);
			CommonPopupManager._popEnable = tempEnable;
			if (CommonPopupManager._popEnable) {
				if ($gameParty.inBattle() && !battleShowList.contains('classLevel')){ return }
				CommonPopupManager.showInfo({
					'name' : TextManager.classLevel,
					'value' : upLevel > 0
				}, upLevel, 'classLevel', this.actorId(), this.currentClass().name);
				
				this._skills.forEach(function(skillId){
					if (!pSkills.contains(skillId)){
						CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
					}
				}.bind(this));
			}	
		};
	}

    var __BManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function () {
        __BManager_displayRewards.call(this);
        if (Imported['BattleFormation']) {
			$gameTemp._popupDelay = rewardPopupDelay;
            var upLevel = this._upBfLevel;
            var item = $gameParty.battleFormation();
            if (CommonPopupManager.popEnable() && item) {
                if ($gameParty.inBattle() && !battleShowList.contains('formationLevel')) return;
				if ($gameParty.isMaxBfLevel(item.id)) {
					CommonPopupManager.showInfo({
						'name': item.name,
						'iconIndex': item.iconIndex,
						'value': 'max'
					}, upLevel, 'formationLevel', null, null);
				} else {
					CommonPopupManager.showInfo({
						'name': item.name,
						'iconIndex': item.iconIndex,
						'value': upLevel > 0
					}, upLevel, 'formationLevel', null, null);
				}
            }
			$gameTemp._popupDelay = 0;
        }
    };

	CommonPopupManager.showInfo = function(object, value, type, actor, c) {
		var text1 = null;
		if (value === 0) { return }
		switch(type) {
			case 'gold':
				text1 = getGoldText;
				if (value < 0) {
					text1 = lostGoldText
				}
				break;
			case 'item':
				text1 = getInfoText;
				if (value > 1) {
					text1 = getInfoTextNum
				} else if (value === -1) {
					text1 = lostInfoText
				} else if (value < -1) {
					text1 = lostInfoTextNum
				}
				break;
			case 'exp':
				text1 = object.value ? ExpUpText : ExpDownText;
				break;
			case 'level':
				text1 = object.value ? lvUpText : lvDownText;
				break;
			case 'abp':
				text1 = object.value ? abpUpText : abpDownText;
				break;
			case 'classLevel':
				text1 = object.value ? clvUpText : clvDownText;
				break;
			case 'param':
				text1 = object.value ? ParamUpText : ParamDownText;
				break;
			case 'skill':
				text1 = value === 1 ? getInfoSkillText : lostInfoSkillText;
				break;
			case 'formationLevel':
				text1 = object.value === 'max' ? fLvMaxText : fLvUpText;
				break;
			default :
				text1 = value;
		}
		if (text1 === '') { return }
		var descs = object.description ? object.description.split(/\n/) : [];
		if (actor) {
		    actor = $dataActors[actor];
			text1 = text1.replace(/_actor/g, actor.name);
			text1 = text1.replace(/_aicon/g, actor.id+actorIconStartIndex-1);
		}
		if (c) { text1 = text1.replace(/_class/g, c) }
		text1 = text1.replace(/_name/g, object.name);
		text1 = text1.replace(/_icon/g, object.iconIndex);
		text1 = text1.replace(/_num/g, Math.abs(value));
		text1 = descs[0] ? text1.replace(/_desc1/g, descs[0]) : text1.replace(/_desc1/g, '');
		text1 = descs[1] ? text1.replace(/_desc2/g, descs[1]) : text1.replace(/_desc2/g, '');
		var texts = text1.split(/\n|\\n/);
		for (var i = 0; i < texts.length; i++) {
			var text = texts[i].replace(/\\C\[\d+\]/g, '');
			if (text === '') { delete texts[i] }
		}
		texts = texts.compact();
		var oneHeight = (infoFontSize + 8)
		var height = oneHeight * texts.length;
		var bitmap = new Bitmap(Graphics.boxWidth, height);
		bitmap.fillRect(0, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)');
		bitmap.gradientFillRect(infoWidth / 2, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)');
		this.window().contents = bitmap;
		this.window().drawTextEx('\\FS[' + infoFontSize + ']', 0, 0);
		for (var i = 0; i < texts.length; i++) {
			var text = '\\FS[' + infoFontSize + ']' + texts[i]
			this.window().drawTextEx(text, 8, i * oneHeight);
		}
		var arg = this.setPopup([]);
		arg.bitmap = bitmap;
        if (infoPattern === 'GrowUp') {
            arg.x = 0;//Graphics.boxWidth * -1 + infoSupX;
            arg.y = Graphics.boxHeight;// - height;
            arg.moveX = 0;//Graphics.boxWidth;
            arg.anchorX = 0;
            arg.anchorY = 1.0;
            arg.pattern = -2;
            if (infoSlideAction === 'Down') arg.anchorY = 0;
        } else if (infoPattern === 'Stretch'){
            arg.x = 0;
            arg.y = Graphics.boxHeight - height;
            arg.moveX = 0;
            arg.anchorX = 0;
            arg.anchorY = 0;
            arg.pattern = -1;
        } else {
            arg.x = Graphics.boxWidth * -1 + infoSupX;
            arg.y = Graphics.boxHeight - height;
            arg.moveX = Graphics.boxWidth;
            arg.anchorX = 0;
            arg.anchorY = 0;
        }
		if (infoPosition === 'Up'){ arg.y = 0 }
		arg.y += infoSupY;
		if ($gameParty.inBattle() && (SceneManager._scene._messageWindow && SceneManager._scene._messageWindow.active)) {
            var my = SceneManager._scene._messageWindow.y;
            arg.y = Math.min(arg.y,my - height +  height * arg.anchorY);
        }
        if ((SceneManager._scene._statusWindow && SceneManager._scene._statusWindow.isOpen())){
            var sy = SceneManager._scene._statusWindow.y;
            arg.y = Math.min(arg.y,sy - height +  height * arg.anchorY);
		}
		arg.moveY = 0;
		arg.count = infoCount;
		arg.fixed = false;
		arg.extend = [infoMoveFade,infoMoveWait];
		arg.slideCount = infoSlideCount;
		arg.delay = 0;
		arg.slideAction = infoSlideAction;
        if (!CommonPopupManager._tempCommonSprites) CommonPopupManager._tempCommonSprites = [];
		var array = CommonPopupManager._tempCommonSprites.compact();
		if (CommonPopupManager._lastIndex && array[CommonPopupManager._lastIndex]){
			array.sort(function(a,b){ return a.delay > b.delay ? -1 : 1 });
			arg.delay = array[0].delay + infoDelay;
		}
		if ($gameTemp._popupDelay && arg.delay === 0) arg.delay += $gameTemp._popupDelay;
		CommonPopupManager._lastIndex = this._tempCommonSprites.setNullPos(arg);
	};

	var _gInfo_BManager_gainRewards = BattleManager.gainRewards;
	BattleManager.gainRewards = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable() && useRewardsInfo;
		$gameTemp._popupDelay = rewardPopupDelay;
		_gInfo_BManager_gainRewards.call(this);
		CommonPopupManager._popEnable = false;
		$gameTemp._popupDelay = 0;
	};
})();
