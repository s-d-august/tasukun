
const TskDialogue = () => {

    var talkStart = []

    return (
        talkStart = [
            {
                lines:[
                    "Hello, it's so nice to see you! What can I help you with?"
                ],
                choices:[
                    {
                        choice:"Can you suggest an activity?",
                        jump:"suggestActivity"
                    }
                ]
            }
        ]
        
    );
}

export default TskDialogue;