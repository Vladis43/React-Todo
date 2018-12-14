import React from 'react'
import * as md from "@material-ui/core"
import * as icon from "@material-ui/icons"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  
  @media screen and (max-device-width: 455px) {
    width: 100%;
    justify-content: center;
  }
`;


const UploadImage = ({imageURL, handleImageChange}) => (
    <Wrapper>
        <input
            name="image"
            accept="image/*"
            style={{display: 'none'}}
            id="image"
            type="file"
            onChange={handleImageChange}
        />
        <label htmlFor="image">
            {!imageURL ?
                <md.Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    style={{width: 200, height: 150}}
                >
                    <icon.CloudUpload fontSize="large"/>
                </md.Button> :
                <md.Card>
                    <md.CardActionArea>
                        <md.CardMedia
                            image={imageURL}
                            style={{width: 200, height: 150}}
                        />
                    </md.CardActionArea>
                </md.Card>
            }
        </label>
    </Wrapper>
)

export default UploadImage