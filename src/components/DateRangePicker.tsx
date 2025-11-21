import { useMemo, useState } from "react";
import { addDays, format, isAfter, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onApply?: () => void;
}

export const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  onApply,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSelect: SelectRangeEventHandler = (range, selectedDay) => {
    if (!selectedDay) {
      onDateRangeChange(range);
      return;
    }

    if (!dateRange?.from || dateRange?.to) {
      onDateRangeChange({ from: selectedDay, to: undefined });
      setHoveredDay(undefined);
      return;
    }

    if (selectedDay < dateRange.from) {
      onDateRangeChange({ from: selectedDay, to: undefined });
      setHoveredDay(undefined);
      return;
    }

    if (selectedDay.getTime() === dateRange.from.getTime()) {
      onDateRangeChange({ from: selectedDay, to: selectedDay });
      setHoveredDay(undefined);
      return;
    }

    onDateRangeChange({ from: dateRange.from, to: selectedDay });
    setHoveredDay(undefined);
  };

  const handleClear = () => {
    onDateRangeChange(undefined);
    setHoveredDay(undefined);
  };

  const hasSelection = Boolean(dateRange?.from || dateRange?.to);
  const canApply = Boolean(dateRange?.from && dateRange?.to);

  const handleDone = () => {
    if (!canApply) return;
    onApply?.();
    setOpen(false);
  };

  const handleDayMouseEnter = (day: Date) => {
    if (!dateRange?.from || dateRange?.to) {
      setHoveredDay(undefined);
      return;
    }

    if (isSameDay(day, dateRange.from) || day < dateRange.from) {
      setHoveredDay(dateRange.from);
      return;
    }

    setHoveredDay(day);
  };

  const handleDayMouseLeave = () => {
    setHoveredDay(undefined);
  };

  const previewRange = useMemo(() => {
    if (!dateRange?.from || dateRange?.to || !hoveredDay) {
      return undefined;
    }

    if (!isAfter(hoveredDay, dateRange.from)) {
      return undefined;
    }

    return { from: dateRange.from, to: addDays(hoveredDay, -1) };
  }, [dateRange?.from, dateRange?.to, hoveredDay]);

  const previewEnd = useMemo(() => {
    if (!dateRange?.from || dateRange?.to || !hoveredDay) {
      return undefined;
    }

    if (!isAfter(hoveredDay, dateRange.from)) {
      return undefined;
    }

    return hoveredDay;
  }, [dateRange?.from, dateRange?.to, hoveredDay]);

  const modifiers = useMemo(() => {
    return {
      ...(previewRange ? { preview: previewRange } : {}),
      ...(previewEnd ? { preview_end: previewEnd } : {}),
    };
  }, [previewEnd, previewRange]);

  const modifiersClassNames = useMemo(() => {
    return {
      ...(previewRange ? { preview: "bg-[#E8F0FE] text-[#174ea6]" } : {}),
      ...(previewEnd
        ? {
            preview_end:
              "border border-[#1a73e8] text-[#1a73e8] bg-transparent hover:bg-transparent",
          }
        : {}),
    };
  }, [previewEnd, previewRange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick your travel dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={date => date < today}
          showOutsideDays={false}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          onDayMouseEnter={handleDayMouseEnter}
          onDayMouseLeave={handleDayMouseLeave}
        />
        <div className="flex items-center justify-between gap-3 border-t px-3 py-2 text-sm">
          <span className="text-muted-foreground">Choose a start date, then pick your return.</span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleClear}
              disabled={!hasSelection}
            >
              Clear
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleDone}
              disabled={!canApply}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
