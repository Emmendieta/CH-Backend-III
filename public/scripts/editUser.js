const btnUpdate = document.getElementById("btnUpdateUser");

btnUpdate.addEventListener("click", async () => {
    try {
        const uidInput = document.getElementById("inputIdRegister").value.trim();
        const firstNameInput = document.getElementById("inputFirstNameRegister").value.trim();
        const lastNameInput = document.getElementById("inputLastNameRegister").value.trim();
        const passwordInput = document.getElementById("inputPasswordRegister").value.trim();
        let verify = verifyData(uidInput, firstNameInput, lastNameInput, passwordInput);
        if (!verify) { return; }
        else {
            let uid = uidInput;
            const data = {
                first_name: firstNameInput,
                last_name: lastNameInput,
                password: passwordInput
            };
            let opts = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
            let url = `/api/users/admin/${uid}`;
            let response = await fetch(url, opts);
            if (!response.ok) {
                alert(response.error);
                return;
            } else {
                response = await response.json();
                alert("User update successfully!");
                location.replace("/users");
            }
        }
    } catch (error) {
        console.log(error.message);
        alert("Ooooppsss! An error has ocurred. Error: " + error.message);
    }
});

//Funcion para verificar que los valores no sean nulos:
function verifyData(uid, firstName, lastName, password) {
    let verify = false;
    if (!firstName || !lastName || !password || !uid) {
        alert("All values are needed!");
        return verify;
    }
    else if (uid.length === 0 || firstName.length === 0 || lastName.length === 0 || password === 0) {
        alert("All values can't be null!");
        return verify;
    } else {
        verify = true;
        return verify;
    }
};