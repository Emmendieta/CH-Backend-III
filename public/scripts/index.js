window.addEventListener("DOMContentLoaded", async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" }            
        };
        let url = "/api/auth/current";
        const responseRaw = await fetch(url, opts);
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
                const pid = card.querySelector("img")?.getAttribute("alt").trim();
                const name = card.querySelector("#petsTitleId")?.innerText;
                if (!pid) return;

                const editButton = document.createElement("a");
                editButton.href = `/pets/edit/${pid}`;
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
                        const deleteRes = await fetch(`/api/pets/${pid}`, deleteOpts);
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