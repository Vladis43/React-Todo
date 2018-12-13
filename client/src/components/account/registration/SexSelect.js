import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const Form = styled(md.FormControl)`
  width: 200px;
  div {
    width: 100%;
  }
`;
const Label = styled(md.InputLabel)``;
const Select = styled(md.Select)``;

const SexSelect = ({sexValue, setValue}) => (
    <Form>
        <Label htmlFor="sex-id">Sex</Label>
        <Select
            value={sexValue}
            onChange={setValue}
            inputProps={{
                name: 'sex',
                id: 'sex-id',
            }}
        >
            <md.MenuItem value={'male'}>Male</md.MenuItem>
            <md.MenuItem value={'female'}>Female</md.MenuItem>
            <md.MenuItem value={'other'}>Other</md.MenuItem>
        </Select>
    </Form>
)

export default SexSelect