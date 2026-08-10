import { Image } from "react-bootstrap"
import breath1 from "../files/breath1.png"
import breath2 from "../files/breath2.png"
import breath3 from "../files/breath3.png"
import def from "../files/def.png"
import earnest from "../files/earnest.png"
import excited from "../files/excited.png"
import gentle from "../files/gentle.png"
import pleased from "../files/pleased.png"
import worried from "../files/worried.png"

const avatarImages = {
    breath1,
    breath2,
    breath3,
    def,
    earnest,
    excited,
    gentle,
    pleased,
    worried,
}

const AvatarHandler = ({ face }) => {
    const expression = avatarImages[face] || avatarImages.def

    return (
        <Image id="avatarImg" src={expression} />
    )

}

export default AvatarHandler