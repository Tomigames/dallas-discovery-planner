import { memo, useMemo, useState } from "react";
import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getCategoryColor, getDisplayCategory } from "@/lib/categoryColors";
import { DollarSign, ExternalLink, Hourglass, MapPin } from "lucide-react";
import { ActivityDetailDialog } from "@/components/ActivityDetailDialog";

interface ActivityCardProps {
  activity: Activity;
  onAddToCart: (activity: Activity) => void;
  onRemoveFromCart: (id: string) => void;
  isInCart: boolean;
}

const ActivityCardComponent = ({ activity, onAddToCart, onRemoveFromCart, isInCart }: ActivityCardProps) => {
  const galleryImages = useMemo(
    () => activity.images && activity.images.length > 0 ? activity.images : [activity.image],
    [activity.images, activity.image]
  );
  const heroImage = galleryImages[0] ?? activity.image;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCartClick = () => {
    if (isInCart) onRemoveFromCart(activity.id);
    else onAddToCart(activity);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <button
          type="button"
          aria-label={`View details for ${activity.title}`}
          className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          onClick={() => setDialogOpen(true)}
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={heroImage}
              alt={activity.title}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{activity.title}</CardTitle>
            <Badge
              className="shrink-0 text-white border-0"
              style={{ backgroundColor: getCategoryColor(activity.category) }}
            >
              {getDisplayCategory(activity.category)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">{activity.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{activity.price === 0 ? "Free" : `$${activity.price} per person`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hourglass className="h-4 w-4" />
            <span>{activity.duration}</span>
          </div>
          <a
            href={activity.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Visit website
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(true)}>
            More Info
          </Button>
          <Button
            onClick={handleCartClick}
            variant={isInCart ? "outline" : "default"}
            className={cn(
              "flex-1 gap-2",
              isInCart && "border-destructive text-destructive hover:bg-destructive/10"
            )}
          >
            {isInCart ? "Remove" : "Add to Plan"}
          </Button>
        </CardFooter>
      </Card>

      <ActivityDetailDialog
        activity={activity}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isInCart={isInCart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </>
  );
};

export const ActivityCard = memo(ActivityCardComponent);
