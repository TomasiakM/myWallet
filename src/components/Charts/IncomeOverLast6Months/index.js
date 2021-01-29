import React from 'react'
import Chart from "react-apexcharts"
import styled from "styled-components"
import { useSelector } from 'react-redux'

const Container = styled.div`
  box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
  width: calc(100% - 10px);
  margin: 10px 10px 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media(max-width: 824px){
    width: calc(100% - 8px);
    margin: 10px 4px;
  }
`

const IncomeOverLast6Months = () => {
  const transactions = useSelector(state => state.transactions)


  const monthNow = new Date().getMonth()
  const yearNow = new Date().getFullYear()
  const date6MonthAgo = new Date(`${monthNow - 4 < 0 ? yearNow - 1 : yearNow}-${monthNow - 4 < 0 ? monthNow - 4 + 12 : monthNow -4}-01`).getTime()

  const months = [
      { key: "Styczeń", text: "Styczeń", value: 0 },
      { key: "Luty", text: "Luty", value: 1 },
      { key: "Marzec", text: "Marzec", value: 2 },
      { key: "Kwiecień", text: "Kwiecień", value: 3 },
      { key: "Maj", text: "Maj", value: 4 },
      { key: "Czerwiec", text: "Czerwiec", value: 5 },
      { key: "Lipiec", text: "Lipiec", value: 6 },
      { key: "Sierpień", text: "Sierpień", value: 7 },
      { key: "Wrzesień", text: "Wrzesień", value: 8 },
      { key: "Październik", text: "Październik", value: 9 },
      { key: "Listopad", text: "Listopad", value: 10 },
      { key: "Grudzień", text: "Grudzień", value: 11 },
    ]

  let last6MonthsTransactions = []
  transactions.forEach(e => {
    const elementDate = new Date(e.date.slice(0, 7)).getTime()
    const thisMonth = new Date(`${yearNow}-${monthNow + 2}`).getTime()
      if(elementDate >= date6MonthAgo && elementDate < thisMonth  && e.type === "income"){
          last6MonthsTransactions.push({type: e.type, value: e.value, date: parseInt(e.date.slice(5, 7))})
      }

  })

  let pieCharObj = {}

  for(let i = monthNow - 5; i <= monthNow; i++ ){
    let month = i < 0 ? i+12 : i
    pieCharObj = {...pieCharObj, [months[month].text]: 0 }
  }
  last6MonthsTransactions.forEach((e) => {
    pieCharObj = { ...pieCharObj, [months[e.date-1].text]: pieCharObj[months[e.date-1].text] + e.value }
  })
  console.log(pieCharObj);

  const state = {
      options: {
        chart: {
          id: "basic-bar",
          zoom: {
            enabled: false
            },
          toolbar: {
            show: false
            }
        },
        xaxis: {
          categories: Object.keys(pieCharObj)
        },
        yaxis: {
            labels: {
                  formatter: (val) => val + "zł"
                }
        },
        title: {
                text: 'Dochód z ostatnich 6 miesięcy',
                align: 'left'
              },
      },
      series: [
        {
          name: "Dochód",
          data: Object.values(pieCharObj)
        }
      ],
    };

  return (
      <Container>
            <Chart
                options={state.options}
                series={state.series}
                type="line"
                />
      </Container>
  )
}

export default IncomeOverLast6Months