import { investment, user } from "@/models/model";
import { BACKEND_URL } from "@/routes";


export const getUserByEmail = async (email:string) => {
  try {
    const response = await fetch(BACKEND_URL+"/users/email/"+email)
    const user = await response.json()
    return user
  } catch (e){
    console.error(e)
    return null
  }
}
export const getUserById = async (id:string) => {
  try {
    const response = await fetch(BACKEND_URL+"/users/"+id)
    const user = await response.json()
    return user
  } catch (e){
    console.error(e)
    return null
  }
}
export const createUser = async (userData:user) => {
  try {
    const response = await fetch(BACKEND_URL+"/users/",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const user = await response.json()
    return user
  } catch (e){
    console.error(e)
    return null
  }
}
export const createInvestment = async (investmentData:investment) => {
  const response = await fetch(BACKEND_URL+"/investments/",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(investmentData)
  })
  return response
}

export const getInvestmentsByUserId = async (id:string) => {
  try {
    const response = await fetch(BACKEND_URL+"/users/investments/"+id)
    const investments = await response.json()
    return investments
  } catch (e){
    console.error(e)
    return null
  }
}

export const deleteInvestmentById = async (id:string) => {
  try {
    const response = await fetch(BACKEND_URL+"/investments/"+id,{
      method: "DELETE",
    })
    const investments = await response.json()
    return investments
  } catch (e) {
    console.error(e)
    return null
    
  }
}