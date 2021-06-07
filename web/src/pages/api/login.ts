import type { NextApiRequestSession } from '@/interfaces/RequestSession';
import withSession from '@/lib/withSession';
import { api } from '@/services/api';
import type { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestSession, res: NextApiResponse) => {
    const { dre, password } = await req.body;

    try {
      const response = await api.post('/sessions', {
        dre,
        password
      });

      const user = {
        isLoggedIn: true,
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        dre: response.data.user.dre,
        avatar: response.data.user.avatar,
        token: response.data.token
      };

      req.session.set('user', user);

      await req.session.save();
      return res.status(200).json(user);
    } catch {
      return res.status(401).json({ error: 'Login invalid' });
    }
  }
);
