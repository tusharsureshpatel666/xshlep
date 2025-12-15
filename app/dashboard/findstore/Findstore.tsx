"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Heading from "../components/heading";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStoreSearch } from "@/store/store";

const Findstore = () => {
  const [sStep, setSstep] = useState(0);
  const [bussinessType, setBussinessType] = useState("");
  const [shake, setShake] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, Sstate] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();

  const searchStore = async (bussinessType: string) => {
    if (!bussinessType) return;

    try {
      const response = await axios.post("/api/store/getstore", {
        bussinessType,
      });
      console.log(response);
      const stores = response.data.stores;

      console.log("Matching stores:", stores);
      return stores;
    } catch (error: any) {
      console.error(
        "Error fetching stores:",
        error.response?.data || error.message
      );
      return [];
    }
  };

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const handleNext = () => {
    // if (!isStepValid) {
    //   setShake(true);
    //   setTimeout(() => setShake(false), 500);
    //   return;
    // }
    setSstep(sStep + 1);
  };
  const handleFinish = async () => {
    setLoading(true);

    const result = await searchStore(bussinessType);
    useStoreSearch.getState().setStores(result);
    console.log(result);

    setLoading(false);
    router.push("/dashboard/result");
  };
  const isStepValid = {};

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6 mt-4 pb-28">
      {/* STEP 0 */}
      {sStep === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/search.svg" width={300} height={300} alt="hello" />
          </div>

          <Heading
            title="Hey! What’s your business all about? 🚀"
            description="Give us a quick intro—what you do, what you sell, and why people love your brand. This helps us craft the perfect listing for your shared store."
          />

          <Button
            onClick={() => setSstep(1)}
            className="rounded-lg cursor-pointer w-full py-6 text-sm"
          >
            Search Now
          </Button>
        </>
      )}
      {sStep == 1 && (
        <div className="w-full space-y-4">
          <Heading
            title="Tell Me About Your Bussiness"
            description="Share the details of your business so we can match your store with the perfect partners for shared rent."
          />
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Bussiness Type
            </Label>
            <input
              required
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
      {sStep == 2 && (
        <div className="space-y-4">
          <Heading
            title="Select Location"
            description="Tell Me About Your Location Where Is Your Store."
          />

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

              <DropdownMenuContent
                align="start"
                className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
              >
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
        </div>
      )}
      {sStep == 3 && (
        <div className="space-y-4">
          <Heading
            title="Set Your Price"
            description="Choose a price range that fits your space and attracts the right renters."
          />
          <div className="flex gap-2">
            <input
              type="number"
              required
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="Min Value"
              className="
                w-full px-4 py-3 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
              "
            />
            <input
              type="number"
              required
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="Max Value"
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
            {sStep === 3 ? (
              // ✅ FINISH BUTTON
              <Button
                disabled={loading}
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

export default Findstore;
