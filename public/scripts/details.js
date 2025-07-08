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
            const pid = document.getElementById("petId").innerText;
            const h3Owner = document.getElementById("petOwner").innerText;
            const h3Adpoted = document.getElementById("petAdopted").innerText;
            //En caso de que este adoptado, no se hace nada:
            if (h3Owner.length !== 0 && h3Adpoted === "true") {
                return;
                //En el caso de que no este adoptado y este logueado, puedo adoptarlo:
            } else {
                //Si no se reconoce el id de la mascota:
                if (pid.length === 0) {
                    alert("Couldn´t get pet id!");
                    return;
                } else {
                    btnAdopt.disabled = false;
                    const uid = res.response._id;
                    opts = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    };
                    url = `/api/adoptions/${uid}/${pid}`;
                    //Evento para cuando se hace click en adoptar:
                    btnAdopt.addEventListener("click", async () => {
                        response = await fetch(url, opts);
                        if (!response.ok) { 
                            alert("Error adoption pet, please try again later!");
                            return;
                        } else {
                            alert("Pet adopted! :)");
                            location.reload();
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.log("Error verifying user role:", error);
    }
});
