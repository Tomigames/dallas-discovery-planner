import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, Clock, DollarSign, ExternalLink, Hourglass, MapPin } from "lucide-react";

const monthDisplay = [
  { label: "Jan", value: "January" },
  { label: "Feb", value: "February" },
  { label: "Mar", value: "March" },
  { label: "Apr", value: "April" },
  { label: "May", value: "May" },
  { label: "Jun", value: "June" },
  { label: "Jul", value: "July" },
  { label: "Aug", value: "August" },
  { label: "Sep", value: "September" },
  { label: "Oct", value: "October" },
  { label: "Nov", value: "November" },
  { label: "Dec", value: "December" },
];

const weekDisplay = [
  { label: "S", value: "Sunday" },
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
];

interface ActivityCardProps {
  activity: Activity;
  onAddToCart: (activity: Activity) => void;
  onRemoveFromCart: (id: string) => void;
  isInCart: boolean;
  onPreload?: (activity: Activity) => void;
}

const ActivityCardComponent = ({ activity, onAddToCart, onRemoveFromCart, isInCart, onPreload }: ActivityCardProps) => {
  const [hasAutoPreloaded, setHasAutoPreloaded] = useState(false);
  const intersectionRef = useRef<IntersectionObserver | null>(null);
  const galleryImages = activity.images && activity.images.length > 0 ? activity.images : [activity.image];
  const heroImage = galleryImages[0] ?? activity.image;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const activeImage = galleryImages[Math.min(activeImageIndex, galleryImages.length - 1)];

  const availableMonthsSet = new Set(activity.availableMonths.map(month => month.toLowerCase()));
  const isYearRound = availableMonthsSet.size >= monthDisplay.length;
  const openDaysSet = new Set(activity.openDays.map(day => day.toLowerCase()));
  useEffect(() => {
    setActiveImageIndex(0);
    setIsGalleryOpen(false);
    setHasAutoPreloaded(false);
    intersectionRef.current?.disconnect();

    return () => {
      intersectionRef.current?.disconnect();
    };
  }, [activity.id]);
  const handleCartClick = () => {
    if (isInCart) {
      onRemoveFromCart(activity.id);
      return;
    }
    onAddToCart(activity);
  };
  const goToNextImage = useCallback(() => {
    setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);
  const goToPrevImage = useCallback(() => {
    setActiveImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);
  const setImage = (index: number) => setActiveImageIndex(index);
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextImage();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevImage();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isGalleryOpen, goToNextImage, goToPrevImage]);

  return (
    <Dialog>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow"
        onMouseEnter={() => onPreload?.(activity)}
        ref={node => {
          if (!node || hasAutoPreloaded || typeof window === "undefined") return;

          intersectionRef.current?.disconnect();

          if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  onPreload?.(activity);
                  setHasAutoPreloaded(true);
                  observer.disconnect();
                }
              });
            }, { rootMargin: "200px 0px" });

            intersectionRef.current = observer;
            observer.observe(node);
          } else {
            onPreload?.(activity);
            setHasAutoPreloaded(true);
          }
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`View details for ${activity.title}`}
            className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            onFocus={() => onPreload?.(activity)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={heroImage}
                alt={activity.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        </DialogTrigger>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{activity.title}</CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {activity.category}
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
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              More Info
            </Button>
          </DialogTrigger>
          <Button
            onClick={handleCartClick}
            variant={isInCart ? "outline" : "default"}
            className={cn(
              "flex-1 gap-2",
              isInCart && "border-destructive text-destructive hover:bg-destructive/10"
            )}
          >
            {isInCart ? (
              "Remove"
            ) : (
              "Add to Plan"
            )}
          </Button>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{activity.title}</DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="mt-2">
              {activity.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 min-w-0">
          <div className="relative">
            <img
              src={activeImage}
              alt={activity.title}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover aspect-video cursor-pointer"
              onClick={() => setIsGalleryOpen(true)}
            />
            {galleryImages.length > 1 && (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-black/70 via-black/40 to-transparent hover:from-black/80 hover:via-black/60 border border-white/20 shadow-lg"
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-gradient-to-l from-black/70 via-black/40 to-transparent hover:from-black/80 hover:via-black/60 border border-white/20 shadow-lg"
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="w-full max-w-full min-w-0 overflow-hidden">
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 flex-nowrap w-full max-w-full min-w-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setImage(idx)}
                    className={cn(
                      "h-16 w-24 rounded-md overflow-hidden border-2 transition ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0",
                      idx === activeImageIndex ? "border-primary" : "border-transparent"
                    )}
                    aria-label={`View image ${idx + 1}`}
                  >
                  <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <a
              href={activity.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Visit website
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
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
              <div className="w-full">
                <h4 className="font-semibold">Monthly Availability</h4>
                {isYearRound ? (
                  <p className="text-sm text-muted-foreground mt-2">Available Year-Round</p>
                ) : (
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {monthDisplay.map(month => (
                      <div
                        key={month.value}
                        className={cn(
                          "rounded-full px-2 py-1 text-xs text-center border",
                          availableMonthsSet.has(month.value.toLowerCase())
                            ? "bg-primary text-primary-foreground border-primary"
                            : "text-muted-foreground border-border",
                        )}
                      >
                        {month.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
              <div className="w-full">
                <h4 className="font-semibold">Weekly Schedule</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {weekDisplay.map(day => {
                    const isOpen = openDaysSet.has(day.value.toLowerCase());

                    return (
                      <div
                        key={day.value}
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium border",
                          isOpen
                            ? "bg-emerald-500/90 text-white border-emerald-500"
                            : "bg-muted text-muted-foreground",
                        )}
                        aria-label={`${day.value} ${isOpen ? "open" : "closed"}`}
                      >
                        {day.label}
                      </div>
                    );
                  })}
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
                    <Badge key={i} variant="outline">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-sm text-muted-foreground">{activity.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Hourglass className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Duration</h4>
                <p className="text-sm text-muted-foreground">{activity.duration}</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-between">
          <p className="text-sm text-muted-foreground sm:mr-auto">
            {isInCart
              ? "Already in your plan - click Remove to take it out."
              : "Add this activity directly to your plan."}
          </p>
          <Button
            onClick={handleCartClick}
            variant={isInCart ? "outline" : "default"}
            className={cn(
              "gap-2",
              isInCart && "border-destructive text-destructive hover:bg-destructive/10"
            )}
          >
            {isInCart ? (
              "Remove"
            ) : (
              "Add to Plan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="text-xl">Gallery</DialogTitle>
            <DialogDescription className="text-sm">{activity.title}</DialogDescription>
          </DialogHeader>

          <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden bg-muted/40">
            <img
              src={activeImage}
              alt={activity.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain bg-background"
            />
            {galleryImages.length > 1 && (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-black/70 via-black/40 to-transparent hover:from-black/80 hover:via-black/60 border border-white/20 shadow-lg"
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-gradient-to-l from-black/70 via-black/40 to-transparent hover:from-black/80 hover:via-black/60 border border-white/20 shadow-lg"
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="w-full max-w-full min-w-0 overflow-hidden">
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 flex-nowrap w-full max-w-full min-w-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setImage(idx)}
                    className={cn(
                      "h-16 w-24 rounded-md overflow-hidden border-2 transition ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0",
                      idx === activeImageIndex ? "border-primary" : "border-transparent"
                    )}
                    aria-label={`View image ${idx + 1}`}
                  >
                  <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export const ActivityCard = memo(ActivityCardComponent);
