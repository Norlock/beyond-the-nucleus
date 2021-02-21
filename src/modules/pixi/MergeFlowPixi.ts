import { Component } from 'src/components/base/Component';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { pixiApp } from 'src/pixi/PixiApp';
import { PixiFlowComponents, PixiParams } from './Pixi';

export const MergeFlowPixi = (
    self: FlowComponent,
    params: PixiParams
): void => {
    const { components, containerName } = params;
    self.pixi = {
        components,
        containerName,
        hideComponents: () => hideComponent(components),
        scrollToComponent: () => scrollToComponent(components),
        load: (loadCount: number) => load(self, loadCount)
    };
};

const hideComponent = (components: PixiFlowComponents) => {
    const { card, bezier } = components;
    if (bezier) {
        bezier.visible = false;
    }
    card.visible = false;
}

const load = (self: FlowComponent, loadCount: number) => {
    if (loadCount === 0) {
        return;
    }

    if (self.mover.initialized) {
        loadNextNodes(self.mover.nextNodes, loadCount);
        return;
    }

    const { card, bezier } = self.pixi.components;
    self.mover.initialized = true;

    if (bezier) {
        self.chapter.root.addChild(bezier);
    }

    self.chapter.root.addChild(card);
    loadNextNodes(self.mover.nextNodes, loadCount);
}

const loadNextNodes = (nextNodes: Component[], loadCount: number) => {
    nextNodes.forEach(node => {
        if (node instanceof FlowComponent) {
            node.pixi.load(loadCount-1);
        }
    });
}

const scrollToComponent = (components: PixiFlowComponents) => {
    const { card, offset, bezier } = components;
    card.visible = true;

    if (bezier) {
        bezier.visible = true;
    }

    let xSpeed: number, ySpeed: number, deltaSpeed: number;
    let amplify = 10;

    const pos = card.getGlobalPosition();
    let newX = pos.x - offset.x;
    let newY = pos.y - offset.y;

    if (Math.abs(newX) > 1000 || Math.abs(newY) > 1000) {
        deltaSpeed = 60;
    } else {
        deltaSpeed = 40;
    }

    const xMul = newX < 0 ? -1 : 1;
    const yMul = newY < 0 ? -1 : 1;
    const xyRatio = Math.abs(newX / newY);

    if (xyRatio < 1) {
        xSpeed = deltaSpeed * xyRatio * xMul;
        ySpeed = deltaSpeed * yMul;
    } else {
        xSpeed = deltaSpeed * xMul;
        ySpeed = (deltaSpeed / xyRatio) * yMul;
    }

    const absXSpeed = Math.abs(xSpeed);
    const absYSpeed = Math.abs(ySpeed);

    const scrollAnimation = (): void => {
        if (absXSpeed < Math.abs(newX) && absYSpeed < Math.abs(newY)) {
            pixiApp.stage.setTransform(pixiApp.stage.x - xSpeed, pixiApp.stage.y - ySpeed);
            newX -= xSpeed;
            newY -= ySpeed;

            if (amplify-- > 0) {
                xSpeed = xSpeed * 1.05;
                ySpeed = ySpeed * 1.05;
            }
        } else {
            pixiApp.stage.setTransform(pixiApp.stage.x - newX, pixiApp.stage.y - newY);
            pixiApp.ticker.remove(scrollAnimation);
        }
    };

    pixiApp.ticker.add(scrollAnimation);
};
