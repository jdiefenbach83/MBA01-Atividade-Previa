const components = {
  inputGrossSalary: null,
  inputINSS: null,
  inputIRRF: null,
  inputNetSalary: null,
};

window.addEventListener('load', start);

function start() {
  console.log('DOM Carregado!');

  components.inputGrossSalary = document.getElementById('inputGrossSalary');
  components.inputINSS = document.getElementById('inputINSS');
  components.inputIRRF = document.getElementById('inputIRRF');
  components.inputNetSalary = document.getElementById('inputNetSalary');

  components.inputGrossSalary.addEventListener(
    'input',
    handleGrossSalaryChange
  );
}

function handleGrossSalaryChange(event) {
  grossSalary = +event.target.value;
  inss = calculateINSS(grossSalary);
  irrf = calculateIRRF(grossSalary - inss);
  netSalary = grossSalary - inss - irrf;

  components.inputINSS.value = formatCurrency(inss);
  components.inputIRRF.value = formatCurrency(irrf);
  components.inputNetSalary.value = formatCurrency(netSalary);
}

function calculateINSS(base) {
  if (base > 6101.06) {
    return 713.1;
  }

  inss = 0;
  balance = base;

  if (base <= 1045.0) {
    inss = balance * 0.075;
    return inss;
  } else {
    inss += 1045.0 * 0.075;
    balance -= 1045.0;
  }

  if (base <= 2089.6) {
    inss += balance * 0.09;
    return inss;
  } else {
    diff = 2089.6 - 1045.01;
    inss += diff * 0.09;
    balance -= diff;
  }

  if (base <= 3134.4) {
    inss += balance * 0.12;
    return inss;
  } else {
    diff = 3134.4 - 2089.61;
    inss += diff * 0.12;
    balance -= diff;
  }

  if (base <= 6101.06) {
    inss += balance * 0.14;
    return inss;
  } else {
    diff = 6101.06 - 3134.41;
    inss += diff * 0.14;
    balance -= diff;
  }

  return inss;
}

function calculateIRRF(base) {
  if (base <= 1903.98) {
    return 0.0;
  }

  if (base <= 2826.65) {
    return base * 0.075 - 142.8;
  }

  if (base <= 3751.05) {
    return base * 0.15 - 354.8;
  }

  if (base <= 4664.68) {
    return base * 0.225 - 636.13;
  }

  return base * 0.275 - 869.36;
}

function formatCurrency(value) {
  formatterCurrency = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatterCurrency.format(value);
}
