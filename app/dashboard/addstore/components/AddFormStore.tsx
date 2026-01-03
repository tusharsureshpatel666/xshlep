"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../../components/heading";

import axios from "axios";

import { useRouter } from "next/navigation";

import { useParticStore, useStoreStep } from "@/store/store";

import StepIntro from "./form-steps/StepIntro";
import StepTitle from "./form-steps/StepTitle";
import FormNavigation from "./form-steps/Navitgate";
import StepTypeStore from "./form-steps/StepTypeStore";
import LocationPicker from "./form-steps/stepMap";
import { isValidDelhiPin } from "@/type/pinvalidation";
import StepImage from "./form-steps/StepImage";
import StepPartic from "./form-steps/StepPartic";
import StoreMethodtype from "./form-steps/StoreMethodtype";
import TrueVideo from "./form-steps/trueVideo";
import PriceInput from "./form-steps/stepprice";
import StepDesc from "./form-steps/StepDesc";
import PeopleDesc from "./form-steps/PeopleDesc";

const AddFormStore = () => {
  const { sStep, setSStep, nextSStep, prevStep, resetStep } = useStoreStep();
  const [loading, setLoading] = useState(false);
  const [storeType, setStoreType] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, Sstate] = useState("");
  const [pin, setPin] = useState("");
  const [fullAdd, setFullAdd] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("2000");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    resetStep(); // 👈 resets step when route is opened
  }, [resetStep]);
  const [peopleDesc, setPeopleDesc] = useState("");

  const [bussinessType, setBussinessType] = useState("");

  const router = useRouter();
  const [shake, setShake] = useState(false);
  const { share, setMode, updateShare } = useParticStore();
  const { mode } = share;

  const isStepValid =
    // Step 1: title
    (sStep === 1 && title.trim() !== "") ||
    // Step 2: store type
    (sStep === 2 && storeType.trim() !== "") ||
    // Step 3: Delhi location
    (sStep === 3 &&
      country === "India" &&
      state === "Delhi" &&
      city.trim() !== "" &&
      isValidDelhiPin(pin) &&
      fullAdd.trim().length > 10) ||
    // Step 4: images
    (sStep === 4 &&
      bannerImage !== null &&
      otherImages.filter((img) => img !== null).length === 4) ||
    // Step 5: must select a sharing mode
    (sStep === 5 && mode !== "") ||
    // Step 6: validate by sharing mode
    (sStep === 6 &&
      mode !== "" &&
      // HOURS_BY_HOURS
      ((mode === "HOURS_BY_HOURS" && !!share.startTime && !!share.endTime) ||
        // DAYS_BY_DAYS
        (mode === "DAYS_BY_DAYS" &&
          Array.isArray(share.days) &&
          share.days.length > 0) ||
        // SPLIT_STORE
        (mode === "SPLIT_STORE" &&
          typeof share.sqft === "number" &&
          share.sqft > 0) ||
        // DAY_OR_NIGHT
        (mode === "DAY_OR_NIGHT" &&
          (share.dayOrNight === "Day" || share.dayOrNight === "Night")) ||
        // Weekend (no extra input)
        mode === "Weekend" ||
        // Regular (no extra input)
        mode === "Regular")) ||
    (sStep === 7 && videoFile !== null) ||
    (sStep === 8 && Number(price) > 0) ||
    (sStep === 9 && bussinessType !== "") ||
    (sStep === 10 && desc !== "") ||
    (sStep === 11 && peopleDesc !== "") ||
    // Step 7+
    sStep > 12;

  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    nextSStep();
  };

  const handleFinish = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("storeSize", storeType);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pin", pin);
    formData.append("fullAddress", fullAdd);
    if (bannerImage) formData.append("bannerImage", bannerImage);
    otherImages.forEach((img, index) => {
      if (img) formData.append(`image_${index}`, img);
    });
    formData.append(
      "share",
      JSON.stringify({
        mode: share.mode,
        startTime: share.startTime ?? null,
        endTime: share.endTime ?? null,
        days: share.days ?? [],
        sqft: share.sqft ?? null,
        dayOrNight: share.dayOrNight ?? null,
      })
    );
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }

    formData.append("desc", desc);

    formData.append("priceInr", price);

    formData.append("businessType", bussinessType);
    formData.append("peopleDesc", peopleDesc);
    console.log(share);

    try {
      const res = await axios.post("/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data.store);
      router.push(`/dashboard/store/${res.data.store.id}`);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-6 mt-4 pb-28">
      {/* STEP 0 */}
      {sStep === 0 && <StepIntro />}

      {sStep === 1 && <StepTitle title={title} setTitle={setTitle} />}

      {sStep === 2 && (
        <StepTypeStore value={storeType} onChange={setStoreType} />
      )}

      {sStep === 3 && (
        <LocationPicker
          country={country}
          setCountry={setCountry}
          state={state}
          Sstate={Sstate}
          city={city}
          setCity={setCity}
          pin={pin}
          setPin={setPin}
          fullAdd={fullAdd}
          setFullAdd={setFullAdd}
        />
      )}

      {sStep == 4 && (
        <StepImage
          bannerImage={bannerImage}
          otherImages={otherImages}
          setBannerImage={setBannerImage}
          setOtherImages={setOtherImages}
        />
      )}
      {sStep == 5 && <StepPartic />}
      {sStep == 6 && <StoreMethodtype />}
      {sStep == 7 && (
        <TrueVideo
          setVideoFile={setVideoFile}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
        />
      )}
      {sStep == 8 && <PriceInput price={price} setPrice={setPrice} />}

      {sStep == 9 && (
        <div className="space-y-8 justify-center flex flex-col items-center">
          <Heading
            title="Business Details"
            description="What kind of business do you run?"
            className="text-center"
          />

          <input
            value={bussinessType}
            onChange={(e) => setBussinessType(e.target.value)}
            placeholder="Business type"
            className="
      w-full max-w-xl
      text-5xl font-semibold text-center
      bg-transparent
      border-none outline-none
      placeholder:text-gray-400
      caret-black dark:caret-white
      dark:text-white
      focus:ring-0
    "
          />

          {/* Helper text like Airbnb */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
            Example keywords: Barber, Bakery, Yoga Studio, Gaming Café,
            Restaurant, Gym, Salon, Coaching Center
          </p>
        </div>
      )}

      {sStep == 10 && <StepDesc description={desc} setDescription={setDesc} />}

      {sStep == 11 && (
        <PeopleDesc
          partnerDescription={peopleDesc}
          setPartnerDescription={setPeopleDesc}
        />
      )}

      {sStep == 12 && (
        <div className="text-center space-y-6 flex flex-col items-center justify-center">
          {/* Large Responsive Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <Image src={"/done.svg"} width={500} height={500} alt="hello" />
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

      <FormNavigation
        step={sStep}
        isValid={isStepValid}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default AddFormStore;
