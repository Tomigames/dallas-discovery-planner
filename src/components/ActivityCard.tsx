import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  onAddToCart: (activity: Activity) => void;
  isInCart: boolean;
}

export const ActivityCard = ({ activity, onAddToCart, isInCart }: ActivityCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{activity.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {activity.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {activity.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4" />
          <span>{activity.price === 0 ? "Free" : `$${activity.price} per person`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              More Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{activity.title}</DialogTitle>
              <DialogDescription>
                <Badge variant="secondary" className="mt-2">
                  {activity.category}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full rounded-lg object-cover aspect-video"
              />
              <p className="text-foreground leading-relaxed">{activity.description}</p>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Price</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.price === 0 ? "Free admission" : `$${activity.price} per person`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Open Days</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activity.openDays.map((day, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {day.substring(0, 3)}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{activity.hours}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Available Times</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {activity.times.map((time, i) => (
                        <Badge key={i} variant="outline">{time}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p className="text-sm text-muted-foreground">{activity.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button 
          onClick={() => onAddToCart(activity)}
          disabled={isInCart}
          className="flex-1"
        >
          {isInCart ? "Added" : "Add to Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};
