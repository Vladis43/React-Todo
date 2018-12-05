import React from 'react'
import * as md from "@material-ui/core"
import * as icon from "@material-ui/icons"

const UploadImage = ({imageFileSelected, changeImageFile}) => (
    <div>
        <input
            accept="image/*"
            style={{display: 'none'}}
            id="contained-button-file"
            type="file"
            onChange={changeImageFile}
        />
        <label htmlFor="contained-button-file">
            <md.Button variant="contained" component="span">
                Upload
                <icon.CloudUpload/>
            </md.Button>
        </label>
        {imageFileSelected.name}
    </div>
)

export default UploadImage