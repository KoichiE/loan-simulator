
// =========================================
// FINOVA - LOAN SIMULATOR
// APPLICATION LOGIC
// =========================================


// -----------------------------------------
// TRANSLATIONS
// -----------------------------------------

const translations = {

    en: {
        workspace: "WORKSPACE",
        loanSimulator: "Loan Simulator",
        sidebarNote: "Make smarter financial decisions with clear numbers.",
        systemReady: "System ready",
        liveCalculator: "Live calculator",
        financialPlanning: "FINANCIAL PLANNING",

        title: "Loan Simulator",
        subtitle: "Understand your borrowing costs and plan your next financial move with confidence.",

        loanDetails: "Loan details",
        loanDetailsDesc: "Enter the information to calculate your loan.",
        configuration: "CONFIGURATION",

        amount: "Loan amount",
        amountHint: "Enter the amount you want to borrow.",
        rate: "Interest rate",
        rateHint: "Enter the interest rate as a percentage.",
        rateType: "Interest rate type",
        rateTypeHint: "Choose how your interest rate is expressed.",
        months: "Loan term",
        monthsUnit: "Months",
        monthsHint: "How long you plan to repay the loan.",

        formDisclaimer: "All calculations are estimates.",
        calculate: "Calculate loan",
        reset: "Reset",

        analysis: "ANALYSIS",
        resultsTitle: "Your loan overview",
        resultsDesc: "A breakdown of your estimated borrowing costs.",
        calculated: "Calculated",

        monthlyPayment: "Monthly payment",
        totalInterest: "Total interest",
        totalPayment: "Total payment",
        fixedMonthly: "Estimated fixed monthly installment",
        borrowingCost: "Total cost of borrowing",
        principalPlusInterest: "Principal plus interest",

        loanBreakdown: "Loan breakdown",
        breakdownDesc: "Key information about this simulation.",
        principal: "Loan amount",
        term: "Loan term",
        originalRate: "Entered interest rate",
        monthlyRate: "Effective monthly rate",

        amortization: "Amortization schedule",
        scheduleDesc: "Review every installment throughout the loan term.",
        print: "Print",
        exportPdf: "Save as PDF",
        scheduleLabel: "PAYMENT BREAKDOWN",
        month: "Month",
        initialBalance: "Initial balance",
        payment: "Payment",
        interest: "Interest",
        principalPaid: "Principal paid",
        remainingBalance: "Remaining balance",
        tableNote: "Amounts are displayed in Colombian pesos (COP).",

        footer: "Financial planning made clearer.",

        error: "Please enter a valid loan amount, interest rate and loan term. The loan term must be a positive whole number.",
        invalidResults: "Please calculate a loan before printing or exporting.",

        monthsWord: "months",
        rateEM: "Effective Monthly (EM)",
        rateEA: "Effective Annual (EA)"
    },

    es: {
        workspace: "ESPACIO DE TRABAJO",
        loanSimulator: "Simulador de Préstamos",
        sidebarNote: "Toma mejores decisiones financieras con información clara.",
        systemReady: "Sistema listo",
        liveCalculator: "Calculadora activa",
        financialPlanning: "PLANIFICACIÓN FINANCIERA",

        title: "Simulador de Préstamos",
        subtitle: "Comprende tus costos de financiación y planifica tus próximas decisiones financieras con confianza.",

        loanDetails: "Detalles del préstamo",
        loanDetailsDesc: "Ingresa la información para calcular tu préstamo.",
        configuration: "CONFIGURACIÓN",

        amount: "Monto del préstamo",
        amountHint: "Ingresa la cantidad que deseas solicitar.",
        rate: "Tasa de interés",
        rateHint: "Ingresa la tasa de interés como porcentaje.",
        rateType: "Tipo de tasa de interés",
        rateTypeHint: "Selecciona cómo está expresada la tasa.",
        months: "Plazo del préstamo",
        monthsUnit: "Meses",
        monthsHint: "Tiempo durante el cual pagarás el préstamo.",

        formDisclaimer: "Todos los cálculos son estimaciones.",
        calculate: "Calcular préstamo",
        reset: "Reiniciar",

        analysis: "ANÁLISIS",
        resultsTitle: "Resumen de tu préstamo",
        resultsDesc: "Desglose de los costos estimados de financiación.",
        calculated: "Calculado",

        monthlyPayment: "Cuota mensual",
        totalInterest: "Intereses totales",
        totalPayment: "Pago total",
        fixedMonthly: "Cuota mensual fija estimada",
        borrowingCost: "Costo total de financiación",
        principalPlusInterest: "Capital más intereses",

        loanBreakdown: "Desglose del préstamo",
        breakdownDesc: "Información principal de esta simulación.",
        principal: "Monto del préstamo",
        term: "Plazo del préstamo",
        originalRate: "Tasa de interés ingresada",
        monthlyRate: "Tasa efectiva mensual",

        amortization: "Tabla de amortización",
        scheduleDesc: "Consulta cada cuota durante el plazo del préstamo.",
        print: "Imprimir",
        exportPdf: "Guardar como PDF",
        scheduleLabel: "DESGLOSE DE PAGOS",
        month: "Mes",
        initialBalance: "Saldo inicial",
        payment: "Cuota",
        interest: "Intereses",
        principalPaid: "Abono a capital",
        remainingBalance: "Saldo pendiente",
        tableNote: "Los valores se muestran en pesos colombianos (COP).",

        footer: "Planificación financiera más clara.",

        error: "Ingresa un monto, una tasa de interés y un plazo válidos. El plazo debe ser un número entero positivo.",
        invalidResults: "Primero debes calcular un préstamo para imprimirlo o exportarlo.",

        monthsWord: "meses",
        rateEM: "Efectiva Mensual (EM)",
        rateEA: "Efectiva Anual (EA)"
    }

};


// -----------------------------------------
// APPLICATION VARIABLES
// -----------------------------------------

let currentLanguage = "en";
let lastSimulation = null;


// -----------------------------------------
// FORMATTING FUNCTIONS
// -----------------------------------------

function formatCurrency(value) {

    const locale = currentLanguage === "es"
        ? "es-CO"
        : "en-US";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);

}


function formatPercentage(value) {

    const locale = currentLanguage === "es"
        ? "es-CO"
        : "en-US";

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(value) + "%";

}


// -----------------------------------------
// LANGUAGE SELECTOR
// -----------------------------------------

function changeLanguage(language) {

    if (!translations[language]) return;

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }

    });

    const rateType = document.getElementById("rateType");

    rateType.options[0].text =
        language === "es"
            ? "Efectiva Mensual (EM)"
            : "Effective Monthly (EM)";

    rateType.options[1].text =
        language === "es"
            ? "Efectiva Anual (EA)"
            : "Effective Annual (EA)";

    if (lastSimulation) {
        renderSimulation(lastSimulation);
    }

}


// -----------------------------------------
// LOAN CALCULATION
// -----------------------------------------

function calculateLoan() {

    const amountInput = document.getElementById("amount");
    const rateInput = document.getElementById("rate");
    const monthsInput = document.getElementById("months");

    const amount = Number(amountInput.value);
    const enteredRate = Number(rateInput.value);
    const rateType = document.getElementById("rateType").value;
    const months = Number(monthsInput.value);

    const error = document.getElementById("error");

    // Input validation

    if (
        amountInput.value === "" ||
        rateInput.value === "" ||
        monthsInput.value === "" ||
        !Number.isFinite(amount) ||
        !Number.isFinite(enteredRate) ||
        !Number.isInteger(months) ||
        amount <= 0 ||
        enteredRate < 0 ||
        months <= 0
    ) {

        error.textContent = translations[currentLanguage].error;
        error.style.display = "block";

        return;

    }

    error.style.display = "none";

    // Convert annual rate to decimal.

    const rateDecimal = enteredRate / 100;

    let monthlyRate;

    // Convert Effective Annual (EA) to Effective Monthly (EM).

    if (rateType === "EA") {

        monthlyRate = Math.pow(1 + rateDecimal, 1 / 12) - 1;

    } else {

        monthlyRate = rateDecimal;

    }

    // -------------------------------------
    // FRENCH AMORTIZATION METHOD
    // Fixed monthly installments
    // -------------------------------------

    let monthlyPayment;

    if (monthlyRate === 0) {

        monthlyPayment = amount / months;

    } else {

        monthlyPayment =
            amount * monthlyRate /
            (1 - Math.pow(1 + monthlyRate, -months));

    }

    let balance = amount;
    let totalInterest = 0;
    let totalPayment = 0;

    const schedule = [];

    // Generate amortization schedule.

    for (let month = 1; month <= months; month++) {

        const initialBalance = balance;

        const interest = initialBalance * monthlyRate;

        let principalPaid = monthlyPayment - interest;
        let payment = monthlyPayment;

        // Adjust the final payment to close the balance.

        if (month === months || principalPaid > balance) {

            principalPaid = balance;
            payment = principalPaid + interest;

        }

        balance = Math.max(0, balance - principalPaid);

        totalInterest += interest;
        totalPayment += payment;

        schedule.push({

            month: month,
            initialBalance: initialBalance,
            payment: payment,
            interest: interest,
            principalPaid: principalPaid,
            remainingBalance: balance

        });

    }

    // Store the simulation.

    lastSimulation = {

        amount: amount,
        enteredRate: enteredRate,
        rateType: rateType,
        months: months,
        monthlyRate: monthlyRate,
        monthlyPayment: monthlyPayment,
        totalInterest: totalInterest,
        totalPayment: totalPayment,
        schedule: schedule

    };

    renderSimulation(lastSimulation);

}


// -----------------------------------------
// DISPLAY SIMULATION RESULTS
// -----------------------------------------

function renderSimulation(data) {

    const t = translations[currentLanguage];

    document.getElementById("results").style.display = "block";

    // Summary cards.

    document.getElementById("monthlyPayment").textContent =
        formatCurrency(data.monthlyPayment);

    document.getElementById("totalInterest").textContent =
        formatCurrency(data.totalInterest);

    document.getElementById("totalPayment").textContent =
        formatCurrency(data.totalPayment);

    // Loan breakdown.

    document.getElementById("detailPrincipal").textContent =
        formatCurrency(data.amount);

    document.getElementById("detailTerm").textContent =
        data.months + " " + t.monthsWord;

    document.getElementById("detailRate").textContent =
        formatPercentage(data.enteredRate) + " (" +
        (data.rateType === "EA" ? t.rateEA : t.rateEM) + ")";

    document.getElementById("detailMonthlyRate").textContent =
        formatPercentage(data.monthlyRate * 100);

    // Schedule count.

    document.getElementById("scheduleCount").textContent =
        data.months + (currentLanguage === "es"
            ? " cuotas"
            : " installments");

    // Amortization table.

    const tableBody = document.getElementById("resultTable");

    tableBody.innerHTML = "";

    data.schedule.forEach(row => {

        const tr = document.createElement("tr");

        const values = [

            row.month,
            formatCurrency(row.initialBalance),
            formatCurrency(row.payment),
            formatCurrency(row.interest),
            formatCurrency(row.principalPaid),
            formatCurrency(row.remainingBalance)

        ];

        values.forEach((value, index) => {

            const td = document.createElement("td");

            td.textContent = value;

            if (index === 0) {
                td.style.textAlign = "center";
            }

            tr.appendChild(td);

        });

        tableBody.appendChild(tr);

    });

    // Bring results into view.

    document.getElementById("results").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// -----------------------------------------
// RESET SIMULATOR
// -----------------------------------------

function resetSimulator() {

    document.getElementById("amount").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("months").value = "";
    document.getElementById("rateType").value = "EM";

    document.getElementById("results").style.display = "none";
    document.getElementById("error").style.display = "none";

    document.getElementById("resultTable").innerHTML = "";

    lastSimulation = null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// -----------------------------------------
// PRINT SIMULATION
// -----------------------------------------

function printSimulation() {

    if (!lastSimulation) {

        showExportError();
        return;

    }

    window.print();

}


// -----------------------------------------
// EXPORT / SAVE AS PDF
// -----------------------------------------

function exportPDF() {

    if (!lastSimulation) {

        showExportError();
        return;

    }

    /*
       This version does not use external PDF libraries.

       The browser print dialog opens, allowing the user
       to select "Save as PDF" as the destination.
    */

    window.print();

}


// -----------------------------------------
// ERROR MESSAGE
// -----------------------------------------

function showExportError() {

    const error = document.getElementById("error");

    error.textContent = translations[currentLanguage].invalidResults;

    error.style.display = "block";

}
