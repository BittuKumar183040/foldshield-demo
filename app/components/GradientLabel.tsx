interface GradientLabelProps {
  label: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "bold";
  centered?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg leading-normal",
  xl: "text-xl leading-normal",
  "2xl": "text-xl lg:text-3xl leading-tight",
  "3xl": "text-2xl lg:text-4xl leading-tight",
  "4xl": "text-3xl lg:text-5xl leading-[1.2]",
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

export default function GradientLabel({
  label,
  size = "lg",
  weight = "bold",
  centered = false,
  className = "",
}: GradientLabelProps) {
  return (
    <p
      className={`
        ${sizeMap[size]}
        ${weightMap[weight]}
        leading[1.2]
        ${centered ? "mx-auto w-fit text-center" : ""}
        bg-gradient-to-r
        from-[#252422]
        via-[#5e5a54]
        to-[#8B8780]
        dark:from-white
        dark:via-[#d1d5db]
        dark:to-[#9ca3af]
        bg-clip-text
        text-transparent
        ${className}
      `}
    >
      {label}
    </p>
  );
}
