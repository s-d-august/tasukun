import { Image } from "react-bootstrap"

const avatarImages = require.context("../files", false, /\.png$/)

const AvatarHandler = ({ face }) => {

    const imageKey = `./${face}.png`
    const expression = avatarImages.keys().includes(imageKey)
        ? avatarImages(imageKey)
        : avatarImages("./def.png")

    return (
        <Image id="avatarImg" src={expression} />
    )

}

export default AvatarHandler