import users from "../data/user.json"

function ValidateLogin(email: string, password: string) {

    const user = users.find(
        (u) =>
            u.email === email &&
            u.password === password
    );

    if (user) {
        return user;

    } else {
        return false

    }

}
export default ValidateLogin;