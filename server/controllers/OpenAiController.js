import {Configuration, OpenAIApi} from "openai";

const key = process.env.OPENAI_KEY

const configuration = new Configuration({
    apiKey: key
});
const openai = new OpenAIApi(configuration);

class OpenAiController {
    static message = async (req, res, next) => {
        const {message} = req.body;
        if (message === "") {
            res.status(400).send("Would you write something?");
            return;
        }

        let response = "";
        if (message === "How can I buy a game?") {
            response = "Good question! Just go to some game page and click BUY button. It will proceed you to payment page, where you should give your credit information and get your products.";
        } else if (message === "How can I contact with admin?") {
            response = "If you want to contact with admin, you should text him by email. Email: unknowngames_help@gmail.com";
        } else if (message === "I want my money back!") {
            response = "We are sorry if you're not satisfied by our work. If you want your funds back, write to our email. Email: unknowngames_help@gmail.com";
        } else if (message === "I am not sure about buying!") {
            response = "If you are not sure, take some time, or just go on another website.";
        } else {
            res.status(400).send("Sorry, I don't understand your question.");
            return;
        }
        res.set("Connection", "keep-alive");
        res.write(JSON.stringify({msg: response}));
        res.end();
    }
}


export default OpenAiController;