import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, DollarSign } from "lucide-react";
import { DateRange } from "react-day-picker";

interface CartSidebarProps {
  items: Activity[];
  onRemove: (id: string) => void;
  onClear: () => void;
  dateRange?: DateRange;
}

export const CartSidebar = ({ items, onRemove, onClear, dateRange }: CartSidebarProps) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const formatPrice = (value: number) => (value === 0 ? "Free" : `$${value.toFixed(2).replace(/\.00$/, "")}`);

  const formatDateRange = (range?: DateRange) => {
    if (!range?.from) return "Dates not selected";
    const formatDate = (date: Date, includeYear = true) =>
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(includeYear ? { year: "numeric" } : {}),
      });

    if (!range.to) return formatDate(range.from);

    const sameMonthYear =
      range.from.getMonth() === range.to.getMonth() && range.from.getFullYear() === range.to.getFullYear();

    if (sameMonthYear) {
      return `${range.from.toLocaleString("en-US", { month: "short", day: "numeric" })}-${range.to.toLocaleString(
        "en-US",
        { day: "numeric" },
      )}, ${range.from.getFullYear()}`;
    }

    return `${formatDate(range.from)} - ${formatDate(range.to)}`;
  };

  const buildItineraryHTML = () => {
    const dateLabel = formatDateRange(dateRange);
    const totalLabel = formatPrice(totalPrice);

    const icons = {
      map: `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
      clock: `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      calendar: `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      link: `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    };

    const activityCards = items
      .map((item, idx) => {
        const yearRound = item.availableMonths.length >= 12;
        const availability = yearRound ? "Available Year-Round" : item.availableMonths.join(", ");
        const times = item.times.join(", ");
        const priceLabel = item.price === 0 ? "Free" : `${formatPrice(item.price)} per person`;
        const hoursLine = item.hours ? `Open ${item.hours}` : "";
        const timesLine = times ? `Available times: ${times}` : "";

        return `
          <div class="activity-card">
            <div class="activity-header">
              <div>
                <div class="pill">Activity ${idx + 1}</div>
                <h2>${item.title}</h2>
                <div class="category">${item.category}</div>
              </div>
              <div class="price">${priceLabel}</div>
            </div>
            <p class="description">${item.shortDescription}</p>
            <div class="grid two-col">
              <div>
                <h3>${icons.map} Address</h3>
                <p>${item.location}</p>
              </div>
              <div>
                <h3>${icons.clock} Recommended Duration</h3>
                <p>${item.duration}</p>
              </div>
            </div>
            <div class="full-row">
              <h3>${icons.calendar} Availability</h3>
              <p>${availability}</p>
              ${hoursLine ? `<p>${hoursLine}</p>` : ""}
              ${timesLine ? `<p>${timesLine}</p>` : ""}
            </div>
            <div class="full-row link-row">
              <h3>${icons.link} Link</h3>
              <a href="${item.website}" target="_blank" rel="noreferrer">Visit Website →</a>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Dallas Itinerary</title>
          <style>
            :root {
              --bg: #f7fafc;
              --card: #ffffff;
              --muted: #475569;
              --accent: #0f172a;
              --accent-2: #1d4ed8;
            }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: var(--bg);
              color: #0f172a;
            }
            .page {
              max-width: 900px;
              margin: 0 auto;
              background: var(--card);
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 24px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.06);
            }
            .header {
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px 18px;
              background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
            }
            .header h1 { margin: 0 0 6px 0; font-size: 24px; letter-spacing: -0.02em; }
            .header .sub { margin: 2px 0; color: #1e293b; font-weight: 600; }
            .header .meta { margin-top: 6px; color: var(--muted); font-size: 13px; }
            .summary {
              margin-top: 12px;
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            }
            .pill {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 10px;
              background: linear-gradient(135deg, #e0f2fe 0%, #eef2ff 100%);
              border: 1px solid #bfdbfe;
              border-radius: 10px;
              font-weight: 700;
              color: #0f172a;
              box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
            }
            .pill small { display: block; font-size: 11px; color: var(--muted); font-weight: 600; }
            .section-title {
              margin: 22px 0 10px;
              color: #0f172a;
              font-size: 17px;
              letter-spacing: 0.01em;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .section-title::before {
              content: "•";
              color: var(--accent-2);
              font-size: 20px;
            }
            .activity-card {
              background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
              border-radius: 12px;
              padding: 14px;
              margin-bottom: 12px;
              border: 1px solid #dbeafe;
              box-shadow: 0 8px 24px rgba(13, 63, 125, 0.06);
            }
            .activity-header {
              display: flex;
              justify-content: space-between;
              gap: 10px;
              flex-wrap: wrap;
              align-items: center;
            }
            .activity-badge {
              display: inline-block;
              padding: 4px 9px;
              background: #eef2ff;
              color: #312e81;
              border-radius: 999px;
              font-size: 12px;
              font-weight: 700;
            }
            h2 {
              margin: 4px 0 2px;
              font-size: 18px;
              color: #0f172a;
              letter-spacing: -0.01em;
            }
            .category {
              color: var(--muted);
              font-weight: 600;
              font-size: 13px;
            }
            .price {
              font-weight: 700;
              color: #0f172a;
              background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
              padding: 8px 10px;
              border-radius: 10px;
              border: 1px solid #93c5fd;
              box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
            }
            .description {
              margin: 10px 0 12px;
              color: #1e293b;
              line-height: 1.5;
            }
            .grid {
              display: grid;
              gap: 10px 14px;
            }
            .grid.two-col {
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            }
            .full-row {
              margin-top: 6px;
              padding-top: 6px;
              border-top: 1px dashed #e2e8f0;
            }
            .link-row {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding-top: 8px;
            }
            h3 {
              margin: 0 0 4px;
              font-size: 12px;
              letter-spacing: 0.02em;
              text-transform: uppercase;
              color: #475569;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            p { margin: 0 0 6px; color: #0f172a; }
            a { color: #1d4ed8; text-decoration: none; font-weight: 700; }
            a:hover { text-decoration: underline; }
            .footer {
              margin-top: 18px;
              padding-top: 10px;
              border-top: 1px solid #e2e8f0;
              color: #475569;
              font-size: 13px;
              line-height: 1.5;
            }
            .controls {
              display: flex;
              justify-content: flex-end;
              gap: 8px;
              margin-top: 12px;
            }
            .btn {
              padding: 10px 14px;
              border-radius: 8px;
              border: 1px solid #1d4ed8;
              background: #1d4ed8;
              color: #fff;
              font-weight: 700;
              cursor: pointer;
            }
            .btn.secondary {
              background: #fff;
              color: #1d4ed8;
            }
            @media print {
              body { background: white; padding: 8px; }
              .page { box-shadow: none; border: 1px solid #e2e8f0; }
              .header { background: #f8fafc; }
              .section-title::before { color: #0f172a; }
              a { color: #0f172a; text-decoration: underline; }
              .controls { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <h1>Plan Your Perfect Dallas Visit</h1>
              <div class="sub">Custom Itinerary for: ${dateLabel}</div>
              <div class="meta">Created using: visitdallas.ariasi.org</div>
              <div class="summary">
                <div class="pill">
                  <small>Estimated total (per person)</small>
                  <span>${totalLabel === "Free" ? "Free" : `${totalLabel} per person`}</span>
                </div>
                <div class="pill">
                  <small>Activities selected</small>
                  <span>${items.length}</span>
                </div>
              </div>
            </div>

            <div class="section-title">Your Selected Activities</div>
            ${activityCards || "<p style='color:#475569'>No activities selected.</p>"}

            <div class="footer">
              Plan Your Perfect Dallas Visit is an independent guide. We do not own or operate the attractions listed. All trademarks, names, and images belong to their respective owners. Listings include official links for updated schedules and pricing.
            </div>
            <div class="controls">
              <button class="btn secondary" onclick="window.close()">Close Preview</button>
              <button class="btn" id="print-btn">Print / Save as PDF</button>
            </div>
          </div>
          <script>
            window.addEventListener('load', () => {
              const btn = document.getElementById('print-btn');
              if (btn) btn.addEventListener('click', () => window.print());
            });
          </script>
        </body>
      </html>
    `;
  };

  const handleDownloadPDF = () => {
    const html = buildItineraryHTML();
    const previewWindow = window.open("", "_blank");
    if (!previewWindow) return;
    previewWindow.document.open();
    previewWindow.document.write(html);
    previewWindow.document.close();
    previewWindow.focus();
  };

  const handleClear = () => {
    if (window.confirm("Remove all activities from your itinerary?")) {
      onClear();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg" size="icon">
          <ShoppingCart className="h-6 w-6" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="text-2xl">Your Dallas Itinerary</SheetTitle>
              <SheetDescription>
                {items.length === 0
                  ? "Add activities to start planning your trip"
                  : `${items.length} ${items.length === 1 ? "activity" : "activities"} selected`}
              </SheetDescription>
            </div>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="shrink-0 mt-1">
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] mt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your itinerary is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Browse activities and add them to your plan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.shortDescription}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(item.id)}
                      className="shrink-0"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <DollarSign className="h-4 w-4" />
                      <span>{item.price === 0 ? "Free" : item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Estimated Total (per person)</span>
              <span className="text-2xl font-bold text-primary">
                {totalPrice === 0 ? "Free" : formatPrice(totalPrice)}
              </span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleDownloadPDF}
              title="Opens a preview window you can print or save as a PDF"
              aria-label="Open PDF preview to print or save"
            >
              Open PDF Preview
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
