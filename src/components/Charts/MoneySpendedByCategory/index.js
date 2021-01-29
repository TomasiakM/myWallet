import React, { useState } from 'react'
import Chart from "react-apexcharts"
import styled from "styled-components"
import { Form } from "semantic-ui-react"
import { useSelector } from 'react-redux'

const Container = styled.div`
  box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
  width: calc(100% - 10px);
  margin: 10px 0 10px 10px;

  @media(max-width: 824px){
    width: calc(100% - 8px);
    margin: 10px 4px;
  }
`

const MoneySpendedByCategory = () => {
  const monthNow = new Date().getMonth()
  const [select, setSelect] = useState(monthNow)

  const handleChange = (e, {value}) => {
    setSelect(value)
  }

  const months = [
    {key: "Styczeń", text: "Styczeń", value: 0,},
    {key: "Luty", text: "Luty", value: 1,},
    {key: "Marzec", text: "Marzec", value: 2,},
    {key: "Kwiecień", text: "Kwiecień", value: 3,},
    {key: "Maj", text: "Maj", value: 4,},
    {key: "Czerwiec", text: "Czerwiec", value: 5,},
    {key: "Lipiec", text: "Lipiec", value: 6,},
    {key: "Sierpień", text: "Sierpień", value: 7,},
    {key: "Wrzesień", text: "Wrzesień", value: 8,},
    {key: "Październik", text: "Październik", value: 9,},
    {key: "Listopad", text: "Listopad", value: 10,},
    {key: "Grudzień", text: "Grudzień", value: 11,},
  ]

  const transactions = useSelector(state => state.transactions)
  const yearNow = new Date().getFullYear()
  const lastYear = new Date(`${yearNow - 1}-${monthNow + 2}-01`).getTime()
  let lastYearTransactions = []
  //Geting transactions from last year
  transactions.forEach(e => {
    const elementDate = new Date(e.date.slice(0, 7)).getTime()
    const thisMonth = new Date(`${yearNow}-${monthNow + 2}`).getTime()
      if(elementDate >= lastYear && elementDate < thisMonth){
          lastYearTransactions.push({type: e.type, value: e.value, category: e.category, date: parseInt(e.date.slice(5, 7))})
      }
  })

  //Geting transactionst from selected month
  let pieChartObj = {}
  lastYearTransactions.forEach(e => {
    if(((e.date - 1) === select) && (e.type === "expense")){
      pieChartObj = {...pieChartObj, [e.category]: pieChartObj[e.category] === undefined ? e.value : pieChartObj[e.category] + e.value }
    }
  })


  //Select Sorting
  const slicedMonths1 = months.slice(0, monthNow + 1)
  const slicedMonths2 = months.slice(monthNow + 1, 12)
  const newMonths = slicedMonths2.concat(slicedMonths1).reverse()



  const state = {
            series: Object.values(pieChartObj),
            options: {
                labels: Object.keys(pieChartObj),
                theme: {
                    monochrome: {
                        enabled: true
                    }
                },
                dataLabels: {
                formatter: function (val, opts) {
                    console.log();
                    return `${opts.w.config.series[opts.seriesIndex]}`
                },
              },
                title: {
                  text: "Wydatki wg kategorii"
                },
                legend: {
                    show: false
                },
            },
        };
  return (
      <Container>
        <Form.Dropdown
          style={{margin: "6px", width: "calc(100% - 12px)"}}
          options={newMonths}
          value={select}
          fluid
          selection
          onChange={handleChange}
        />
        {Object.keys(pieChartObj).length > 0 ? <Chart
                options={state.options}
                series={state.series}
                type="pie"
                />
            : <h3 style={{margin: "20px", textAlign: "center"}}>Brak wydatków w podanym miesiącu</h3>
        }
      </Container>
  )
}

export default MoneySpendedByCategory