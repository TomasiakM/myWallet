import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

//STYLED
import { Container, HistoryHeader, HistoryElement, ElementInfo, Title } from "./style"

//ACTION
import { REMOVE_TRANSACTION } from "../../reducers/transactions/action"

const History = () => {

    const transactions = useSelector(state => state.transactions)
    transactions.sort((a, b) => b.id-a.id)
    const dispatch = useDispatch();

    let transactionsLenght, items = []

    if(transactions.length > 5  ) {
        transactionsLenght = 5
    } else {
        transactionsLenght = transactions.length
    }

    let lastDate = null;
    for(let i = transactions.length; i > transactions.length - transactionsLenght; i--){
        let transaction = transactions[transactions.length - i]
        if(lastDate === transaction.date){
            items.push(
                <div key={`history${transaction.id}`}>
                    <HistoryElement>
                        <Icon name="exchange" color={transaction.type === "income" ? "green" : "red"}/>
                        <ElementInfo>
                            <div>{transaction.title} {transaction.category ? `(${transaction.category})` : ""}</div>
                            <div>{transaction.type === "income" ? "" : "-"}{transaction.value.toFixed(2).toString().replace(".", ",")}zł</div>
                        </ElementInfo>
                        <Icon onClick={() => dispatch({type: REMOVE_TRANSACTION, payload: transaction.id})} name="delete" color="red" style={{cursor: "pointer"}} />
                    </HistoryElement>
                </div>)
        } else {
            items.push(
                <div key={`history${transaction.id}`}>
                    <HistoryHeader>
                        {transaction.date}
                    </HistoryHeader>
                    <HistoryElement>
                        <Icon name="exchange" color={transaction.type === "income" ? "green" : "red"}/>
                        <ElementInfo>
                            <div>{transaction.title} {transaction.category ? `(${transaction.category})` : ""}</div>
                            <div>{transaction.type === "income" ? "" : "-"}{transaction.value.toFixed(2).toString().replace(".", ",")}zł</div>
                        </ElementInfo>
                        <Icon onClick={() => dispatch({type: REMOVE_TRANSACTION, payload: transaction.id})} name="delete" color="red" style={{cursor: "pointer"}} />
                    </HistoryElement>
                </div>)
        }

        lastDate = transaction.date
    }

    return (
        <Container>
            <div style={{width: "100%"}}>
                {transactions.length ? <div>
                    <Title>
                        <h3>Historia</h3>
                        <Link to="/history">
                            Pełna historia
                        </Link>
                    </Title>
                <div>
                    {items}
                </div></div> : <div style={{textAlign: "center"}}><h2>Brak historii</h2></div>}
            </div>
        </Container>
    )
}

export default History