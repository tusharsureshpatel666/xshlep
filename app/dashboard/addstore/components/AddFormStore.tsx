"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Heading from "../../components/heading";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import Link from "next/link";

const AddFormStore = () => {
  const [sStep, setSstep] = useState(0);

  // Form fields
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, Sstate] = useState("");
  const [pin, setPin] = useState("");
  const [fullAdd, setFullAdd] = useState("");
  const [price, setPrice] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [bussinessType, setBussinessType] = useState("");

  // Animation control
  const [shake, setShake] = useState(false);

  // Validation
  const isStepValid =
    (sStep === 1 && title.trim() !== "" && desc.trim() !== "") ||
    (sStep === 2 &&
      country.trim() !== "" &&
      state.trim() !== "" &&
      city.trim() !== "" &&
      pin.trim() !== "" &&
      fullAdd.trim() !== "") ||
    (sStep === 3 && price.trim() !== "" && Number(price) > 0) ||
    (sStep === 4 &&
      bannerImage !== null &&
      otherImages.filter((img) => img !== null).length === 5) ||
    (sStep === 5 && bussinessType.trim() !== "") ||
    sStep > 6;

  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setSstep(sStep + 1);
  };

  const handleFinish = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);

    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pin", pin);
    formData.append("fullAddress", fullAdd);
    formData.append("priceInr", price);

    formData.append("businessType", bussinessType);

    if (bannerImage) formData.append("bannerImage", bannerImage);
    otherImages.forEach((img, index) => {
      if (img) formData.append(`image_${index}`, img);
    });

    try {
      const res = await axios.post("/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-6 mt-4 pb-28">
      {/* STEP 0 */}
      {sStep === 0 && (
        <div className="flex flex-col gap-8 animate-fadeIn">
          {/* Illustration */}
          <div className="flex justify-center w-full">
            <video
              width={150}
              height={320}
              autoPlay
              loop
              muted
              playsInline
              className="drop-shadow-lg rounded-2xl"
            >
              <source src="/fix.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Heading */}
          <Heading
            title="List Your Store & Unlock New Opportunities 🚀"
            description="Turn your unused space into income — list your store and connect with reliable partners to split the rent effortlessly."
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="cursor-pointer rounded-xl py-6 text-sm font-medium hover:scale-[1.02] transition"
              >
                ← Back to Dashboard
              </Button>
            </Link>

            <Button
              onClick={() => setSstep(1)}
              className="rounded-xl cursor-pointer py-6 text-sm font-medium hover:scale-[1.02] transition"
            >
              Start Now
            </Button>
          </div>
        </div>
      )}

      {/* STEP 1 */}
      {sStep === 1 && (
        <div className="w-full space-y-4">
          <Heading
            title="Add Store Details"
            description="List your store and connect with reliable partners to reduce rent costs."
          />

          {/* Store Title */}
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Store Title
            </Label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your store name"
              className="
                w-full px-4 py-3 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
            />
          </div>

          {/* Store Description */}
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Description
            </Label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write a short description about the store"
              className="
                w-full px-4 py-2 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
                min-h-[200px]
              "
            />
          </div>
        </div>
      )}
      {sStep === 2 && (
        <div className="space-y-4">
          <Heading
            title="Select Location"
            description="Tell Me About Your Location Where Is Your Store."
          />

          {/* Country Dropdown using Shadcn */}
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Country
            </Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="
              w-full justify-between 
              px-4 py-6 
              rounded-lg border
              border-gray-400 dark:border-gray-600
              dark:text-white bg-white dark:bg-black
            "
                >
                  {country ? (
                    <span className="flex items-center gap-2">
                      🇮🇳 {country}
                    </span>
                  ) : (
                    "Select Country"
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => setCountry("India")}
                  className="flex items-center w-full gap-2 cursor-pointer"
                >
                  🇮🇳 India
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              State
            </Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="
          w-full justify-between 
          px-4 py-6 
          rounded-lg border
          border-gray-400 dark:border-gray-600
          dark:text-white bg-white dark:bg-black
        "
                >
                  {state ? (
                    <span className="flex items-center gap-2"> {state}</span>
                  ) : (
                    "Select State"
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                <DropdownMenuItem
                  onClick={() => Sstate("Delhi")}
                  className="flex items-center w-full gap-2 cursor-pointer"
                >
                  Delhi
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => Sstate("Haryana")}
                  className="flex items-center w-full gap-2 cursor-pointer"
                >
                  Haryana
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              City
            </Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="
          w-full justify-between 
          px-4 py-6 
          rounded-lg border
          border-gray-400 dark:border-gray-600
          dark:text-white bg-white dark:bg-black
        "
                >
                  {city ? city : "Select City"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                {/* Cities for Haryana */}
                {state === "Haryana" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => setCity("Gurgaon")}
                      className="cursor-pointer"
                    >
                      Gurgaon
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setCity("Noida")}
                      className="cursor-pointer"
                    >
                      Noida
                    </DropdownMenuItem>
                  </>
                )}

                {/* Cities for Delhi */}
                {state === "Delhi" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => setCity("New Delhi")}
                      className="cursor-pointer"
                    >
                      New Delhi
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setCity("South Delhi")}
                      className="cursor-pointer"
                    >
                      South Delhi
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setCity("West Delhi")}
                      className="cursor-pointer"
                    >
                      West Delhi
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setCity("East Delhi")}
                      className="cursor-pointer"
                    >
                      East Delhi
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Pin
            </Label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Pin eg : (110041)"
              className="
                w-full px-4 py-1 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Full Address
            </Label>
            <textarea
              value={fullAdd}
              onChange={(e) => setFullAdd(e.target.value)}
              placeholder="Write Full Address"
              className="
                w-full px-4 py-1 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
            />
          </div>
        </div>
      )}
      {sStep == 3 && (
        <div className="space-y-4">
          <Heading
            title="Price (₹)"
            description="How much rent you want split"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your store name"
            className="
                w-full px-4 py-3 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
          />
        </div>
      )}

      {sStep == 4 && (
        <div className="space-y-6">
          <Heading
            title="Upload Images"
            description="Add a banner image and room photos"
          />

          {/* Banner Image */}
          <div>
            <p className="font-semibold mb-2">Banner Image (Required)</p>

            <div
              className="w-full h-64 border-2 border-dashed border-gray-400 dark:border-gray-600 
                      rounded-xl flex items-center justify-center bg-gray-50 dark:bg-zinc-900 cursor-pointer"
              onClick={() => bannerInputRef.current?.click()}
            >
              {bannerImage ? (
                <Image
                  src={URL.createObjectURL(bannerImage)}
                  className="w-full h-full object-contain rounded-xl"
                  alt="banner preview"
                  width={50}
                  height={50}
                />
              ) : (
                <span className="text-gray-500">
                  Click to upload Banner Image
                </span>
              )}
            </div>

            <input
              type="file"
              ref={bannerInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBannerImage(file);
              }}
            />
          </div>

          {/* Other Images */}
          <div>
            <p className="font-semibold mb-2">
              Room / Property Images (5 Required)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-28 border-2 border-dashed border-gray-400 dark:border-gray-600
                       rounded-xl flex items-center justify-center bg-gray-50 dark:bg-zinc-900 
                       cursor-pointer"
                  onClick={() => imageInputRefs.current[index]?.click()}
                >
                  {otherImages[index] ? (
                    <Image
                      width={140}
                      height={150}
                      src={URL.createObjectURL(otherImages[index] as File)}
                      className="w-full h-full object-cover rounded-xl"
                      alt="preview"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm text-center">
                      + Image {index + 1}
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => {
                      imageInputRefs.current[index] = el;
                    }}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const updated = [...otherImages];
                      updated[index] = file;
                      setOtherImages(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {sStep == 5 && (
        <div className="space-y-6">
          <Heading
            title="Business Details"
            description="Tell us about your business — what type of store do you run? For example: Yoga Studio, Gaming Café, Restaurant, or any other service."
          />
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Bussiness Type
            </Label>
            <input
              value={bussinessType}
              onChange={(e) => setBussinessType(e.target.value)}
              placeholder="Enter your Bussiness Type"
              className="
                w-full px-4 py-3 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
            />
          </div>
        </div>
      )}

      {sStep == 6 && (
        <div className="text-center space-y-6 flex flex-col items-center justify-center">
          {/* Large Responsive Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <Image
              src="/done.svg"
              width={160}
              height={160}
              alt="Success"
              className="w-full h-full object-contain"
            />
          </div>

          <Heading
            title="Thank You For Completing This Step 🎉"
            description="You're all set with your general information!"
          />

          <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xl mx-auto px-4">
            Awesome! Your basic details are now complete. Next, let’s move ahead
            and{" "}
            <span className="font-semibold">
              finish setting up your listing
            </span>{" "}
            so we can help you find the{" "}
            <span className="font-semibold">best partner renters</span> for your
            space.
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      {sStep !== 0 && (
        <div
          className="
      fixed bottom-0 left-0 right-0 
      bg-white dark:bg-black 
      border-t border-gray-300 dark:border-gray-700 
      p-4 flex items-center justify-between
    "
        >
          {/* Prev */}
          <Button
            size="lg"
            onClick={() => setSstep(sStep - 1)}
            disabled={sStep === 1}
            className="rounded-md py-6 cursor-pointer text-base"
          >
            Prev
          </Button>

          {/* Next / Finish with Shake Animation */}
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {sStep === 6 ? (
              // ✅ FINISH BUTTON
              <Button
                size="lg"
                onClick={handleFinish} // <-- your new function
                className="rounded-md py-6 cursor-pointer text-base"
              >
                Finish
              </Button>
            ) : (
              // ✅ NEXT BUTTON
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!isStepValid}
                className={`rounded-md py-6 cursor-pointer text-base 
            ${!isStepValid ? "opacity-60 cursor-not-allowed" : ""}
          `}
              >
                Next
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AddFormStore;
