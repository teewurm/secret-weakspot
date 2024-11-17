import { ColorPalette, GameLayout } from "../../enums/Constants";
import { SquareType } from "../../enums/SquareType";
import GameSquare from "../../utils/GameSquare";
import IndexUtil from "../../utils/IndexUtil";
import SceneBase from "./SceneBase";

export default class MazeSceneBase extends SceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 2, 2, 2, 2, 2,],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected squareMatrix: GameSquare[][];

    protected mainContainer: Phaser.GameObjects.Container;

    init(_placeHolder?: Object | undefined): void {
        super.init();

        this.squareMatrix = [];
    }

    create() {
        this.cameras.main.setBackgroundColor(0x52AD9C);

        this.spawnFullScreenButton();
        this.spawnSquares();
        this.spawnPlayer();
    }

    protected spawnFullScreenButton(): void {
        let fullScreenText = this.add.text(20, 20, "Fullscreen", { color: this.scale.isFullscreen ? "#00ff00" : "#ff0000", fontSize: 52 });
        fullScreenText.setInteractive();
        fullScreenText.addListener("pointerup", () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.scale.addListener("enterfullscreen", () => fullScreenText.setColor("#00ff00"));
        this.scale.addListener("leavefullscreen", () => fullScreenText.setColor("#ff0000"));
    }

    protected spawnSquares() {
        const getWithOffset = (base: number): number => {
            return base * GameLayout.SquareEdgeLength * -0.5 + GameLayout.SquareEdgeLength / 2;
        }

        let x = 0;
        let y = getWithOffset(this.squareStartingMatrix.length);
        const allSquareObjects: Phaser.GameObjects.GameObject[] = [];

        this.squareStartingMatrix.forEach((row, yIndex) => {
            let newRow: GameSquare[] = [];

            x = getWithOffset(this.squareStartingMatrix[0].length);

            row.forEach((squareType, xIndex) => {
                let backgroundObject: Phaser.GameObjects.Rectangle | undefined = undefined;

                const colorSquareMap = new Map([
                    [SquareType.EMPTY, 0x000000],
                    [SquareType.PATH, ColorPalette.Path],
                    [SquareType.PORTAL, ColorPalette.PORTAL],
                    [SquareType.BOSS_PORTAL, ColorPalette.BOSS_PORTAL],
                    [SquareType.WALL, ColorPalette.Wall],
                ]);

                backgroundObject = this.add.rectangle(x, y, GameLayout.SquareEdgeLength, GameLayout.SquareEdgeLength, colorSquareMap.get(squareType));
                backgroundObject.setStrokeStyle(2, 0x000000);

                allSquareObjects.push(backgroundObject);

                newRow.push(new GameSquare(squareType, x, y, backgroundObject));
                x += GameLayout.SquareEdgeLength;
            });

            this.squareMatrix.push(newRow);
            y += GameLayout.SquareEdgeLength;
        });

        this.mainContainer = this.add.container(this.center_width, this.center_height, allSquareObjects);
    }

    protected spawnPlayer() {
        const square = this.squareMatrix[this.playerSpawn.y][this.playerSpawn.x];

        const player = this.add.rectangle(square.xCoordinate, square.yCoordinate, GameLayout.SquareEdgeLength * 0.8, GameLayout.SquareEdgeLength * 0.8, ColorPalette.PLAYER);
        player.setStrokeStyle(2, 0x000000);

        this.mainContainer.add(player);
    }
}