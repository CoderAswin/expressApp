database = {
    1000: { acno: 1000, uname: "Akash", password: 2000, balance: 5000, transcation: [] },
    1001: { acno: 1001, uname: "Najad", password: 1001, balance: 1000, transcation: [] },
    1002: { acno: 1002, uname: "favas", password: 1002, balance: 2000, transcation: [] }
}

// Register defination

const register = (acno, pswd, uname) => {

    if (acno in database) {
        return {
            statusCode: 422,
            status: false,
            message: "User already exist!!... Please login "
        }
    } else {
        database[acno] = {
            acno,
            uname,
            password: pswd,
            balance: 0,
            transcation: []
        }
        console.log(database);

        return {
            statusCode: 200,
            status: true,
            message: "Successfully Registered"
        }
    }
}

// Login defination
const login = (acno, password) => {

    if (acno in database) {
        if (password == database[acno]["password"]) {
            currentAcno = acno
            currentUserName = database[acno]["uname"]
            return {
                statusCode: 200,
                status: true,
                message: "Successfully Log In",
                currentAcno,
                currentUserName
            }
        } else {
            return {
                statusCode: 422,
                status: false,
                message: "incorrect password"
            }
        }
    } else {
        return {
            statusCode: 422,
            status: false,
            message: "Account number does not exist"
        }
    }
}

// Deposit definition
const deposit = (acno, pswd, amount) => {
    let amt = parseInt(amount)

    if (acno in database) {
        if (pswd == database[acno]["password"]) {
            database[acno]["balance"] += amt
            database[acno]["transcation"].push({
                amt: amt,
                type: "CREDIT"
            })
            return {
                statusCode: 200,
                status: true,
                message: amount + " is Successfully deposited.. new balance is " + database[acno]["balance"]
            }

        } else {
            return {
                statusCode: 422,
                status: false,
                message: "Incorrect password"
            }
        }
    } else {
        return {
            statusCode: 422,
            status: false,
            message: "User does not exist"
        }

    }
}

// In nodeJs we are not using class concept so we are exporting functions here 
module.exports = {
    register,
    login,
    deposit
}