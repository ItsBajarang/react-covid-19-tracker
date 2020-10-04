import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./country-picker.module.css";

import { fetchCountries } from "../../api";

class CountryPicker extends React.Component {
    state = {
      countries: [],
    }

    async componentDidMount() {
    let countries = await fetchCountries();
    this.setState({ countries: countries });
  }

  render() {
    let countries = this.state.countries;
    return (
      <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" onChange={(e) => this.props.handleCountryChange(e.target.value)}>
          <option value="">Global</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }
}

export default CountryPicker;
