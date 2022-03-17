database = {
  1000: { acno: 1000, uname: 'aswin', password: 1000, balance: 5000, transaction: [] },
  1002: { acno: 1001, uname: 'sreehari', password: 1002, balance: 5000, transaction: [] },
  1003: { acno: 1002, uname: 'ameen', password: 1003, balance: 5000, transaction: [] },
};


const register = (acno, uname, password) => {
  if (acno in database) {
    return {
      statusCode: 422,
      status: false,
      message: "user already exists...please Log In"
    }
  } else {
    database[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []
    };
    console.log(database);
    return {
      statusCode: 200,
      status: true,
      message: "Successfully Registered!!"
    }
  }
}


const login = (acno, password) => {
  if (acno in database) {
    if (password == database[acno]["password"]) {
      return {
        statusCode: 200,
        status: true,
        message: "Successfully loggedIn!!"
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password!!"
      }
    }
  } else {
    return {
      statusCode: 422,
      status: false,
      message: "userdoesnot exists!!"
    }
  }
}

const deposit = (acno, password, amount) => {
  var amount = parseInt(amount)
  if (acno in database) {
    if (password == database[acno].password) {
      database[acno].balance += amount
      database[acno].transaction.push({
        amount: amount,
        type: 'CREDIT'
      })
      return {
        statusCode: 200,
        status: true,
        message: amount + "Successfully deposited.. and new bal is " + database[acno].balance
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "inorrect password"
      }
    }
  } else {
    return {
      statusCode: 422,
      status: false,

    }
  }
}

const withdraw = (acno, password, amount) => {
  var amount = parseInt(amount)
  if (acno in database) {
    if (password == database[acno].password) {
      if (database[acno].balance > amount) {
        database[acno].balance -= amount
        database[acno].transaction.push({
          amount: amount,
          type: 'DEBIT'
        })
        return {
          statusCode: 200,
          status: true,
          message: amount + "Successfully withdrawn.. and new bal is " + database[acno].balance
        }
      } else {
        return {
          statusCode: 200,
          status: false,
          message: amount + "Successfully withdrawn.. and new bal is " + database[acno].balance
        }
      }
    } else {
      alert('incorrect password')
      return false
    }
  } else {
    alert("user doesnot exist!!!")
    return false
  }
}

const getTransaction = (acno)=>{
  if(acno in database){
    return {
      statusCode: 200,
      status: true,
      transaction: database[acno]["transaction"]
    }
  }else{
    return {
      statusCode: 200,
      status: false,
      message: database[acno]["transaction"]
    }
  }
}




module.exports = {
  register, login, deposit, withdraw, getTransaction
}