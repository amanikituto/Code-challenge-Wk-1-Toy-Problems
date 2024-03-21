function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deductions
    const PAYE_RATE = 0.3;
    const NHIF_RATE = 0.025;
    const NSSF_RATE = 0.06;

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    const payee = grossSalary * PAYE_RATE;

    // Calculate NHIF Deductions
    const nhifDeductions = grossSalary * NHIF_RATE;

    // Calculate NSSF Deductions
    const nssfDeductions = grossSalary * NSSF_RATE;

    // Calculate Net Salary
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;

    return {
        grossSalary: grossSalary,
        payee: payee,
        nhifDeductions: nhifDeductions,
        nssfDeductions: nssfDeductions,
        netSalary: netSalary
    };
}

// Example usage:
const basicSalary = parseInt(prompt("Enter basic salary:"));
const benefits = parseInt(prompt("Enter benefits:"));
const salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log("Salary Details:", salaryDetails);
