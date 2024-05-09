import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function MultiSelect({options, label, onChange = () => {}}: any) {

  // Options is array of objects containing id and name keys

  const [selected, setSelected] = useState<any[]>([]);

  const onSelectChange = (event: any) => {
    setSelected(event.target.value);
    onChange(event.target.value);
  }

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
