import Unity from '../models/Unity';

class UnityController {
  async index(req, res) {
    const unity = await Unity.findAll();

    return res.json(unity);
  }
}

export default new UnityController();
