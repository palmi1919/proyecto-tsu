document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question .faq-btn');
        const answer = item.querySelector('.faq-answer');

        if (questionBtn && answer) {
            questionBtn.addEventListener('click', () => {
                // Cerrar todos los demás acordiones abiertos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherBtn = otherItem.querySelector('.faq-question .faq-btn');
                        if (otherAnswer.classList.contains('active')) {
                            otherAnswer.classList.remove('active');
                            otherAnswer.style.maxHeight = null;
                            otherBtn.classList.remove('active');
                        }
                    }
                });

                // Alternar el actual
                answer.classList.toggle('active');
                questionBtn.classList.toggle('active');

                if (answer.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });
});