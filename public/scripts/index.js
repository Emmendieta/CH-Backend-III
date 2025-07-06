window.addEventListener("DOMContentLoaded", async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            
        };

        const responseRaw = await fetch("/api/auth/current", opts);
        if (!responseRaw.ok) return;

        const response = await responseRaw.json();
        const currentUserRole = response.response.role;

        if (currentUserRole === "admin") {
            const button = document.createElement("a");
            button.href = "/pets/create";
            button.className = "btn btn-outline-success";
            button.innerText = "New Pet";
            const buttonContainer = document.getElementById("indexPetsAddDiv");
            if (buttonContainer) buttonContainer.appendChild(button);

            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                const cardBody = card.querySelector(".card-body");
                const id = card.querySelector("img")?.getAttribute("alt").trim();
                const name = card.querySelector("#petsTitleId")?.innerText;
                if (!id) return;

                const editButton = document.createElement("a");
                editButton.href = `/pets/edit/${id}`;
                editButton.className = "btn btn-outline-primary me-2";
                editButton.innerText = "Edit";

                const deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-outline-danger";
                deleteButton.innerText = "Delete";

                deleteButton.addEventListener("click", async () => {
                    const confirmDelete = confirm(`Are you sure you want to delete the pet: ${name}?`);
                    if (!confirmDelete) return;

                    try {
                        const deleteOpts = {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include"
                        };
                        const deleteRes = await fetch(`/api/pets/${id}`, deleteOpts);
                        const result = await deleteRes.json();

                        if (result.error?.message) {
                            alert(result.error.message);
                        } else {
                            alert("Pet Deleted!");
                            location.reload();
                        }
                    } catch (error) {
                        console.log(error.message);
                        alert("An error occurred while deleting the pet!");
                    }
                });

                const adminControls = document.createElement("div");
                adminControls.className = "d-flex justify-content-end mt-2";
                adminControls.appendChild(editButton);
                adminControls.appendChild(deleteButton);
                cardBody.appendChild(adminControls);
            });
        }
    } catch (error) {
        console.log("Error verifying user role:", error);
    }
});

/* window.addEventListener("DOMContentLoaded", async () => {
    try {
        let opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        };
        let url = "/api/auth/current";
        let response = await fetch(url, opts);
        if (!response.ok) { alert("ACA"); return;  } else {
            alert("Entro aca");
            response = await response.json();
            const currentUserRole = response.response.role;
            //Si el usuario es admin:
            if (currentUserRole === "admin") {
                const button = document.createElement("a");
                button.href = "/pets/create";;
                button.className = "btn btn-outline-success";
                button.innerText = "New Pet";
                const buttonContainer = document.getElementById("indexPetsAddDiv");
                if (buttonContainer) buttonContainer.appendChild(button);
                //Ahora habilito las ediciones y eliminiacion de las cards:
                const cards = document.querySelectorAll(".card");
                cards.forEach(card => {
                    const cardBody = card.querySelector(".card-body");
                    //VER SI ESTE ID ESTA BIEN!!!
                    const id = card.querySelector("img")?.getAttribute("alt").trim();
                    const title = card.querySelector("petsTitutleId").innerText;
                    if (!id) return;
                    //Boton editar:
                    const editButton = document.createElement("a");
                    editButton.href = `/pets/edit/${id}`;
                    editButton.className = "btn btn-outline-primary";
                    editButton.innerText = "Edit";
                    //Boton eliminar:
                    const deleteButton = document.createElement("a");
                    deleteButton.className = "btn btn-outline-danger";
                    deleteButton.innerText = "Delete";
                    //Evento para eliminar:
                    deleteButton.addEventListener("click"), async() => {
                        const confirDelete = confirm(`Are you sure you want to delete the pet: ${name}?`);
                        if(!confirDelete) { return; }
                        else {
                            try {
                                opts = {
                                    method: "DELETE",
                                    headers: { "Content-Type": "application/json" }
                                };
                                url = `/api/pets/${id}`;
                                response = await fetch(url, opts);
                                response = await response.json();
                                if (response.error) { alert(response.error); }
                                else {
                                    alert ("Pet Eliminated!");
                                    location.reload();
                                }
                            } catch (error) {
                                console.log(error.message);
                                alert("An error has ocurred while deleting the pet!");
                            };
                            //Contenedor de botones admin:
                            const adminControls = document.createElement("div");
                            adminControls.className = "d-flex flex-row justify-content-end";
                            adminControls.appendChild(editButton);
                            adminControls.appendChild(deleteButton);
                            cardBody.appendChild(adminControls);
                        };
                    };
                });
            };
        }
    } catch (error) {
        console.log("error al verificar el rol del usuario:", error);
    }
}); */