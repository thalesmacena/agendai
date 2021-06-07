import * as Yup from 'yup';
import File from '../models/File';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'dre', 'email'],
    });

    return res.json({ users });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dre: Yup.string().required().matches(/^\d+$/).length(9),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { dre: req.body.dre },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, dre, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      dre,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      dre: Yup.string().matches(/^\d+$/).length(9),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { dre, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (dre !== user.dre) {
      const userExists = await User.findOne({
        where: { dre },
      });

      if (!userExists) {
        return res.status(400).json({ error: 'User does not exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, email, avatar } = await User.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json({
      id,
      name,
      dre,
      email,
      avatar,
    });
  }
}

export default new UserController();
