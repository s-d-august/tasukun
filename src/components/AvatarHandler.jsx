import { Image } from "react-bootstrap"

const avatarImages = require.context("../files", false, /\.png$/)

const AvatarHandler = ({ face }) => {
    console.log("avatar handler", face)

    const imageKey = `./${face}.png`
    const expression = avatarImages.keys().includes(imageKey)
        ? avatarImages(imageKey)
        : console.log("expression not found")

    return (
        <Image id="avatarImg" src={expression} />
    )

}

export default AvatarHandler