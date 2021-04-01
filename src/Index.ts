import './styles/index.scss';
import './Global';
import { ComponentManager } from './components/base/ComponentManager';
import { preload } from './pixi/PixiApp';

const initSplash = () => {
    const button = document.getElementById('splash-button');
    const splash = document.getElementById('splash-container');
    const header = document.getElementById('splash-header');
    const earth: HTMLImageElement = document.getElementById('splash-image-earth') as HTMLImageElement;
    const bridge: HTMLImageElement = document.getElementById('splash-image-bridge') as HTMLImageElement;
    const hover: HTMLAudioElement = new Audio('/src/assets/hover.ogg');
    const hoverOff: HTMLAudioElement = new Audio('/src/assets/hoverOff.ogg');
    const fadeIn = 'fadeIn';
    const fadeOut = 'fadeOut';

    const promise = preload();

    button.addEventListener('click', () => {
        splash.remove();
        promise.then(() => {
            ComponentManager.init();
            ComponentManager.connectInputHandler();
        });
    });

    hover.volume = 0.2;
    hoverOff.volume = 0.1;

    button.addEventListener('mouseover', () => {
        bridge.classList.remove(fadeIn);
        earth.classList.add(fadeIn);
        header.classList.add(fadeOut);
        hover.play();
    });

    button.addEventListener('mouseleave', () => {
        earth.classList.remove(fadeIn);
        header.classList.remove(fadeOut);
        bridge.classList.add(fadeIn);
        hoverOff.play();
    });

    const makeButtonVisible = () => {
        button.style.visibility = 'visible';

        document.body.removeEventListener('click', makeButtonVisible);
    };

    document.body.addEventListener('click', makeButtonVisible);
};

initSplash();

//testBlinkList();
