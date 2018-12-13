import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'
import {TextValidator} from 'react-material-ui-form-validator'
import SexSelect from './SexSelect'


//Styled Components=====================================================================================================
const DetailsTitle = styled(md.Typography)``;
const DetailsInputsField = styled(md.CardContent)`
  @media screen and (max-device-width: 455px) {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
    }
  }
  div {
    display: flex;
  }
`;
const AgeInput = styled(TextValidator)``;
const CountryInput = styled(TextValidator)``;
const CityInput = styled(TextValidator)``;
//======================================================================================================================


const DetailsInputs = (props) => {
    const {ageValue, sexValue, countryValue, cityValue, setValue} = props

    return (
        <DetailsInputsField>
            <DetailsTitle>Details</DetailsTitle>
            <div style={{marginBottom: 10}}>
                <AgeInput
                    name="age"
                    size="large"
                    type="number"
                    label="Age"
                    inputProps={{min: 0, max: 99}}
                    style={{marginRight: 20, width: 200}}
                    value={ageValue}
                    onChange={setValue}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <SexSelect sexValue={sexValue} setValue={setValue}/>
            </div>
            <div>
                <CountryInput
                    name="country"
                    size="large"
                    type="text"
                    label="Coutry"
                    style={{marginRight: 20}}
                    value={countryValue}
                    onChange={setValue}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <CityInput
                    name="city"
                    size="large"
                    type="text"
                    label="City"
                    value={cityValue}
                    onChange={setValue}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
            </div>
        </DetailsInputsField>
    )
}

export default DetailsInputs