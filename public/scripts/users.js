window.addEventListener("DOMContentLoaded", async () => {
    try {
        let opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        let url = "/api/auth/current";
        let response = await fetch(url, opts);
        if (!response.ok) { return; };
        let data = await response.json();
        const currentUserRole = data.response.role;
        if (currentUserRole === "admin") {
            //Creo el boton para agregar usuario:
            const button = document.createElement("a");
            button.href = "/register";
            button.className = "btn btn-outline-success";
            button.innerText = "New User";
            const buttonContanier = document.getElementById("usersDivBtnAdd");
            if (buttonContanier) { buttonContanier.appendChild(button); };
            //Creo los botones de editar y eliminar usuarios:
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                const cardBody = card.querySelector("card-body");
                const uid = card.querySelector("#usersId").innerText;
                const firstName = card.querySelector("#usersTitleId")?.innerText;
                const lastName = card.querySelector("#usersLastName")?.innerText;
                if (!uid) { return; };
                //Boton Editar:
                const editButton = document.createElement("a");
                editButton.href = `/users/edit/${uid}`;
                editButton.className = "btn btn-outline-primary me-2";;
                editButton.innerText = "Edit";
                //Boton Eliminar:
                const deleteButton = document.createElement("a");
                deleteButton.className = "btn btn-outline-danger";
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", () => {
                    deleteUser(uid, firstName, lastName);
                });
                const userUlLiDivAdmin = card.querySelector(".userUlLiDivAdmin");
                userUlLiDivAdmin.appendChild(editButton);
                userUlLiDivAdmin.appendChild(deleteButton);
            });
        }
    } catch (error) {
        console.log("Error verifying user role", error);
    }
});

async function deleteUser(uid, fistName = "", lastName = "") {
    try {
        const confirmDelete = confirm(`Are you sure you want to delete the User: ${fistName} ${lastName}???`);
        if (!confirmDelete) { return; }
        else {
            let opts = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            };
            let url = `/api/users/${uid}`;
            let response = await fetch(url, opts);
            if (!response.ok) { return; };
            let data = await response.json();
            if(data.error?.message) { alert(data.error.message);} 
            else {
                alert("User Deleted!");
                location.reload();
            }
        }
    } catch (error) {
        console.error("Error trying to delete the user!", error);
    }
};