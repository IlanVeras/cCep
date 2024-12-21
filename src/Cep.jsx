import React from "react";
import axios from "axios"
import styles from "./Cep.module.css"

export default function Cep(){
    const [dados,setDados] = React.useState()
    const [loading,setLoading] = React.useState(false)
    const [valor,setValor] = React.useState('')
    const [erro,setErro] = React.useState('')

    function handler(value){
        setErro([])
        setDados([])
        console.log(value)
        setLoading(true)
        axios.get(`https://brasilapi.com.br/api/cep/v1/${value}`)
        .then(response => {
            setErro('')
            setDados(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log("ii")
            console.log(error)
            if(error.code == "ERR_BAD_REQUEST"){
                setDados([])
                setErro("CEP não encontrado")
            }
            else if(error.code == "ERR_NETWORK"){
                setDados([])
                setErro("Rede com problema")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.inputBtn}>
                    <input
                    className={styles.inputCep}
                    type="number"
                    value={valor}
                    placeholder="Digite o CEP"
                    onChange={(e) => setValor(e.target.value)}
                    ></input>
                    <button
                    onClick={() => handler(valor)}
                    className={styles.btn}
                    >Testar</button>
                </div>
                {loading && <div className={styles.loading}></div>}
                {dados && dados.state &&(
                    <div className={styles.information}>
                        <p>Estado: {dados.state}</p>
                        <p> Cidade: {dados.city} </p>
                        <p> Rua: {dados.street} </p>
                        <p> Estado: {dados.state} </p>
                    </div>
                )}
                {erro && <div className={styles.erro}>{erro}</div>}
            </div>
        </div>
    )
}