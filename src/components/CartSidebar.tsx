import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, DollarSign } from "lucide-react";

interface CartSidebarProps {
  items: Activity[];
  onRemove: (id: string) => void;
}

export const CartSidebar = ({ items, onRemove }: CartSidebarProps) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

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
          <SheetTitle className="text-2xl">Your Dallas Itinerary</SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? "Add activities to start planning your trip" 
              : `${items.length} ${items.length === 1 ? 'activity' : 'activities'} selected`}
          </SheetDescription>
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
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.shortDescription}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemove(item.id)}
                      className="shrink-0"
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
              <span className="text-lg font-semibold">Estimated Total</span>
              <span className="text-2xl font-bold text-primary">${totalPrice}</span>
            </div>
            <Button className="w-full" size="lg">
              Download Itinerary
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
