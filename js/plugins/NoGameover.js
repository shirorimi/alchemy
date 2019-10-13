//=============================================================================
// NoGameover.js
//=============================================================================

/*:
 * @plugindesc NoGameover
 * @author yuwaka
 *
 * @param Switch ID
 * @desc The ID of the switch to be turned ON when AllDead.
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 *I role model Tachi's plug-ins.
 *Thank you very much.
 */

/*:ja
 * @plugindesc ゲームオーバーにならないよ。
 * @author ゆわか
 *
 * @param Switch ID
 * @desc 戦闘中でもマップでも全滅したときにONにするスイッチのIDです。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 *　自動的にフェードアウトするようにしています。
 *　フェードインはスイッチで呼び出すコモンイベントへ入れて
 *　好きなタイミングで行ってください。
 *　（フェードアウトしたくなければ、コメントアウトしてね）
 *
 *　このプラグインはもうあなたのものです。
 *　お好きなように使ってください。
 *
 *　ＲＰＧツクールＭＶサンプルゲーム「シーピラート」のプラグインを
 *　参考にさせて頂きました。
 *　ありがとうございます。
 */

(function() {

    var parameters = PluginManager.parameters('NoGameover');
    var switchId = Number(parameters['Switch ID'] || 0);

//rpg_managers.jsより（戦闘で全滅した場合）
BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if ($gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);//ゲームオーバーを表示するぜ
            $gameScreen.startFadeOut(10); //フェードアウトするぜ
	    $gameSwitches.setValue(switchId, true); //全滅したぜ
            $gameParty.reviveBattleMembers(); //みんな生き返るぜ
            SceneManager.pop(); //マップ画面へ移動するぜ
        }
    } else {
        SceneManager.pop();
    }
    this._phase = null;
};


})();
