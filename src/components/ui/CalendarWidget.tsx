import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarWidget.css';
import { formatDateForDisplay, isDateDisabled } from '../../utils/calendarUtils';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarWidgetProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  minimumStay?: number;
}

const CalendarWidget = ({ onDateChange, minimumStay = 2 }: CalendarWidgetProps) => {
  const [value, setValue] = useState<Value>(null);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);

    if (Array.isArray(newValue)) {
      onDateChange([newValue[0], newValue[1]]);
    } else if (newValue) {
      onDateChange([newValue, null]);
    } else {
      onDateChange([null, null]);
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return isDateDisabled(date);
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-widget__header">
        <h3>Select Your Dates</h3>
        <p className="calendar-widget__note">
          Minimum stay: {minimumStay} {minimumStay === 1 ? 'night' : 'nights'}
        </p>
      </div>

      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        minDate={new Date()}
        tileDisabled={tileDisabled}
        className="calendar-widget__calendar"
      />

      {Array.isArray(value) && value[0] && value[1] && (
        <div className="calendar-widget__selection">
          <div className="calendar-widget__date">
            <span className="calendar-widget__label">Check-in:</span>
            <span className="calendar-widget__value">{formatDateForDisplay(value[0])}</span>
          </div>
          <div className="calendar-widget__date">
            <span className="calendar-widget__label">Check-out:</span>
            <span className="calendar-widget__value">{formatDateForDisplay(value[1])}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
