import type { Item } from "@prisma/client";

export default function ItemDisplay(props: { item: Item }) {
  return (
    <div className="grid grid-cols-5 py-4">
      <div className="col-span-2 col-start-1 text-07">
        <p className="font-bold text-08">{props.item.name}</p>
      </div>
      <div className="text-right font-bold text-07">
        <p className="text-center">{props.item.quantity}</p>
      </div>
      <div className="text-right font-bold text-07">
        <p>${props.item.price}</p>
      </div>
      <div className="text-right text-07">
        <p className="font-bold text-08">
          ${`${props.item.price * props.item.quantity}`}
        </p>
      </div>
    </div>
  );
}
