import { type Request, type Response, type NextFunction } from 'express'
import * as Joi from 'joi'

export const validateTask = function (req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().min('now').required()
  })
  const validation = schema.validate(req.body)
  if (validation.error != null) {
    const message = validation.error.message
      ? validation.error.message
      : validation.error.details[0].message

    return res.status(400).json({ message })
  }
  next()
}
