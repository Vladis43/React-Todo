import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'


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
`;
const AgeInput = styled(md.TextField)``;
const SexInput = styled(md.TextField)``;
const CountryInput = styled(md.TextField)``;
const CityInput = styled(md.TextField)``;
//======================================================================================================================


const DetailsInputs = (props) => {
    const {
        ageValue, sexValue, countryValue, cityValue, setAge, setSex, setCountry, setCity,
        ageError, sexError, countryError, cityError
    } = props

    return (
        <DetailsInputsField>
            <DetailsTitle>Details</DetailsTitle>
            <div style={{marginBottom: 10}}>
                <AgeInput
                    size="large"
                    type="text"
                    label="Age"
                    style={{marginRight: 20}}
                    value={ageValue}
                    onChange={setAge}
                    helperText={ageError}
                    error={ageError ? true : false}
                />
                <SexInput
                    size="large"
                    type="text"
                    label="Sex"
                    value={sexValue}
                    onChange={setSex}
                    helperText={sexError}
                    error={sexError ? true : false}
                />
            </div>
            <div>
                <CountryInput
                    size="large"
                    type="text"
                    label="Coutry"
                    style={{marginRight: 20}}
                    value={countryValue}
                    onChange={setCountry}
                    helperText={countryError}
                    error={countryError ? true : false}
                />
                <CityInput
                    size="large"
                    type="text"
                    label="City"
                    value={cityValue}
                    onChange={setCity}
                    helperText={cityError}
                    error={cityError ? true : false}
                />
            </div>
        </DetailsInputsField>
    )
}

export default DetailsInputs