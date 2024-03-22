const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deductions
    const PAYE_RATES_2023 = [
        { min: 0, max: 24000, rate: 0.1 },
        { min: 24001, max: 32333, rate: 0.25 },
        { min: 32334, max: 500000, rate: 0.3 },
        { min: 500001, max: 800000, rate: 0.325 },
        { min: 800001, max: Infinity, rate: 0.35 }
    ];

    const NHIF_RATES = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: 44999, deduction: 1000 },
        { min: 45000, max: 49999, deduction: 1100 },
        { min: 50000, max: 59999, deduction: 1200 },
        { min: 60000, max: 69999, deduction: 1300 },
        { min: 70000, max: 79999, deduction: 1400 },
        { min: 80000, max: 89999, deduction: 1500 },
        { min: 90000, max: 99999, deduction: 1600 },
        { min: 100000, max: Infinity, deduction: 1700 }
    ];

    const NSSF_TIER_I_LIMIT = 7000;
    const NSSF_TIER_II_LIMIT = 36000;
    const NSSF_RATE = 0.06;

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    let payee = 0;
    for (const { min, max, rate } of PAYE_RATES_2023) {
        if (grossSalary > min) {
            const taxableAmount = Math.min(max - min, grossSalary - min);
            payee += taxableAmount * rate;
        }
    }

    // Calculate NHIF Deductions
    let nhifDeductions = 0;
    for (const { min, max, deduction } of NHIF_RATES) {
        if (grossSalary >= min && grossSalary <= max) {
            nhifDeductions = deduction;
            break;
        }
    }

    // Calculate NSSF Deductions
    let nssfDeductions = 0;
    if (basicSalary <= NSSF_TIER_I_LIMIT) {
        nssfDeductions += basicSalary * NSSF_RATE;
    } else {
        nssfDeductions += NSSF_TIER_I_LIMIT * NSSF_RATE;
        if (basicSalary > NSSF_TIER_I_LIMIT) {
            nssfDeductions += (basicSalary - NSSF_TIER_I_LIMIT) * NSSF_RATE;
        }
    }

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
rl.question("Enter basic salary: ", (basicSalary) => {
  rl.question("Enter benefits: ", (benefits) => {
    const salaryDetails = calculateNetSalary(parseInt(basicSalary), parseInt(benefits));
    console.log("Salary Details:", salaryDetails);
    rl.close();
  });
});
