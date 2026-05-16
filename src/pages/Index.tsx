import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { CartSidebar } from "@/components/CartSidebar";
import { DateRangePicker } from "@/components/DateRangePicker";
import { MapView } from "@/components/MapView";
import { getActivitiesByMonths } from "@/data/activities";
import { Activity } from "@/types/activity";
import { Calendar, Filter, Map } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/lib/categoryColors";

const categories = [
  "All Categories",
  "Gardens",
  "Nature & Wildlife",
  "Parks & Trails",
  "Museums & Arts",
  "Landmarks & Views",
  "Entertainment",
  "Shopping & Dining",
  "Nightlife",
  "Seasonal Events",
  "Free"
];

const categoryMap: Record<string, string[]> = {
  "Museums & Arts": ["History Museum", "Art Museum", "Science Museum", "Arts & Culture", "Performing Arts"],
  "Entertainment": ["Family & Entertainment", "Sports & Entertainment"],
  "Shopping & Dining": ["Shopping & Dining", "Food & Markets"],
};

const CART_STORAGE_KEY = "dallas-planner-cart";
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthsInRange = (range?: DateRange) => {
  if (!range?.from) return [];

  const startMonth = range.from.toLocaleString("en-US", { month: "long" });
  const endMonth = range.to
    ? range.to.toLocaleString("en-US", { month: "long" })
    : startMonth;

  const startIdx = monthNames.indexOf(startMonth);
  const endIdx = monthNames.indexOf(endMonth);

  if (startIdx === -1 || endIdx === -1) return [];

  return startIdx <= endIdx
    ? monthNames.slice(startIdx, endIdx + 1)
    : [...monthNames.slice(startIdx), ...monthNames.slice(0, endIdx + 1)];
};

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [cartItems, setCartItems] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const hasSeasonalEvents = useMemo(
    () => filteredActivities.some(a => a.category === "Seasonal Events"),
    [filteredActivities]
  );

  const visibleCategories = useMemo(
    () => categories.filter(c => c !== "Seasonal Events" || hasSeasonalEvents),
    [hasSeasonalEvents]
  );

  const getActivitiesForSelection = (months: string[], category: string) => {
    const baseActivities = getActivitiesByMonths(months);

    if (category === "All Categories") return baseActivities;
    if (category === "Free") return baseActivities.filter(a => a.price === 0);

    const mapped = categoryMap[category];
    if (mapped) return baseActivities.filter(a => mapped.includes(a.category));

    return baseActivities.filter(a => a.category === category);
  };

  const handleSearch = () => {
    const selectedMonths = getMonthsInRange(dateRange);
    if (selectedMonths.length === 0) return;

    const activities = getActivitiesForSelection(selectedMonths, selectedCategory);

    setFilteredActivities(activities);
    setHasSearched(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    if (hasSearched && dateRange?.from) {
      const selectedMonths = getMonthsInRange(dateRange);

      if (selectedMonths.length > 0) {
        const activities = getActivitiesForSelection(selectedMonths, category);
        setFilteredActivities(activities);
      }
    }
  };

  const addToCart = useCallback((activity: Activity) => {
    setCartItems(currentItems => {
      if (currentItems.some(item => item.id === activity.id)) {
        return currentItems;
      }
      return [...currentItems, activity];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartItemIds = useMemo(() => new Set(cartItems.map(item => item.id)), [cartItems]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Activity[];
        if (Array.isArray(parsed)) {
          setCartItems(parsed.filter(item => item && item.id));
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden px-4 text-white flex items-center justify-center transition-all duration-300 ${
          hasSearched ? "py-4 md:py-12 min-h-[10vh] md:min-h-[28vh]" : "py-16 md:py-24 min-h-[40vh] md:min-h-[55vh]"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url('/Dallas.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative container mx-auto max-w-4xl text-center space-y-2">
          <h1 className={`font-bold mb-1 transition-all duration-300 ${hasSearched ? "text-2xl md:text-5xl" : "text-4xl md:text-5xl"}`}>
            Plan Your Perfect Dallas Visit
          </h1>
          <p className={`opacity-90 transition-all duration-300 ${hasSearched ? "hidden md:block text-lg md:text-xl" : "text-lg md:text-xl"}`}>
            Discover amazing activities tailored to your travel dates
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto max-w-4xl px-4 mt-4 md:mt-8 mb-6 md:mb-12">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-xl">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
              When are you visiting Dallas?
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Select your travel dates to get personalized activity recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
            <div className="space-y-2">
              <Label>Travel Dates</Label>
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                onApply={handleSearch}
              />
            </div>

            <Button
              onClick={handleSearch}
              className="w-full"
              size="default"
              disabled={!(dateRange?.from && dateRange?.to)}
            >
              Find Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter + Map */}
      {hasSearched && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col gap-4">
            {/* Filter */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filter by Category</h3>
                </div>
                <Button
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setShowMap(v => !v)}
                >
                  <Map className="h-4 w-4" />
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleCategories.map(category => {
                  const color = categoryColors[category];
                  const isSelected = selectedCategory === category;
                  return (
                    <Badge
                      key={category}
                      variant="outline"
                      className={cn("cursor-pointer transition-all", isSelected && color && "shadow-md text-white border-transparent", isSelected && !color && "shadow-md")}
                      style={isSelected && color ? {
                        borderColor: color,
                        backgroundColor: color,
                      } : undefined}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            {showMap && (
              <div className="flex-1 min-w-0">
                <MapView
                  activities={filteredActivities}
                  cartItemIds={cartItemIds}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activities Grid */}
      <div className="container mx-auto px-4 pb-24">
        {hasSearched && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory === "All Categories" 
                  ? "Recommended Activities" 
                  : selectedCategory}
              </h2>
              <p className="text-muted-foreground">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
              </p>
            </div>
            
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    isInCart={cartItemIds.has(activity.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No activities found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or adjusting your dates
                </p>
              </div>
            )}
          </>
        )}
        
        {!hasSearched && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to explore Dallas?</h3>
            <p className="text-muted-foreground">
              Select your travel dates above to get personalized activity recommendations
            </p>
          </div>
        )}
      </div>

      <CartSidebar items={cartItems} onRemove={removeFromCart} onClear={clearCart} dateRange={dateRange} />

      <footer className="text-center py-4 text-xs text-muted-foreground">
        v2.0
      </footer>

    </div>
  );
};

export default Index;
