//=============================================================================
// StandPictureManager.js
//=============================================================================

/*:
 * @plugindesc 立ち絵マネージャー（ver1.01）
 * @author Leeroynto（http://leeroynto.livedoor.blog/）
 *
 * @param UseNamePlate
 * @desc ネームプレートを使用するかどうか（true or false）
 * @default false
 *
 * @param StandPictureBrightnessChangeWait
 * @desc 立ち絵を明るくor暗くするのにかかるwait数
 * @default 5
 *
 * @param DisplayNamePlate
 * @desc ネームプレートを表示するかどうか（true or false）
 * ネームプレートを使用する場合に設定してください
 * @default true
 *
 * @param InitialLetter
 * @desc 名前につけてる頭文字
 * 例：【キャラクター名】の場合、【 が頭文字
 * @default 
 * @param LastLetter
 * @desc 名前につけてるお尻文字
 * 例：【キャラクター名】の場合、】がお尻文字
 * @default 
 *
 * @help　
 * ＊必ずYEP_MessageCore.jsより下に入れてください
 *
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 *   StartStandPicture
 *     立ち絵による会話を開始する時に使用してください
 *   EndStandPicture
 *     立ち絵による会話を終了する時に使用してください
 *   StandPictureManager xx yy
 *     xxにピクチャー番号、yyにキャラクター名を入れてください
 *     yyを半角数値で指定すると、そのIDに対応するアクター名に置き換えられます
 *   ResetStandPictures
 *     登録した立ち絵の情報をリセットします
 *
 * ============================================================================
 * 更新履歴
 * ============================================================================
 *
 * 2018/09/01 ver1.01
 * ・戦闘のテストプレイでエラー落ちするバグを修正
 * ・テキストが一行の場合、立ち絵の明るさ操作に不具合がでるバグを修正
 *
 * 2018/08/14 ver1.00
 * ・公開
 *
 */


var $currectSpeechingActorName=null;
var $pastSpeechingActorName=null;
var $currentPictures=null;
var $standPictureSpeeching=false;


(function() {

    var parameters = PluginManager.parameters('StandPictureManager'); 
    var useNamePlate = (parameters['UseNamePlate'] == 'true') ? true : false;
    var displayNamePlate = (parameters['DisplayNamePlate'] == 'true') ? true : false;
    var standPictureBrightnessChangeWait = Number(parameters['StandPictureBrightnessChangeWait']); 
	var initialLetterStandPicture = parameters['InitialLetter'];
	var lastLetterStandPicture = parameters['LastLetter'];

    var _Scene_Base_prototype_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
    	
        _Scene_Base_prototype_initialize.call(this);
		//現在話している人の名前
	    if($currectSpeechingActorName==null) {$currectSpeechingActorName="";}
		if($pastSpeechingActorName==null) {$pastSpeechingActorName="";}
		if($currentPictures==null) {$currentPictures = {};}//key：ピクチャー番号、value：キャラ名

	}
	
	Game_Interpreter.prototype.startStandPicture = function () {
		$standPictureSpeeching=true;
		$pastSpeechingActorName='';
	}
	
	Game_Interpreter.prototype.endStandPicture = function () {
		$standPictureSpeeching=false;
		if($currentPictures==null) return;
		for(_key in $currentPictures){
			$gameScreen.erasePicture(Number(_key));
		}
	}
	
	Game_Interpreter.prototype.setCurrentSpeechingActorNameFromPictureId = function (_picId) {
		if ($currentPictures[_picId]){
			$currectSpeechingActorName=$currentPictures[_picId];
		}
	}
	
	Game_Interpreter.prototype.standPictureColorChange = function () {
		if($currentPictures==null) return;
		if($pastSpeechingActorName==$currectSpeechingActorName) return;

		for(_key in $currentPictures){
			if($currentPictures[_key]==$currectSpeechingActorName){
				$gameScreen.tintPicture(Number(_key), [0,0,0,0], standPictureBrightnessChangeWait);
			} else {
				$gameScreen.tintPicture(Number(_key), [-128,-128,-128,0], standPictureBrightnessChangeWait);
			}
		}
		$pastSpeechingActorName=$currectSpeechingActorName;
	}

    var _Scene_Map_Prototype_Update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
    	
        _Scene_Map_Prototype_Update.call(this);
        
        if($standPictureSpeeching){
        	 $gameMap._interpreter.standPictureColorChange();
        }
        
    }
    
    var _Scene_Battle_Prototype_Update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
    	_Scene_Battle_Prototype_Update.call(this);
    	
        if($standPictureSpeeching){
        	 $gameTroop._interpreter.standPictureColorChange();
        }
    }

	//ネームプレートを使う場合の名前情報取得
	//YEP_MessageCore.jsの上書き
	Window_Message.prototype.convertNameBox = function(text) {
     		if (useNamePlate) $currectSpeechingActorName="";
		    if(!displayNamePlate) this._nameWindow.hide();
			text = text.replace(/\x1bN\<(.*)\>/gi, function() {
				//数値だけの場合、それをアクターのIDだと判断して対応するIDのネームを入れる
				if (text.search(/\x1bN\<([0-9]\d*|0)\>/gi)==0){
					if (useNamePlate) $currectSpeechingActorName=$gameActors.actor(arguments[1]).name();
					return Yanfly.nameWindow.refresh($gameActors.actor(arguments[1]).name(), 1);
				} else {
					if (useNamePlate) $currectSpeechingActorName=arguments[1];
					return Yanfly.nameWindow.refresh(arguments[1], 1);
				}
			}, this);
			text = text.replace(/\x1bN1\<(.*)\>/gi, function() {
					return Yanfly.nameWindow.refresh(arguments[1], 1);
			}, this);
			text = text.replace(/\x1bN2\<(.*)\>/gi, function() {
					return Yanfly.nameWindow.refresh(arguments[1], 2);
			}, this);
			text = text.replace(/\x1bN3\<(.*)\>/gi, function() {
					return Yanfly.nameWindow.refresh(arguments[1], 3);
			}, this);
			text = text.replace(/\x1bNC\<(.*)\>/gi, function() {
				if (useNamePlate) $currectSpeechingActorName=arguments[1];
				return Yanfly.nameWindow.refresh(arguments[1], 3);
			}, this);
			text = text.replace(/\x1bN4\<(.*)\>/gi, function() {
					return Yanfly.nameWindow.refresh(arguments[1], 4);
			}, this);
			text = text.replace(/\x1bN5\<(.*)\>/gi, function() {
					return Yanfly.nameWindow.refresh(arguments[1], 5);
			}, this);
			text = text.replace(/\x1bNR\<(.*)\>/gi, function() {
				if (useNamePlate) $currectSpeechingActorName=arguments[1];
				return Yanfly.nameWindow.refresh(arguments[1], 5);
			}, this);
	    return text;
	};
	
	//ネームプレートを使わない場合の名前情報取得
	var _Window_Message_prototype_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
		
		_Window_Message_prototype_startMessage.call(this);
		
		if($standPictureSpeeching && !useNamePlate){
			this._nameCharacterPreserve="";var _countStart=false;
			if(initialLetterStandPicture=="") _countStart=true;
			if(this._textState!=null){
				while(!this.isEndOfText(this._textState)) {
				    if(this._textState.text[this._textState.index]=='\n' || (lastLetterStandPicture!="" && this._textState.text[this._textState.index]==lastLetterStandPicture)) {
//						$currectSpeechingActorName = this._nameCharacterPreserve;
				        break;
					} else {
						if(this._textState.text[this._textState.index]!='\x1b'){
					        if(_countStart){
					        	this._nameCharacterPreserve += this._textState.text[this._textState.index];
					    	} else {
					    		if(initialLetterStandPicture != "" && this._textState.text[this._textState.index] == initialLetterStandPicture) _countStart = true;
					    	}
							this._textState.index++;
					    } else {
						    this.processEscapeCharacter(this.obtainEscapeCode(this._textState), this._textState);
					    }
				    }
				}
				$currectSpeechingActorName = this._nameCharacterPreserve;
				this._textState.index=0;
			}
		}
		
	};


/*
	var _Window_Message_prototype_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
	Window_Message.prototype.processNormalCharacter = function(textState) {
		
		if($standPictureSpeeching && !useNamePlate){
			if(textState.text[textState.index]!=null) this._nameCharacterPreserve += textState.text[textState.index];
		}
		_Window_Message_prototype_processNormalCharacter.call(this,textState);
	}

	var _Window_Message_prototype_processNewLine = Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) {
		
		if($standPictureSpeeching && !useNamePlate){
			if(this._nameCharacterCountStart==true){
				$currectSpeechingActorName = this._nameCharacterPreserve;
				this._nameCharacterCountStart = false;
			}
		}

		_Window_Message_prototype_processNewLine.call(this,textState);
	}
*/
	//プラグインコマンド
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if ((command || '').toUpperCase() === 'STANDPICTUREMANAGER') {
			//名前が数値だけの場合はそれをIDにアクターデータから名前を取得
			if (args[1].search(/^[0-9]+$/)==0){
				$currentPictures[args[0]]=$gameActors.actor(args[1].replace(/[^0-9]/g, "")).name();
			} else {
				$currentPictures[args[0]]=args[1];
			}
        }
        if ((command || '').toUpperCase() === 'RESETSTANDPICTURE') {
        	$currectSpeechingActorName="";
        	$pastSpeechingActorName="";
        	$currentPictures = {};
        }
        if ((command || '').toUpperCase() === 'STARTSTANDPICTURE') {
        	this.startStandPicture();
        }
        if ((command || '').toUpperCase() === 'ENDSTANDPICTURE') {
        	this.endStandPicture();
        }
    };

})();
