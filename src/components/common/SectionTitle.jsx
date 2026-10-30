const SectionTitle = ({
  subtitle,
  title,
  description,
  align = "center",
}) => {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>

      {subtitle && (
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#C8A98B]">
          {subtitle}
        </p>
      )}

      <h2 className="font-serif text-3xl text-[#171717] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500">
          {description}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;