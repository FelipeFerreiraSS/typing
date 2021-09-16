import React, { useEffect, useState } from 'react'
import wordList from './resource/words.json'

const getWord = () => {
    const index = Math.floor(Math.random() * wordList.length)
    const word = wordList[index]
    return word.toLowerCase()
}

const isValidKey = (key, word) => {
    if(!word) return false
    const result = word.split('').includes(key)
}

const Word = ({word, validKeys}) => {
    return (
        <>
            <span className="matched"></span>
            <span className="remainder">{word}</span>
        </>
    )
}

function App(){
    const [typeKeys, setTypeKeys] = useState([])
    const [validKeys, setValidKeys] = useState([])
    const [word, setWord] = useState('')

    useEffect(() => {
        setWord(getWord())
    }, [])

    const handleKeyDown = (e) => {
        e.preventDefault()  
        const { key } = e

        setTypeKeys((prevTypeKeys) => {
            return [...prevTypeKeys, key].slice(-30)
        })

        if (isValidKey(key, word)){

        }

        console.log(key)
    }

    return(
        <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
            <div className="valid-keys">
                <Word word={word} validKeys={validKeys}/>
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