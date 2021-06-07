import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import File from '../models/File';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      dre: Yup.string().required().matches(/^\d+$/).length(9),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { dre, password } = req.body;

    const user = await User.findOne({
      where: {
        dre,
      },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({
        error: 'Password incorrect',
      });
    }

    const { id, name, email, avatar, provider } = user;
    return res.json({
      user: {
        id,
        name,
        dre,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
