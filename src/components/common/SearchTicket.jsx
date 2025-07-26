import Select from 'react-select';
import CustomDatePicker from './CustomDatePicker';
import PropTypes from 'prop-types';

const SearchTicket = ({
  locationOptions,
  selectedLocation,
  setSelectedLocation,
  startDate,
  setStartDate,
  timeOptions,
  startTime,
  setStartTime,
  selectStyles
}) => (
  <>
    <div className='animate-slide-down w-full min-w-0 2xl:w-120'>
      <Select
        options={locationOptions}
        value={selectedLocation}
        onChange={setSelectedLocation}
        placeholder='Location'
        isClearable={false}
        isSearchable
        styles={selectStyles}
      />
    </div>
    <div className='animate-slide-down w-full min-w-0 2xl:w-80'>
      <CustomDatePicker
        value={startDate ? new Date(startDate) : null}
        onChange={(date) => setStartDate(date.toISOString().slice(0, 10))}
        placeholder='Start Date'
      />
    </div>
    <div className='animate-slide-down w-full min-w-0 2xl:w-80'>
      <Select
        options={timeOptions.map((t) => ({ value: t, label: t }))}
        value={timeOptions.map((t) => ({ value: t, label: t })).find((opt) => opt.value === startTime) || null}
        onChange={(option) => setStartTime(option ? option.value : '')}
        placeholder='Time'
        isClearable={false}
        isSearchable
        styles={selectStyles}
      />
    </div>
  </>
);

SearchTicket.propTypes = {
  locationOptions: PropTypes.array.isRequired,
  selectedLocation: PropTypes.object,
  setSelectedLocation: PropTypes.func.isRequired,
  startDate: PropTypes.string,
  setStartDate: PropTypes.func.isRequired,
  timeOptions: PropTypes.array.isRequired,
  startTime: PropTypes.string,
  setStartTime: PropTypes.func.isRequired,
  selectStyles: PropTypes.object
};

export default SearchTicket;
