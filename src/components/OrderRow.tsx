
import type { OrderSummary } from "../services/orderService";
import { clpFormatter } from "../hooks/currencyFormat";

type Props = {
  order: OrderSummary;
  isOpen: boolean;
  onToggle: (orderId: string) => void;
};

export default function OrderRow({ order, isOpen, onToggle }: Props) {
  return (
    <tr>
      <td>{order.id.substring(0, 8)}</td>
      <td>{new Date(order.created_at).toLocaleDateString()}</td>
      <td>{clpFormatter.format(order.total_price)}</td>
      <td>{order.shippingCity}</td>
      <td>
        <span className={`badge ${order.status === "PENDING" ? "bg-warning" : "bg-success"}`}>
          {order.status}
        </span>
      </td>
      <td>
        <button
          className="button-primary btn-sm btn-info"
          onClick={() => onToggle(order.id)}
        >
          {isOpen ? "Ocultar Detalles" : "Ver Detalles"}
        </button>
      </td>
    </tr>
  );
}
