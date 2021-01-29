import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

//STYLE
import { Container, Title, History, HistoryElement, HistoryHeader, ElementInfo } from "./style"

//ACTION
import { REMOVE_TRANSACTION } from "../../reducers/transactions/action"

const FullHistory = () => {
    const dispatch = useDispatch()

    const transactions = useSelector(state => state.transactions)

    const transSortedByDate = transactions.sort((e1, e2) => {
        const date1 = new Date(e1.date).getTime()
        const date2 = new Date(e2.date).getTime()

        return date2 -date1
    })

    let lastDate

    return (
        <Container>
            <Title>
                <h3>FullHistory</h3>
                <Link to="/">
                    <Icon name="home" color="blue" size="big" />
                </Link>
            </Title>
            <History>
                {transSortedByDate.map((e) => {
                    if(lastDate !== e.date){
                        lastDate = e.date
                        return (
                            <div key={e.id}>
                                <HistoryHeader>
                                    {e.date}
                                </HistoryHeader>
                                <HistoryElement>
                                    {e.type === "income" ? <Icon name="exchange" color="green" /> : <Icon name="exchange" color="red" /> }
                                <ElementInfo>
                                        <div>{e.title} {e.category ? ` (${e.category})` : ""}</div>
                                        <div>{e.type === "income" ? "" : "-"}{e.value.toFixed(2).toString().replace(".", ",")}zł</div>
                                </ElementInfo>
                                <Icon name="delete" color="red" onClick={() => dispatch({type: REMOVE_TRANSACTION, payload: e.id})} style={{cursor: "pointer"}} />
                                </HistoryElement>
                            </div>
                        )
                    }
                    lastDate = e.date
                    return (

                        <HistoryElement key={"element" + e.id}>
                        {e.type === "income" ? <Icon name="exchange" color="green" /> : <Icon name="exchange" color="red" /> }
                        <ElementInfo>
                                <div>{e.title} {e.category ? ` (${e.category})` : ""}</div>
                                <div>{e.type === "income" ? "" : "-"}{e.value.toFixed(2).toString().replace(".", ",")}zł</div>
                        </ElementInfo>
                        <Icon name="delete" color="red" onClick={() => dispatch({type: REMOVE_TRANSACTION, payload: e.id})} style={{cursor: "pointer"}} />
                        </HistoryElement>
                    )
                })}
            </History>
        </Container>
    )
}

export default FullHistory