import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');
let formData = {
    delay: 0,
    state: "",
};

const inputAction = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    
    formData[fieldName] = fieldValue;
    localStorage.setItem('form-data', JSON.stringify(formData));
}

const onSubmitButton = event => {
    event.preventDefault();

    const formDatafromLs = JSON.parse(localStorage.getItem('form-data'));
    const promise = new Promise((resolve, reject) => {
        const formState = formDatafromLs.state;
        const formDelay = formDatafromLs.delay;

        setTimeout(() => {
            if (formState === "fulfilled") {
                resolve(formDelay);
            } else if (formState === "rejected") {
                reject(formDelay);
            }
        }, formDelay);

    });

    promise
        .then(delay => {
            iziToast.success({
                    title: 'Fulfilled',
                    message: `Fulfilled promise in ${delay}ms`,
                    position: "topRight",
                 })
            
        })
        .catch(delay => {
            iziToast.error({
                    title: 'Rejected',
                    message: `Rejected promise in ${delay}ms`,
                    position: "topRight",
                 })
        })

    event.target.reset();
    localStorage.removeItem('form-data');

    formData = {
        delay: 0,
        state: "",
    };
}

formEl.addEventListener('change', inputAction);
formEl.addEventListener('submit', onSubmitButton);
