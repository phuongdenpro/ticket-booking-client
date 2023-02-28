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
    defaultValue=undefined,
    placeholder = '',
    multiple = false,
    onChange,
    optionLabelKey,
    freeSolo = false,
    style,
  } = props;

  const defaultOption = options.find((option) => option?.code === defaultValue);
  const defaultLabel = defaultOption ? defaultOption.label : '';
  const getOptionLabel = (option) => option.name;

  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: onChangeDefault, value } }) => (
        <Autocomplete
          noOptionsText={'Không có dữ liệu'}
          defaultChecked={options.find((option) => option?.code === defaultValue)}

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
              return onChange(newValue);
            }
            return onChangeDefault(newValue);
          }}
          onInputChange={(event, newValue) => {
            return onChangeDefault(newValue);
          }}

          defaultValue={defaultOption}
          freeSolo={freeSolo}
          style={style}
          renderInput={params => (
            <TextField
              className={'font-size-1'}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              value={value?.value}
              {...params}
            />
          )}
        />
      )}
    />
  );
};

export default SelectCustom;
