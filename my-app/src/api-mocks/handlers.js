// This is for the fake API. Do not delete!
import { rest } from 'msw'
import { v4 as uuid } from 'uuid'

const users = [
  {
    id: uuid(),
    first_name: 'Michael',
    last_name:'Yu',
    email: 'michael@michael.com',
    password: '123',
    terms: 'yes',
  },
]

function getAllUsers(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(users),
  )
}

function createNewUser(req, res, ctx) {
  const { first_name, last_name, email, password, terms } = req.body
  const requiredFields = { first_name, last_name, email, password, terms }

  if (Object.values(requiredFields).some(field => (!field || !field.trim()))) {
    return res(
      ctx.status(400),
      ctx.json({ message: 'Some required fields are missing or invalid.' }),
    )
  }

  if (req.body.hobbies && !Array.isArray(req.body.hobbies)) {
    return res(
      ctx.status(400),
      ctx.json({ message: 'The optional `hobbies` field must be an array.' }),
    )
  }

  const newUser = { id: uuid(), ...req.body }
  users.unshift(newUser)

  return res(
    ctx.status(201),
    ctx.json(newUser),
  )
}

export const handlers = [
  rest.get(`https://reqres.in/api/users`, getAllUsers),
  rest.post(`https://reqres.in/api/users`, createNewUser),
]