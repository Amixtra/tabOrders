document.querySelector("#signupButton").addEventListener("click", async function(){
    const userEmail = document.querySelector("#userEmail").value;
    const userPassword = document.querySelector("#userPassword").value;
    const company = document.querySelector("#company").value;
    const lastName = document.querySelector("#lastName").value;
    const firstName = document.querySelector("#firstName").value;

    console.log(userEmail, userPassword, company, lastName, firstName)

    const response = await fetch("/signup/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userEmail, userPassword, company, lastName, firstName})
    });

    if(!response.ok){ alert((await(await response.json())).error) }
    else{ window.location.href="/table" }
})