import React, { useState } from 'react'

function App(){
    const [typeKeys, setTypeKeys] = useState([])
    const handleKeyDown = (e) => {
        e.preventDefault()  
        const { key } = e

        setTypeKeys((prevTypeKeys) => {
            return [...prevTypeKeys, key].slice(-30)
        })

        console.log(key)
    }

    return(
        <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
            <div className="valid-keys">
                <span className="matcherd">Feli</span> 
                <span className="remainder">pe</span>
            </div>
            <div className="type-keys">{typeKeys ? typeKeys.join(' ') : null}</div>
            <div className="completed-words">
                <ol>
                    <li>casa</li>
                    <li>carro</li>
                    <li>laranja</li>
                </ol>
            </div>
        </div>
    )
}

export default App