import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { CartSidebar } from "@/components/CartSidebar";
import { DateRangePicker } from "@/components/DateRangePicker";
import { getActivitiesByMonths } from "@/data/activities";
import { Activity } from "@/types/activity";
import { Calendar, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  "All Categories",
  "Nature & Gardens",
  "Museums & History",
  "Museums & Science",
  "Landmarks & Views",
  "Family & Entertainment",
  "Shopping & Dining",
  "Sports & Entertainment",
  "Nature & Recreation",
  "Food & Markets",
  "Parks & Recreation",
  "Nightlife & Arts",
  "Seasonal Events",
  "Free"
];

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

  const getActivitiesForSelection = (months: string[], category: string) => {
    const baseActivities = getActivitiesByMonths(months);

    if (category === "All Categories") return baseActivities;
    if (category === "Free") return baseActivities.filter(a => a.price === 0);

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
        className={`relative overflow-hidden px-4 text-white flex items-center justify-center ${
          hasSearched ? "py-8 md:py-12 min-h-[20vh] md:min-h-[28vh]" : "py-16 md:py-24 min-h-[40vh] md:min-h-[55vh]"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url('/Dallas.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative container mx-auto max-w-4xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your Perfect Dallas Visit
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover amazing activities tailored to your travel dates
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto max-w-4xl px-4 mt-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              When are you visiting Dallas?
            </CardTitle>
            <CardDescription>
              Select your travel dates to get personalized activity recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              size="lg"
              disabled={!(dateRange?.from && dateRange?.to)}
            >
              Find Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      {hasSearched && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedCategory === category && "shadow-md"
                )}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
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
                    isInCart={cartItems.some(item => item.id === activity.id)}
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
    </div>
  );
};

export default Index;
