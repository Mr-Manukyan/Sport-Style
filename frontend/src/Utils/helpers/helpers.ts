import sound from '../../Assets/audio/sound6.mp3';
import soundAdd from '../../Assets/audio/button4.mp3';
import soundMinusPlus from '../../Assets/audio/button3.mp3';


export const playBtnSound = () => {
   const buttonSound = new Audio(sound)
         buttonSound.volume = 0.2
         buttonSound.play()
  }

export const playBtnSound2 = () => {
    const buttonSound = new Audio(soundAdd)
          buttonSound.volume = 0.2
          buttonSound.play()
} 

export const playBtnMinusPlus = () => {
  const buttonSound = new Audio(soundMinusPlus)
        buttonSound.volume = 0.2
        buttonSound.play()
}  

