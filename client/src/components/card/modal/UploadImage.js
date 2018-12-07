import React from 'react'
import * as md from "@material-ui/core"
import * as icon from "@material-ui/icons"
import styled from "styled-components"

const Wrapper = styled.div``;


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


class UploadImage extends React.Component{

    handleChange = (info) => {
        getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl
        }));
    }

    render() {
        return (
            <Wrapper>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="contained-button-file"
                    type="file"
                    // onChange={this.props.changeImageFile}
                    onChange={this.handleChange}
                />
                <label htmlFor="contained-button-file">
                    <md.Button variant="contained" component="span">
                        Upload
                        <icon.CloudUpload/>
                    </md.Button>
                </label>
                <img src={this.state.imageURL} alt=""/>
                {/*{this.props.imageFileSelected.name}*/}
            </Wrapper>
        )
    }
}

export default UploadImage