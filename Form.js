document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const firstName = form.querySelector('input[placeholder="First Name"]').value.trim()
        const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim()
        const city = form.querySelector('input[placeholder="City"]').value.trim()
        const street = form.querySelector('input[placeholder="Street"]').value.trim()

        const data = {
            firstName,
            lastName,
            city,
            street,
        };

        try {
            const response = await fetch("https://6220-61-0-15-1.ngrok-free.app/api/weComForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json()
                showToast('Record Created' , true)
                form.reset();
            } else {
                showToast('Failed to create')
            }
        } catch (error) {
            showToast('Failed to create')
            console.error("Fetch error:", error);
        }
    });
});

function showToast(message, isSuccess = false) { // toast message
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44949';
    toast.classList.remove('hide');
    toast.style.visibility = 'visible';

    void toast.offsetWidth;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');

        setTimeout(() => {
            toast.style.visibility = 'hidden';
        }, 200);
    }, 1500);
}