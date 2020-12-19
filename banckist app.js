'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-12-12T17:01:17.194Z',
    '2020-12-19T23:36:17.929Z',
    '2020-12-17T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-26T14:43:26.374Z',
    '2037-06-28T18:49:59.371Z',
    '2020-12-19T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-26T14:43:26.374Z',
    '2037-06-28T18:49:59.371Z',
    '2020-12-19T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-26T14:43:26.374Z',
    '2037-06-28T18:49:59.371Z',
    '2020-12-19T12:01:20.894Z',
  ],
  currency: 'SYP',
  locale: 'ar-SY',
};

const account5 = {
  owner: 'Diego Massarini',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 1991,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-26T14:43:26.374Z',
    '2037-06-28T18:49:59.371Z',
    '2020-12-19T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'it-IT',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//*                                ------ CALCULATION  -----
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) {
    return 'Today';
  }
  if (daysPassed === 1) {
    return 'Yesterday';
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year} `;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};
// *---------                CREATE USERNAME USING THE NAME OF ACCOUNTS
const createUsernames = function (users) {
  users.forEach(function (user) {
    // we used forEach because we just needed to pass through the array
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        // we use map for create a new array
        return name[0];
      })
      .join('');
  });
};

createUsernames(accounts);

//* --------                       DISPLAY MOVEMENTS

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort(function (a, b) {
        return a - b;
      })
    : acc.movements;
  //we use slice to create/copy a new array of movements and not the original

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCurrency(movement, acc.locale, acc.currency);
    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(movement);

    // console.log(formattedMov);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // insertAdjacentHtml need two argument , first where is gonna add the element and second the element itself
  });
};

//*-----------                   CALC DISPLAY SUM

const calcDisplaySummary = function (acc) {
  const formattedMov = formatCurrency(acc.mov, acc.locale, acc.currency);

  const income = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = formatCurrency(income, acc.locale, acc.currency);

  const outcome = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);

  labelSumOut.textContent = formatCurrency(
    Math.abs(outcome),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(function (deposit) {
      return deposit > 0;
    })
    .map(function (mov) {
      return (mov * acc.interestRate) / 100;
    })
    .filter(function (int, i, arr) {
      return int >= 1;
    })
    .reduce(function (acc, int) {
      return acc + int;
    }, 0);

  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

//*------------                 CALC DISPLAY BALANCE

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  acc.balance = balance;

  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

//todo                             UPDATE UI
const updateUI = function (acc) {
  //DISPLAY  MOVEMENTS
  displayMovements(acc);

  //DISPLAY SUMMARY
  calcDisplaySummary(acc);

  //DISPLAY BALANCE

  calcDisplayBalance(acc);
};

//!                                ------ BTN EVENT LISTENER  -----
let currentAccount, timer;
//!todo Always logged in
// currentAccount= account1
// containerApp.style.opacity =100

//!todo experiment api date
// const now = new Date()
// const options ={
// hour : 'numeric',
// minute : 'numeric',
// day : 'numeric',
// month : 'long', // long = august
// year : 'numeric' , // 2- digit
// weekday : 'long'
// }

// const locale = navigator.language
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)
//!todo
const starLogOutTimer = function () {
  //set time to 5 minutes
  let time = 300;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call print remain time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //when the time is zero seconds stop timer and log out timer
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login in to get started`;
      containerApp.style.opacity = 0;
    }
    //decrease one second
    time--;
  };

  tick();
  //call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};

//                !          LOGIN

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form from submitting

  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //chaining ? for check if the current account exist and not get an error, so if the accounts exist go on an check the pin

    //DISPLAY UI E WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // long = august
      year: 'numeric', // 2- digit
      // weekday : 'long'
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // //CREATE CURRENT DATE AND TIME

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); // for add 0 if the day and month are less than 10
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`;
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year} , ${hour}:${minute}`;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //if already start the timer in an account we clear that interval than restart a new timer
    if (timer) {
      clearInterval(timer);
    }
    timer = starLogOutTimer();
    updateUI(currentAccount);
  }
});

//!                     TRANSFER MONEY

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;

  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //DOING ACCOUNT
    console.log('TRANSFER VALID');

    //DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //ADD TRANSFER DATE
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = starLogOutTimer();
  }
});
//!                           LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = '';

  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
      // so the loan is given if one of mov  is higher than the amount with the interest of 10%
    })
  ) {
    // ADD AMOUNT TO THE ACCOUNT
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //ADD TRANSFER DATE
      currentAccount.movementsDates.push(new Date().toISOString());
      // UPDATE UI
      updateUI(currentAccount);
    }, 2000);
  }

  //Reset timer
  clearInterval(timer);
  timer = starLogOutTimer();
});

//!                    CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });

    //DELETE ACCOUNT
    accounts.splice(index, 1); //remove the index element, 1, just one element

    //HIDE UI
    containerApp.style.opacity = 0;

    labelWelcome.textContent = `Login to get started`;
  }
  //CLEAR
  inputCloseUsername.value = inputClosePin.value = '';
});

//!                SORT \

let sorted = false;
// we set sorted false as in the displaymovemnets() so we can play around this variable and toogle the second argument

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted); // for set the oppositive of sorted variable for changing the
  sorted = !sorted;
});

// LECTURE

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    function (el) {
      return Number(el.textContent.replace('€', ''));
    }
  );
  // we get all the div of the movements(nodelist) then the function is convert the nodelist in array without the euro
  console.log(movementsUI); //Array(8) [ 1300, 70, -130, -650, 3000, -400, 450, 200 ]
});

// lecture remainder

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = 'green';
    }
  });
});
