document.addEventListener('DOMContentLoaded', function() {
    
    const verifyBtn = document.getElementById('verifyBtn');
    const newsInput = document.getElementById('newsInput');
    const resultArea = document.getElementById('resultArea');
    
    // Elements inside Result Area
    const resStatus = document.getElementById('resStatus');
    const resConf = document.getElementById('resConf');
    const resReason = document.getElementById('resReason');
    const resIcon = document.getElementById('resIcon');

    // Button Elements
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    verifyBtn.addEventListener('click', function() {
        const text = newsInput.value.trim();

        // 1. Validation
        if (!text) {
            newsInput.classList.add('is-invalid');
            newsInput.focus();
            return;
        } else {
            newsInput.classList.remove('is-invalid');
        }

        // 2. Set Loading State
        setLoadingState(true);

        // 3. Call API
        fetch('/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text }),
        })
        .then(response => response.json())
        .then(data => {
            // 4. Update UI with Result
            setLoadingState(false);
            showResult(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoadingState(false);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        });
    });

    // Function to handle Button State
    function setLoadingState(isLoading) {
        if (isLoading) {
            verifyBtn.disabled = true;
            btnText.textContent = "กำลังวิเคราะห์ข้อมูล...";
            btnLoader.style.display = "inline-block";
            resultArea.style.display = "none";
        } else {
            verifyBtn.disabled = false;
            btnText.textContent = "Verify News (ตรวจสอบ)";
            btnLoader.style.display = "none";
        }
    }

    // Function to Render Result
    function showResult(data) {
        resultArea.style.display = "block";
        
        // Reset classes
        resultArea.className = "card-footer p-4 animate-fade-in";
        
        if (data.class === 'danger') {
            resultArea.classList.add('alert-danger-custom');
            resIcon.className = "fas fa-times-circle text-danger";
        } else {
            resultArea.classList.add('alert-success-custom');
            resIcon.className = "fas fa-check-circle text-success";
        }

        resStatus.textContent = data.result;
        resConf.textContent = data.confidence;
        resReason.textContent = data.reason;

        // Smooth scroll to result
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Clear error on typing
    newsInput.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('is-invalid');
        }
    });
});
