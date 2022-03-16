const BlogModel = require('../models/blog.model');

const getMany = async (req, res) => {
    try {
        const blogs = await BlogModel.findAll(); //tüm tabloyu vermeyeceğiz burada düzenleme yapacağız !
        res.send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
}


const add = async (req, res) => {
    try {
        const blog = await BlogModel.create(req.body);
        res.json(blog);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const blog = await BlogModel.findByPk(req.params.id);
        res.json(blog);
    } catch (error) {
        res.status(500).send(error);
    }
}

const update = async (req, res) => {
    try {
        const blog = await BlogModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(blog);
    } catch (error) {
        res.status(500).send(error);
    }
}

const remove = async (req, res) => {
    try {
        const blog = await BlogModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(blog);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getMany,
    add,
    getById,
    update,
    remove
}