import axios from "axios";
import { makeAutoObservable } from "mobx";

interface User {
  Id:string,
  UserName:string,
  Email:string,
  Password:string
}

class userStore {
  id = ""
  username = ""
  password = ""
  email = ""
  data:Array<User> = []

  constructor() {
    makeAutoObservable(this);

    axios(({
      method:'get',
      baseURL:'http://10.0.2.2:8080/users',
      responseType:'json',
      proxy: false
    }))
    .then((response) => {
      this.setData(response.data)
    })
  }

  setId(value: string) {
    this.id = value
  }

  setUserName(value:string) {
    this.username = value;
  }

  setPassword(value:string) {
    this.password = value;
  }

  setEmail(value:string) {
      this.email = value;
  }

  setData(value:Array<User>) {
    this.data = value
  }

  addUser(username:string, password:string, email:string) {

    let newuser = {
      UserName:username,
      Password:password,
      Email:email
    }

    axios(({
      method:'post',
      baseURL:'http://10.0.2.2:8080/users',
      responseType:'json',
      proxy: false,
      data: newuser
    }))
    .then((response) => {
      this.setId(response.data.id)
    })
  }

  checkExist(username:string, password:string) {
    return this.data.find(user => user.UserName == username && user.Password == password)
  }

  checkIdenName(username:string) {
    return this.data.find(user => user.UserName == username)
  }

  editUser(new_username:string, new_email:string)
  {
    let updated_user = {
      UserName:new_username,
      Email:new_email,
      Password: this.password
    }

    axios(({
      method:'post',
      baseURL:`http://10.0.2.2:8080/users/${this.id}`,
      responseType:'json',
      proxy: false,
      data: updated_user
    }))
    .then((response) => {
      console.log(response.data)
    })
    
  }

}

export default new userStore();
