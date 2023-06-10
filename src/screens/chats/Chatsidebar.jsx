import React, { useState } from 'react'
import './chats.css'
const Chatsidebar = ({ people, setSelectedPerson }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sideBar ${isExpanded ? 'expanded' : 'shrinked'}`}>
            <div className="chart-search">
                <input type="text" placeholder='Search here...' />
            </div>
            <button className="toggle-button" onClick={handleToggle}>
                {isExpanded ? '<' : '>'}
            </button>
            {people.length !== 0
                ?
                people.map((ele) => <button className={`people ${isExpanded ? 'expanded' : 'shrinked'}`} onClick={() => setSelectedPerson(ele)}>
                    <div className={`display`}>
                        <div className="img">{ele.name[0]}</div>
                        <span >{ele.name}</span>
                    </div>
                </button>)
                :
                <div style={{ color: 'black' }}>
                No Chats started yet.
                </div>
            }
        </div>
    );
};

export default Chatsidebar