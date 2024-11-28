import { Assets, ColorPalette, SceneNames } from "../enums/Constants"
import SceneBase from "./bases/SceneBase"

export default class MainMenu extends SceneBase {
    protected menuContainer: Phaser.GameObjects.Container;

    constructor() {
        super(SceneNames.MainMenu);
    }

    create() {
        super.create();

        //todo remove
        // Boss.generateRandomWeaknesses(3);
        // console.log(Boss.currentWeaknesses)
        // const testData = new SceneData();
        // testData.backpackItems = [
        //     {type: ItemType.WEAPON, damageType: DamageType.Fire},
        //     {type: ItemType.WEAPON, damageType: DamageType.Water},
        //     {type: ItemType.WEAPON, damageType: DamageType.Void},
        //     {type: ItemType.WEAPON, damageType: DamageType.Electricity},
        //     {type: ItemType.WEAPON, damageType: DamageType.Poison},
        //     {type: ItemType.WEAPON, damageType: DamageType.Yellow},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Fire},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Water},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Void},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Electricity},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Poison},
        //     {type: ItemType.INFO_CARD, damageType: DamageType.Yellow},
        // ]

        // this.scene.start(SceneNames.Level1Boss, testData);

        const backgroundMusic = this.sound.get(Assets.Audio.PianoMusic);
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }

        const menuWidth = this.width / 3
        const menuHeight = this.height * 0.85

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Secret Weakspot", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const btnContainerMaxHeight = menuHeight * 0.4;
        const level1Btn = this.createTextBtn("Level 1", SceneNames.Level1Maze1);
        const level2Btn = this.createTextBtn("Level 2", SceneNames.Level2Maze1);
        const level3Btn = this.createTextBtn("Level 3", SceneNames.Level3Maze1);
        const btnContainer = this.createBtnContainer(btnContainerMaxHeight, [level1Btn, level2Btn, level3Btn]);

        this.menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer]);
    }
}