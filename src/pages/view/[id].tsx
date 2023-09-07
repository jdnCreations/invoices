import { useRouter } from "next/router";
import StatusIndicator from "~/components/StatusIndicator";
import { api } from "~/utils/api";

export default function InvoicePage() {
  const router = useRouter();
  const id = String(router.query.id);

  const data = api.invoice.getById.useQuery(id).data;

  return (
    <>
      {data && (
        <div className="flex h-[5.5rem] max-w-[45.625rem] items-center justify-between gap-2 rounded-[0.5rem] bg-white px-8 shadow-md">
          <div className="flex items-center gap-5">
            <p className="font-medium text-[#858BB2]">Status</p>
            <StatusIndicator key={id} invoice={data} />
          </div>
          <div className="flex gap-2">
            <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-[#F9FAFE] px-6 font-bold text-07">
              Edit
            </button>
            <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-09 px-6 font-bold text-white">
              Delete
            </button>
            <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-01 px-6 font-bold text-white">
              Mark as Paid
            </button>
          </div>
        </div>
      )}
    </>
  );
}
