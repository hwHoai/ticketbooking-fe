const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '4rem',
    height: '4rem',
    borderColor: state.isFocused ? '#018abe' : '#d1d5db',
    backgroundColor: '#f3f4f6',
    color: '#6b7280'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#6b7280'
  })
};

export default selectStyles;
