import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const label = "Category"

const CategorySelectUI = ({ value, onChange, onAddNew, groups = {} }) => (
    <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            onChange={onChange}
            label={label}
        >
            <MenuItem value="" onClick={onAddNew}>+ Create New</MenuItem>
            <hr />
            {Object.keys(groups).map(key => <MenuItem value={key} key={key}>{groups[key].title}</MenuItem>)}
        </Select>
    </FormControl>
)

export default CategorySelectUI;