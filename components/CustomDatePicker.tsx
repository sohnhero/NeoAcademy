import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

interface CustomDatePickerProps {
    value?: string;
    min?: string;
    max?: string;
    onChange: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, min, max, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(value || new Date()));
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedDate = value ? new Date(value) : null;
    const minDate = min ? new Date(min) : null;
    const maxDate = max ? new Date(max) : null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isDateDisabled = (date: Date) => {
        if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
        if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
        return false;
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (!isDateDisabled(date)) {
            onChange(date.toISOString());
            setIsOpen(false);
        }
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
        const startDay = firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

        // Fill empty spaces for the first week
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const disabled = isDateDisabled(date);
            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
            const isToday = new Date().toDateString() === date.toDateString();

            days.push(
                <button
                    key={day}
                    disabled={disabled}
                    onClick={() => handleDateClick(day)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center
                        ${disabled ? 'text-slate-700 cursor-not-allowed' : 'text-slate-300 hover:bg-blue-500/20 hover:text-blue-400'}
                        ${isSelected ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' : ''}
                        ${isToday && !isSelected ? 'border border-blue-500/50 text-blue-400' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="relative" ref={containerRef}>
            <div
                className="relative group/date flex items-center gap-2 bg-slate-900 border border-slate-700/50 px-4 py-2 rounded-xl focus-within:border-blue-500/50 transition-all hover:bg-slate-900/80 cursor-pointer min-w-[140px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CalendarIcon className="w-4 h-4 text-orange-400 group-focus-within/date:text-blue-400 transition-colors" />
                <span className="text-slate-100 text-sm font-black">
                    {selectedDate ? selectedDate.toLocaleDateString('fr-FR') : 'Choisir date'}
                </span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[100] w-64 backdrop-blur-xl bg-opacity-95 animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">
                            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                            <div key={i} className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-slate-500">
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {renderDays()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
