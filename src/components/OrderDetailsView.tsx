
import type { OrderDetails } from "../services/orderService";
import { clpFormatter } from "../hooks/currencyFormat";

export default function OrderDetailsView({ details }: { details: OrderDetails }) {
  const productSubtotal = details.total_price - details.shippingFee;

  return (
    <div className="p-3">
      <h5>📦 Artículos del Pedido:</h5>
      <table className="table table-bordered table-sm my-3">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {details.items.map(item => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{clpFormatter.format(item.unitPrice)}</td>
              <td>{clpFormatter.format(item.subTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <div>
          <h5>📍 Información de Envío:</h5>
          <p className="mb-0">
            <strong>Destinatario:</strong> {details.fullName}<br />
            <strong>Dirección:</strong> {details.shippingAddress}<br />
            <strong>Ubicación:</strong> {details.shippingCity}, {details.shippingZip}
          </p>
        </div>

        <div className="text-end">
          <h5>Resumen de Costos:</h5>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td className="text-end">Subtotal Productos:</td>
                <td className="text-end">{clpFormatter.format(productSubtotal)}</td>
              </tr>
              <tr>
                <td className="text-end">Costo de Envío:</td>
                <td className="text-end">{clpFormatter.format(details.shippingFee)}</td>
              </tr>
              <tr className="table-dark">
                <td className="text-end">TOTAL PAGADO:</td>
                <td className="text-end">{clpFormatter.format(details.total_price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
