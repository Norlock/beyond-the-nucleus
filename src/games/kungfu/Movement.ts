export class MovementSprite extends PIXI.Sprite {
    velocityX: number;
    velocityY: number;

    currentColumn(tileSize: number): number {
        return Math.trunc(this.x / tileSize);
    }
}
