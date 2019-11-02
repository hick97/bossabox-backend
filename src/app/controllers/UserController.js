import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Schema validation to user store
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    // Checking if user email is valid
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Storing user
    const user = await User.create(req.body);
    return res.status(201).json(user);
  }
}
export default new UserController();
