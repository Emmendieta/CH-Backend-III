window.addEventListener("DOMContentLoaded", async () => {
    try {
        const btnAdopt = document.getElementById("btnAdopt");
        let opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        let url = "/api/auth/current";
        let response = await fetch(url, opts);
        if (!response.ok) {
            btnAdopt.innerText = "You must be logged in to adopt a pet";
            return;
        } else {
            const res = await response.json();
            const pid = document.getElementById("petId").innerText.trim();
            const h3Owner = document.getElementById("petOwner").innerText.trim();
            const h3Adpoted = document.getElementById("petAdopted").innerText.trim();
            //En el caso de que la mascota este adoptada, desactivo el boton de adoptar:
            if (h3Owner.length > 0 && h3Adpoted === "true") {
                btnAdopt.disabled = true;
                btnAdopt.innerText = "Pet alredy adopted!";
            } else {
                btnAdopt.disabled = false;
            }
            //Si no se reconoce el id de la mascota:
            if (pid.length === 0) {
                alert("Couldn´t get pet id!");
                return;
            } else {
                let adminId = res.response._id;
                const userRole = res.response.role;
                opts = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                };
                //Evento para cuando se hace click en adoptar:
                btnAdopt.addEventListener("click", async () => {
                    let uid = adminId;
                    url = `/api/adoptions/${uid}/${pid}`;
                    response = await fetch(url, opts);
                    if (!response.ok) {
                        alert("Error adoption pet, please try again later!");
                        return;
                    } else {
                        alert("Pet adopted! :)");
                        location.reload();
                        return;
                    }
                });
                //En el caso de que usuario se admin, puede editar eliminar las adopciones:
                if (userRole === "admin") {
                    const detailBottom = document.getElementById("divBottomButtons");
                    //Boton Editar:
                    const editAdoptionButton = document.createElement("button");
                    editAdoptionButton.className = "btn btn-outline-success";
                    editAdoptionButton.id = "editAdoptionButton";
                    editAdoptionButton.innerText = "Edit Adoption";
                    editAdoptionButton.disabled = true;
                    //Boton Eliminar:
                    const deleteAdoptionButton = document.createElement("button");
                    deleteAdoptionButton.className = "btn btn-outline-danger";
                    deleteAdoptionButton.id = "delteAdoptionButton";
                    deleteAdoptionButton.innerText = "Delete Adoption";
                    deleteAdoptionButton.disabled = true;
                    //En caso de que La mascota este adotpada se habilitan los botones:
                    if (h3Adpoted === "true" && h3Owner.length > 0) {
                        editAdoptionButton.disabled = false;
                        deleteAdoptionButton.disabled = false;
                    };
                    //Evento para editar a una adopcion:
                    editAdoptionButton.addEventListener("click", async () => {
                        opts = {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        };
                        let uid = h3Owner;
                        url = `/api/adoptions/${uid}/${pid}`;
                        response = await fetch(url, opts);
                        if (!response.ok) {
                            alert("Couldn't get id from the adoption!");
                            return;
                        } else {
                            response = await response.json();
                            const aid = response.response._id;
                            opts = {
                                method: "GET",
                                headers: { "Content-Type": "application/json" }
                            };
                            url = `/api/adoptions/${aid}`;
                            response = await fetch(url, opts);
                            if (!response.ok) {
                                alert("Couldn't get the information of the adoption!");
                                return;
                            } else {
                                url = `/adoptions/${aid}`;
                                location.replace(url);
                            }
                        }
                    });
                    //Evento para eliminar a una adopcion:
                    deleteAdoptionButton.addEventListener("click", async () => {
                        try {
                            const confirmDelete = confirm(`Are you sure you want to delete the Adption???`);
                            if (!confirmDelete) { return; }
                            else {
                                opts = {
                                    method: "GET",
                                    headers: { "Content-Type": "application/json" }
                                };
                                let uid = h3Owner;
                                url = `/api/adoptions/${uid}/${pid}`;
                                response = await fetch(url, opts);
                                if (!response.ok) { return; }
                                else {
                                    response = await response.json();
                                    let aid = response.response._id;
                                    const data = {
                                        uid: uid,
                                        pid: pid
                                    }
                                    opts = {
                                        method: "DELETE",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(data)
                                    };
                                    url = `/api/adoptions/${aid}`;
                                    response = await fetch(url, opts);
                                    if (!response.ok) {
                                        alert("Couldn't Delelte adoption!");
                                        return;
                                    } else {
                                        alert("Adoption deleted!");
                                        location.reload();
                                    }
                                }
                            }
                        } catch (error) {
                            console.log(error.message);
                            alert("Ooooppsss! An error has ocurred. Error: " + error.message);
                        }
                    });
                    //Agrego los botones al handlebars:
                    detailBottom.appendChild(editAdoptionButton);
                    detailBottom.appendChild(deleteAdoptionButton);
                };
            }
        }
    } catch (error) {
        console.log("Error verifying user role:", error);
    }
});