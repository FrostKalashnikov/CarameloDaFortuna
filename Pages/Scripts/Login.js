window.onload = function () {
    const form = document.getElementById("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        checkForm();
    });
};

function checkForm() {
    const emailValue = email.value.toLowerCase();
    const passwordValue = password.value;

    if(emailValue === ""){
      errorInput(email, "O email é obrigatório.")
      return
    }
    if(passwordValue === ""){
      errorInput(password, "A senha é obrigatória.")
      return
    }
    fazerLogin(emailValue, passwordValue)

}

function errorInput(input, message){
    alert(message)
}