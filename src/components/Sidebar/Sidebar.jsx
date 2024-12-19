import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const darkcolor = '#000';
    const lightcolor = '#fff';
    const subDarkColor = '#1e1f20';
    const subLightColor = '#f0f4f9';

    const toggleSwitch = () => {
        const modeSwitch = document.getElementById('modeSwitch');
        const main_bg = document.getElementById('body');
        const newchat_bg = document.getElementsByClassName('new-chat');
        const sidebar_bg = document.getElementById('sidebar');
        const sidebar_menu = document.getElementById('menu');
        const bottom_icon = document.getElementById('bottom-icon');
        const settings_div = document.getElementById('settings-div');
        const settings_item = document.getElementById('settings-item');

        /* Darkmode */
        if (modeSwitch.checked) {
            main_bg.style.backgroundColor = darkcolor;
            main_bg.style.color = lightcolor;
            sidebar_bg.style.backgroundColor = subDarkColor;
            sidebar_menu.style.backgroundColor = darkcolor;
            newchat_bg.style.backgroundColor = subLightColor;
            settings_div.style.backgroundColor = subLightColor;
            settings_item.style.color = subLightColor;
            bottom_icon.style.backgroundColor = subLightColor;
        }
        /* Ligthmode */
        else {
            main_bg.style.backgroundColor = lightcolor;
            main_bg.style.color = darkcolor;
            sidebar_bg.style.backgroundColor = subLightColor;
            sidebar_menu.style.backgroundColor = lightcolor;
            newchat_bg.style.backgroundColor = subDarkColor;
            settings_div.style.backgroundColor = subDarkColor;
            settings_item.style.color = subDarkColor;
            bottom_icon.style.backgroundColor = subDarkColor;
        }
    }


    const settingsDiv = () => {
        const subNav = document.getElementsByClassName('settings-div')[0];
        if (subNav) {
            subNav.style.display = subNav.style.display === 'block' ? 'none' : 'block';
        } else {
            console.error('Element with class "settings-div" not found.');
        }
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar' id='sidebar'>
            <div className="top">
                <i className="fa-solid fa-bars menu" id='menu' onClick={() => setExtended(prev => !prev)}>{extended ? <span className='menu-text'>Menu</span> : null}</i>
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry-prompt">
                                    <img src={assets.message_icon} alt="Message Icon" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry" id='bottom-icon'>
                    <i class="fa fa-question-circle-o" id='bottom-icon' aria-hidden="true"></i>
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <i class="fa fa-history" aria-hidden="true"></i>
                    {extended ? <p>Activity</p> : null}
                </div>
                <div onClick={() => settingsDiv()} className="bottom-item recent-entry settings">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    {extended ? <p>Settings</p> : null}
                </div>
                <div id='settings-div' className="settings-div">
                    <a id='settings-item' href=""><i class="fa-solid fa-puzzle-piece"></i> Extensions</a>
                    <a id='settings-item' href=""><i class="fa-solid fa-link"></i>Public Links</a>
                    <a id='settings-item' href=""><i class="fa-regular fa-moon"></i> Dark Design</a>
                    <label class="switch">
                        <input id="modeSwitch" onClick={toggleSwitch} type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Sidebar