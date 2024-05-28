import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function MultiSelect({preSelect, options, label, onChange = () => {}}: any) {

  // Options is array of objects containing id and name keys

  const [selected, setSelected] = useState<any[]>([]);

  const onSelectChange = (event: any) => {
    console.log(event.target.value);
    setSelected(event.target.value);
    onChange(event.target.value);
  }

  useEffect(() => {
    console.log(options);
    console.log(preSelect);
  }, [preSelect, options]);

  useEffect(() => {
    let preSelectOptions: any[] = [];

    preSelect.forEach((preSelectItem: any) => {
      preSelectOptions.push(options.find((option: any) => {
        return option.id == preSelectItem.id;
      }));
    });

    setSelected(preSelectOptions);
  }, [preSelect]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={`multi-select-${label}`}>{label}</InputLabel>
        <Select
          labelId={`multi-select-${label}`}
          fullWidth
          multiple
          value={selected}
          label={label}
          input={<OutlinedInput label={label} />}
          onChange={onSelectChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
        >
          {options.map((option: any) => (
            <MenuItem
              selected
              key={option.id}
              value={option}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MultiSelect;
