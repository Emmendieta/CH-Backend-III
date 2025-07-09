const divNavBarButtons = document.getElementById("navBarButtons");
const btnSearch = document.getElementById("btnSearch");

const verifyCurrent = async () => {
    try {
        let opts = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        };
        let url = "/api/auth/current";
        let response = await fetch(url, opts);
        response = await response.json();
        //En caso de esta logueado, se muestran las opciones correspondientes:
        if (response.error) {
            divNavBarButtons.innerHTML = `
                <a class="btn btn-outline-success" href="/register" id="navBarBtnSingUp">Sing Up</a>
                <a class="btn btn-outline-success" href="/login" id="navBarBtnLogin">Login</a>
            `;
        } else {
            let role = response.response.role;
            //En caso de que este logueado como admin, muestro las siguientes opciones:
            if (role === "admin") {
                divNavBarButtons.innerHTML = `
                <a class="btn btn-outline-success" href="/profile" id="navBarBtnpProfile">Profile</a>
                <a class="btn btn-outline-success" id="navBarBtnPets" href="/user-pets">My Pets</a>
                <a class="btn btn-outline-success" id="navBarBtnAllAdoptions" href="/adoptions">All Adoptions</a>
                <button class="btn btn-outline-success" type="submit" id="navBarBtnSignOut">Sign Out</button>
            `;
            }
            else if (role === "user") {
                divNavBarButtons.innerHTML = `
                <a class="btn btn-outline-success" href="/profile" id="navBarBtnpProfile">Profile</a>
                <a class="btn btn-outline-success" id="navBarBtnPets" href="/user-pets">My Pets</a>
                <button class="btn btn-outline-success" type="submit" id="navBarBtnSignOut">Sign Out</button>
            `;
            }

            //Evento para cerrar sesion:
            document.getElementById("navBarBtnSignOut").addEventListener("click", async () => {
                try {
                    //
                    opts = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    };
                    url = "/api/auth/signout";
                    await fetch(url, opts);
                    localStorage.removeItem("token");
                    location.replace("/")
                } catch (error) {
                    console.log(error); /* ---------- MODIFICAR ESTO PARA WINSTON!!! ---------- */
                }
            });
        };
    } catch (error) {
        console.log(error); /* ---------- MODIFICAR ESTO PARA WINSTON!!! ---------- */
    }
};

verifyCurrent();

btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Function not avalible, please try again later!");
});