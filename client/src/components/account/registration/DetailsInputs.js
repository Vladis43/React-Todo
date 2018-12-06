import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'
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
const AgeInput = styled(md.TextField)``;
const CountryInput = styled(md.TextField)``;
const CityInput = styled(md.TextField)``;
//======================================================================================================================


const DetailsInputs = (props) => {
    const {ageValue, sexValue, countryValue, cityValue, setValue, errorMessage} = props

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
                    helperText={errorMessage.age}
                    error={errorMessage.age ? true : false}
                />
                <SexSelect sexValue={sexValue} setValue={setValue} errorMessage={errorMessage}/>
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
                    helperText={errorMessage.country}
                    error={errorMessage.country ? true : false}
                />
                <CityInput
                    name="city"
                    size="large"
                    type="text"
                    label="City"
                    value={cityValue}
                    onChange={setValue}
                    helperText={errorMessage.city}
                    error={errorMessage.city ? true : false}
                />
            </div>
        </DetailsInputsField>
    )
}

export default DetailsInputs