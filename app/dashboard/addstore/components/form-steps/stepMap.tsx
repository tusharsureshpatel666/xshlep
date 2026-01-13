"use client";

import Heading from "@/app/dashboard/components/heading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { DELHI_LOCATION } from "@/type/Loctation";
import { isValidDelhiPin } from "@/type/pinvalidation";
import React, { useState } from "react";

type Props = {
  country: string;
  setCountry: (v: string) => void;

  state: string;
  Sstate: (v: string) => void;

  city: string;
  setCity: (v: string) => void;

  pin: string;
  setPin: (v: string) => void;

  fullAdd: string;
  setFullAdd: (v: string) => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LocationPicker = ({
  country,
  setCountry,
  state,
  Sstate,
  city,
  setCity,
  pin,
  setPin,
  fullAdd,
  setFullAdd,
}: Props) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const isPinInvalid = pin.length > 0 && !isValidDelhiPin(pin);

  // Auto-set country/state
  React.useEffect(() => {
    setCountry(DELHI_LOCATION.country);
    Sstate(DELHI_LOCATION.state);
  }, []);

  // Get user location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          // Fill fields from address data
          const address = data.address || {};

          setCity(address.suburb || address.city || address.town || "");
          setPin(address.postcode || "");
          const addrParts = [
            address.house_number,
            address.road,
            address.neighbourhood,
            address.suburb,
          ];
          setFullAdd(addrParts.filter(Boolean).join(", "));
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Unable to fetch address from your location");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Unable to get your location");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="space-y-6 rounded-xl lg:p-6">
      <Heading
        title="Store Location"
        description="Select your store location (Delhi only)"
      />

      {/* Use current location */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? "Fetching..." : "Use Current Location"}
        </Button>
      </div>

      {/* Country + State */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <Label>Country</Label>
          <Button
            variant="outline"
            disabled
            className="w-full py-6 justify-start text-muted-foreground"
          >
            India
          </Button>
        </div>

        <div className="space-y-3">
          <Label>State</Label>
          <Button
            variant="outline"
            disabled
            className="w-full py-6 justify-start text-muted-foreground"
          >
            Delhi
          </Button>
        </div>
      </div>

      {/* City */}
      <div className="space-y-4">
        <Label>Area / City</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between py-6  font-normal"
            >
              {city || "Select area"}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto">
            {DELHI_LOCATION.cities.map((c) => (
              <DropdownMenuItem
                key={c}
                onClick={() => setCity(c)}
                className="cursor-pointer"
              >
                {c}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* PIN */}
      <div className="space-y-3 w-full">
        <Label>PIN Code</Label>
        <input
          type="text"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          placeholder="1100XX"
          className={`${inputClass} py-4 ${
            isPinInvalid ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
        <p
          className={`text-xs ${
            isPinInvalid ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {isPinInvalid
            ? "Invalid Delhi PIN (must start with 110)"
            : "Enter a valid Delhi PIN code"}
        </p>
      </div>

      {/* Full Address */}
      <div className="space-y-3">
        <Label>Full Address</Label>
        <textarea
          rows={3}
          value={fullAdd}
          onChange={(e) => setFullAdd(e.target.value)}
          placeholder="House no, street, landmark..."
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-muted-foreground">
          Please include house number and nearby landmark
        </p>
      </div>
    </div>
  );
};

export default LocationPicker;
