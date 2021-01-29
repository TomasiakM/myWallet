import styled from "styled-components"

export const Container = styled.div`
    width: calc(100% - 20px);
    margin: 20px;

    @media(max-width: 824px){
        width: 100%;
        margin-top: 10px;
    }
`

export const TitleContainer = styled.div`
    box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
    width: 100%;
    margin: 0 auto;
    padding: 6px;

    @media(max-width: 824px){
        width: calc(100% - 8px);
        margin: 0 4px;
    }
`

export const Title = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3{
        margin: 0;
    }
`
export const ChartsContainer = styled.div`
    margin: 10px 0;

    @media(max-width: 824px){
        margin: 0;
    }
`

export const TopCharts = styled.div`
    display: flex;
    justify-content: space-around;

    @media(max-width: 824px){
        flex-direction: column;
    }
`