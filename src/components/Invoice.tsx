import { Invoice } from "@prisma/client";

export default function Invoice(props: { invoice: Invoice }) {
  return (
    <div className="flex w-[calc(100%-1.5rem)] flex-col gap-3 md:max-w-[45.625rem]">
      <div className="grid grid-cols-2 grid-rows-4 items-center rounded-md bg-white px-[1.5rem] py-4 font-medium shadow md:grid-cols-5 md:grid-rows-1">
        <p className="order-first text-heading-s font-bold leading-heading-s-var tracking-heading-s text-08">
          <span className="text-07">#</span>
          {props.invoice.id}
        </p>
        <p className="col-start-1 row-start-3 text-body leading-body text-07 md:col-start-2 md:row-start-1">
          <span className="text-06">Due</span>{" "}
          {`${props.invoice.dueDate.toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`}
        </p>
        <p className="col-start-2 row-start-1 place-self-end text-body leading-body text-06 md:col-start-3 md:place-self-auto">
          {props.invoice.person}
        </p>
        <p className="col-start-1 row-start-4 text-heading-s font-bold leading-heading-s tracking-heading-s md:col-start-4 md:row-start-1">
          ${props.invoice.amount}
        </p>
        <div className="col-start-2 row-span-2 row-start-3 flex h-[2.5rem] w-[6.5rem] items-center justify-center gap-2 place-self-end rounded bg-accent-green/20 md:col-start-5 md:row-span-1 md:row-start-1 md:self-auto">
          <div className="h-2 w-2 rounded-full bg-accent-green"></div>
          <p className="text-heading-s font-bold leading-heading-s-var tracking-heading-s text-accent-green">
            {props.invoice.status}
          </p>
        </div>
      </div>
    </div>
  );
}
