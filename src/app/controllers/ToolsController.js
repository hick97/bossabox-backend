import * as Yup from 'yup';
import Tools from '../models/Tools';
import User from '../models/User';

class ToolsController {
  // Listing tools by user
  async index(req, res) {
    const { tag } = req.query;
    const where = {};

    // Checking if have query params
    if (tag !== undefined) {
      where.tags = tag;
    }
    const user = await User.findById(req.userId).populate('tools', null, where);

    return res.status(200).json(user.tools);
  }

  // Storing tool
  async store(req, res) {
    // TODO: Yup validation
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        link: Yup.string().required(),
        description: Yup.string().required(),
        tags: Yup.array().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { title, link, description, tags } = req.body;
      const logged_user = req.userId;

      // Checking if tool already exists
      if (await Tools.findOne({ title, author: logged_user })) {
        return res.status(400).json({ error: 'Tool already exists' });
      }

      // Creation
      const tool = await Tools.create({
        title,
        link,
        description,
        tags,
        author: logged_user,
      });

      // Adding tool in user list
      const user = await User.findById(req.userId);

      const { tools: oldToools } = user;

      user.set({
        tools: [...oldToools, tool],
      });

      await user.save();

      return res.status(201).json(tool);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  // Updating tool
  async update(req, res) {
    // TODO: Yup validation (?)

    try {
      const { id: toolId } = req.params;
      const logged_user = req.userId;

      // Checking if logged user have permission to update tool
      if (await Tools.findOne({ _id: toolId, author: logged_user })) {
        return res.status(400).json({ error: 'Permission denied' });
      }

      const tool = await Tools.findByIdAndUpdate(toolId, req.body);

      return res.status(200).json(tool);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  // Removing tool
  async delete(req, res) {
    try {
      const { id: toolId } = req.params;
      const logged_user = req.userId;

      // Checking if logged user have permission to delete tool
      if (await Tools.findOne({ _id: toolId, author: logged_user })) {
        return res.status(400).json({ error: 'Permission denied' });
      }

      await Tools.findByIdAndDelete(toolId);

      return res.status(204);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new ToolsController();
