import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = false, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 border-none text-[#1a73e8] hover:bg-[#D2E3FC] hover:text-[#174ea6]",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse select-none",
        head_row: "flex",
        head_cell: "text-muted-foreground w-10 font-medium text-[0.75rem]",
        row: "flex w-full mt-1",
        cell: cn(
          "relative h-10 w-10 p-0 text-center text-sm transition-colors",
          "focus-within:relative focus-within:z-20",
          "[&:has(.day-range-middle)]:bg-[#D2E3FC]",
          "[&:has([aria-selected].day-range-start)]:bg-[#D2E3FC]",
          "[&:has([aria-selected].day-range-end)]:bg-[#D2E3FC]",
          "first:[&:has(.day-range-middle)]:rounded-l-xl last:[&:has(.day-range-middle)]:rounded-r-xl",
          "first:[&:has([aria-selected].day-range-start)]:rounded-l-xl last:[&:has([aria-selected].day-range-end)]:rounded-r-xl",
        ),
        day: cn(
          "flex h-10 w-full items-center justify-center rounded-md p-0 text-sm font-medium transition-colors",
          "aria-selected:opacity-100 hover:bg-[#D2E3FC] hover:text-[#174ea6]",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#1a73e8] text-white hover:bg-[#1a73e8] hover:text-white focus:bg-[#1a73e8] focus:text-white",
        day_today: "text-[#1a73e8] font-semibold",
        day_outside: "day-outside text-muted-foreground opacity-30",
        day_disabled: "text-muted-foreground opacity-40",
        day_range_middle: "day-range-middle text-[#174ea6]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
