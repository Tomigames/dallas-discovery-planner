import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export const DateRangePicker = ({ dateRange, onDateRangeChange }: DateRangePickerProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSelect: SelectRangeEventHandler = (range, selectedDay) => {
    if (!selectedDay) {
      onDateRangeChange(range);
      return;
    }

    if (!dateRange?.from || dateRange?.to) {
      onDateRangeChange({ from: selectedDay, to: undefined });
      return;
    }

    if (selectedDay < dateRange.from) {
      onDateRangeChange({ from: selectedDay, to: undefined });
      return;
    }

    if (selectedDay.getTime() === dateRange.from.getTime()) {
      onDateRangeChange({ from: selectedDay, to: selectedDay });
      return;
    }

    onDateRangeChange({ from: dateRange.from, to: selectedDay });
  };

  const handleClear = () => {
    onDateRangeChange(undefined);
  };

  const hasSelection = Boolean(dateRange?.from || dateRange?.to);

  return (
    <Popover>
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
        />
        <div className="flex items-center justify-between border-t px-3 py-2 text-sm">
          <span className="text-muted-foreground">Choose a start date, then pick your return.</span>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleClear}
            disabled={!hasSelection}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
