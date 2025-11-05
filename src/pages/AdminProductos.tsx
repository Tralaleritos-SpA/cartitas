import ProductCreationForm from "../components/ProductCreationForm";

function AdminProductos() {
    return (
        <div className="dashboard-container">
            <h2>Productos</h2>
            <div className="box">
                <ProductCreationForm />
            </div>
        </div>
    );
}

export default AdminProductos;
