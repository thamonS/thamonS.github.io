document.addEventListener('DOMContentLoaded', function() {
    const verifyBtn = document.getElementById('verifyBtn');
    const newsInput = document.getElementById('newsInput');
    const resultArea = document.getElementById('resultArea');
    const resStatus = document.getElementById('resStatus');
    const resConf = document.getElementById('resConf');
    const resReason = document.getElementById('resReason');
    const resIcon = document.getElementById('resIcon');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    verifyBtn.addEventListener('click', function() {
        const text = newsInput.value.trim();

        if (!text) {
            newsInput.classList.add('is-invalid');
            newsInput.focus();
            return;
        }

        // 1. แสดงสถานะกำลังโหลด (จำลอง AI กำลังคิด)
        setLoadingState(true);

        // 2. ใช้ setTimeout เพื่อจำลองการทำงานเหมือน Python time.sleep(1.5)
        setTimeout(() => {
            // --- ย้าย Logic จาก Python มาไว้ที่นี่ ---
            let data = {};
            const confidenceVal = (Math.random() * (99.9 - 88.0) + 88.0).toFixed(1);

            if (text.includes("มะนาว") || text.includes("รักษาหายขาด") || text.includes("ยาวิเศษ")) {
                data = {
                    result: "MISINFORMATION (ข้อมูลเท็จ/บิดเบือน)",
                    confidence: `${confidenceVal}%`,
                    reason: "ไม่พบงานวิจัยทางการแพทย์ที่รองรับ การอ้างสรรพคุณว่า 'หายขาด' ขัดแย้งกับข้อมูลสาธารณสุขปัจจุบัน",
                    class: "danger",
                    icon: "times-circle"
                };
            } else {
                data = {
                    result: "VERIFIED (ข้อมูลน่าเชื่อถือ)",
                    confidence: `${confidenceVal}%`,
                    reason: "ข้อมูลสอดคล้องกับบทความจากกรมการแพทย์ กระทรวงสาธารณสุข และงานวิจัยที่เกี่ยวข้อง",
                    class: "success",
                    icon: "check-circle"
                };
            }

            // 3. แสดงผลลัพธ์
            setLoadingState(false);
            showResult(data);
        }, 1500); 
    });

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

    function showResult(data) {
        resultArea.style.display = "block";
        resultArea.className = "card-footer p-4"; // reset
        
        if (data.class === 'danger') {
            resultArea.classList.add('alert-danger-custom');
            resIcon.className = "fas fa-3x fa-times-circle text-danger";
        } else {
            resultArea.classList.add('alert-success-custom');
            resIcon.className = "fas fa-3x fa-check-circle text-success";
        }

        resStatus.textContent = data.result;
        resConf.textContent = data.confidence;
        resReason.textContent = data.reason;
        resultArea.scrollIntoView({ behavior: 'smooth' });
    }
});