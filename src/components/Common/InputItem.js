import React from 'react';
import PropTypes from 'prop-types';
import {
  Item, Input, Icon, Text,
} from 'native-base';

const InputItem = ({
  placeholder, textContentType, onChangeText, autoCapitalize, error, secureTextEntry,
}) => {
  let showError = false;
  if (error) {
    showError = error.length > 0;
  }
  return (
    <React.Fragment>
      <Item error={showError}>
        <Input
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          textContentType={textContentType}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
        />
        {showError && <Icon name="close-circle" />}
      </Item>
      {showError && <Text style={{ color: 'red', marginLeft: 20, fontSize: 10 }}>{error}</Text>}
    </React.Fragment>
  );
};

InputItem.propTypes = {
  placeholder: PropTypes.string.isRequired,
  textContentType: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  autoCapitalize: PropTypes.string,
  error: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

InputItem.defaultProps = {
  error: '',
  autoCapitalize: 'sentences',
  secureTextEntry: false,
};

export default InputItem;
