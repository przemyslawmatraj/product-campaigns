import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form";

const towns = ["Kraków", "Warszawa"];

const setValueAsString = (value: any) => (value === "" ? undefined : value);

const TownField = ({
  control,
  defaultValue = towns[0],
}: {
  control: Control<FieldValues, any>;
  defaultValue?: string;
}) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={towns}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              hiddenLabel
              placeholder="Choose a town"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
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
                "& .MuiAutocomplete-clearIndicator": {
                  display: "none",
                },
              }}
            />
          )}
          onChange={(e, data) => onChange(setValueAsString(data))}
          value={value || defaultValue}
        />
      )}
      defaultValue={defaultValue}
      name="town"
      control={control}
    />
  );
};

export default TownField;
