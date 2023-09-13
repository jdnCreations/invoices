import type { Invoice, Person } from "@prisma/client";
import Link from "next/link";
import StatusIndicator from "./StatusIndicator";
import { format } from "path";

export const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function Invoice(props: { invoice: Invoice; person: Person }) {
  return (
    <Link
      href={`/view/${props.invoice.id}`}
      className="flex w-[calc(100%-1.5rem)] flex-col gap-3 pb-4 md:max-w-[45.625rem]"
    >
      <div className="grid grid-cols-2 grid-rows-4 items-center rounded-md bg-white px-[1.5rem] py-4 font-medium shadow md:grid-cols-5 md:grid-rows-1">
        <p className="order-first text-heading-s font-bold leading-heading-s-var tracking-heading-s text-08">
          <span className="text-07">#</span>
          {props.invoice.id}
        </p>
        <p className="col-start-1 row-start-3 text-body leading-body text-07 md:col-start-2 md:row-start-1">
          <span className="text-06">Due</span>{" "}
          {formatDate(props.invoice.dueDate)}
        </p>
        <p className="col-start-2 row-start-1 place-self-end text-body leading-body text-06 md:col-start-3 md:place-self-auto">
          {props.person.name}
        </p>
        <p className="col-start-1 row-start-4 text-heading-s font-bold leading-heading-s tracking-heading-s md:col-start-4 md:row-start-1">
          {currency.format(props.invoice.amount)}
        </p>
        <StatusIndicator invoice={props.invoice} />
      </div>
    </Link>
  );
}
