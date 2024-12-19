import { createContext, useState } from "react";
import run from "../../gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout( function () {
            setResultData( prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const newChatTip1 = () => {
        setLoading(false)
        setShowResult(false)
        let chatTipInput = document.getElementById('chatTip1');
        let chatTipValue = chatTipInput.textContent;
        setInput(chatTipValue)
        setPrevPrompts([chatTipValue])
        onSent(chatTipValue)
        setInput("")
    }

    const newChatTip2 = () => {
        setLoading(false)
        setShowResult(false)
        let chatTipInput = document.getElementById('chatTip2');
        let chatTipValue = chatTipInput.textContent;
        setInput(chatTipValue)
        setPrevPrompts([chatTipValue])
        onSent(chatTipValue)
        setInput("")
    }

    const newChatTip3 = () => {
        setLoading(false)
        setShowResult(false)
        let chatTipInput = document.getElementById('chatTip3');
        let chatTipValue = chatTipInput.textContent;
        setInput(chatTipValue)
        setPrevPrompts([chatTipValue])
        onSent(chatTipValue)
        setInput("")
    }

    const newChatTip4 = () => {
        setLoading(false)
        setShowResult(false)
        let chatTipInput = document.getElementById('chatTip4');
        let chatTipValue = chatTipInput.textContent;
        setInput(chatTipValue)
        setPrevPrompts([chatTipValue])
        onSent(chatTipValue)
        setInput("")
    }

    const onSent = async (prompt) => {
        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompts( prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for ( let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for ( let i = 0; i < newResponseArray.length; i++) 
        {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        newChatTip1,
        newChatTip2,
        newChatTip3,
        newChatTip4
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;