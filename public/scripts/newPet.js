const btnNewPet = document.getElementById("btnCreatePet");

const isValidObjectId = (str) => /^[a-f\d]{24}$/i.test(str);

btnNewPet.addEventListener("click", async () => {
    try {
        let pid = document.getElementById("petId")?.value;
        let image = document.getElementById("newPetUlLiImage").value;
        let name = document.getElementById("newPetUlLihName").value;
        let birthDay = document.getElementById("newPetUlLihBirthDay").value;
        let specie = document.getElementById("newPetUlLihSpecie").value;
        let adopted = document.getElementById("newPetUlLihAdopted").checked;
        let ownerInput = document.getElementById("newPetUlLihOwner").value;
        let owner = isValidObjectId(ownerInput) ? ownerInput : null;
        if (birthDay) {
            const birthDate = new Date(birthDay);
            if (isNaN(birthDate.getTime())) {
                alert("Invalid birth date format!");
                return;
            }
        }
        if (!image || !name || !birthDay || !specie) {
            alert("All values are needed!");
        } else {
            const data = {
                name: name,
                birthDate: new Date(birthDay),
                adopted: adopted,
                specie: specie,
                owner: owner ?? null,
                image: image
            };
            const opts = {
                method: pid ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
            const url = pid ? `/api/pets/${pid}` : "/api/pets/";
            let response = await fetch(url, opts);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text);
            };
            const result = await response.json();
            if (result.error) {
                alert(result.error);
            } else {
                alert(pid ? "Pet Updated!" : "Pet created!");
                location.replace("/");
            }
        }
    } catch (error) {
        console.log(error.message);
        alert("Ooooppsss! An error has ocurred. Error: " + error.message);
    }
});