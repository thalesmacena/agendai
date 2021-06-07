import {
  addHours,
  isAfter,
  isBefore,
  parseISO,
  startOfHour,
  // eslint-disable-next-line prettier/prettier
  subHours
} from 'date-fns';
import * as Yup from 'yup';
import File from '../models/File';
import Schedule from '../models/Schedule';
import Unity from '../models/Unity';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const schedules = await Schedule.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Unity,
          as: 'unity',
          attributes: ['id', 'name', 'location'],
        },
      ],
    });

    return res.json(schedules);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      unity: Yup.string().required(),
    });

    console.log(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date, unity } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    if (isAfter(hourStart, addHours(new Date(), 5))) {
      return res
        .status(400)
        .json({ error: 'you can only schedule one time for the next 6 hours' });
    }

    const unityExists = await Unity.findOne({
      where: {
        name: unity,
      },
    });

    if (!unityExists) {
      return res.status(400).json({ error: 'Unity does not exists' });
    }

    const checkAvailability = await Schedule.findAll({
      where: {
        unity_id: unityExists.id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability.length >= unityExists.capacity) {
      return res.status(400).json({ error: 'Schedule date is not available' });
    }

    const schedule = await Schedule.create({
      user_id: req.userId,
      unity_id: unityExists.id,
      date: hourStart,
    });

    return res.json(schedule);
  }

  async delete(req, res) {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Unity,
          as: 'unity',
          attributes: ['id', 'name', 'location'],
        },
      ],
    });

    if (!schedule) {
      return res.status(400).json({ error: 'Schedule does not exists' });
    }

    if (schedule.canceled_at !== null) {
      return res.status(400).json({ error: 'schedule already canceled' });
    }

    if (schedule.user_id !== req.userId) {
      return res.status(403).json({
        error: "You don't have permition to cancel this schedule.",
      });
    }

    const dateWithSub = subHours(schedule.date, 1);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(403).json({
        error:
          "You can't cancel a schedule with lass then one hour of antecedence",
      });
    }

    schedule.canceled_at = new Date();

    await schedule.save();

    return res.json({ schedule });
  }
}

export default new ScheduleController();
