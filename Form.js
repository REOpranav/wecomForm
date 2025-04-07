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
            const response = await fetch("https://crm-server-opal.vercel.app/api/weComForm",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json()
                console.log("Success:", result);
                form.reset();
            } else {
                console.error("Error submitting form")
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
});
