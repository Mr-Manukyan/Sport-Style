import sound from '../../Assets/audio/sound6.mp3';


export const playBtnSound = () => {
   const buttonSound = new Audio(sound)
         buttonSound.volume = 0.2
         buttonSound.play()
}



