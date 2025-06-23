import { useState, useEffect } from 'react';
import { format, parse, isValid,formatISO } from 'date-fns';
import DropDown from '@/components/admin/DropDown';

const generateYears = (start = 1990, end = new Date().getFullYear()) => {
  return Array.from({ length: end - start + 1 }, (_, i) => end - i);
};

const generateMonths = () => Array.from({ length: 12 }, (_, i) => i + 1);

const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const DatePicker = ({ value, onChange, formatStr = 'yyyy-MM-dd', disabled=false }) => {
  let initialDate = new Date();
  const parsed = parse(value, formatStr, new Date());
  if (value && isValid(parsed)) {
    initialDate = parsed;
  }

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth() + 1);
  const [day, setDay] = useState(initialDate.getDate());

  const years = generateYears();
  const months = generateMonths();
  const days = generateDays(year, month);

  useEffect(() => {
    const selectedDate = new Date(year, month - 1, day);
    if (isValid(selectedDate)) {
      const isoString = formatISO(new Date(selectedDate))
      onChange?.(isoString);
    }
  }, [year, month, day, formatStr]);

  return (
    <DropDown
        isImage={false}
        dropdownbtn={
            <div
                className="dropdown-toggle w-100 date"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                
            <span className="view-all" >
                <input
                    // onChange={handleInputChange}
                    disabled={disabled}
                    className=""
                    type="text"
                    placeholder={format(new Date(year, month - 1, day), formatStr)}
                    name="title"
                    value={format(new Date(year, month - 1, day), formatStr)}
                    required
                />
            </span>
            
            </div>
        }
        content={
            disabled && 
            <div className="p-3" style={{ minWidth: '250px' }}>
            <div
                className="date-grid"
                style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '10px',
                }}
            >
                <select className="form-select p-3 fw-bold rounded-3 focus:outline-none" value={year} onChange={(e) => setYear(+e.target.value)}>
                {years.map((y) => (
                    <option key={y} value={y}>
                    {y}
                    </option>
                ))}
                </select>
                <select className="form-select p-3 fw-bold rounded-3" value={month} onChange={(e) => setMonth(+e.target.value)}>
                {months.map((m) => (
                    <option key={m} value={m}>
                    {String(m).padStart(2, '0')}
                    </option>
                ))}
                </select>
                <select className="form-select p-3 fw-bold rounded-3" value={day} onChange={(e) => setDay(+e.target.value)}>
                {days.map((d) => (
                    <option key={d} value={d}>
                    {String(d).padStart(2, '0')}
                    </option>
                ))}
                </select>
            </div>
            </div>
        }
    />
  );
};

export default DatePicker;
