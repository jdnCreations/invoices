export default function StatusIndicator(props: { status: string }) {
  let accentText = "";
  let accentBackground = "";
  let fadedBackground = "";

  switch (props.status.toLowerCase()) {
    case "paid":
      accentText = "text-accent-green";
      accentBackground = "bg-accent-green";
      fadedBackground = "bg-accent-green/10";
      break;
    case "pending":
      accentText = "text-accent-orange";
      accentBackground = "bg-accent-orange";
      fadedBackground = "bg-accent-orange/10";
      break;
    case "draft":
      accentText = "text-accent-gray";
      accentBackground = "bg-accent-gray";
      fadedBackground = "bg-accent-gray/10";
      break;
  }

  return (
    <div
      className={`col-start-2 row-span-2 row-start-3 flex h-[2.5rem] w-[6.5rem] items-center justify-center gap-2 place-self-end rounded ${fadedBackground} md:col-start-5 md:row-span-1 md:row-start-1 md:self-auto`}
    >
      <div className={`h-2 w-2 rounded-full ${accentBackground}`}></div>
      <p
        className={`text-heading-s font-bold leading-heading-s-var tracking-heading-s ${accentText}`}
      >
        {props.status}
      </p>
    </div>
  );
}
