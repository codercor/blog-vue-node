const BlogModel = require('../models/blog.model');

// /blog?page=2&limit=20
const getMany = async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;  // sol taraf null/undefined/false ise sağdaki değeri atıyor

    try {
        const blogs = await BlogModel.findAll({
           limit,
           offset: (page - 1) * limit 
        }); //tüm tabloyu vermeyeceğiz burada düzenleme yapacağız !
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