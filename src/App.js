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
    return result
}

const Word = ({word, validKeys}) => {
    if(!word) return null
    const joinedKeys = validKeys.join('')
    const matched = word.slice(0, joinedKeys.length)
    const remainder = word.slice(joinedKeys.length)

    return (
        <>
            <span className="matched">{matched}</span>
            <span className="remainder">{remainder}</span>
        </>
    )
}

function App(){
    const [typeKeys, setTypeKeys] = useState([])
    const [validKeys, setValidKeys] = useState([])
    const [completedWords, setCompletedWords] = useState([])
    const [word, setWord] = useState('')

    useEffect(() => {
        setWord(getWord())
    }, [])

    useEffect(() => {
        const wordFromValidKeys = validKeys.join('').toLowerCase()
        if(word && word === wordFromValidKeys) {
            let newWord = null
            do {
                newWord = getWord()
            } while(completedWords.includes(newWord))

            setWord(newWord)
            setValidKeys([])
            setCompletedWords((prev) => [...prev, word])
        }
    }, [word, validKeys])

    const handleKeyDown = (e) => {
        e.preventDefault()  
        const { key } = e

        setTypeKeys((prevTypeKeys) => {
            return [...prevTypeKeys, key].slice(-30)
        })

        if (isValidKey(key, word)){
            setValidKeys((prev) => {
                const isValidlength = prev.length <= word.length
                const isNextChar = isValidlength && word[prev.length] === key
                return (isNextChar) ? [...prev, key] : prev
            })
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
                    {completedWords.map((word) => {
                        return(
                            <li key={word}>{word}</li>
                        )
                    })}
                    <li>casa</li>
                    <li>carro</li>
                    <li>laranja</li>
                </ol>
            </div>
        </div>
    )
}

export default App