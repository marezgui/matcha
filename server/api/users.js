import express from 'express'
import Users from '../models/Users'

const router = express.Router()

router.get('/:login', (req, res) => {
  Users.getUser(req.params.login, (err, Users) => {
    err ? res.json(err) : res.json(Users)
  })
})

export default router