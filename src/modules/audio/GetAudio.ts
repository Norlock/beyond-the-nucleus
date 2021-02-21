import { AudioComponent } from './AudioComponent';

export const GetAudio = (audioPath: string, loop: boolean, maxVolume = 1): AudioComponent => {
    const self = new Audio(audioPath);
    self.volume = maxVolume;
    self.loop = loop;

    const fadeIn = () => {
        self.volume = 0;
        self.play();

        const fadeAudio = setInterval(() => {
            // Fade but round decimal to avoid out of bound index.
            if (Math.round(self.volume * 10) / 10 < maxVolume) {
                self.volume += 0.1;
            } else {
                clearInterval(fadeAudio);
            }
        }, 300);
    };

    const fadeOut = () => {
        const fadeAudio = setInterval(() => {
            // Only fade if past the fade out point or not at zero already
            if (Math.round(self.volume * 10) / 10 > 0) {
                self.volume -= 0.1;
            } else {
                clearInterval(fadeAudio);
                self.pause();
            }
        }, 300);
    };

    return {
        element: self,
        fadeIn,
        fadeOut
    };
};
