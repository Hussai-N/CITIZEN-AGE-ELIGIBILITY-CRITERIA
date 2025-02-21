const form = document.getElementById('citizenForm');
const output = document.getElementById('output');
const chatbot = document.getElementById('chatbot');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const dob = new Date(document.getElementById('dob').value);
    const aadhaar = document.getElementById('aadhaar').value;

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    const schemes = [];
    if (age >= 10 && age <= 20) {
        schemes.push("Student Scholarship Program", "Youth Skill Development Scheme", "Tech Literacy Initiative");
    } else if (age >= 21 && age <= 30) {
        schemes.push("Entrepreneurship Support", "Higher Education Subsidy", "Certification Assistance");
    } else if (age >= 31 && age <= 60) {
        schemes.push("Career Advancement Support", "Health Insurance Subsidy", "Home Loan Benefits");
    } else if (age > 60) {
        schemes.push("Senior Citizen Pension", "Free Annual Health Checkups", "Travel Concessions");
    }

    if (schemes.length) {
        output.style.display = 'block';
        output.innerHTML = `
            <strong>Eligible Schemes for You:</strong>
            <ul>
                ${schemes.map(scheme => `<li>${scheme}</li>`).join('')}
            </ul>
            <p>Thank you, <strong>${name}</strong> (Aadhaar: ${aadhaar}).</p>
        `;
        const speech = new SpeechSynthesisUtterance(
            `Dear ${name}, you are eligible for the following schemes: ${schemes.join(", ")}`
        );
        window.speechSynthesis.speak(speech);
    } else {
        output.style.display = 'block';
        output.innerHTML = `<strong>No schemes are currently available for your age group.</strong>`;
    }
});

chatbot.addEventListener('click', () => {
    alert("Hello! How can I assist you today?");
});
