//Este componente hace que el texto de entrada y los valores almacenados en el browser sean persistentes, que no desaparezcan cuando actualizas..


import { useState, useEffect } from 'react'

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
//Para el caso de las funciones..
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

export default function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })
//obviamente tienes que hacerlo string conchatumadre     
    useEffect(() => {
       localStorage.setItem(key, JSON.stringify(value))
    }, [value])
     
    return [value, setValue]

}