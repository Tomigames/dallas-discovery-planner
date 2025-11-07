import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivityCard } from "@/components/ActivityCard";
import { CartSidebar } from "@/components/CartSidebar";
import { dallasActivities, getActivitiesBySeason } from "@/data/activities";
import { Activity } from "@/types/activity";
import { Calendar } from "lucide-react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const durations = ["1-3 days", "4-7 days", "1-2 weeks", "2+ weeks"];

const Index = () => {
  const [startMonth, setStartMonth] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [cartItems, setCartItems] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!startMonth || !duration) return;
    
    const selectedMonths = endMonth 
      ? months.slice(months.indexOf(startMonth), months.indexOf(endMonth) + 1)
      : [startMonth];
    
    const activities = getActivitiesBySeason(selectedMonths);
    setFilteredActivities(activities);
    setHasSearched(true);
  };

  const addToCart = (activity: Activity) => {
    if (!cartItems.find(item => item.id === activity.id)) {
      setCartItems([...cartItems, activity]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your Perfect Dallas Visit
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover amazing activities tailored to your travel dates
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto max-w-4xl px-4 -mt-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              When are you visiting Dallas?
            </CardTitle>
            <CardDescription>
              Tell us your travel dates and we'll suggest the best activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-month">Start Month</Label>
                <Select value={startMonth} onValueChange={setStartMonth}>
                  <SelectTrigger id="start-month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-month">End Month (Optional)</Label>
                <Select value={endMonth} onValueChange={setEndMonth}>
                  <SelectTrigger id="end-month">
                    <SelectValue placeholder="Same month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map(dur => (
                      <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleSearch} 
              className="w-full"
              size="lg"
              disabled={!startMonth || !duration}
            >
              Find Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activities Grid */}
      <div className="container mx-auto px-4 pb-24">
        {hasSearched && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Recommended Activities
              </h2>
              <p className="text-muted-foreground">
                {filteredActivities.length} activities found for your dates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onAddToCart={addToCart}
                  isInCart={cartItems.some(item => item.id === activity.id)}
                />
              ))}
            </div>
          </>
        )}
        
        {!hasSearched && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to explore Dallas?</h3>
            <p className="text-muted-foreground">
              Fill out the form above to get personalized activity recommendations
            </p>
          </div>
        )}
      </div>

      <CartSidebar items={cartItems} onRemove={removeFromCart} />
    </div>
  );
};

export default Index;
