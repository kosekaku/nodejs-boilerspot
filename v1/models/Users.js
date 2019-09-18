import  pool from './configDB';
// create users table if not exist
const userSchema = `CREATE TABLE IF NOT EXISTS
users (
  id VARCHAR PRIMARY KEY NOT NULL,
  email VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) ,
  address VARCHAR(30),
  is_agent BOOLEAN,
  gender VARCHAR(10),
  password VARCHAR(30)
	)`;
// pool.query(userSchema, (err, results) => {
//   if (err) return console.log(`cannot create table ${err}`);
//   // do nothing here, we proceed to DML queries, results is empty since we are not getting any thing
// });


// class to hold db operations on user
class User {
  constructor(id, email, first_name, last_name, phone_number, address, is_agent, gender, password) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.address = address;
    this.is_agent = is_agent;
    this.gender = gender;
    this.password = password;
  }

  // create user  by inserting dynamic data into database
  createUser() {
    // syntax INSERT INTO TABLE tablename(column1, columnn) VALUES($1, $2), [column1value, cololumnvalue]
    const insertQuery = `INSERT INTO users (id, email, first_name, last_name, phone_number, address, is_agent, gender, password)
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`; // $1 etc are placeholder to avoid SQL Injection
    const insertValues = [this.id, this.email, this.first_name, this.last_name, this.phone_number, this.address,
      this.is_agent, this.gender, this.password]; // placeholder values inserted from here
    return pool.query(insertQuery, insertValues);
  }

  // method to find user by email
  findUserByEmail(email) { // or we can pass this.email, then get the value from the contructor
  // returns a promise , so we need to await it during call to this method
    return pool.query('SELECT * FROM users WHERE email=$1', [email]);
    // console.log('results here..................');
    // console.log(pool.query('SELECT * FROM users'));
  }
}
export default User;
