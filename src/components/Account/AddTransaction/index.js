import React, { useState } from 'react'
import { Grid, Form } from "semantic-ui-react"
import { useDispatch } from "react-redux"

//ACTIONS
import { ADD_TRANSACTION }from "../../../reducers/transactions/action"

const AddTransaction = () => {
    const [state, setState] = useState({radio: "income"})
    const [errors, setErrors] = useState({})
    const [options, setOptions] = useState([
        {key: "jedzenie", text: "Jedzenie", value: "Jedzenie" },
        {key: "rachunki", text: "Rachunki za mieszkanie", value: "Rachunki za mieszkanie" },
        {key: "transport", text: "Transport", value: "Transport" },
        {key: "zdrowie", text: "Opieka zdrowotna", value: "Opieka zdrowotna" },
        {key: "higiena", text: "Higiena", value: "Higiena" },
        {key: "odzież", text: "Odzież", value: "Odzież" },
        {key: "rozrywka", text: "Rozrywka", value: "Rozrywka" },
    ])

    const dispatch = useDispatch()

    const handleChange = (e, {name, value}) => {
        setState({...state, [name]: value})
        if(errors[name]){
            delete errors[name];
        }
    }

    const handleAddition = (e, { value }) => {
    setOptions([...options, { key: value, text: value, value }])
  }


    const handleSubmit = () => {
        validation()
    }

    function validation(){
        let error = errors
        if(state.title === "" || state.title === undefined){
            error = {...error, title: {content: "Pole wymagane!", pointing: 'below'}}
        }
        if(state.date === "" || state.date === undefined){
            error = {...error, date: {content: "Pole wymagane!", pointing: 'below'}}
        }
        if(state.value === "" || state.value === undefined){
            error = {...error, value: {content: "Pole wymagane!", pointing: 'below'}}
        } else if(isNaN(parseInt(state.value))){
            error = {...error, value: {content: "Wpisz poprawnie wartość!", pointing: 'below'}}
        } else if(parseInt(state.value) <=0){
            error = {...error, value: {content: "Wartość nie może być <= 0!", pointing: 'below'}}
        }
        if(state.radio === "income") {
            delete state["select"]
        }
        if(state.radio === "expense" && state.select === undefined){
            error = {...error, select: {content: "Wybierz kategorię!", pointing: 'below'}}
        }


        if(Object.keys(error).length){
            setErrors(error)
        } else {
            dispatch({type: ADD_TRANSACTION, payload: state})
        }
    }

    return (
        <>
            <Grid centered style={{margin: "20px 0 0 0", padding: "10px", boxShadow: "0 2px 5px 0px rgba(50, 50, 50, 0.6)"}}>
                <Grid.Column  computer={12} mobile={16}>
                    <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                name='title'
                                placeholder="Tytuł"
                                error={errors.title} />
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                type="date"
                                name='date'
                                error={errors.date} />
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                placeholder="Wartość"
                                name='value'
                                error={errors.value} />
                            <Grid centered columns={2} style={{margin: "8px"}}>
                                    <Form.Group style={{margin: 0}}>
                                        <Form.Radio
                                        onChange={handleChange}
                                        checked={state.radio === "income"}
                                        label='Przychód'
                                        name='radio'
                                        value='income' />
                                        <Form.Radio
                                            onChange={handleChange}
                                            checked={state.radio === "expense"}
                                            label='Wydatek'
                                            name='radio'
                                            value='expense' />
                                    </Form.Group>
                            </Grid>
                            {state.radio === "expense" ?
                                <Form.Dropdown
                                    options={options}
                                    placeholder='Wybierz'
                                    search
                                    selection
                                    fluid
                                    allowAdditions
                                    name="select"
                                    onAddItem={handleAddition}
                                    onChange={handleChange}
                                    error={errors.select}
                                    />
                            : ""}
                            <Form.Button fluid primary>Dodaj</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default AddTransaction