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
  }

  // Updating tool
  async update(req, res) {
    // TODO: Yup validation (?)
    const { id: toolId } = req.params;
    const logged_user = req.userId;

    // Checking if logged user have permission to update tool
    if (await Tools.findOne({ _id: toolId, author: logged_user })) {
      return res.status(400).json({ error: 'Permission denied' });
    }

    const tool = await Tools.findByIdAndUpdate(toolId, req.body);

    return res.status(200).json(tool);
  }

  // Removing tool
  async delete(req, res) {
    const { id: toolId } = req.params;
    const logged_user = req.userId;

    // Checking if logged user have permission to delete tool
    if (await Tools.findOne({ _id: toolId, author: logged_user })) {
      return res.status(400).json({ error: 'Permission denied' });
    }

    await Tools.findByIdAndDelete(toolId);

    return res.status(204);
  }
}

export default new ToolsController();
