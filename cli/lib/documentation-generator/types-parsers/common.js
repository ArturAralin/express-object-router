module.exports = (validation, skipValidation) => {
  // Description
  const description = validation._description || null;
  const defaultValue = validation._flags && validation._flags.default || null;

  // Allowed values
  const allowedValuesList = validation._valids && validation._valids.values() || [];
  const allowedValues = allowedValuesList.length > 0 ? allowedValuesList : null;

  // Disallowed values
  const disallowedValuesList = validation._invalids && validation._invalids.values().slice(2) || [];
  const disallowedValues = disallowedValuesList.length > 0 ? disallowedValuesList : null;

  // Notes
  const notes = validation._notes && validation._notes.length > 0
    ? validation._notes
    : null;

  // Tags
  const tags = validation._tags && validation._tags.length > 0
    ? validation._tags
    : null;

  // Required
  const required = validation._flags.presence === 'required';

  return {
    description,
    defaultValue,
    allowedValues,
    disallowedValues,
    tags,
    notes,
    required,
    skipValidation,
  };
};
