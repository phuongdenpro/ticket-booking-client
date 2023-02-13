import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import './index.scss';



const SelectCustom = (props) => {
  const {
    name,
    options = [],
    limitTags = 1,
    error = false,
    helperText = '',
    defaultValue = undefined,
    placeholder = '',
    multiple = false,
    onChange,
    optionLabelKey,
    freeSolo = false,
    style,
  } = props;

  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: onChangeDefault, value } }) => (
        <Autocomplete
          noOptionsText={'Không có dữ liệu'}
          options={options}
          value={value || undefined}
          limitTags={limitTags}
          multiple={multiple}
          // disableCloseOnSelect={multiple}
          className={'select-custom'}
          getOptionLabel={(option) => {
            return option[optionLabelKey || 'name'] || option;
          }}
          onChange={(event, newValue) => {
            if (onChange) {
              return onChange(event, newValue);
            }
            return onChangeDefault(newValue);
          }}
          defaultValue={defaultValue}
          freeSolo={freeSolo}
          style={style}
          renderInput={params => (
            <TextField
              className={'font-size-1'}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              value={value}
              {...params}
            />
          )}
        />
      )}
    />
  );
};

export default SelectCustom;
