import Heading from "@/app/dashboard/components/heading";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (value: string) => void;
};
const StepTypeStore = ({ value, onChange }: Props) => {
  const storetype = [
    {
      id: 1,
      title: "Small Store / Single Room",
      description: "Ideal for kirana, salon, mobile repair, small office",
      image: "/store/1.svg",
    },
    {
      id: 2,
      title: "Medium Store",
      description: "Suitable for café, boutique, coaching center",
      image: "/store/2.svg",
    },
    {
      id: 3,
      title: "Large Store / Showroom",
      description: "Best for restaurant, gym, electronics or furniture store",
      image: "/store/3.svg",
    },
    {
      id: 4,
      title: "Warehouse / Godown",
      description: "Used for storage, wholesale, logistics",
      image: "/store/4.svg",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 ">
      <Heading
        title="Choose Your Store Size"
        description="Select the option that best matches your store space."
        className="mb-5 text-center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {storetype.map((item) => {
          const selected = value === item.title;

          return (
            <div
              key={item.id}
              onClick={() => onChange(item.title)}
              className={clsx(
                "cursor-pointer rounded-xl border-2 p-4 transition-colors",
                "hover:border-[var(--primary)] hover:bg-[color:var(--primary)/0.08]",
                selected
                  ? "border-[var(--primary)] bg-[color:var(--primary)/0.12]"
                  : "border-gray-300 dark:border-gray-700",
              )}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepTypeStore;
