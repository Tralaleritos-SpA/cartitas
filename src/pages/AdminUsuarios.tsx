import UserCreationForm from "../components/UserCreationForm";

function AdminUsuarios() {
    return (
        <div className="dashboard-container">
            <h2>Usuarios</h2>
            <div className="box">
                <UserCreationForm />
            </div>
        </div>
    );
}

export default AdminUsuarios;
