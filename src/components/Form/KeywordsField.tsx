import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form";

const keywords = ["test", "test2", "test3"];

const KeywordsField = ({
  control,
  defaultValues = [],
}: {
  control: Control<FieldValues, any>;
  defaultValues?: any;
}) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={keywords}
          getOptionLabel={(option) => option}
          multiple
          isOptionEqualToValue={(option, value) => option === value}
          id="tags-standard"
          filterSelectedOptions
          noOptionsText="No keywords found"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              hiddenLabel
              sx={{
                marginBottom: "2rem",
                input: { color: "var(--clr-text-400)" },
                border: "1px solid var(--clr-bg-400)",
                "& .MuiAutocomplete-tag": {
                  backgroundColor: "var(--clr-secondary)",
                  color: "var(--clr-text-black)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                },
                "& .MuiAutocomplete-tag .MuiSvgIcon-root": {
                  color: "var(--clr-text-black)",
                },
                button: {
                  color: "var(--clr-text-400)",
                },
              }}
              placeholder="Keywords"
            />
          )}
          defaultValue={defaultValues}
          onChange={(e, data) => onChange(data)}
          value={value}
        />
      )}
      defaultValue={defaultValues}
      name="keywords"
      control={control}
    />
  );
};

export default KeywordsField;
