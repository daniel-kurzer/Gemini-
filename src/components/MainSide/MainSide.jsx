import React, { useContext } from 'react'
import './MainSide.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

const MainSide = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChatTip1, newChatTip2, newChatTip3, newChatTip4 } = useContext(Context);

    return (
        <div id='#' className='main'>
            <div className="nav">
                <a href=""><p>Gemini</p></a>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">

                {!showResult 
                
                    ?

                    <>
                        <div className="greet">
                            <p><span>Hello Daniel</span></p>
                            <p>How can I help you today ?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => newChatTip1()} className="card">
                                <p id='chatTip1'>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div onClick={() => newChatTip2()} className="card">
                                <p id='chatTip2'>Briefly summarize this concept: urban planing</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div onClick={() => newChatTip3()} className="card">
                                <p id='chatTip3'>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div onClick={() => newChatTip4()} className="card">
                                <p id='chatTip4'>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>

                    : 
                    
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            {loading ? <img style={{ animation: 'LogoSpin 3s infinite linear' }} src={assets.Gemini_Logo} alt="Gemini Logo"/> : <img src={assets.Gemini_Logo} alt="Gemini Logo"/>}
                            {loading ?
                        
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            
                            :

                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>
                    </div>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input className='search-box-input' onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter Prompt...' />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : <img src={assets.mic_icon} alt="Mic Icon" />}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. <span>Your Privacy & Gemini Apps</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainSide