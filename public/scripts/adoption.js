document.addEventListener("DOMContentLoaded", async () => {
    try {
        const aid = document.getElementById("adiptionId").value;
        if (aid.length === 0) {
            alert("Couldn't get Adoption Id!");
            return;
        } else {
            let uid = document.getElementById("adoptionOwnerId").value;
            let pid = document.getElementById("adoptionPetId").value;
            const btnEdit = document.getElementById("btnEditAdoption");
            if (uid.length !== 24 || pid.length !== 24 || aid.length !== 24) {
                alert("Error: The Id from adoption, user or pet is not valid!");
                return;
            } else {
                //Evento para editar:
                btnEdit.addEventListener("click", async () => {
                    let newUid = document.getElementById("adoptionOwnerId").value;
                    let newPid = document.getElementById("adoptionPetId").value;
                    if (uid.length !== 24 || pid.length !== 24) {
                        alert("Error: The Id from user or pet is not valid!");
                        return;
                    } else {
                        let data = {
                            owner: uid,
                            pet: pid,
                            newOwner: newUid,
                            newPet: newPid
                        };
                        let opts = {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data)
                        };
                        let url = `/api/adoptions/${aid}`;
                        let response = await fetch(url, opts);
                        if (!response.ok) {
                            alert("Couldn't update the adoption!");
                            return;
                        } else {
                            alert("Adoption updated!");
                            location.reload();
                            return;
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        alert("Ooooppsss! An error has ocurred. Error: " + error.message);
    }
});